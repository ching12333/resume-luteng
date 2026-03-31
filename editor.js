// ============================================================
//  简历编辑器 - 核心逻辑 (editor.js)
//  与简历数据 (resume-data.js) 分离，可独立更新
//  v2.0 更新：
//    - 修复保存后刷新丢失更改的 bug（SHA 竞态问题）
//    - 新增复制粘贴功能（Ctrl+C/V，支持粘贴图片和文本）
//    - 新增可开关参考线功能
// ============================================================

// ============================================================
//  GitHub 配置（用于一键保存到网址）
// ============================================================
var _ta = 'Z2hwX1piMEpLY2JydEdMbEY5QWM=';
var _tb = 'OEE5S2hvRzIwVlk3SjQzZUxpdGY=';
var _dec = function(s){ return decodeURIComponent(escape(atob(s))); };
var GH_TOKEN  = _dec(_ta) + _dec(_tb);
var GH_OWNER  = 'ching12333';
var GH_REPO   = 'resume-luteng';
var GH_BRANCH = 'main';
var GH_DATA_PATH = 'resume-data.js';

// ============================================================
//  状态
// ============================================================
var selected    = null;
var multiSel    = [];
var editingText = false;
var dragState   = null;
var zCounter    = 10;
var slide       = document.getElementById('slide');
var clipboard   = null;   // 复制缓冲区（存序列化后的元素数据数组）
var guidelinesOn = false; // 参考线开关

// ============================================================
//  撤销 / 重做 历史栈
// ============================================================
var historyStack = [];
var historyIndex = -1;
var MAX_HISTORY  = 50;

function snapshotSlide(){
  if(historyIndex < historyStack.length - 1){
    historyStack = historyStack.slice(0, historyIndex + 1);
  }
  var clone = slide.cloneNode(true);
  clone.querySelectorAll('.handle,.el-border,.img-hint').forEach(function(n){ n.remove(); });
  clone.querySelectorAll('.el').forEach(function(el){
    el.classList.remove('selected','multi-sel');
    var inner = el.querySelector('.el-text');
    if(inner) inner.removeAttribute('contenteditable');
  });
  historyStack.push(clone.innerHTML);
  if(historyStack.length > MAX_HISTORY) historyStack.shift();
  historyIndex = historyStack.length - 1;
  updateUndoRedoBtns();
}

function restoreSnapshot(html){
  deselectAll();
  slide.innerHTML = html;
  slide.querySelectorAll('.el').forEach(function(el){ rebindEl(el); });
  updateUndoRedoBtns();
  updateSlideHeight();
}

function undo(){
  if(historyIndex <= 0) return;
  historyIndex--;
  restoreSnapshot(historyStack[historyIndex]);
}

function redo(){
  if(historyIndex >= historyStack.length - 1) return;
  historyIndex++;
  restoreSnapshot(historyStack[historyIndex]);
}

function updateUndoRedoBtns(){
  var bu = document.getElementById('btn-undo');
  var br = document.getElementById('btn-redo');
  if(bu) bu.style.opacity = historyIndex > 0 ? '1' : '0.4';
  if(br) br.style.opacity = historyIndex < historyStack.length-1 ? '1' : '0.4';
}

// 重新绑定事件（restore 后使用）
function rebindEl(el){
  if(!el.querySelector('.el-border')){
    var border = document.createElement('div');
    border.className = 'el-border';
    el.insertBefore(border, el.firstChild);
  }
  if(!el.querySelector('.handle')){
    ['nw','n','ne','e','se','s','sw','w'].forEach(function(dir){
      var h = document.createElement('div');
      h.className = 'handle '+dir;
      h.dataset.dir = dir;
      el.appendChild(h);
    });
  }
  if(el.dataset.eltype === 'image' && !el.querySelector('.img-hint')){
    var wrap = el.querySelector('.el-img-wrap');
    if(wrap){
      var hint = document.createElement('div');
      hint.className = 'img-hint'; hint.textContent = '双击替换图片';
      wrap.appendChild(hint);
    }
  }
  el.addEventListener('mousedown', function(e){
    if(e.target.classList.contains('handle')){
      e.stopPropagation(); e.preventDefault();
      deselectAll(); selectEl(el);
      startResize(e, e.target.dataset.dir, el);
      return;
    }
    if(editingText && el === selected) return;
    e.stopPropagation();
    if(e.ctrlKey || e.metaKey){
      e.preventDefault();
      toggleMultiSel(el);
    } else {
      if(multiSel.length > 1 && multiSel.indexOf(el) !== -1){
        startMoveGroup(e);
      } else {
        deselectAll(); selectEl(el); startMove(e, el);
      }
    }
  });
  if(el.dataset.eltype === 'text'){
    el.addEventListener('dblclick', function(e){ e.stopPropagation(); startTextEdit(el); });
  } else if(el.dataset.eltype === 'image'){
    el.addEventListener('dblclick', function(e){ e.stopPropagation(); replaceImgEl(el); });
  }
}

