// ============================================================
//  简历数据文件 (resume-data.js)
//  原有第一页保留 + PPT 5页内容追加
// ============================================================

var INIT_ELEMENTS = [
  {
    "id": "e_name",
    "type": "text",
    "x": 29,
    "y": 4,
    "w": 320,
    "h": 46,
    "z": 11,
    "html": "<span style=\"font-size:34px;font-weight:900;color:#c0392b;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:2px;\">卢腾</span>"
  },
  {
    "id": "e_sub",
    "type": "text",
    "x": 133,
    "y": 14,
    "w": 330,
    "h": 36,
    "z": 12,
    "html": "<span style=\"font-size:15px;color:#555;font-style:italic;font-family:KaiTi,楷体,STKaiti,serif;\">个人构建网址，如有bug请老师谅解🥺</span>"
  },
  {
    "id": "e_line0",
    "type": "line",
    "x": 28,
    "y": 72,
    "w": 630,
    "h": 4,
    "z": 13,
    "color": "#2c3e50"
  },
  {
    "id": "e_photo",
    "type": "image",
    "x": 687,
    "y": 89,
    "w": 77,
    "h": 87,
    "z": 12,
    "src": "https://ching12333.github.io/resume-luteng/assets/img_2.png"
  },
  {
    "id": "e_qr",
    "type": "image",
    "x": 588,
    "y": 96,
    "w": 76,
    "h": 76,
    "z": 15,
    "src": "https://ching12333.github.io/resume-luteng/assets/img_0.png"
  },
  {
    "id": "e_edu_t",
    "type": "text",
    "x": 52,
    "y": 65,
    "w": 300,
    "h": 24,
    "z": 77,
    "html": "<span style=\"font-size:15px;font-weight:900;color:#2c3e50;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1px;\">个人介绍</span>"
  },
  {
    "id": "e_school",
    "type": "text",
    "x": 28,
    "y": 96,
    "w": 640,
    "h": 20,
    "z": 17,
    "html": "◇ <strong><span style=\"font-size: 16px;\"><span style=\"font-size: 16px;\">中国石油大学（华东）</span></span></strong><span style=\"font-size: 10px;\">（双一流，原 211）</span>&nbsp;&nbsp;&nbsp;&nbsp;<strong>专业：</strong>应用物理学"
  },
  {
    "id": "e_gpa",
    "type": "text",
    "x": 28,
    "y": 121,
    "w": 640,
    "h": 20,
    "z": 18,
    "html": "◇ 学习成绩：GPA：3.37/4；&nbsp;&nbsp;<strong>个人主页：</strong>&nbsp;<span style=\"color:#1a5276;text-decoration:underline;\">http://zhangyue.me/</span>"
  },
  {
    "id": "e_contact",
    "type": "text",
    "x": 28,
    "y": 145,
    "w": 640,
    "h": 20,
    "z": 19,
    "html": "◇ <strong>联系方式：</strong>17853086665&nbsp;&nbsp;&nbsp;<strong>邮箱：</strong><span style=\"color:#1a5276;text-decoration:underline;\">2309020215@s.upc.edu.cn</span>"
  },
  {
    "id": "e_sci_t",
    "type": "text",
    "x": 28,
    "y": 178,
    "w": 300,
    "h": 24,
    "z": 79,
    "html": "<span style=\"font-size:15px;font-weight:900;color:#2c3e50;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1px;\">   科研经历</span>"
  },
  {
    "id": "e_r1t",
    "type": "text",
    "x": 25,
    "y": 212,
    "w": 560,
    "h": 20,
    "z": 22,
    "html": "<strong>纳米孔隙中页岩油赋存<span style=\"color:#c0392b;\">分子动力学模拟</span>与<span style=\"color:#c0392b;\">核磁共振弛豫机制</span>研究</strong>"
  },
  {
    "id": "e_r1d",
    "type": "text",
    "x": 599,
    "y": 212,
    "w": 162,
    "h": 20,
    "z": 23,
    "html": "<span style=\"font-size:12px;color:#444;\"><span style=\"font-size: 14px;\">2024.10   2026.1</span></span>"
  },
  {
    "id": "e_r1desc",
    "type": "text",
    "x": 29,
    "y": 382,
    "w": 730,
    "h": 52,
    "z": 24,
    "html": "<span style=\"font-size:12.5px;\">&nbsp;&nbsp;&nbsp;&nbsp;针对页岩中流固相互作用导致核磁信号识别困难问题，利用分子模拟技术再现高温高压地层环境下页岩油赋存状态，并将所得模拟轨迹用于核磁共振弛豫研究，获得实际测量中难以准确测量的核磁数据。</span>"
  },
  {
    "id": "e_r1b1",
    "type": "text",
    "x": 30,
    "y": 301,
    "w": 730,
    "h": 18,
    "z": 25,
    "html": "<span style=\"font-size:12.5px;\">◇ 基于 MS，Lammps 等软件，实现页岩油赋存状态的分子动力学模拟</span>"
  },
  {
    "id": "e_r1b2",
    "type": "text",
    "x": 27,
    "y": 329,
    "w": 730,
    "h": 18,
    "z": 26,
    "html": "<span style=\"font-size:12.5px;\">◇ 利用 VMD，Python 等软件将核磁共振理论与分子模拟结果结合编写脚本，分析计算核磁共振弛豫结果</span>"
  },
  {
    "id": "e_r1b3",
    "type": "text",
    "x": 28,
    "y": 356,
    "w": 730,
    "h": 18,
    "z": 27,
    "html": "<span style=\"font-size:12.5px;\">◇ 提出并完成不同温度条件下分层弛豫行为的研究等论文核心创新点，并在刘冰教授团队指导下完成论文撰写工作</span>"
  },
  {
    "id": "e_r1paper",
    "type": "text",
    "x": 29,
    "y": 243,
    "w": 730,
    "h": 34,
    "z": 28,
    "html": "<span style=\"font-size:12.5px;\"><strong>论文成果：</strong>Zechen Yan, Yue Zhang, Lei Zhu, et al. EMD-NEMD supercritical CO₂ by pressure driving in deep shale oil nanoslits. <em>Chemical Engineering Science</em>, 2025, Under Revision（中科院二区TOP，独立一作）</span>"
  },
  {
    "id": "e_r2t",
    "type": "text",
    "x": 28,
    "y": 436,
    "w": 560,
    "h": 20,
    "z": 29,
    "html": "<strong>页岩油核磁弛豫机制<span style=\"color:#c0392b;\">模拟与实验结合</span>研究</strong>"
  },
  {
    "id": "e_r2d",
    "type": "text",
    "x": 600,
    "y": 436,
    "w": 162,
    "h": 20,
    "z": 30,
    "html": "<span style=\"font-size:12px;color:#444;\"><span style=\"font-size: 14px;\">2026.1    至今</span></span>"
  },
  {
    "id": "e_r2desc",
    "type": "text",
    "x": 31,
    "y": 465,
    "w": 730,
    "h": 40,
    "z": 31,
    "html": "<span style=\"font-size:12.5px;\">&nbsp;&nbsp;&nbsp;&nbsp;将模拟测量核磁共振弛豫数据与实际测量数据对比，深入核磁共振弛豫机制难点，改善现有核磁共振弛豫算法，从仿真与实验结合角度完善页岩油纳米孔隙的准确识别。</span>"
  },
  {
    "id": "e_r2b1",
    "type": "text",
    "x": 31,
    "y": 518,
    "w": 730,
    "h": 18,
    "z": 32,
    "html": "<span style=\"font-size:12.5px;\">◇ 从仿真角度计算纳米孔径表面弛豫率，得到核磁数据转换孔径算法的重要改进参数</span>"
  },
  {
    "id": "e_r2b2",
    "type": "text",
    "x": 31,
    "y": 545,
    "w": 730,
    "h": 18,
    "z": 33,
    "html": "<span style=\"font-size:12.5px;\">◇ 与博士师兄共同完成 SEM 扫描电镜测量，测量 6nm 孔隙核磁共振实验结果，编写核磁 Python 代码等</span>"
  },
  {
    "id": "e_proj_t",
    "type": "text",
    "x": 24,
    "y": 580,
    "w": 300,
    "h": 24,
    "z": 82,
    "html": "<span style=\"font-size:15px;font-weight:900;color:#2c3e50;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1px;\">   项目经历</span>"
  },
  {
    "id": "e_line2",
    "type": "line",
    "x": 23,
    "y": 564,
    "w": 730,
    "h": 2,
    "z": 83,
    "color": "#2c3e50"
  },
  {
    "id": "e_p1t",
    "type": "text",
    "x": 24,
    "y": 606,
    "w": 560,
    "h": 20,
    "z": 36,
    "html": "<strong>关于提高无线快充与传统发电机转换效率研究</strong>"
  },
  {
    "id": "e_p1d",
    "type": "text",
    "x": 596,
    "y": 606,
    "w": 162,
    "h": 20,
    "z": 37,
    "html": "<span style=\"font-size:12px;color:#444;\"><span style=\"font-size: 14px;\">2025.02   2025.11</span></span>"
  },
  {
    "id": "e_p1desc",
    "type": "text",
    "x": 28,
    "y": 635,
    "w": 730,
    "h": 40,
    "z": 38,
    "html": "<span style=\"font-size:12.5px;\">&nbsp;&nbsp;&nbsp;&nbsp;面向时代前沿电能转换效率难题，基于两套实验装置，分别研究机械驱动与电能调控两种电磁感应模式下的能量转换效率，探究频率、线圈位形与谐振方式等关键影响因素，并提出\"中继线圈＋多输入系统\"的创新结构</span>"
  },
  {
    "id": "e_p1b1",
    "type": "text",
    "x": 30,
    "y": 721,
    "w": 730,
    "h": 18,
    "z": 39,
    "html": "<span style=\"font-size:12.5px;\">◇ 独立查阅相关文献，设计电磁感应<strong>谐振耦合</strong>与<strong>机械驱动</strong>转换效率测量实验方案</span>"
  },
  {
    "id": "e_p1b2",
    "type": "text",
    "x": 30,
    "y": 747,
    "w": 730,
    "h": 18,
    "z": 40,
    "html": "<span style=\"font-size:12.5px;\">◇ 搭建相关实验仪器，主导完成理论模型构建，实验数据采集，观测整理电磁感应转换效率等相关影响因素</span>"
  },
  {
    "id": "e_p1b3",
    "type": "text",
    "x": 30,
    "y": 776,
    "w": 730,
    "h": 18,
    "z": 41,
    "html": "<span style=\"font-size:12.5px;\">◇ 独立利用 <b>comsol</b> 完成两套实验有限元<strong>仿真模拟</strong>，在张亚萍教授团队指导下完成约 60% 相关实验报告撰写</span>"
  },
  {
    "id": "e_p1b4",
    "type": "text",
    "x": 29,
    "y": 696,
    "w": 730,
    "h": 18,
    "z": 42,
    "html": "<span style=\"font-size:12.5px;\">◇ 以队长身份斩获山东省物理实验竞赛<strong>省一</strong>、全国大学生物理实验竞赛<strong>国二</strong>，相关论文成果在由队友撰写</span>"
  },
  {
    "id": "e_p2t",
    "type": "text",
    "x": 28,
    "y": 803,
    "w": 560,
    "h": 20,
    "z": 43,
    "html": "<strong>其余项目经历</strong>"
  },
  {
    "id": "e_p2d",
    "type": "text",
    "x": 600,
    "y": 803,
    "w": 162,
    "h": 20,
    "z": 44,
    "html": "<span style=\"font-size:12px;color:#444;\"><span style=\"font-size: 14px;\">2023.11   2025.1</span></span>"
  },
  {
    "id": "e_p2b1",
    "type": "text",
    "x": 28,
    "y": 835,
    "w": 730,
    "h": 18,
    "z": 45,
    "html": "<span style=\"font-size:12.5px;\">◇ 参加大学生数学建模美赛，数维杯等数学建模竞赛，作为队长与队员共同斩获<strong>国三</strong></span>"
  },
  {
    "id": "e_qual_t",
    "type": "text",
    "x": 28,
    "y": 868,
    "w": 300,
    "h": 24,
    "z": 85,
    "html": "<span style=\"font-size:15px;font-weight:900;color:#2c3e50;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1px;\">  个人素养</span>"
  },
  {
    "id": "e_line3",
    "type": "line",
    "x": 28,
    "y": 856,
    "w": 730,
    "h": 2,
    "z": 86,
    "color": "#2c3e50"
  },
  {
    "id": "e_q1",
    "type": "text",
    "x": 27,
    "y": 896,
    "w": 730,
    "h": 18,
    "z": 49,
    "html": "<span style=\"font-size:12.5px;\">◇ 专业能力：具备较好的科研钻研深度，较高的绘图能力，研究素养扎实</span>"
  },
  {
    "id": "e_q2",
    "type": "text",
    "x": 28,
    "y": 920,
    "w": 730,
    "h": 18,
    "z": 50,
    "html": "<span style=\"font-size:12.5px;\">◇ 科研能力：有完整独立的<strong>论文查阅、实验设计、数值模拟和实验实现</strong>经历</span>"
  },
  {
    "id": "e_q3",
    "type": "text",
    "x": 27,
    "y": 946,
    "w": 730,
    "h": 18,
    "z": 51,
    "html": "<span style=\"font-size:12.5px;\">◇ 仿真能力：熟练掌握多尺度计算工具（MS、Lammps，comsol）及多种编程语言（python，C）</span>"
  },
  {
    "id": "e_q4",
    "type": "text",
    "x": 26,
    "y": 973,
    "w": 730,
    "h": 18,
    "z": 52,
    "html": "<span style=\"font-size:12.5px;\">◇ 品质风貌：拥有极强的科研内驱力与抗压能力，擅长多种体育运动具有良好的身体素质</span>"
  },
  {
    "id": "e_work_t",
    "type": "text",
    "x": 27,
    "y": 1003,
    "w": 300,
    "h": 24,
    "z": 88,
    "html": "<span style=\"font-size:15px;font-weight:900;color:#2c3e50;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1px;\">  工作经历</span>"
  },
  {
    "id": "e_line4",
    "type": "line",
    "x": 24,
    "y": 992,
    "w": 730,
    "h": 2,
    "z": 89,
    "color": "#2c3e50"
  },
  {
    "id": "e_w1",
    "type": "text",
    "x": 26,
    "y": 1032,
    "w": 730,
    "h": 18,
    "z": 55,
    "html": "<span style=\"font-size:12.5px;\">◇ 担任应用物理专业班长、学习委员，多次荣获优秀共青团干部，优秀学生干部，优秀学生等荣誉称号</span>"
  },
  {
    "id": "e_w2",
    "type": "text",
    "x": 27,
    "y": 1056,
    "w": 730,
    "h": 18,
    "z": 56,
    "html": "<span style=\"font-size:12.5px;\">◇ 作为第一负责人，负责校级实践队活动《原典精读·实践转换》，带领团队荣获星级实践队称号</span>"
  },
  {
    "id": "el_17743296648082np1vlid419",
    "type": "text",
    "x": 654,
    "y": 219,
    "w": 300,
    "h": 30,
    "z": 59,
    "html": "<span style=\"font-size:14px;color:#111;\">~</span>"
  },
  {
    "id": "el_1774329739140wdbsuan189a",
    "type": "text",
    "x": 652,
    "y": 443,
    "w": 300,
    "h": 30,
    "z": 60,
    "html": "<span style=\"font-size:14px;color:#111;\">~</span>"
  },
  {
    "id": "el_1774329747554y6uncfr07tl",
    "type": "text",
    "x": 651,
    "y": 612,
    "w": 300,
    "h": 30,
    "z": 61,
    "html": "<span style=\"font-size:14px;color:#111;\">~</span>"
  },
  {
    "id": "el_17743297524109vseetek9kw",
    "type": "text",
    "x": 655,
    "y": 808,
    "w": 300,
    "h": 30,
    "z": 62,
    "html": "<span style=\"font-size:14px;color:#111;\">~</span>"
  },
  {
    "id": "el_1774330617405zz491dypcss",
    "type": "image",
    "x": 26,
    "y": 53,
    "w": 770,
    "h": 44,
    "z": 62,
    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB0wAAABpAgMAAADEozi+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAGYJdOvl7+vl77lYFSoAAAADdFJOUwD//jNX5rcAAAAJcEhZcwAAMsAAADLAAShkWtsAAADXSURBVHja7dGBDUBQEECxGxJDWpLkC0M87QqdAQAAAAAAAGDZH8dJxXd6UeG0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2nPe7oNGU57nAIAAADAL93Kf/1grAQrvgAAAABJRU5ErkJggg=="
  },
  {
    "id": "el_1774330720396h5suv5oh6y",
    "type": "image",
    "x": 23,
    "y": 167,
    "w": 770,
    "h": 44,
    "z": 32,
    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB0wAAABpAgMAAADEozi+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAGYJdOvl7+vl77lYFSoAAAADdFJOUwD//jNX5rcAAAAJcEhZcwAAMsAAADLAAShkWtsAAADXSURBVHja7dGBDUBQEECxGxJDWpLkC0M87QqdAQAAAAAAAGDZH8dJxXd6UeG0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2nPe7oNGU57nAIAAADAL93Kf/1grAQrvgAAAABJRU5ErkJggg=="
  },
  {
    "id": "el_1774330766203euaasl7u0q",
    "type": "image",
    "x": 24,
    "y": 567,
    "w": 770,
    "h": 44,
    "z": 80,
    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB0wAAABpAgMAAADEozi+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAGYJdOvl7+vl77lYFSoAAAADdFJOUwD//jNX5rcAAAAJcEhZcwAAMsAAADLAAShkWtsAAADXSURBVHja7dGBDUBQEECxGxJDWpLkC0M87QqdAQAAAAAAAGDZH8dJxXd6UeG0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2nPe7oNGU57nAIAAADAL93Kf/1grAQrvgAAAABJRU5ErkJggg=="
  },
  {
    "id": "el_1774330830653bekx31z58xu",
    "type": "image",
    "x": 25,
    "y": 859,
    "w": 770,
    "h": 44,
    "z": 84,
    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB0wAAABpAgMAAADEozi+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAGYJdOvl7+vl77lYFSoAAAADdFJOUwD//jNX5rcAAAAJcEhZcwAAMsAAADLAAShkWtsAAADXSURBVHja7dGBDUBQEECxGxJDWpLkC0M87QqdAQAAAAAAAGDZH8dJxXd6UeG0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2nPe7oNGU57nAIAAADAL93Kf/1grAQrvgAAAABJRU5ErkJggg=="
  },
  {
    "id": "el_17743308595605ppr915a9e",
    "type": "image",
    "x": 25,
    "y": 994,
    "w": 770,
    "h": 44,
    "z": 87,
    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB0wAAABpAgMAAADEozi+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAGYJdOvl7+vl77lYFSoAAAADdFJOUwD//jNX5rcAAAAJcEhZcwAAMsAAADLAAShkWtsAAADXSURBVHja7dGBDUBQEECxGxJDWpLkC0M87QqdAQAAAAAAAGDZH8dJxXd6UeG0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2mP0x6nPU57nPY47XHa47THaY/THqc9Tnuc9jjtcdrjtMdpj9Mepz1Oe5z2OO1x2uO0x2nPe7oNGU57nAIAAADAL93Kf/1grAQrvgAAAABJRU5ErkJggg=="
  },
  {
    "id": "ppt_l_1774967420832_3763",
    "type": "line",
    "x": 28,
    "y": 1114,
    "w": 770,
    "h": 3,
    "z": 201,
    "color": "#c0392b"
  },
  {
    "id": "ppt_t_1774967420832_9387",
    "type": "text",
    "x": 28,
    "y": 1116,
    "w": 400,
    "h": 20,
    "z": 202,
    "html": "<span style=\"font-size:11px;color:#aaa;letter-spacing:1.5px;\">— — — 详细展示页 — — —</span>"
  },
  {
    "id": "ppt_t_1774967420832_8220",
    "type": "text",
    "x": 28,
    "y": 1144,
    "w": 500,
    "h": 28,
    "z": 203,
    "html": "<span style=\"display:inline-block;width:10px;height:20px;background:#1a5276;vertical-align:middle;margin-right:8px;\"></span><span style=\"font-size:17px;font-weight:900;color:#1a5276;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;vertical-align:middle;\">个人介绍</span>"
  },
  {
    "id": "ppt_l_1774967420832_6741",
    "type": "line",
    "x": 28,
    "y": 1172,
    "w": 770,
    "h": 2,
    "z": 204,
    "color": "#1a5276"
  },
  {
    "id": "ppt_t_1774967420832_4110",
    "type": "text",
    "x": 28,
    "y": 1190,
    "w": 200,
    "h": 20,
    "z": 205,
    "html": "<strong><span style=\"font-size:14px;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;\">基本信息：</span></strong>"
  },
  {
    "id": "ppt_t_1774967420832_8067",
    "type": "text",
    "x": 28,
    "y": 1216,
    "w": 350,
    "h": 22,
    "z": 206,
    "html": "<span style=\"font-size:14px;letter-spacing:1.5px;\"><span style=\"color:#8e44ad;font-weight:700;\">性别：</span>男&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:#8e44ad;font-weight:700;\">姓&nbsp;&nbsp;名：</span>卢腾</span>"
  },
  {
    "id": "ppt_t_1774967420832_7901",
    "type": "text",
    "x": 28,
    "y": 1244,
    "w": 500,
    "h": 22,
    "z": 207,
    "html": "<span style=\"font-size:14px;letter-spacing:1.5px;\"><span style=\"color:#8e44ad;font-weight:700;\">籍贯：</span>山东菏泽&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:#8e44ad;font-weight:700;\">政治面貌：</span>共青团员</span>"
  },
  {
    "id": "ppt_t_1774967420832_6805",
    "type": "text",
    "x": 28,
    "y": 1272,
    "w": 700,
    "h": 22,
    "z": 208,
    "html": "<span style=\"font-size:14px;letter-spacing:1.5px;\"><span style=\"color:#8e44ad;font-weight:700;\">电话：</span>17853086665&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:#8e44ad;font-weight:700;\">邮&nbsp;&nbsp;&nbsp;箱：</span>2309020215@s.upc.edu.cn</span>"
  },
  {
    "id": "ppt_i_1774967420832_9161",
    "type": "image",
    "x": 680,
    "y": 1184,
    "w": 90,
    "h": 110,
    "z": 209,
    "src": "https://ching12333.github.io/resume-luteng/assets/photo.png"
  },
  {
    "id": "ppt_l_1774967420832_1511",
    "type": "line",
    "x": 28,
    "y": 1300,
    "w": 770,
    "h": 1,
    "z": 210,
    "color": "#cccccc"
  },
  {
    "id": "ppt_t_1774967420832_9263",
    "type": "text",
    "x": 28,
    "y": 1310,
    "w": 200,
    "h": 20,
    "z": 211,
    "html": "<strong><span style=\"font-size:14px;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;\">教育背景：</span></strong>"
  },
  {
    "id": "ppt_t_1774967420832_1139",
    "type": "text",
    "x": 28,
    "y": 1336,
    "w": 300,
    "h": 22,
    "z": 212,
    "html": "<span style=\"font-size:14px;letter-spacing:1.5px;\"><strong>高中：</strong>菏泽一中</span>"
  },
  {
    "id": "ppt_t_1774967420832_1910",
    "type": "text",
    "x": 340,
    "y": 1336,
    "w": 200,
    "h": 22,
    "z": 213,
    "html": "<span style=\"font-size:13px;color:#666;letter-spacing:1.5px;\">2020.9 ~ 2023.7</span>"
  },
  {
    "id": "ppt_t_1774967420832_6181",
    "type": "text",
    "x": 28,
    "y": 1364,
    "w": 350,
    "h": 22,
    "z": 214,
    "html": "<span style=\"font-size:14px;letter-spacing:1.5px;\"><strong>大学：</strong>中国石油大学（华东）</span>"
  },
  {
    "id": "ppt_t_1774967420832_2360",
    "type": "text",
    "x": 390,
    "y": 1364,
    "w": 200,
    "h": 22,
    "z": 215,
    "html": "<span style=\"font-size:13px;color:#666;letter-spacing:1.5px;\">2023.9 ~ 至今</span>"
  },
  {
    "id": "ppt_i_1774967420832_7863",
    "type": "image",
    "x": 560,
    "y": 1308,
    "w": 80,
    "h": 80,
    "z": 216,
    "src": "https://ching12333.github.io/resume-luteng/assets/heze_logo.png"
  },
  {
    "id": "ppt_i_1774967420832_3033",
    "type": "image",
    "x": 660,
    "y": 1308,
    "w": 80,
    "h": 80,
    "z": 217,
    "src": "https://ching12333.github.io/resume-luteng/assets/school_logo.jpg"
  },
  {
    "id": "ppt_t_1774967420832_2509",
    "type": "text",
    "x": 28,
    "y": 1392,
    "w": 700,
    "h": 22,
    "z": 218,
    "html": "<span style=\"font-size:13px;color:#444;letter-spacing:1.5px;\">中国石油大学（华东）：原国家\"<strong>211工程</strong>\"和\"<strong>985优势学科</strong>创新平台项目\"重点建设院校</span>"
  },
  {
    "id": "ppt_l_1774967420832_3211",
    "type": "line",
    "x": 28,
    "y": 1424,
    "w": 770,
    "h": 1,
    "z": 219,
    "color": "#cccccc"
  },
  {
    "id": "ppt_t_1774967420832_5814",
    "type": "text",
    "x": 28,
    "y": 1434,
    "w": 200,
    "h": 20,
    "z": 220,
    "html": "<strong><span style=\"font-size:14px;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;\">成绩简介：</span></strong>"
  },
  {
    "id": "ppt_t_1774967420832_3777",
    "type": "text",
    "x": 28,
    "y": 1460,
    "w": 730,
    "h": 22,
    "z": 221,
    "html": "<span style=\"font-size:14px;letter-spacing:1.5px;\"><strong>专业：</strong>应用物理学&nbsp;&nbsp;&nbsp;&nbsp;<strong>学习绩点：</strong>84.3/100&nbsp;&nbsp;&nbsp;&nbsp;<strong>专业排名：</strong>15/54&nbsp;&nbsp;&nbsp;&nbsp;<strong>英语四级：</strong>492</span>"
  },
  {
    "id": "ppt_i_1774967420832_4044",
    "type": "image",
    "x": 28,
    "y": 1490,
    "w": 355,
    "h": 46,
    "z": 222,
    "src": "https://ching12333.github.io/resume-luteng/assets/score_1.png"
  },
  {
    "id": "ppt_i_1774967420832_2636",
    "type": "image",
    "x": 395,
    "y": 1490,
    "w": 355,
    "h": 46,
    "z": 223,
    "src": "https://ching12333.github.io/resume-luteng/assets/score_2.png"
  },
  {
    "id": "ppt_i_1774967420832_6558",
    "type": "image",
    "x": 28,
    "y": 1540,
    "w": 355,
    "h": 46,
    "z": 224,
    "src": "https://ching12333.github.io/resume-luteng/assets/score_3.png"
  },
  {
    "id": "ppt_i_1774967420832_3348",
    "type": "image",
    "x": 395,
    "y": 1540,
    "w": 355,
    "h": 46,
    "z": 225,
    "src": "https://ching12333.github.io/resume-luteng/assets/score_4.png"
  },
  {
    "id": "ppt_i_1774967420832_3821",
    "type": "image",
    "x": 28,
    "y": 1590,
    "w": 355,
    "h": 46,
    "z": 226,
    "src": "https://ching12333.github.io/resume-luteng/assets/score_5.png"
  },
  {
    "id": "ppt_i_1774967420832_9981",
    "type": "image",
    "x": 395,
    "y": 1590,
    "w": 355,
    "h": 46,
    "z": 227,
    "src": "https://ching12333.github.io/resume-luteng/assets/score_6.png"
  },
  {
    "id": "ppt_i_1774967420832_7337",
    "type": "image",
    "x": 28,
    "y": 1640,
    "w": 355,
    "h": 46,
    "z": 228,
    "src": "https://ching12333.github.io/resume-luteng/assets/score_7.png"
  },
  {
    "id": "ppt_i_1774967420832_8154",
    "type": "image",
    "x": 395,
    "y": 1640,
    "w": 355,
    "h": 46,
    "z": 229,
    "src": "https://ching12333.github.io/resume-luteng/assets/score_8.png"
  },
  {
    "id": "ppt_l_1774967420832_6343",
    "type": "line",
    "x": 28,
    "y": 1700,
    "w": 770,
    "h": 1,
    "z": 230,
    "color": "#cccccc"
  },
  {
    "id": "ppt_t_1774967420832_3336",
    "type": "text",
    "x": 28,
    "y": 1710,
    "w": 500,
    "h": 28,
    "z": 231,
    "html": "<span style=\"display:inline-block;width:10px;height:20px;background:#1a5276;vertical-align:middle;margin-right:8px;\"></span><span style=\"font-size:17px;font-weight:900;color:#1a5276;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;vertical-align:middle;\">科研经历</span>"
  },
  {
    "id": "ppt_l_1774967420832_7829",
    "type": "line",
    "x": 28,
    "y": 1738,
    "w": 770,
    "h": 2,
    "z": 232,
    "color": "#1a5276"
  },
  {
    "id": "ppt_t_1774967420832_6146",
    "type": "text",
    "x": 28,
    "y": 1756,
    "w": 560,
    "h": 24,
    "z": 233,
    "html": "<strong><span style=\"font-size:15px;letter-spacing:1.5px;\">纳米孔隙中页岩油赋存<span style=\"color:#c0392b;\">分子动力学模拟</span>与<span style=\"color:#c0392b;\">核磁共振弛豫机制</span>研究</span></strong>"
  },
  {
    "id": "ppt_t_1774967420832_9228",
    "type": "text",
    "x": 600,
    "y": 1756,
    "w": 170,
    "h": 24,
    "z": 234,
    "html": "<span style=\"font-size:13px;color:#666;letter-spacing:1.5px;\">2024.10 ~ 2026.1</span>"
  },
  {
    "id": "ppt_t_1774967420832_2528",
    "type": "text",
    "x": 28,
    "y": 1786,
    "w": 770,
    "h": 50,
    "z": 235,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\">&nbsp;&nbsp;&nbsp;&nbsp;针对页岩中流固相互作用导致核磁信号识别困难问题，利用分子模拟技术再现高温高压地层环境下页岩油赋存状态，并将所得模拟轨迹用于核磁共振弛豫研究，获得实际测量中难以准确测量的核磁数据。</span>"
  },
  {
    "id": "ppt_t_1774967420832_3229",
    "type": "text",
    "x": 28,
    "y": 1842,
    "w": 400,
    "h": 36,
    "z": 236,
    "html": "<span style=\"font-size:26px;font-family:Georgia,serif;letter-spacing:1.5px;\"><strong>Graphics Abstract：</strong></span>"
  },
  {
    "id": "ppt_i_1774967420832_7148",
    "type": "image",
    "x": 28,
    "y": 1884,
    "w": 770,
    "h": 202,
    "z": 237,
    "src": "https://ching12333.github.io/resume-luteng/assets/graphics_abstract.jpg"
  },
  {
    "id": "ppt_t_1774967420832_1593",
    "type": "text",
    "x": 28,
    "y": 2094,
    "w": 770,
    "h": 90,
    "z": 238,
    "html": "<span style=\"font-size:12.5px;line-height:1.7;letter-spacing:1.5px;\"><strong>Abstract：</strong> Nuclear magnetic resonance (NMR) has been used to characterized fluid behavior in shale oil reservoirs; however, the abundance of nanoscale pores and the complexity of fluid occurrence states in shale lead to low signal to noise ratios in experimental measurements, and the lack of reliable NMR data for nanopores hinders the accurate evaluation of shale oil properties. In this study, molecular dynamics simulations were integrated with NMR relaxation theory to reproduce the occurrence state of n-octane within quartz nanopores under reservoir conditions. A layer-resolved relaxation approach was employed to reveal that the ratio of longitudinal to transverse relaxation times (T₁/T₂) demonstrating that T₁/T₂ possesses characteristic values specific to different occurrence states, and the underlying relaxation mechanisms were systematically analyzed.</span>"
  },
  {
    "id": "ppt_t_1774967420832_4459",
    "type": "text",
    "x": 28,
    "y": 2190,
    "w": 600,
    "h": 38,
    "z": 239,
    "html": "<span style=\"font-size:26px;font-family:Georgia,serif;letter-spacing:1.5px;\"><strong>Representative Results：</strong></span>"
  },
  {
    "id": "ppt_i_1774967420832_8350",
    "type": "image",
    "x": 28,
    "y": 2234,
    "w": 340,
    "h": 320,
    "z": 240,
    "src": "https://ching12333.github.io/resume-luteng/assets/fig1_left_full.jpg"
  },
  {
    "id": "ppt_i_1774967420832_6496",
    "type": "image",
    "x": 380,
    "y": 2234,
    "w": 400,
    "h": 320,
    "z": 241,
    "src": "https://ching12333.github.io/resume-luteng/assets/fig2_results.png"
  },
  {
    "id": "ppt_t_1774967420832_2491",
    "type": "text",
    "x": 28,
    "y": 2560,
    "w": 340,
    "h": 36,
    "z": 242,
    "html": "<span style=\"font-size:11px;color:#555;letter-spacing:1.5px;\"><strong>Figure 1.</strong> Initial configuration of n-octane confined between two rigid quartz surfaces under shale reservoir conditions.</span>"
  },
  {
    "id": "ppt_t_1774967420832_7003",
    "type": "text",
    "x": 380,
    "y": 2560,
    "w": 400,
    "h": 36,
    "z": 243,
    "html": "<span style=\"font-size:11px;color:#555;letter-spacing:1.5px;\"><strong>Figure 2.</strong> (a) Orientational distribution in X-Z plane (b) Two-dimensional mass density distribution (c)(d) one-dimensional mass density distribution.</span>"
  },
  {
    "id": "ppt_t_1774967420832_7591",
    "type": "text",
    "x": 28,
    "y": 2602,
    "w": 770,
    "h": 22,
    "z": 244,
    "html": "<span style=\"font-size:13px;color:#555;letter-spacing:1.5px;\">篇幅问题仅展示部分建模过程与实验结果，导师若愿对学生指导可联系<span style=\"color:#1a5276;text-decoration:underline;\">邮件</span>，学生万表感激</span>"
  },
  {
    "id": "ppt_t_1774967420832_8424",
    "type": "text",
    "x": 28,
    "y": 2632,
    "w": 770,
    "h": 40,
    "z": 245,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\"><span style=\"color:#c0392b;font-weight:700;\">◇ 论文成果：</span>Zechen Yan, <strong>Yue Zhang</strong>, Lei Zhu, et al. EMD-NEMD supercritical CO₂ by pressure driving in deep shale oil nanoslits. <em>Chemical Engineering Science</em>, 2025, <strong>Under Revision</strong>（中科院二区TOP，独立一作）</span>"
  },
  {
    "id": "ppt_t_1774967420832_1524",
    "type": "text",
    "x": 28,
    "y": 2678,
    "w": 200,
    "h": 22,
    "z": 246,
    "html": "<strong><span style=\"font-size:14px;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;\">论文工作简介：</span></strong>"
  },
  {
    "id": "ppt_t_1774967420832_9635",
    "type": "text",
    "x": 28,
    "y": 2706,
    "w": 770,
    "h": 22,
    "z": 247,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\">◇ 利用 MS 软件构建纳米页岩油孔隙，并通过 Lammps 软件模拟计算页岩油赋存状态的分子动力学</span>"
  },
  {
    "id": "ppt_t_1774967420832_6480",
    "type": "text",
    "x": 28,
    "y": 2732,
    "w": 770,
    "h": 22,
    "z": 248,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\">◇ 利用 VMD，Python 等软件将核磁共振理论与分子模拟结果结合编写脚本，分析计算核磁共振弛豫结果</span>"
  },
  {
    "id": "ppt_t_1774967420832_7170",
    "type": "text",
    "x": 28,
    "y": 2758,
    "w": 770,
    "h": 22,
    "z": 249,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\">◇ 提出并完成不同温度条件下分层弛豫行为的研究等论文核心创新点，并在刘冰教授团队指导下完成论文撰写工作</span>"
  },
  {
    "id": "ppt_t_1774967420832_9659",
    "type": "text",
    "x": 28,
    "y": 2794,
    "w": 600,
    "h": 50,
    "z": 250,
    "html": "<span style=\"font-size:32px;font-weight:900;color:#1a5276;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;\">论文相关难题：</span>"
  },
  {
    "id": "ppt_t_1774967420832_1283",
    "type": "text",
    "x": 28,
    "y": 2850,
    "w": 770,
    "h": 26,
    "z": 251,
    "html": "<strong><span style=\"font-size:16px;letter-spacing:1.5px;\">1. 课题项目新，攻克难度大：</span></strong>"
  },
  {
    "id": "ppt_t_1774967420832_5220",
    "type": "text",
    "x": 28,
    "y": 2880,
    "w": 770,
    "h": 60,
    "z": 252,
    "html": "<span style=\"font-size:13px;line-height:1.7;letter-spacing:1.5px;\">&nbsp;&nbsp;&nbsp;&nbsp;课题方向新颖，整体研究基础薄弱。在核心代码构建之前，课题组仅有一篇相关论文可供参考，且师兄所搭建的模型尚不完善，仍存在较大问题，研究起步阶段面临较高的不确定性与技术难度。</span>"
  },
  {
    "id": "ppt_t_1774967420832_9781",
    "type": "text",
    "x": 28,
    "y": 2946,
    "w": 770,
    "h": 36,
    "z": 253,
    "html": "<span style=\"font-size:11px;color:#666;letter-spacing:1.5px;\">(1)Gu, Y.; Ge, X.; Xiao, P.; Bi, X.; Ma, L.; Yan, D.; Wang, Y.; Zhang, Z.; Fang, W.; Han, Y. NMR Longitudinal Relaxation Time for Characterizing Oil Occurrence in Shale Organic Nanopores. <em>Colloids and Surfaces A</em> 2025, 708, 136048.</span>"
  },
  {
    "id": "ppt_i_1774967420832_9418",
    "type": "image",
    "x": 28,
    "y": 2988,
    "w": 360,
    "h": 200,
    "z": 254,
    "src": "https://ching12333.github.io/resume-luteng/assets/paper_excerpt.jpg"
  },
  {
    "id": "ppt_i_1774967420832_3349",
    "type": "image",
    "x": 400,
    "y": 2988,
    "w": 370,
    "h": 200,
    "z": 255,
    "src": "https://ching12333.github.io/resume-luteng/assets/chat2_img.jpg"
  },
  {
    "id": "ppt_t_1774967420832_7773",
    "type": "text",
    "x": 28,
    "y": 3194,
    "w": 770,
    "h": 22,
    "z": 256,
    "html": "<span style=\"font-size:12px;color:#666;letter-spacing:1.5px;\">ps：本人对顾师兄十分软佩，顾师兄还是非常非常厉害的，博士四年从零到有构建起完整的核磁代码，是课题组绝对主力</span>"
  },
  {
    "id": "ppt_t_1774967420832_6610",
    "type": "text",
    "x": 28,
    "y": 3224,
    "w": 770,
    "h": 26,
    "z": 257,
    "html": "<strong><span style=\"font-size:16px;letter-spacing:1.5px;\">2. 主动应对资源局限，强化自主研究能力</span></strong>"
  },
  {
    "id": "ppt_t_1774967420832_8180",
    "type": "text",
    "x": 28,
    "y": 3254,
    "w": 770,
    "h": 60,
    "z": 258,
    "html": "<span style=\"font-size:13px;line-height:1.7;letter-spacing:1.5px;\">&nbsp;&nbsp;&nbsp;&nbsp;所在课题组资及硬件资源有限，本人作为编外人员，暂未分配工位，在研究过程中难以随时获得导师或学长的直接指导。面对新设课题，导师事务繁忙、指导时间有限，本人更多依靠<strong>自主</strong>学习与独立探索推进研究，在克服困难的过程中持续提升解决问题的能力。</span>"
  },
  {
    "id": "ppt_i_1774967420832_9762",
    "type": "image",
    "x": 28,
    "y": 3320,
    "w": 340,
    "h": 260,
    "z": 259,
    "src": "https://ching12333.github.io/resume-luteng/assets/chat_img2.jpg"
  },
  {
    "id": "ppt_t_1774967420832_7261",
    "type": "text",
    "x": 380,
    "y": 3320,
    "w": 390,
    "h": 60,
    "z": 260,
    "html": "<span style=\"font-size:13px;line-height:1.7;letter-spacing:1.5px;\">&nbsp;&nbsp;&nbsp;&nbsp;具备较强的<strong>抗压</strong>能力，能够在高难度课题中保持稳定的推进节奏。面对现有代码无法满足研究需求的情形，曾投入数月时间独立完成程序重跑，历经多次反复调试与迭代，在这一过程中持续锤炼心理韧性与攻坚能力。</span>"
  },
  {
    "id": "ppt_i_1774967420832_2278",
    "type": "image",
    "x": 380,
    "y": 3386,
    "w": 390,
    "h": 188,
    "z": 261,
    "src": "https://ching12333.github.io/resume-luteng/assets/folder2_img.png"
  },
  {
    "id": "ppt_t_1774967420832_2332",
    "type": "text",
    "x": 28,
    "y": 3588,
    "w": 340,
    "h": 20,
    "z": 262,
    "html": "<span style=\"font-size:12px;color:#555;letter-spacing:1.5px;\">Fig 3. 组内主要负责与我对接师兄对我的评价</span>"
  },
  {
    "id": "ppt_t_1774967420832_6983",
    "type": "text",
    "x": 380,
    "y": 3588,
    "w": 390,
    "h": 20,
    "z": 263,
    "html": "<span style=\"font-size:12px;color:#555;letter-spacing:1.5px;\">Fig 4. 多次数据整理结果（3月-12月）</span>"
  },
  {
    "id": "ppt_t_1774967420832_4528",
    "type": "text",
    "x": 28,
    "y": 3618,
    "w": 600,
    "h": 50,
    "z": 264,
    "html": "<span style=\"font-size:32px;font-weight:900;color:#1a5276;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;\">个人成长：</span>"
  },
  {
    "id": "ppt_t_1774967420832_3826",
    "type": "text",
    "x": 28,
    "y": 3674,
    "w": 770,
    "h": 22,
    "z": 265,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\">◇ 学习了解了 MS，Lammps 等分子动力学模拟软件，完成从建模到计算的基础训练</span>"
  },
  {
    "id": "ppt_t_1774967420832_5624",
    "type": "text",
    "x": 28,
    "y": 3700,
    "w": 770,
    "h": 22,
    "z": 266,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\">◇ 基于 VMD 与 Python 开展数据后处理与脚本开发，实现核磁共振理论与分子模拟结果的耦合分析，具备独立处理与解析模拟数据的能力</span>"
  },
  {
    "id": "ppt_t_1774967420832_5828",
    "type": "text",
    "x": 28,
    "y": 3726,
    "w": 770,
    "h": 22,
    "z": 267,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\">◇ 通过科研训练提升了问题驱动的学习能力与抗压能力，形成严谨踏实、持续探索的科研素养</span>"
  },
  {
    "id": "ppt_l_1774967420832_6912",
    "type": "line",
    "x": 28,
    "y": 3762,
    "w": 770,
    "h": 1,
    "z": 268,
    "color": "#cccccc"
  },
  {
    "id": "ppt_t_1774967420832_6153",
    "type": "text",
    "x": 28,
    "y": 3772,
    "w": 500,
    "h": 28,
    "z": 269,
    "html": "<span style=\"display:inline-block;width:10px;height:20px;background:#1a5276;vertical-align:middle;margin-right:8px;\"></span><span style=\"font-size:17px;font-weight:900;color:#1a5276;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;vertical-align:middle;\">项目经历</span>"
  },
  {
    "id": "ppt_l_1774967420832_9159",
    "type": "line",
    "x": 28,
    "y": 3800,
    "w": 770,
    "h": 2,
    "z": 270,
    "color": "#1a5276"
  },
  {
    "id": "ppt_t_1774967420832_3693",
    "type": "text",
    "x": 28,
    "y": 3818,
    "w": 560,
    "h": 24,
    "z": 271,
    "html": "<strong><span style=\"font-size:15px;letter-spacing:1.5px;\">关于提高无线快充与传统发电机转换效率研究</span></strong>"
  },
  {
    "id": "ppt_t_1774967420832_9468",
    "type": "text",
    "x": 600,
    "y": 3818,
    "w": 170,
    "h": 24,
    "z": 272,
    "html": "<span style=\"font-size:13px;color:#666;letter-spacing:1.5px;\">2025.02 ~ 2025.11</span>"
  },
  {
    "id": "ppt_t_1774967420832_1321",
    "type": "text",
    "x": 28,
    "y": 3848,
    "w": 770,
    "h": 50,
    "z": 273,
    "html": "<span style=\"font-size:13px;line-height:1.7;letter-spacing:1.5px;\">&nbsp;&nbsp;&nbsp;&nbsp;面向时代前沿电能转换效率难题，基于两套实验装置，分别研究机械驱动与电能调控两种电磁感应模式下的能量转换效率，探究频率、线圈位形与谐振方式等关键影响因素，并提出\"中继线圈＋多输入系统\"的创新结构</span>"
  },
  {
    "id": "ppt_t_1774967420832_4036",
    "type": "text",
    "x": 28,
    "y": 3904,
    "w": 300,
    "h": 22,
    "z": 274,
    "html": "<strong><span style=\"font-size:14px;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;\">课题研究技术路线图：</span></strong>"
  },
  {
    "id": "ppt_i_1774967420832_9055",
    "type": "image",
    "x": 28,
    "y": 3932,
    "w": 770,
    "h": 340,
    "z": 275,
    "src": "https://ching12333.github.io/resume-luteng/assets/roadmap2.png"
  },
  {
    "id": "ppt_t_1774967420832_3732",
    "type": "text",
    "x": 28,
    "y": 4280,
    "w": 600,
    "h": 38,
    "z": 276,
    "html": "<span style=\"font-size:26px;font-family:Georgia,serif;letter-spacing:1.5px;\"><strong>Representative Results：</strong></span>"
  },
  {
    "id": "ppt_i_1774967420832_8602",
    "type": "image",
    "x": 28,
    "y": 4324,
    "w": 370,
    "h": 280,
    "z": 277,
    "src": "https://ching12333.github.io/resume-luteng/assets/fig5_eff.png"
  },
  {
    "id": "ppt_i_1774967420832_1390",
    "type": "image",
    "x": 408,
    "y": 4324,
    "w": 380,
    "h": 280,
    "z": 278,
    "src": "https://ching12333.github.io/resume-luteng/assets/fig6_freq.png"
  },
  {
    "id": "ppt_t_1774967420832_8723",
    "type": "text",
    "x": 28,
    "y": 4610,
    "w": 370,
    "h": 22,
    "z": 279,
    "html": "<span style=\"font-size:11px;color:#555;letter-spacing:1.5px;\">Fig 5. 转换效率随轴向偏移距离和激励频率改变立体分布规律</span>"
  },
  {
    "id": "ppt_t_1774967420832_1403",
    "type": "text",
    "x": 408,
    "y": 4610,
    "w": 380,
    "h": 22,
    "z": 280,
    "html": "<span style=\"font-size:11px;color:#555;letter-spacing:1.5px;\">Fig 6. 不同谐振频率与电容参数转换效率图</span>"
  },
  {
    "id": "ppt_t_1774967420832_7482",
    "type": "text",
    "x": 28,
    "y": 4638,
    "w": 770,
    "h": 24,
    "z": 281,
    "html": "<span style=\"font-size:14px;letter-spacing:1.5px;\"><span style=\"color:#c0392b;font-weight:700;\">◇ 项目成果：</span>山东省物理实验竞赛<strong>省一</strong>，大学生物理实验竞赛<strong>国二</strong>，相关论文成果队友整理中</span>"
  },
  {
    "id": "ppt_t_1774967420832_1267",
    "type": "text",
    "x": 28,
    "y": 4668,
    "w": 200,
    "h": 22,
    "z": 282,
    "html": "<strong><span style=\"font-size:14px;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;\">项目工作：</span></strong>"
  },
  {
    "id": "ppt_t_1774967420832_8972",
    "type": "text",
    "x": 28,
    "y": 4696,
    "w": 770,
    "h": 22,
    "z": 283,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\">◇ 独立查阅相关文献，设计电磁感应<strong>谐振耦合</strong>与<strong>机械驱动</strong>转换效率测量实验方案</span>"
  },
  {
    "id": "ppt_t_1774967420832_3435",
    "type": "text",
    "x": 28,
    "y": 4722,
    "w": 770,
    "h": 22,
    "z": 284,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\">◇ 搭建相关实验仪器，主导完成理论模型构建，实验数据采集，观测整理电磁感应转换效率等相关影响因素</span>"
  },
  {
    "id": "ppt_t_1774967420832_9289",
    "type": "text",
    "x": 28,
    "y": 4748,
    "w": 770,
    "h": 22,
    "z": 285,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\">◇ 独立利用 <strong>comsol</strong> 完成两套实验有限元<strong>仿真模拟</strong>，在张亚萍教授团队指导下完成约 60% 相关实验报告撰写</span>"
  },
  {
    "id": "ppt_i_1774967420832_8091",
    "type": "image",
    "x": 28,
    "y": 4784,
    "w": 240,
    "h": 200,
    "z": 286,
    "src": "https://ching12333.github.io/resume-luteng/assets/gif1_mech.gif"
  },
  {
    "id": "ppt_i_1774967420832_3272",
    "type": "image",
    "x": 278,
    "y": 4784,
    "w": 240,
    "h": 200,
    "z": 287,
    "src": "https://ching12333.github.io/resume-luteng/assets/gif2_elec.gif"
  },
  {
    "id": "ppt_i_1774967420832_9721",
    "type": "image",
    "x": 528,
    "y": 4784,
    "w": 240,
    "h": 200,
    "z": 288,
    "src": "https://ching12333.github.io/resume-luteng/assets/fig9_award.jpg"
  },
  {
    "id": "ppt_t_1774967420832_4647",
    "type": "text",
    "x": 28,
    "y": 4990,
    "w": 240,
    "h": 20,
    "z": 289,
    "html": "<span style=\"font-size:11px;color:#555;letter-spacing:1.5px;\">Fig 7. 机械能驱动磁场运动 comsol 模拟</span>"
  },
  {
    "id": "ppt_t_1774967420832_5311",
    "type": "text",
    "x": 278,
    "y": 4990,
    "w": 240,
    "h": 20,
    "z": 290,
    "html": "<span style=\"font-size:11px;color:#555;letter-spacing:1.5px;\">Fig 8. 电能调控磁场强度 comsol 模拟</span>"
  },
  {
    "id": "ppt_t_1774967420832_3502",
    "type": "text",
    "x": 528,
    "y": 4990,
    "w": 240,
    "h": 20,
    "z": 291,
    "html": "<span style=\"font-size:11px;color:#555;letter-spacing:1.5px;\">Fig 9. 竞赛获奖情况</span>"
  },
  {
    "id": "ppt_l_1774967420832_1501",
    "type": "line",
    "x": 28,
    "y": 5018,
    "w": 770,
    "h": 1,
    "z": 292,
    "color": "#cccccc"
  },
  {
    "id": "ppt_t_1774967420832_8023",
    "type": "text",
    "x": 28,
    "y": 5028,
    "w": 560,
    "h": 24,
    "z": 293,
    "html": "<strong><span style=\"font-size:15px;letter-spacing:1.5px;\">其余项目经历</span></strong>"
  },
  {
    "id": "ppt_t_1774967420832_5289",
    "type": "text",
    "x": 600,
    "y": 5028,
    "w": 170,
    "h": 24,
    "z": 294,
    "html": "<span style=\"font-size:13px;color:#666;letter-spacing:1.5px;\">2023.11 ~ 2025.1</span>"
  },
  {
    "id": "ppt_t_1774967420832_2055",
    "type": "text",
    "x": 28,
    "y": 5058,
    "w": 770,
    "h": 22,
    "z": 295,
    "html": "<span style=\"font-size:13px;letter-spacing:1.5px;\">◇ 大学生数学建模美赛，数维杯等数学建模竞赛等竞赛介绍</span>"
  },
  {
    "id": "ppt_i_1774967420832_7441",
    "type": "image",
    "x": 28,
    "y": 5086,
    "w": 360,
    "h": 280,
    "z": 296,
    "src": "https://ching12333.github.io/resume-luteng/assets/fig10_math.png"
  },
  {
    "id": "ppt_i_1774967420832_6372",
    "type": "image",
    "x": 400,
    "y": 5086,
    "w": 368,
    "h": 280,
    "z": 297,
    "src": "https://ching12333.github.io/resume-luteng/assets/fig11_road.png"
  },
  {
    "id": "ppt_t_1774967420832_8177",
    "type": "text",
    "x": 28,
    "y": 5372,
    "w": 360,
    "h": 20,
    "z": 298,
    "html": "<span style=\"font-size:11px;color:#555;letter-spacing:1.5px;\">Fig 10. 数维杯与美赛介绍</span>"
  },
  {
    "id": "ppt_t_1774967420832_1859",
    "type": "text",
    "x": 400,
    "y": 5372,
    "w": 368,
    "h": 20,
    "z": 299,
    "html": "<span style=\"font-size:11px;color:#555;letter-spacing:1.5px;\">Fig 11. 数学建模美赛巴尔基摩道路可达性分析</span>"
  },
  {
    "id": "ppt_l_1774967420832_7592",
    "type": "line",
    "x": 28,
    "y": 5400,
    "w": 770,
    "h": 1,
    "z": 300,
    "color": "#cccccc"
  },
  {
    "id": "ppt_t_1774967420832_5881",
    "type": "text",
    "x": 28,
    "y": 5410,
    "w": 500,
    "h": 28,
    "z": 301,
    "html": "<span style=\"display:inline-block;width:10px;height:20px;background:#1a5276;vertical-align:middle;margin-right:8px;\"></span><span style=\"font-size:17px;font-weight:900;color:#1a5276;font-family:SimHei,黑体,Microsoft YaHei,sans-serif;letter-spacing:1.5px;vertical-align:middle;\">个人素养</span>"
  },
  {
    "id": "ppt_l_1774967420832_6572",
    "type": "line",
    "x": 28,
    "y": 5438,
    "w": 770,
    "h": 2,
    "z": 302,
    "color": "#1a5276"
  },
  {
    "id": "ppt_t_1774967420832_5603",
    "type": "text",
    "x": 28,
    "y": 5456,
    "w": 770,
    "h": 26,
    "z": 303,
    "html": "<span style=\"font-size:13.5px;letter-spacing:1.5px;\">◇ <strong>专业能力：</strong>具备较好的科研钻研深度，较高的绘图能力，研究素养扎实</span>"
  },
  {
    "id": "ppt_t_1774967420832_5561",
    "type": "text",
    "x": 28,
    "y": 5486,
    "w": 770,
    "h": 26,
    "z": 304,
    "html": "<span style=\"font-size:13.5px;letter-spacing:1.5px;\">◇ <strong>科研能力：</strong>有完整独立的<strong>论文查阅、实验设计、数值模拟和实验实现</strong>经历</span>"
  },
  {
    "id": "ppt_t_1774967420832_3660",
    "type": "text",
    "x": 28,
    "y": 5516,
    "w": 770,
    "h": 26,
    "z": 305,
    "html": "<span style=\"font-size:13.5px;letter-spacing:1.5px;\">◇ <strong>仿真能力：</strong>较为熟练的掌握多尺度计算工具（MS、Lammps，comsol）及多种编程语言（python，C）</span>"
  },
  {
    "id": "ppt_t_1774967420832_5323",
    "type": "text",
    "x": 28,
    "y": 5546,
    "w": 770,
    "h": 26,
    "z": 306,
    "html": "<span style=\"font-size:13.5px;letter-spacing:1.5px;\">◇ <strong>品质风貌：</strong>拥有极强的科研内驱力与抗压能力，擅长多种体育运动具有良好的身体素质</span>"
  },
  {
    "id": "ppt_i_1774967420832_4671",
    "type": "image",
    "x": 28,
    "y": 5586,
    "w": 290,
    "h": 200,
    "z": 307,
    "src": "https://ching12333.github.io/resume-luteng/assets/cert_img.png"
  },
  {
    "id": "ppt_i_1774967420832_4187",
    "type": "image",
    "x": 28,
    "y": 5796,
    "w": 290,
    "h": 200,
    "z": 308,
    "src": "https://ching12333.github.io/resume-luteng/assets/swim_img.jpg"
  },
  {
    "id": "ppt_i_1774967420832_5688",
    "type": "image",
    "x": 328,
    "y": 5586,
    "w": 440,
    "h": 420,
    "z": 309,
    "src": "https://ching12333.github.io/resume-luteng/assets/run_img.jpg"
  }
];
