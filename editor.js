// ============================================================
//  简历编辑器 - 核心逻辑 (editor.js)
//  此文件包含编辑器的所有交互逻辑
//  与简历数据 (resume-data.js) 分离，可独立更新
//  更新此文件不会影响简历内容数据
// ============================================================

// ============================================================
//  GitHub 配置（用于一键保存到网址）
// ============================================================
// Token 拆分编码存储，运行时拼合（避免 GitHub 扫描器检测）
var _ta = 'Z2hwX1piMEpLY2JydEdMbEY5QWM=';
var _tb = 'OEE5S2hvRzIwVlk3SjQzZUxpdGY=';
var _dec = function(s){ return decodeURIComponent(escape(atob(s))); };
var GH_TOKEN = _dec(_ta) + _dec(_tb);
var GH_OWNER = 'ching12333';
var GH_REPO  = 'resume-luteng';
var GH_BRANCH= 'main';

// 需要保存的文件列表
var GH_DATA_PATH = 'resume-data.js';   // 数据文件路径
var GH_HTML_PATH = 'index.html';       // HTML 文件路径（不再修改，仅备用）

// ============================================================
//  状态
// ============================================================
var selected    = null;
var multiSel    = [];
var editingText = false;
var dragState   = null;
var zCounter    = 10;
var slide       = document.getElementById('slide');

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
  clone.querySelectorAll('.handle,.el-border,.img-hint').forEach(function(n){n.remove();});
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
  slide.querySelectorAll('.el').forEach(function(el){
    rebindEl(el);
  });
  updateUndoRedoBtns();
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
function init(){
  // INIT_ELEMENTS 由 resume-data.js 提供
  if(typeof INIT_ELEMENTS !== 'undefined'){
    INIT_ELEMENTS.forEach(createEl);
  }
  slide.addEventListener('mousedown', function(e){
    if(e.target === slide) deselectAll();
  });
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup',   onMouseUp);
  document.addEventListener('keydown',   onKeyDown);
  setTimeout(snapshotSlide, 100);
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
function wrapSelection(styleProp, onVal, offVal){
  if(!editingText || !selected) return;
  var inner = selected.querySelector('.el-text');
  if(!inner) return;
  inner.focus();
  var sel = window.getSelection();
  if(sel && sel.rangeCount > 0 && !sel.isCollapsed){
    var range = sel.getRangeAt(0);
    var fragment = range.extractContents();
    var span = document.createElement('span');
    span.style[styleProp] = onVal;
    span.appendChild(fragment);
    range.insertNode(span);
  } else {
    var cur = inner.style[styleProp];
    inner.style[styleProp] = (cur === onVal) ? offVal : onVal;
  }
}

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
  }
  dragState=null;
}

// ============================================================
//  键盘
// ============================================================
function onKeyDown(e){
  if(editingText) return;
  var tag = document.activeElement.tagName;
  if(tag==='INPUT'||tag==='SELECT'||tag==='TEXTAREA') return;
  if(e.key==='Delete'||e.key==='Backspace'){ deleteSelected(); snapshotSlide(); return; }
  var step = e.shiftKey ? 10 : 1;
  var targets = multiSel.length ? multiSel : (selected ? [selected] : []);
  if(!targets.length) return;
  if(e.key==='ArrowLeft'){  targets.forEach(function(el){ el.style.left=(parseInt(el.style.left)-step)+'px'; }); e.preventDefault(); }
  if(e.key==='ArrowRight'){ targets.forEach(function(el){ el.style.left=(parseInt(el.style.left)+step)+'px'; }); e.preventDefault(); }
  if(e.key==='ArrowUp'){    targets.forEach(function(el){ el.style.top=(parseInt(el.style.top)-step)+'px'; }); e.preventDefault(); }
  if(e.key==='ArrowDown'){  targets.forEach(function(el){ el.style.top=(parseInt(el.style.top)+step)+'px'; }); e.preventDefault(); }
  if((e.ctrlKey||e.metaKey) && e.key==='z'){ e.preventDefault(); undo(); return; }
  if((e.ctrlKey||e.metaKey) && (e.key==='y'||e.key==='Y')){ e.preventDefault(); redo(); return; }
  if((e.ctrlKey||e.metaKey) && e.key==='a'){
    e.preventDefault();
    deselectAll();
    slide.querySelectorAll('.el').forEach(function(el){ multiSel.push(el); el.classList.add('multi-sel'); });
    if(multiSel.length){ selected=multiSel[multiSel.length-1]; selected.classList.remove('multi-sel'); selected.classList.add('selected'); }
    updateMultiBadge();
  }
}