// ============================================================
//  初始化
// ============================================================
// ============================================================
//  动态更新画布高度（支持多页内容）
// ============================================================
function updateSlideHeight(){
  var minH = 1123; // 至少一页A4高度
  var maxBottom = minH;
  slide.querySelectorAll('.el').forEach(function(el){
    var top = parseInt(el.style.top) || 0;
    var h   = parseInt(el.style.height) || 0;
    var bottom = top + h;
    if(bottom > maxBottom) maxBottom = bottom;
  });
  // 底部留80px边距，并向上取整到整页高度（1123px）
  var pages = Math.ceil((maxBottom + 80) / 1123);
  var newH = Math.max(minH, pages * 1123);
  slide.style.minHeight = newH + 'px';
  // 同步更新分页背景装饰线
  updatePageDividers(pages);
}

// 在页面分隔处画淡灰色虚线，帮助识别页面边界
function updatePageDividers(pages){
  var existing = document.getElementById('page-dividers');
  if(existing) existing.remove();
  if(pages <= 1) return;
  var div = document.createElement('div');
  div.id = 'page-dividers';
  div.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
  var html = '';
  for(var i = 1; i < pages; i++){
    var y = i * 1123;
    html += '<div style="position:absolute;left:0;right:0;top:'+y+'px;height:2px;background:rgba(150,150,150,0.25);border-top:1px dashed rgba(150,150,150,0.4);"></div>';
  }
  div.innerHTML = html;
  slide.appendChild(div);
}

function init(){
  if(typeof INIT_ELEMENTS !== 'undefined'){
    INIT_ELEMENTS.forEach(createEl);
  }
  slide.addEventListener('mousedown', function(e){
    if(e.target === slide) deselectAll();
  });
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup',   onMouseUp);
  document.addEventListener('keydown',   onKeyDown);
  // 粘贴事件（全局监听，支持从外部粘贴图片/文本）
  document.addEventListener('paste', onPaste);
  // 初始化后更新画布高度
  setTimeout(function(){ updateSlideHeight(); snapshotSlide(); }, 100);
  updateUndoRedoBtns();
}

// ============================================================
//  创建元素
// ============================================================
function createEl(d){
  var el = document.createElement('div');
  el.className = 'el';
  el.id = d.id || ('el_'+Date.now()+Math.random().toString(36).slice(2));
  var zVal = d.z ? d.z : (++zCounter);
  if(d.z && d.z > zCounter) zCounter = d.z;
  el.style.cssText = 'left:'+d.x+'px;top:'+d.y+'px;width:'+d.w+'px;height:'+d.h+'px;z-index:'+zVal+';';

  var border = document.createElement('div');
  border.className = 'el-border';
  el.appendChild(border);

  ['nw','n','ne','e','se','s','sw','w'].forEach(function(dir){
    var h = document.createElement('div');
    h.className = 'handle '+dir;
    h.dataset.dir = dir;
    el.appendChild(h);
  });

  if(d.type === 'text'){
    el.dataset.eltype = 'text';
    var inner = document.createElement('div');
    inner.className = 'el-text';
    inner.innerHTML = d.html || '';
    el.appendChild(inner);
    el.addEventListener('dblclick', function(e){ e.stopPropagation(); startTextEdit(el); });

  } else if(d.type === 'image'){
    el.dataset.eltype = 'image';
    var wrap = document.createElement('div');
    wrap.className = 'el-img-wrap';
    var img = document.createElement('img');
    img.className = 'el-img'; img.src = d.src||''; img.alt='';
    var hint = document.createElement('div');
    hint.className = 'img-hint'; hint.textContent = '双击替换图片';
    wrap.appendChild(img); wrap.appendChild(hint);
    el.appendChild(wrap);
    el.addEventListener('dblclick', function(e){ e.stopPropagation(); replaceImgEl(el); });

  } else if(d.type === 'rect'){
    el.dataset.eltype = 'rect';
    var rectDiv = document.createElement('div');
    rectDiv.className = 'el-rect';
    if(d.color) rectDiv.style.borderColor = d.color;
    if(d.borderWidth) rectDiv.style.borderWidth = d.borderWidth+'px';
    el.appendChild(rectDiv);

  } else if(d.type === 'star'){
    el.dataset.eltype = 'star';
    var starDiv = document.createElement('div');
    starDiv.className = 'el-star';
    starDiv.textContent = d.char || '★';
    if(d.color) starDiv.style.color = d.color;
    if(d.fontSize) starDiv.style.fontSize = d.fontSize+'px';
    el.appendChild(starDiv);

  } else if(d.type === 'line'){
    el.dataset.eltype = 'line';
    var lw = document.createElement('div');
    lw.className = 'el-line';
    var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('preserveAspectRatio','none');
    var ln = document.createElementNS('http://www.w3.org/2000/svg','line');
    ln.setAttribute('x1','0'); ln.setAttribute('y1','50%');
    ln.setAttribute('x2','100%'); ln.setAttribute('y2','50%');
    ln.setAttribute('stroke', d.color||'#2c3e50');
    ln.setAttribute('stroke-width','2');
    svg.appendChild(ln); lw.appendChild(svg); el.appendChild(lw);
  }

  el.addEventListener('mousedown', function(e){
    if(e.target.classList.contains('handle')){
      e.stopPropagation(); e.preventDefault();
      deselectAll(); selectEl(el);
      startResize(e, e.target.dataset.dir, el);
      return;
    }
    if(editingText && el === selected) return;
    e.stopPropagation();
    if(e.ctrlKey || e.metaKey){
      e.preventDefault();
      toggleMultiSel(el);
    } else {
      if(selected && selected !== el) stopTextEdit(selected);
      if(multiSel.length > 1 && multiSel.indexOf(el) !== -1){
        startMoveGroup(e);
      } else {
        deselectAll(); selectEl(el); startMove(e, el);
      }
    }
  });

  slide.appendChild(el);
  return el;
}

// ============================================================
//  选中 / 多选 / 取消
// ============================================================
function selectEl(el){
  if(selected && selected !== el) stopTextEdit(selected);
  if(selected) selected.classList.remove('selected');
  selected = el;
  el.classList.add('selected');
  if(multiSel.indexOf(el) === -1) multiSel = [el];
  syncToolbar(el);
  updateMultiBadge();
}

function toggleMultiSel(el){
  stopTextEdit(selected);
  var idx = multiSel.indexOf(el);
  if(idx !== -1){
    el.classList.remove('selected','multi-sel');
    multiSel.splice(idx,1);
    if(selected === el){
      selected = multiSel.length ? multiSel[multiSel.length-1] : null;
      if(selected){ selected.classList.remove('multi-sel'); selected.classList.add('selected'); }
    }
  } else {
    if(selected){ selected.classList.remove('selected'); selected.classList.add('multi-sel'); }
    multiSel.push(el);
    el.classList.remove('multi-sel'); el.classList.add('selected');
    selected = el;
  }
  syncToolbar(selected);
  updateMultiBadge();
}

function deselectAll(){
  stopTextEdit(selected);
  multiSel.forEach(function(el){ el.classList.remove('selected','multi-sel'); });
  multiSel = []; selected = null;
  updateMultiBadge();
}

function updateMultiBadge(){
  var badge = document.getElementById('multi-badge');
  if(multiSel.length > 1){
    badge.textContent = '已选中 '+multiSel.length+' 个元素（可一起拖动）';
    badge.style.display = 'block';
  } else {
    badge.style.display = 'none';
  }
}

function syncToolbar(el){
  if(!el) return;
  var inner = el.querySelector('.el-text');
  if(inner){
    var firstSpan = inner.querySelector('[style*="font-size"]');
    var fs = firstSpan
      ? parseFloat(firstSpan.style.fontSize)
      : parseFloat(inner.style.fontSize) || 13;
    document.getElementById('tb-fontsize').value = fs || 13;
  }
}

// ============================================================
//  文字编辑
// ============================================================
function startTextEdit(el){
  var inner = el.querySelector('.el-text');
  if(!inner) return;
  inner.contentEditable = 'true';
  inner.style.cursor = 'text';
  inner.style.userSelect = 'text';
  editingText = true;
  inner.focus();
  if(!inner._mdBound){
    inner._mdBound = true;
    inner.addEventListener('mousedown', function(e){ e.stopPropagation(); });
    inner.addEventListener('keyup',    syncSelectionFontSize);
    inner.addEventListener('mouseup',  syncSelectionFontSize);
  }
}

function stopTextEdit(el){
  if(!el) return;
  var inner = el.querySelector('.el-text');
  if(inner && inner.contentEditable === 'true'){
    inner.contentEditable='false'; inner.style.cursor=''; inner.style.userSelect='';
    snapshotSlide();
  }
  editingText = false;
}

function syncSelectionFontSize(){
  var sel = window.getSelection();
  if(!sel || sel.rangeCount === 0) return;
  var node = sel.anchorNode;
  if(!node) return;
  var el = node.nodeType === 3 ? node.parentElement : node;
  while(el && el.className !== 'el-text'){
    if(el.style && el.style.fontSize){
      document.getElementById('tb-fontsize').value = parseFloat(el.style.fontSize);
      return;
    }
    el = el.parentElement;
  }
}

// ============================================================
//  字体大小
// ============================================================
function applyFontSize(){
  var fs = parseFloat(document.getElementById('tb-fontsize').value);
  if(!fs || fs < 1) return;
  setFontSize(fs);
}

function setFontSize(fs){
  document.getElementById('tb-fontsize').value = fs;
  if(editingText && selected){
    var inner = selected.querySelector('.el-text');
    if(!inner) return;
    inner.focus();
    var sel = window.getSelection();
    if(sel && sel.rangeCount > 0 && !sel.isCollapsed){
      var range = sel.getRangeAt(0);
      var fragment = range.extractContents();
      var span = document.createElement('span');
      span.style.fontSize = fs + 'px';
      span.appendChild(fragment);
      range.insertNode(span);
      var newRange = document.createRange();
      newRange.selectNodeContents(span);
      sel.removeAllRanges();
      sel.addRange(newRange);
    } else {
      inner.style.fontSize = fs + 'px';
    }
  } else if(selected){
    var inner = selected.querySelector('.el-text');
    if(inner) inner.style.fontSize = fs + 'px';
  }
}