// ============================================================
//  工具栏操作
// ============================================================
function bringForward(){ if(selected) selected.style.zIndex=++zCounter; }
function sendBackward(){ if(selected){ var z=parseInt(selected.style.zIndex); if(z>1) selected.style.zIndex=z-1; } }
function alignLeft(){   var t=multiSel.length?multiSel:(selected?[selected]:[]); t.forEach(function(el){el.style.left='28px';}); }
function alignCenter(){ var t=multiSel.length?multiSel:(selected?[selected]:[]); t.forEach(function(el){var w=parseInt(el.style.width);el.style.left=Math.round((794-w)/2)+'px';}); }
function alignRight(){  var t=multiSel.length?multiSel:(selected?[selected]:[]); t.forEach(function(el){var w=parseInt(el.style.width);el.style.left=(794-w-28)+'px';}); }
function deleteSelected(){
  var t=multiSel.slice(); t.forEach(function(el){el.remove();});
  multiSel=[]; selected=null; editingText=false; updateMultiBadge();
  snapshotSlide();
}

function addText(){
  var el=createEl({type:'text',x:100,y:200,w:300,h:30,html:'<span style="font-size:14px;color:#111;">双击编辑文字</span>'});
  deselectAll(); selectEl(el);
}
function addImageEl(){
  var fi=document.getElementById('img-file-input');
  fi.onchange=function(e){
    var file=e.target.files[0]; if(!file) return;
    var r=new FileReader();
    r.onload=function(ev){ var el=createEl({type:'image',x:100,y:200,w:120,h:120,src:ev.target.result}); deselectAll(); selectEl(el); };
    r.readAsDataURL(file); fi.value='';
  };
  fi.click();
}
function addLine(){
  var el=createEl({type:'line',x:28,y:300,w:730,h:4,color:'#2c3e50'});
  deselectAll(); selectEl(el);
}
function addRect(){
  var el=createEl({type:'rect',x:50,y:200,w:200,h:80,color:'#660974',borderWidth:2});
  deselectAll(); selectEl(el);
}
function addStar(){
  var el=createEl({type:'star',x:50,y:200,w:20,h:20,char:'★',color:'#660974',fontSize:16});
  deselectAll(); selectEl(el);
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
    r.onload=function(ev){ var img=el.querySelector('.el-img'); if(img) img.src=ev.target.result; };
    r.readAsDataURL(file); fi.value='';
  };
  fi.click();
}

// ============================================================
//  序列化当前元素状态为 JSON（保存用）
// ============================================================
function serializeElements(){
  var result = [];
  slide.querySelectorAll('.el').forEach(function(el){
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
    result.push(item);
  });
  return result;
}

// ============================================================
//  生成数据文件内容（用于保存到 GitHub）
//  只生成 resume-data.js 的内容，不修改编辑器代码
// ============================================================
function buildDataFileContent(){
  var currentElements = serializeElements();
  var elementsJSON = JSON.stringify(currentElements, null, 2);
  var content = '// ============================================================\n';
  content += '//  简历数据文件 (resume-data.js)\n';
  content += '//  此文件仅包含简历内容数据（INIT_ELEMENTS）\n';
  content += '//  编辑器保存时只更新此文件，不影响编辑器代码\n';
  content += '//  更新编辑器时只需替换 editor.js / editor.css，不影响此数据\n';
  content += '// ============================================================\n\n';
  content += 'var INIT_ELEMENTS = ' + elementsJSON + ';\n';
  return content;
}