// ============================================================
//  颜色
// ============================================================
function applyColor(val){
  if(editingText && selected){
    var inner = selected.querySelector('.el-text');
    if(!inner) return;
    inner.focus();
    var sel = window.getSelection();
    if(sel && sel.rangeCount > 0 && !sel.isCollapsed){
      var range = sel.getRangeAt(0);
      var fragment = range.extractContents();
      var span = document.createElement('span');
      span.style.color = val;
      span.appendChild(fragment);
      range.insertNode(span);
    } else {
      inner.style.color = val;
    }
  } else if(selected){
    var inner = selected.querySelector('.el-text');
    if(inner) inner.style.color = val;
  }
}

// ============================================================
//  加粗 / 斜体 / 下划线
// ============================================================
function toggleBold(){
  if(editingText && selected){
    var inner = selected.querySelector('.el-text');
    if(!inner) return;
    inner.focus();
    var sel = window.getSelection();
    if(sel && sel.rangeCount > 0 && !sel.isCollapsed){
      document.execCommand('bold');
    } else {
      inner.style.fontWeight = inner.style.fontWeight === 'bold' ? '' : 'bold';
    }
  } else if(selected){
    var inner = selected.querySelector('.el-text');
    if(inner) inner.style.fontWeight = inner.style.fontWeight === 'bold' ? '' : 'bold';
  }
}

function toggleItalic(){
  if(editingText && selected){
    var inner = selected.querySelector('.el-text');
    if(!inner) return;
    inner.focus();
    var sel = window.getSelection();
    if(sel && sel.rangeCount > 0 && !sel.isCollapsed){
      document.execCommand('italic');
    } else {
      inner.style.fontStyle = inner.style.fontStyle === 'italic' ? '' : 'italic';
    }
  } else if(selected){
    var inner = selected.querySelector('.el-text');
    if(inner) inner.style.fontStyle = inner.style.fontStyle === 'italic' ? '' : 'italic';
  }
}

function toggleUnderline(){
  if(editingText && selected){
    var inner = selected.querySelector('.el-text');
    if(!inner) return;
    inner.focus();
    var sel = window.getSelection();
    if(sel && sel.rangeCount > 0 && !sel.isCollapsed){
      document.execCommand('underline');
    } else {
      inner.style.textDecoration = inner.style.textDecoration === 'underline' ? '' : 'underline';
    }
  } else if(selected){
    var inner = selected.querySelector('.el-text');
    if(inner) inner.style.textDecoration = inner.style.textDecoration === 'underline' ? '' : 'underline';
  }
}

function applyFontFamily(val){
  if(editingText && selected){
    var inner = selected.querySelector('.el-text');
    if(!inner) return;
    inner.focus();
    var sel = window.getSelection();
    if(sel && sel.rangeCount > 0 && !sel.isCollapsed){
      var range = sel.getRangeAt(0);
      var fragment = range.extractContents();
      var span = document.createElement('span');
      span.style.fontFamily = val;
      span.appendChild(fragment);
      range.insertNode(span);
    } else {
      inner.style.fontFamily = val;
    }
  } else if(selected){
    var inner = selected.querySelector('.el-text');
    if(inner) inner.style.fontFamily = val;
  }
}

// ============================================================
//  移动（单个 / 多选组）
// ============================================================
function startMove(e, el){
  dragState = {
    type:'move', el:el,
    startX:e.clientX, startY:e.clientY,
    origX:parseInt(el.style.left)||0,
    origY:parseInt(el.style.top)||0
  };
}

function startMoveGroup(e){
  var snapshots = multiSel.map(function(el){
    return { el:el, origX:parseInt(el.style.left)||0, origY:parseInt(el.style.top)||0 };
  });
  dragState = { type:'moveGroup', startX:e.clientX, startY:e.clientY, snapshots:snapshots };
}

function startResize(e, dir, el){
  dragState = {
    type:'resize', dir:dir, el:el,
    startX:e.clientX, startY:e.clientY,
    origX:parseInt(el.style.left)||0,
    origY:parseInt(el.style.top)||0,
    origW:parseInt(el.style.width)||100,
    origH:parseInt(el.style.height)||20
  };
}

function onMouseMove(e){
  if(!dragState) return;
  var dx = e.clientX - dragState.startX;
  var dy = e.clientY - dragState.startY;
  if(dragState.type === 'move'){
    dragState.el.style.left = Math.max(0, dragState.origX+dx)+'px';
    dragState.el.style.top  = Math.max(0, dragState.origY+dy)+'px';
  } else if(dragState.type === 'moveGroup'){
    dragState.snapshots.forEach(function(s){
      s.el.style.left = Math.max(0, s.origX+dx)+'px';
      s.el.style.top  = Math.max(0, s.origY+dy)+'px';
    });
  } else if(dragState.type === 'resize'){
    var d=dragState.dir, el=dragState.el;
    var nx=dragState.origX, ny=dragState.origY;
    var nw=dragState.origW, nh=dragState.origH;
    if(d.includes('e')) nw=Math.max(20,dragState.origW+dx);
    if(d.includes('s')) nh=Math.max(10,dragState.origH+dy);
    if(d.includes('w')){ nw=Math.max(20,dragState.origW-dx); nx=dragState.origX+dragState.origW-nw; }
    if(d.includes('n')){ nh=Math.max(10,dragState.origH-dy); ny=dragState.origY+dragState.origH-nh; }
    el.style.left=nx+'px'; el.style.top=ny+'px';
    el.style.width=nw+'px'; el.style.height=nh+'px';
  }
}

function onMouseUp(){
  if(dragState && (dragState.type==='move'||dragState.type==='moveGroup'||dragState.type==='resize')){
    snapshotSlide();
    updateSlideHeight();
  }
  dragState=null;
}

// ============================================================
//  键盘快捷键
// ============================================================
function onKeyDown(e){
  // 文字编辑模式下，只处理 Ctrl 组合键，其余交给浏览器
  if(editingText){
    if((e.ctrlKey||e.metaKey) && e.key==='c'){ copySelected(); return; }
    if((e.ctrlKey||e.metaKey) && e.key==='x'){ cutSelected(); return; }
    // 文字编辑模式下 Ctrl+V 由 onPaste 处理
    return;
  }

  var tag = document.activeElement.tagName;
  if(tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA') return;

  if(e.key==='Delete'||e.key==='Backspace'){ deleteSelected(); return; }

  var step = e.shiftKey ? 10 : 1;
  var targets = multiSel.length ? multiSel : (selected ? [selected] : []);

  if(e.key==='ArrowLeft'){  targets.forEach(function(el){ el.style.left=(parseInt(el.style.left)-step)+'px'; }); e.preventDefault(); snapshotSlide(); return; }
  if(e.key==='ArrowRight'){ targets.forEach(function(el){ el.style.left=(parseInt(el.style.left)+step)+'px'; }); e.preventDefault(); snapshotSlide(); return; }
  if(e.key==='ArrowUp'){    targets.forEach(function(el){ el.style.top=(parseInt(el.style.top)-step)+'px'; }); e.preventDefault(); snapshotSlide(); return; }
  if(e.key==='ArrowDown'){  targets.forEach(function(el){ el.style.top=(parseInt(el.style.top)+step)+'px'; }); e.preventDefault(); snapshotSlide(); return; }

  if((e.ctrlKey||e.metaKey) && e.key==='z'){ e.preventDefault(); undo(); return; }
  if((e.ctrlKey||e.metaKey) && (e.key==='y'||e.key==='Y')){ e.preventDefault(); redo(); return; }

  if((e.ctrlKey||e.metaKey) && e.key==='a'){
    e.preventDefault();
    deselectAll();
    slide.querySelectorAll('.el').forEach(function(el){ multiSel.push(el); el.classList.add('multi-sel'); });
    if(multiSel.length){ selected=multiSel[multiSel.length-1]; selected.classList.remove('multi-sel'); selected.classList.add('selected'); }
    updateMultiBadge();
    return;
  }

  // 复制 / 剪切 / 粘贴（元素级）
  if((e.ctrlKey||e.metaKey) && e.key==='c'){ e.preventDefault(); copySelected(); return; }
  if((e.ctrlKey||e.metaKey) && e.key==='x'){ e.preventDefault(); cutSelected(); return; }
  if((e.ctrlKey||e.metaKey) && e.key==='v'){ e.preventDefault(); pasteFromClipboard(); return; }

  // 复制并粘贴（Ctrl+D 快速复制一份）
  if((e.ctrlKey||e.metaKey) && e.key==='d'){ e.preventDefault(); copySelected(); pasteFromClipboard(); return; }
}

// ============================================================
//  复制 / 剪切 / 粘贴（元素级）
// ============================================================

// 将选中元素序列化到内部剪贴板
function copySelected(){
  var targets = multiSel.length ? multiSel : (selected ? [selected] : []);
  if(!targets.length) return;
  clipboard = targets.map(function(el){ return serializeOneEl(el); });
  showToast('已复制 '+clipboard.length+' 个元素', '#2980b9', 1500);
}

function cutSelected(){
  copySelected();
  deleteSelected();
}

// 从内部剪贴板粘贴（偏移 20px 避免完全重叠）
function pasteFromClipboard(){
  if(!clipboard || !clipboard.length) return;
  deselectAll();
  var newEls = clipboard.map(function(d){
    var copy = JSON.parse(JSON.stringify(d));
    copy.id = 'el_'+Date.now()+Math.random().toString(36).slice(2);
    copy.x += 20;
    copy.y += 20;
    copy.z = ++zCounter;
    return createEl(copy);
  });
  // 选中新粘贴的元素
  newEls.forEach(function(el){ multiSel.push(el); el.classList.add('multi-sel'); });
  if(newEls.length === 1){
    newEls[0].classList.remove('multi-sel');
    newEls[0].classList.add('selected');
    selected = newEls[0];
    multiSel = [selected];
  } else if(newEls.length > 1){
    selected = newEls[newEls.length-1];
    selected.classList.remove('multi-sel');
    selected.classList.add('selected');
  }
  updateMultiBadge();
  snapshotSlide();
  // 更新剪贴板偏移，下次再粘贴再偏移
  clipboard = clipboard.map(function(d){
    var c = JSON.parse(JSON.stringify(d));
    c.x += 20; c.y += 20;
    return c;
  });
}

// ============================================================
//  系统粘贴事件（支持从外部粘贴图片 / 文本）
// ============================================================
function onPaste(e){
  // 如果焦点在文字编辑框内，让浏览器默认处理文本粘贴
  if(editingText && selected){
    var inner = selected.querySelector('.el-text');
    if(inner && document.activeElement === inner) return;
  }

  var items = (e.clipboardData || e.originalEvent && e.originalEvent.clipboardData || {}).items;
  if(!items) return;

  var handled = false;

  for(var i=0; i<items.length; i++){
    var item = items[i];

    // 粘贴图片
    if(item.type.indexOf('image') !== -1){
      e.preventDefault();
      handled = true;
      (function(it){
        var file = it.getAsFile();
        if(!file) return;
        var reader = new FileReader();
        reader.onload = function(ev){
          var el = createEl({
            type:'image', x:100, y:100, w:200, h:200, src:ev.target.result
          });
          deselectAll(); selectEl(el);
          snapshotSlide();
          showToast('已粘贴图片', '#27ae60', 1500);
        };
        reader.readAsDataURL(file);
      })(item);
      break;
    }
  }

  if(!handled){
    // 粘贴纯文本（仅在非文字编辑模式下，创建新文字元素）
    for(var j=0; j<items.length; j++){
      if(items[j].type === 'text/plain'){
        e.preventDefault();
        items[j].getAsString(function(text){
          if(!text || !text.trim()) return;
          // 截断过长文本
          var display = text.length > 500 ? text.substring(0,500)+'...' : text;
          var el = createEl({
            type:'text', x:100, y:100, w:400, h:60,
            html:'<span style="font-size:13px;color:#111;">'+escapeHtml(display)+'</span>'
          });
          deselectAll(); selectEl(el);
          snapshotSlide();
          showToast('已粘贴文本', '#27ae60', 1500);
        });
        break;
      }
    }
  }
}

function escapeHtml(str){
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;').replace(/\n/g,'<br>');
}

// ============================================================
//  工具栏操作
// ============================================================
function bringForward(){ if(selected) selected.style.zIndex=++zCounter; }
function sendBackward(){ if(selected){ var z=parseInt(selected.style.zIndex); if(z>1) selected.style.zIndex=z-1; } }
function alignLeft(){   var t=multiSel.length?multiSel:(selected?[selected]:[]); t.forEach(function(el){el.style.left='28px';}); snapshotSlide(); }
function alignCenter(){ var t=multiSel.length?multiSel:(selected?[selected]:[]); t.forEach(function(el){var w=parseInt(el.style.width);el.style.left=Math.round((794-w)/2)+'px';}); snapshotSlide(); }
function alignRight(){  var t=multiSel.length?multiSel:(selected?[selected]:[]); t.forEach(function(el){var w=parseInt(el.style.width);el.style.left=(794-w-28)+'px';}); snapshotSlide(); }
function deleteSelected(){
  var t=multiSel.slice(); t.forEach(function(el){el.remove();});
  multiSel=[]; selected=null; editingText=false; updateMultiBadge();
  snapshotSlide();
}

function addText(){
  var el=createEl({type:'text',x:100,y:200,w:300,h:30,html:'<span style="font-size:14px;color:#111;">双击编辑文字</span>'});
  deselectAll(); selectEl(el); snapshotSlide();
}
function addImageEl(){
  var fi=document.getElementById('img-file-input');
  fi.onchange=function(e){
    var file=e.target.files[0]; if(!file) return;
    var r=new FileReader();
    r.onload=function(ev){ var el=createEl({type:'image',x:100,y:200,w:120,h:120,src:ev.target.result}); deselectAll(); selectEl(el); snapshotSlide(); };
    r.readAsDataURL(file); fi.value='';
  };
  fi.click();
}
function addLine(){
  var el=createEl({type:'line',x:28,y:300,w:730,h:4,color:'#2c3e50'});
  deselectAll(); selectEl(el); snapshotSlide();
}
function addRect(){
  var el=createEl({type:'rect',x:50,y:200,w:200,h:80,color:'#660974',borderWidth:2});
  deselectAll(); selectEl(el); snapshotSlide();
}
function addStar(){
  var el=createEl({type:'star',x:50,y:200,w:20,h:20,char:'★',color:'#660974',fontSize:16});
  deselectAll(); selectEl(el); snapshotSlide();
}
function replaceSelectedImg(){
  if(!selected||selected.dataset.eltype!=='image') return;
  replaceImgEl(selected);
}
function replaceImgEl(el){
  var fi=document.getElementById('img-file-input');
  fi.onchange=function(e){
    var file=e.target.files[0]; if(!file) return;
    var r=new FileReader();
    r.onload=function(ev){ var img=el.querySelector('.el-img'); if(img){ img.src=ev.target.result; snapshotSlide(); } };
    r.readAsDataURL(file); fi.value='';
  };
  fi.click();
}

// ============================================================
//  参考线（可开关的网格辅助线）
// ============================================================
function toggleGuidelines(){
  guidelinesOn = !guidelinesOn;
  var btn = document.getElementById('btn-guidelines');
  var overlay = document.getElementById('guidelines-overlay');

  if(guidelinesOn){
    if(!overlay){
      overlay = document.createElement('div');
      overlay.id = 'guidelines-overlay';
      overlay.style.cssText = [
        'position:absolute',
        'inset:0',
        'pointer-events:none',
        'z-index:5',
        'overflow:hidden'
      ].join(';');

      // 画水平参考线（每 50px 一条，每 100px 加粗）
      var slideH = 1123, slideW = 794;
      var lines = '';

      // 水平线
      for(var y=50; y<slideH; y+=50){
        var isHeavy = (y % 100 === 0);
        lines += '<div style="position:absolute;left:0;right:0;top:'+y+'px;height:1px;background:'+(isHeavy?'rgba(41,128,185,0.25)':'rgba(41,128,185,0.1)')+';"></div>';
      }
      // 垂直线
      for(var x=50; x<slideW; x+=50){
        var isHeavy2 = (x % 100 === 0);
        lines += '<div style="position:absolute;top:0;bottom:0;left:'+x+'px;width:1px;background:'+(isHeavy2?'rgba(41,128,185,0.25)':'rgba(41,128,185,0.1)')+';"></div>';
      }
      // 中心线（红色）
      lines += '<div style="position:absolute;left:0;right:0;top:'+Math.round(slideH/2)+'px;height:1px;background:rgba(192,57,43,0.35);"></div>';
      lines += '<div style="position:absolute;top:0;bottom:0;left:'+Math.round(slideW/2)+'px;width:1px;background:rgba(192,57,43,0.35);"></div>';
      // 常用位置标注（左边距 28px 右边距 28px）
      lines += '<div style="position:absolute;top:0;bottom:0;left:28px;width:1px;background:rgba(39,174,96,0.4);"></div>';
      lines += '<div style="position:absolute;top:0;bottom:0;left:'+(slideW-28)+'px;width:1px;background:rgba(39,174,96,0.4);"></div>';

      overlay.innerHTML = lines;
      slide.appendChild(overlay);
    } else {
      overlay.style.display = 'block';
    }
    if(btn){ btn.classList.add('on'); btn.title='隐藏参考线'; }
  } else {
    if(overlay) overlay.style.display = 'none';
    if(btn){ btn.classList.remove('on'); btn.title='显示参考线'; }
  }
}

// ============================================================
//  序列化单个元素
// ============================================================
function serializeOneEl(el){
  var type = el.dataset.eltype;
  var item = {
    id: el.id,
    type: type,
    x: parseInt(el.style.left)||0,
    y: parseInt(el.style.top)||0,
    w: parseInt(el.style.width)||100,
    h: parseInt(el.style.height)||20,
    z: parseInt(el.style.zIndex)||10
  };
  if(type==='text'){
    var inner = el.querySelector('.el-text');
    item.html = inner ? inner.innerHTML : '';
  } else if(type==='image'){
    var img = el.querySelector('.el-img');
    item.src = img ? img.src : '';
  } else if(type==='line'){
    var ln = el.querySelector('line');
    item.color = ln ? ln.getAttribute('stroke') : '#2c3e50';
  } else if(type==='rect'){
    var rd = el.querySelector('.el-rect');
    item.color = rd ? rd.style.borderColor || '#660974' : '#660974';
    item.borderWidth = rd ? (parseFloat(rd.style.borderWidth)||2) : 2;
  } else if(type==='star'){
    var sd = el.querySelector('.el-star');
    item.char = sd ? sd.textContent : '★';
    item.color = sd ? sd.style.color || '#660974' : '#660974';
    item.fontSize = sd ? (parseFloat(sd.style.fontSize)||16) : 16;
  }
  return item;
}

// ============================================================
//  序列化当前所有元素（保存用）
// ============================================================
function serializeElements(){
  var result = [];
  slide.querySelectorAll('.el').forEach(function(el){
    // 跳过参考线 overlay（它不是 .el）
    result.push(serializeOneEl(el));
  });
  return result;
}

// ============================================================
//  生成 resume-data.js 文件内容
// ============================================================
function buildDataFileContent(){
  var currentElements = serializeElements();
  var elementsJSON = JSON.stringify(currentElements, null, 2);
  var content = '// ============================================================\n';
  content += '//  简历数据文件 (resume-data.js)\n';
  content += '//  此文件由编辑器自动生成，请勿手动修改\n';
  content += '// ============================================================\n\n';
  content += 'var INIT_ELEMENTS = ' + elementsJSON + ';\n';
  return content;
}

// ============================================================
//  ★ 一键保存到 GitHub（修复版）
//
//  Bug 根因：原代码在 Step1 获取 SHA 后直接进行 PUT，
//  若两次保存间隔很短，第二次保存时 SHA 已过期（文件已被
//  第一次更新），GitHub 返回 409 Conflict，但原代码把
//  409 当成成功处理，导致第二次保存静默失败。
//
//  修复方案：
//  1. 每次保存都重新 fetch 最新 SHA（不缓存）
//  2. 完整的 HTTP 状态码检查
//  3. 409 冲突时自动重试一次（重新获取 SHA 再 PUT）
//  4. 保存中禁用按钮，防止重复点击
// ============================================================
var _isSaving = false;

function saveToGitHub(){
  if(_isSaving){
    showToast('⏳ 正在保存中，请稍候...', '#e67e22', 2000);
    return;
  }
  _isSaving = true;

  var toast = document.getElementById('save-toast');
  var saveBtn = document.querySelector('.tbtn.orange');
  if(saveBtn){ saveBtn.disabled = true; saveBtn.style.opacity = '0.6'; }

  showToast('⏳ 正在保存到 GitHub...', '#2980b9', 0);

  var dataContent = buildDataFileContent();
  var apiBase = 'https://api.github.com/repos/'+GH_OWNER+'/'+GH_REPO+'/contents/'+GH_DATA_PATH;
  var headers = {
    'Authorization': 'token '+GH_TOKEN,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  };

  // 内部执行函数，支持重试
  function doSave(retryCount){
    // Step 1: 每次都重新获取最新 SHA
    fetch(apiBase+'?ref='+GH_BRANCH+'&t='+Date.now(), { headers: headers })
    .then(function(r){
      if(!r.ok && r.status !== 404){
        return r.json().then(function(d){ throw new Error('获取文件失败 ('+r.status+'): '+(d.message||'')); });
      }
      return r.json();
    })
    .then(function(data){
      // data.sha 存在说明文件已存在；404 时 data 可能是错误对象
      var sha = (data && data.sha) ? data.sha : null;
      var encoded = btoa(unescape(encodeURIComponent(dataContent)));

      var body = {
        message: '简历数据更新 '+new Date().toLocaleString('zh-CN'),
        content: encoded,
        branch: GH_BRANCH
      };
      if(sha) body.sha = sha;

      // Step 2: PUT 更新文件
      return fetch(apiBase, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
      });
    })
    .then(function(r){
      // 409 Conflict：SHA 已过期，自动重试一次
      if(r.status === 409 && retryCount < 2){
        showToast('⏳ 检测到冲突，正在重试...', '#e67e22', 0);
        return new Promise(function(resolve){ setTimeout(resolve, 800); })
          .then(function(){ return doSave(retryCount+1); });
      }
      return r.json().then(function(data){ return {status: r.status, data: data}; });
    })
    .then(function(result){
      if(!result || typeof result !== 'object') return;
      // doSave 递归时返回 undefined，忽略
      if(result.status === 200 || result.status === 201){
        showToast('✅ 已保存！约 1 分钟后网址自动更新', '#27ae60', 5000);
      } else {
        var msg = (result.data && result.data.message) ? result.data.message : '未知错误';
        showToast('❌ 保存失败 ('+result.status+'): '+msg, '#c0392b', 5000);
      }
      _finishSave(saveBtn);
    })
    .catch(function(err){
      showToast('❌ 网络错误：'+err.message, '#c0392b', 5000);
      _finishSave(saveBtn);
    });
  }

  doSave(0);
}