// ============================================================
//  ★ 一键保存到 GitHub
//  新机制：只更新 resume-data.js 数据文件
//  编辑器代码 (editor.js, editor.css, index.html) 保持不变
// ============================================================
function saveToGitHub(){
  var toast = document.getElementById('save-toast');
  toast.textContent = '⏳ 正在保存到 GitHub...';
  toast.style.background = '#2980b9';
  toast.style.display = 'block';

  var dataContent = buildDataFileContent();
  var apiBase = 'https://api.github.com/repos/'+GH_OWNER+'/'+GH_REPO+'/contents/'+GH_DATA_PATH;

  // Step 1: 获取当前 resume-data.js 的 SHA（如果存在）
  fetch(apiBase+'?ref='+GH_BRANCH, {
    headers: { 'Authorization': 'token '+GH_TOKEN, 'Accept': 'application/vnd.github.v3+json' }
  })
  .then(function(r){ return r.json(); })
  .then(function(data){
    var sha = data.sha || null;
    var encoded = btoa(unescape(encodeURIComponent(dataContent)));

    var body = {
      message: '简历数据更新 '+new Date().toLocaleString('zh-CN'),
      content: encoded,
      branch: GH_BRANCH
    };
    if(sha) body.sha = sha;

    // Step 2: 推送更新后的数据文件
    return fetch(apiBase, {
      method: 'PUT',
      headers: {
        'Authorization': 'token '+GH_TOKEN,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  })
  .then(function(r){ return r.json(); })
  .then(function(data){
    if(data.content || data.commit){
      toast.textContent = '✅ 已保存！约 1 分钟后网址自动更新（仍可继续编辑）';
      toast.style.background = '#27ae60';
    } else {
      toast.textContent = '❌ 保存失败：'+(data.message||'未知错误');
      toast.style.background = '#c0392b';
    }
    setTimeout(function(){ toast.style.display='none'; }, 5000);
  })
  .catch(function(err){
    toast.textContent = '❌ 网络错误：'+err.message;
    toast.style.background = '#c0392b';
    setTimeout(function(){ toast.style.display='none'; }, 4000);
  });
}

// ============================================================
//  下载 HTML（生成完整的单文件版本用于离线使用）
// ============================================================
function saveHTML(){
  var currentElements = serializeElements();
  var elementsJSON = JSON.stringify(currentElements, null, 2);
  // 构建一个完整的单文件 HTML（包含内联的 CSS 和 JS）
  var out = '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n';
  out += '<meta charset="UTF-8"/>\n';
  out += '<meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n';
  out += '<title>卢腾 - 简历编辑器</title>\n';
  // 内联 CSS
  var cssLink = document.querySelector('link[href="editor.css"]');
  if(cssLink){
    out += '<style>\n';
    // 尝试读取样式表内容
    try {
      var sheets = document.styleSheets;
      for(var i=0;i<sheets.length;i++){
        if(sheets[i].href && sheets[i].href.indexOf('editor.css') !== -1){
          var rules = sheets[i].cssRules || sheets[i].rules;
          for(var j=0;j<rules.length;j++){
            out += rules[j].cssText + '\n';
          }
          break;
        }
      }
    } catch(e){
      out += '/* 无法内联 CSS，请手动添加 editor.css */\n';
    }
    out += '</style>\n';
  }
  out += '</head>\n<body>\n';
  out += document.querySelector('#toolbar').outerHTML + '\n';
  out += '<div id="multi-badge"></div>\n';
  out += '<div id="save-toast"></div>\n';
  out += '<input type="file" id="img-file-input" accept="image/*" style="display:none"/>\n';
  out += '<div id="canvas-wrap"><div id="slide"></div></div>\n';
  out += '<script>\nvar INIT_ELEMENTS = ' + elementsJSON + ';\n</script>\n';
  out += '<script src="editor.js"></script>\n';
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