function _finishSave(saveBtn){
  _isSaving = false;
  if(saveBtn){ saveBtn.disabled = false; saveBtn.style.opacity = ''; }
}

// ============================================================
//  Toast 提示（统一管理）
// ============================================================
var _toastTimer = null;
function showToast(msg, bg, duration){
  var toast = document.getElementById('save-toast');
  if(!toast) return;
  toast.textContent = msg;
  toast.style.background = bg || '#27ae60';
  toast.style.display = 'block';
  if(_toastTimer){ clearTimeout(_toastTimer); _toastTimer = null; }
  if(duration > 0){
    _toastTimer = setTimeout(function(){ toast.style.display='none'; }, duration);
  }
}

// ============================================================
//  下载 HTML（完整单文件版本，用于离线使用）
// ============================================================
function saveHTML(){
  var currentElements = serializeElements();
  var elementsJSON = JSON.stringify(currentElements, null, 2);

  // 内联 CSS
  var cssText = '';
  try {
    var sheets = document.styleSheets;
    for(var i=0;i<sheets.length;i++){
      if(sheets[i].href && sheets[i].href.indexOf('editor.css') !== -1){
        var rules = sheets[i].cssRules || sheets[i].rules;
        for(var j=0;j<rules.length;j++){ cssText += rules[j].cssText + '\n'; }
        break;
      }
    }
  } catch(e){ cssText = '/* 无法内联 CSS */'; }

  var out = '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n';
  out += '<meta charset="UTF-8"/>\n<meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n';
  out += '<title>卢腾 - 简历编辑器</title>\n';
  out += '<style>\n'+cssText+'\n</style>\n';
  out += '</head>\n<body>\n';
  out += document.querySelector('#toolbar').outerHTML + '\n';
  out += '<div id="multi-badge"></div>\n<div id="save-toast"></div>\n';
  out += '<input type="file" id="img-file-input" accept="image/*" style="display:none"/>\n';
  out += '<div id="canvas-wrap"><div id="slide"></div></div>\n';
  out += '<script>\nvar INIT_ELEMENTS = ' + elementsJSON + ';\n<\/script>\n';
  out += '<script src="editor.js"><\/script>\n';
  out += '</body>\n</html>';

  var blob = new Blob([out],{type:'text/html;charset=utf-8'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download='卢腾-简历.html'; a.click();
}

// ============================================================
//  工具函数
// ============================================================
function rgbToHex(rgb){
  if(!rgb) return '#111111';
  if(rgb.startsWith('#')) return rgb;
  var m=rgb.match(/\d+/g);
  if(!m||m.length<3) return '#111111';
  return '#'+m.slice(0,3).map(function(x){return('0'+parseInt(x).toString(16)).slice(-2);}).join('');
}

// ============================================================
//  启动编辑器
// ============================================================
init();
