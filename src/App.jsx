import React, { useMemo, useState } from "react";

const regional = [
  { name: "中部大区", value: 51, color: "#466ff2" },
  { name: "西部大区", value: 28, color: "#c74ff3" },
  { name: "东南大区", value: 14, color: "#ff8b20" },
  { name: "东部大区", value: 7, color: "#ffb267" },
];
const fifthRegion = { name: "第五大区", value: 6, color: "#5bc5a5" };

const finance = {
  label: "代理商业绩",
  total: "¥199,876.00",
  compare: "较上月：¥166,289.00",
  rate: "495.1%",
  ambassador: "¥58,918.00",
  branch: "¥140,958.00",
  levels: ["P5总业绩", "P4总业绩", "P3总业绩"],
  levelData: ["¥195,820", "¥166,480", "¥138,280"],
  p5: [64, 42, 29, 29, 14, 12, 0, 0, 0],
  p4: [64, 42, 29, 29, 14, 12, 0, 0],
  p3: [43, 35, 29, 29, 14, 14, 14, 13, 0],
  agents: [
    ["CY0527爱心大使", "¥86,400"], ["新疆赵娟分院", "¥74,200"], ["爱心大使刘志力", "¥61,800"],
    ["洛阳程爱霞分院", "¥54,600"], ["JX爱心大使", "¥48,900"], ["JX50分院", "¥41,700"],
    ["新疆杨利分院", "¥35,200"], ["乌海孙国栋分院", "¥28,600"], ["JX8分院", "¥21,400"], ["P团队代理商", "¥15,800"],
  ],
};

const operation = {
  label: "运营业绩",
  total: "¥214,656.00",
  compare: "较上月：¥128,708.00",
  rate: "149.75%",
  ambassador: "¥73,698.00",
  branch: "¥140,958.00",
  levels: ["P5运营业绩", "P4运营业绩", "P3运营业绩"],
  levelData: ["¥214,656", "¥185,430", "¥153,860"],
  p5: [68, 46, 33, 30, 18, 14, 7, 4, 2],
  p4: [61, 48, 35, 27, 23, 15, 8, 4],
  p3: [48, 41, 33, 30, 25, 20, 18, 15, 8],
  agents: [
    ["CY0527爱心大使", "¥92,600"], ["新疆赵娟分院", "¥81,400"], ["艺博集团", "¥68,900"],
    ["爱心大使刘志力", "¥57,200"], ["JX51爱心大使", "¥49,600"], ["刘鹏爱心大使", "¥42,800"],
    ["洛阳程爱霞分院", "¥36,500"], ["爱心大使雪雪", "¥29,700"], ["乌海孙国栋分院", "¥23,400"], ["JX8分院", "¥17,200"],
  ],
};

const districts = ["新疆赵娟分院", "西部赵娟分院", "爱心大使李雪", "洛阳程爱霞分院", "湖北爱心大使", "艺博艺术培训", "JX51-爱心大使", "平团队代理商", "新桥艺术学校"];
const p3Names = ["西部赵娟分院", "新疆赵娟分院", "爱心大使", "艺博-王丹", "西部艺博", "于娟爱心大使", "昆明爱心大使", "咖啡艺术学院", "JX70-51分院"];
const p5RankingRows = [
  { rank: 1, p5: "新疆区域", owner: "梁丽红", phone: "138 9910 7201", region: "西部大区", amount: 64700 },
  { rank: 2, p5: "西南区域", owner: "-", phone: "-", region: "西部大区", amount: 43210 },
  { rank: 3, p5: "鲁太吕区域", owner: "-", phone: "-", region: "中部大区", amount: 29800 },
  { rank: 4, p5: "京津冀区域", owner: "王丽娜", phone: "136 0108 4527", region: "中部大区", amount: 29800 },
  { rank: 5, p5: "洛阳区域", owner: "王志刚", phone: "137 3790 6681", region: "中东大区", amount: 14900 },
  { rank: 6, p5: "江浙区域", owner: "周晓梅", phone: "139 0571 2860", region: "东部大区", amount: 13280 },
  { rank: 7, p5: "华南区域", owner: "陈静", phone: "138 0206 3198", region: "东南大区", amount: 12660 },
  { rank: 8, p5: "湖北区域", owner: "刘霞", phone: "136 0278 9042", region: "中部大区", amount: 11840 },
  { rank: 9, p5: "豫北区域", owner: "李国强", phone: "139 0371 5266", region: "中部大区", amount: 10520 },
  { rank: 10, p5: "江西区域", owner: "胡敏", phone: "137 0791 4028", region: "东部大区", amount: 9860 },
  { rank: 11, p5: "川渝区域", owner: "唐燕", phone: "138 0281 9135", region: "西部大区", amount: 9320 },
  { rank: 12, p5: "山东区域", owner: "张云", phone: "136 0531 2876", region: "中部大区", amount: 8950 },
  { rank: 13, p5: "桂滇区域", owner: "何丽", phone: "139 0771 5082", region: "西部大区", amount: 8400 },
  { rank: 14, p5: "闽粤区域", owner: "黄洁", phone: "138 0591 6207", region: "东南大区", amount: 7920 },
  { rank: 15, p5: "湘赣区域", owner: "谢琳", phone: "137 0731 2489", region: "中部大区", amount: 7480 },
  { rank: 16, p5: "安徽区域", owner: "赵芳", phone: "136 0551 7130", region: "东部大区", amount: 7160 },
  { rank: 17, p5: "陕西区域", owner: "孙梅", phone: "139 0296 5801", region: "西部大区", amount: 6840 },
  { rank: 18, p5: "山西区域", owner: "郭莉", phone: "138 0351 4720", region: "中部大区", amount: 6510 },
  { rank: 19, p5: "苏南区域", owner: "吴丹", phone: "137 0258 9136", region: "东部大区", amount: 6200 },
  { rank: 20, p5: "苏北区域", owner: "郑洁", phone: "136 0517 2609", region: "东部大区", amount: 5880 },
  { rank: 21, p5: "内蒙区域", owner: "宋娜", phone: "139 0471 6832", region: "中部大区", amount: 5520 },
  { rank: 22, p5: "青甘宁区域", owner: "马兰", phone: "138 0931 5702", region: "西部大区", amount: 5210 },
  { rank: 23, p5: "东北区域", owner: "潘雪", phone: "137 0240 3169", region: "东部大区", amount: 4980 },
  { rank: 24, p5: "海南区域", owner: "林雅", phone: "136 0898 4621", region: "东南大区", amount: 4630 },
  { rank: 25, p5: "贵州区域", owner: "罗琴", phone: "139 0851 2378", region: "西部大区", amount: 4210 },
  { rank: 26, p5: "云南区域", owner: "白静", phone: "138 0871 9205", region: "西部大区", amount: 3920 },
  { rank: 27, p5: "河南一区", owner: "冯艳", phone: "137 0371 8420", region: "中部大区", amount: 3560 },
  { rank: 28, p5: "河南二区", owner: "丁敏", phone: "136 0371 6538", region: "中部大区", amount: 3240 },
  { rank: 29, p5: "宁夏区域", owner: "田甜", phone: "139 0951 2146", region: "西部大区", amount: 2810 },
  { rank: 30, p5: "甘肃区域", owner: "杨静", phone: "138 0931 6129", region: "西部大区", amount: 2460 },
  { rank: 31, p5: "青海区域", owner: "侯颖", phone: "137 0971 4805", region: "西部大区", amount: 1980 },
  { rank: 32, p5: "西藏区域", owner: "孟洁", phone: "136 0891 7302", region: "西部大区", amount: 1260 },
];
const p4RankingRows = [
  { rank: 1, p4: "新疆区域", p4Owner: "魏永红", p4OwnerPhone: "138 9910 3081", p5: "新疆区域", p5Owner: "梁丽红", p5OwnerPhone: "138 9910 7201", region: "西部大区", amount: 64700 },
  { rank: 2, p4: "西南区域", p4Owner: "卢秋羽", p4OwnerPhone: "139 0281 7620", p5: "西南区域", p5Owner: "-", p5OwnerPhone: "-", region: "西部大区", amount: 43210 },
  { rank: 3, p4: "鲁太吕区域", p4Owner: "宁静", p4OwnerPhone: "137 0531 4082", p5: "鲁太吕区域", p5Owner: "-", p5OwnerPhone: "-", region: "中部大区", amount: 29800 },
  { rank: 4, p4: "京津冀区域", p4Owner: "肖君", p4OwnerPhone: "136 0108 6917", p5: "京津冀区域", p5Owner: "王丽娜", p5OwnerPhone: "136 0108 4527", region: "中部大区", amount: 29800 },
  { rank: 5, p4: "洛阳区域", p4Owner: "王志刚", p4OwnerPhone: "137 3790 6681", p5: "洛阳区域", p5Owner: "王志刚", p5OwnerPhone: "137 3790 6681", region: "中东大区", amount: 14900 },
  ...Array.from({ length: 59 }, (_, index) => {
    const rank = index + 6;
    const regions = ["西部大区", "中部大区", "东部大区", "东南大区"];
    const names = ["江浙区域", "华南区域", "湖北区域", "豫北区域", "江西区域", "川渝区域", "山东区域", "桂滇区域"];
    const owners = ["周晓梅", "陈静", "刘霞", "李国强", "胡敏", "唐燕", "张云", "何丽"];
    const p5NamesList = ["新疆区域", "西南区域", "京津冀区域", "洛阳区域", "山东区域"];
    const p5Owners = ["梁丽红", "-", "王丽娜", "王志刚", "张云"];
    return {
      rank,
      p4: `${names[index % names.length]}${Math.floor(index / names.length) + 1}`,
      p4Owner: owners[index % owners.length],
      p4OwnerPhone: `13${index % 2 === 0 ? 8 : 6} ${String(1000 + rank * 17).slice(0, 4)} ${String(6000 + rank * 23).slice(0, 4)}`,
      p5: p5NamesList[index % p5NamesList.length],
      p5Owner: p5Owners[index % p5Owners.length],
      p5OwnerPhone: p5Owners[index % p5Owners.length] === "-" ? "-" : `13${index % 2 === 0 ? 6 : 8} ${String(6200 + rank * 7).slice(0, 4)} ${String(7600 + rank * 17).slice(0, 4)}`,
      region: regions[index % regions.length],
      amount: Math.max(980, 14200 - index * 210),
    };
  }),
];
const p3RankingRows = [
  { rank: 1, p3: "西南区域", p3Owner: "卢秋羽", p3OwnerPhone: "139 0281 7620", p4: "西南区域", p4Owner: "卢秋羽", p4OwnerPhone: "139 0281 7620", p5: "西南区域", p5Owner: "-", p5OwnerPhone: "-", region: "西部大区", amount: 43210 },
  { rank: 2, p3: "赵云珊", p3Owner: "赵云珊", p3OwnerPhone: "136 0991 4218", p4: "新疆区域", p4Owner: "魏永红", p4OwnerPhone: "138 9910 3081", p5: "新疆区域", p5Owner: "梁丽红", p5OwnerPhone: "138 9910 7201", region: "西部大区", amount: 34900 },
  { rank: 3, p3: "魏永红", p3Owner: "魏永红", p3OwnerPhone: "138 9910 3081", p4: "新疆区域", p4Owner: "魏永红", p4OwnerPhone: "138 9910 3081", p5: "新疆区域", p5Owner: "梁丽红", p5OwnerPhone: "138 9910 7201", region: "西部大区", amount: 29800 },
  { rank: 4, p3: "王秀凤", p3Owner: "王秀凤", p3OwnerPhone: "137 0108 9146", p4: "京津冀区域", p4Owner: "肖君", p4OwnerPhone: "136 0108 6917", p5: "京津冀区域", p5Owner: "王丽娜", p5OwnerPhone: "136 0108 4527", region: "中部大区", amount: 29800 },
  { rank: 5, p3: "葛玉红", p3Owner: "葛玉红", p3OwnerPhone: "139 0531 7602", p4: "鲁太吕区域", p4Owner: "宁静", p4OwnerPhone: "137 0531 4082", p5: "鲁太吕区域", p5Owner: "-", p5OwnerPhone: "-", region: "中部大区", amount: 14900 },
  ...Array.from({ length: 103 }, (_, index) => {
    const rank = index + 6;
    const regions = ["西部大区", "中部大区", "东部大区", "东南大区"];
    const p3NamesList = ["刘霞", "李国强", "胡敏", "唐燕", "张云", "何丽", "黄洁", "谢琳", "赵芳", "孙梅"];
    const p4NamesList = ["江浙区域", "华南区域", "湖北区域", "豫北区域", "江西区域"];
    const p5NamesList = ["新疆区域", "西南区域", "京津冀区域", "洛阳区域", "山东区域"];
    const p4Owners = ["周晓梅", "陈静", "刘霞", "李国强", "胡敏"];
    const p5Owners = ["梁丽红", "-", "王丽娜", "王志刚", "张云"];
    const phone = `13${index % 2 === 0 ? 8 : 6} ${String(2000 + rank * 13).slice(0, 4)} ${String(5000 + rank * 29).slice(0, 4)}`;
    return {
      rank,
      p3: `${p3NamesList[index % p3NamesList.length]}${Math.floor(index / p3NamesList.length) + 1}`,
      p3Owner: p3NamesList[index % p3NamesList.length],
      p3OwnerPhone: phone,
      p4: p4NamesList[index % p4NamesList.length],
      p4Owner: p4Owners[index % p4Owners.length],
      p4OwnerPhone: `13${index % 2 === 0 ? 7 : 9} ${String(3000 + rank * 11).slice(0, 4)} ${String(4000 + rank * 19).slice(0, 4)}`,
      p5: p5NamesList[index % p5NamesList.length],
      p5Owner: p5Owners[index % p5Owners.length],
      p5OwnerPhone: p5Owners[index % p5Owners.length] === "-" ? "-" : `13${index % 2 === 0 ? 6 : 8} ${String(6000 + rank * 7).slice(0, 4)} ${String(7000 + rank * 17).slice(0, 4)}`,
      region: regions[index % regions.length],
      amount: Math.max(380, 13800 - index * 105),
    };
  }),
];
const agentPerformanceMetricKeys = [
  "selfStockCourseCard",
  "selfStockBenefitCard",
  "selfConsumeCourseCard",
  "selfConsumeProfessionalCourse",
  "selfConsumeCamp",
  "selfConsumeOfflineCourse",
  "studentStockCourseCard",
  "studentStockBenefitCard",
  "studentConsumeCourseCard",
  "studentConsumeBenefitCard",
  "studentConsumeProfessionalCourse",
  "studentConsumeCamp",
  "studentConsumeOfflineCourse",
  "directStockCourseCard",
  "directStockBenefitCard",
  "directConsumeCourseCard",
  "directConsumeProfessionalCourse",
  "directConsumeCamp",
  "directConsumeOfflineCourse",
];

const seedAgentPerformanceRows = [
  { studentStockBenefitCard: 59600 },
  { studentStockBenefitCard: 49800 },
  { studentStockBenefitCard: 29800 },
  { studentStockBenefitCard: 29800 },
  { studentConsumeBenefitCard: 26820, studentConsumeCamp: 198 },
];

function buildAgentPerformanceBreakdown(rank, amount) {
  const base = Object.fromEntries(agentPerformanceMetricKeys.map(key => [key, 0]));
  const seedValues = seedAgentPerformanceRows[rank - 1];
  if (seedValues) return { ...base, ...seedValues };

  const stockBenefit = rank % 4 === 0 ? Math.max(0, amount - (rank % 7) * 120) : 0;
  const consumeBenefit = rank % 9 === 0 ? Math.max(0, Math.round(amount * 0.45)) : 0;
  const camp = rank % 11 === 0 ? 198 : 0;
  const directStockCourse = rank % 13 === 0 ? Math.round(amount * 0.18) : 0;
  const directConsumeCourse = rank % 17 === 0 ? Math.round(amount * 0.12) : 0;

  return {
    ...base,
    studentStockBenefitCard: stockBenefit,
    studentConsumeBenefitCard: consumeBenefit,
    studentConsumeCamp: camp,
    directStockCourseCard: directStockCourse,
    directConsumeCourseCard: directConsumeCourse,
  };
}

function buildAgentRankingRows() {
  const seeds = [
    { rank: 1, agentName: "CY0527爱心大使", phone: "15205270001", identityTag: "分院", identityRank: 1, branch: "CY0527爱心大使", region: "中部大区", p3: "高源徽", p3Owner: "高源徽", p3OwnerPhone: "138 0571 2001", p4: "蒲丽梅", p4Owner: "蒲丽梅", p4OwnerPhone: "138 0571 3001", p5: "临汾区域", p5Owner: "许芳莲", p5OwnerPhone: "138 0571 4001", amount: 59600, hasSplitPerformance: false },
    { rank: 2, agentName: "新疆赵娟分院", phone: "15299758576", identityTag: "分院", identityRank: 2, branch: "新疆赵娟分院", region: "西部大区", p3: "赵云珊", p3Owner: "赵云珊", p3OwnerPhone: "139 0571 2002", p4: "魏永红", p4Owner: "魏永红", p4OwnerPhone: "139 0571 3002", p5: "新疆区域", p5Owner: "梁丽红", p5OwnerPhone: "139 0571 4002", amount: 49800, hasSplitPerformance: true },
    { rank: 3, agentName: "爱心大使刘沛力", phone: "19935318926", identityTag: "爱心大使", identityRank: 1, branch: "桂林马晓晨分院", region: "中部大区", p3: "贾嘉男", p3Owner: "贾嘉男", p3OwnerPhone: "137 0571 2003", p4: "宁静", p4Owner: "宁静", p4OwnerPhone: "137 0571 3003", p5: "鲁太吕区域", p5Owner: "-", p5OwnerPhone: "-", amount: 29800, hasSplitPerformance: false },
    { rank: 4, agentName: "洛阳程爱霞分院", phone: "18937962699", identityTag: "分院", identityRank: 3, branch: "洛阳程爱霞分院", region: "中东大区", p3: "王志刚", p3Owner: "王志刚", p3OwnerPhone: "136 0571 2004", p4: "王志刚", p4Owner: "王志刚", p4OwnerPhone: "136 0571 3004", p5: "洛阳区域", p5Owner: "王志刚", p5OwnerPhone: "136 0571 4004", amount: 29800, hasSplitPerformance: true },
    { rank: 5, agentName: "JX爱心大使", phone: "15300112225", identityTag: "爱心大使", identityRank: 2, branch: "新疆杨清分院", region: "中部大区", p3: "刘俊云", p3Owner: "刘俊云", p3OwnerPhone: "135 0571 2005", p4: "蒲丽梅", p4Owner: "蒲丽梅", p4OwnerPhone: "135 0571 3005", p5: "临汾区域", p5Owner: "许芳莲", p5OwnerPhone: "135 0571 4005", amount: 27018, hasSplitPerformance: false },
  ];
  const tagCycle = ["分院", "爱心大使"];
  const regionCycle = ["中部大区", "西部大区", "中部大区", "中东大区", "东南大区"];
  const p3Names = ["高源徽", "赵云珊", "贾嘉男", "王志刚", "刘俊云", "张玉红", "蒲丽梅", "魏永红", "宁静", "肖君"];
  const p4Names = ["蒲丽梅", "魏永红", "宁静", "肖君", "王志刚", "卢秋羽", "赵云珊", "刘俊云"];
  const p5Names = ["临汾区域", "新疆区域", "鲁太吕区域", "洛阳区域", "新西区域", "重庆区域", "华东区域", "华南区域"];
  const p5Owners = ["许芳莲", "梁丽红", "-", "王志刚", "赵云珊", "刘俊云", "高源徽", "魏永红"];
  const rows = seeds.map(row => ({ ...row, ...buildAgentPerformanceBreakdown(row.rank, row.amount) }));
  for (let index = seeds.length; index < 1456; index += 1) {
    const rank = index + 1;
    const p3Name = p3Names[index % p3Names.length];
    const p4Name = p4Names[index % p4Names.length];
    const p5Name = p5Names[index % p5Names.length];
    const p5Owner = p5Owners[index % p5Owners.length];
    const amount = Math.max(560, 59600 - index * 37);
    rows.push({
      rank,
      agentName: `${["CY", "JX", "YG", "XJ", "LY"][index % 5]}${String(rank).padStart(4, "0")}代理商`,
      phone: `15${String(200000000 + rank).slice(-9)}`,
      identityTag: tagCycle[index % tagCycle.length],
      identityRank: (rank % 3) + 1,
      branch: `${["新疆", "西部", "洛阳", "华南", "山东", "湖北"][index % 6]}${Math.floor(index / 6) + 1}分院`,
      region: regionCycle[index % regionCycle.length],
      p3: p3Name,
      p3Owner: p3Name,
      p3OwnerPhone: `13${index % 2 === 0 ? 8 : 9} ${String(5000 + rank * 7).padStart(4, "0")} ${String(6000 + rank * 11).padStart(4, "0")}`,
      p4: p4Name,
      p4Owner: p4Name,
      p4OwnerPhone: `13${index % 2 === 0 ? 7 : 6} ${String(3000 + rank * 5).padStart(4, "0")} ${String(7000 + rank * 13).padStart(4, "0")}`,
      p5: p5Name,
      p5Owner,
      p5OwnerPhone: p5Owner === "-" ? "-" : `13${index % 2 === 0 ? 6 : 8} ${String(4000 + rank * 3).padStart(4, "0")} ${String(8000 + rank * 17).padStart(4, "0")}`,
      amount,
      hasSplitPerformance: rank % 13 === 0,
      ...buildAgentPerformanceBreakdown(rank, amount),
    });
  }
  return rows;
}
const agentRankingRows = buildAgentRankingRows();

function withP3SplitPerformanceMarks(rows) {
  return rows.map(row => {
    const hasSplitPerformance = agentRankingRows.some(agent => agent.p3 === row.p3 && agent.hasSplitPerformance);
    return {
      ...row,
      hasSplitPerformance,
    };
  });
}

function buildAgentOrderRows(agent = {}) {
  const baseOrder = {
    payer: agent.agentName || "CY07090",
    payerPhone: agent.phone || "15205270001",
    identityTag: agent.identityTag === "爱心大使" ? "学员" : "学员",
    ambassador: "-",
    branch: agent.branch || "-",
    region: agent.region || "-",
    p3: agent.p3 || "-",
    p3Owner: agent.p3Owner || "-",
    p4: agent.p4 || "-",
    p4Owner: agent.p4Owner || "-",
    p5: agent.p5 || "-",
    p5Owner: agent.p5Owner || "-",
  };
  const orders = [
    {
      ...baseOrder,
      detailNo: `TT_DD_TH_${String(2026070900000 + (agent.rank || 1)).slice(-13)}`,
      payer: `${String(agent.agentName || "CY07090").slice(0, 6)}2`,
      productType: "权益卡",
      purchaseContent: "卓越家族会员卡",
      paymentAmount: 29800,
      paymentMethod: "账户余额",
      transactionTime: "2026-07-09 09:47:30",
      hasSplitPerformance: false,
    },
    {
      ...baseOrder,
      detailNo: `TT_DD_TH_${String(2026070900001 + (agent.rank || 1)).slice(-13)}`,
      payer: `${String(agent.agentName || "CY07090").slice(0, 6)}1`,
      productType: "权益卡",
      purchaseContent: "卓越家族会员卡",
      paymentAmount: agent.hasSplitPerformance ? 14900 : 29800,
      paymentMethod: "账户余额",
      transactionTime: "2026-07-09 09:44:09",
      hasSplitPerformance: Boolean(agent.hasSplitPerformance),
    },
  ];
  return orders;
}

const rankingConfigs = {
  p5: {
    level: "P5",
    pageLabel: "P5全国排行",
    rows: p5RankingRows,
    amountLabel: "业绩总额（￥）",
    baseFilters: [],
    expandedFilters: [{ key: "p5", label: "P5", placeholder: "请输入P5" }, { key: "owner", label: "P5负责人", placeholder: "请输入P5负责人" }],
    columns: [
      { key: "rank", label: "全国排名" },
      { key: "p5", label: "P5" },
      { key: "owner", label: "P5负责人" },
      { key: "phone", label: "P5负责人电话", phone: true },
      { key: "region", label: "所属大区" },
      { key: "amount", label: "业绩总额（￥）" },
    ],
  },
  p4: {
    level: "P4",
    pageLabel: "P4全国排行",
    rows: p4RankingRows,
    baseFilters: [],
    expandedFilters: [{ key: "p4", label: "P4", placeholder: "请输入P4" }, { key: "p4Owner", label: "P4负责人", placeholder: "请输入P4负责人" }],
    columns: [
      { key: "rank", label: "全国排名" },
      { key: "p4", label: "P4" },
      { key: "p4Owner", label: "P4负责人" },
      { key: "p4OwnerPhone", label: "P4负责人电话", phone: true },
      { key: "p5", label: "所属P5" },
      { key: "p5Owner", label: "所属P5负责人" },
      { key: "p5OwnerPhone", label: "所属P5负责人电话", phone: true },
      { key: "region", label: "所属大区" },
      { key: "amount", label: "业绩总额（￥）" },
    ],
  },
  p3: {
    level: "P3",
    pageLabel: "P3全国排行",
    rows: withP3SplitPerformanceMarks(p3RankingRows),
    baseFilters: [
      { key: "p3", label: "P3", placeholder: "请输入P3" },
      { key: "p3Owner", label: "P3负责人", placeholder: "请输入P3负责人" },
      { key: "p4", label: "所属P4", placeholder: "请输入所属P4" },
    ],
    expandedFilters: [{ key: "p5", label: "所属P5", placeholder: "请输入所属P5" }],
    columns: [
      { key: "rank", label: "全国排名" },
      { key: "p3", label: "P3" },
      { key: "p3Owner", label: "P3负责人" },
      { key: "p3OwnerPhone", label: "P3负责人电话", phone: true },
      { key: "p4", label: "所属P4" },
      { key: "p4Owner", label: "所属P4负责人" },
      { key: "p4OwnerPhone", label: "所属P4负责人电话", phone: true },
      { key: "p5", label: "所属P5" },
      { key: "p5Owner", label: "所属P5负责人" },
      { key: "p5OwnerPhone", label: "所属P5负责人电话", phone: true },
      { key: "region", label: "所属大区" },
      { key: "amount", label: "业绩总额（￥）" },
    ],
  },
  agent: {
    pageLabel: "代理商排行",
    heading: "代理商排行",
    subTab: "代理商排行",
    showExport: true,
    minWidth: 4828,
    rows: agentRankingRows,
    baseFilters: [
      { key: "agentName", label: "代理商名称", placeholder: "请输入代理商名称或手机号", type: "input" },
      {
        key: "identityTag",
        label: "身份标签",
        type: "select",
        options: ["身份标签", "分院", "爱心大使"],
      },
      { key: "p3", label: "所属P3", placeholder: "请输入所属P3", type: "input" },
    ],
    expandedFilters: [
      { key: "p4", label: "所属P4", placeholder: "请输入所属P4", type: "input" },
      { key: "p5", label: "所属P5", placeholder: "请输入所属P5", type: "input" },
    ],
    columns: [
      { key: "rank", label: "全国排名", width: "100px" },
      { key: "agentName", label: "代理商名称", width: "210px" },
      { key: "phone", label: "手机号码", width: "150px", phone: true },
      { key: "identityTag", label: "身份标签", width: "130px" },
      { key: "identityRank", label: "对应身份排名", width: "140px" },
      { key: "branch", label: "所属分院", width: "210px" },
      { key: "region", label: "所属大区", width: "130px" },
      { key: "p3", label: "所属P3", width: "160px" },
      { key: "p3Owner", label: "所属P3负责人", width: "150px" },
      { key: "p3OwnerPhone", label: "所属P3负责人电话", width: "170px", phone: true },
      { key: "p4", label: "所属P4", width: "160px" },
      { key: "p4Owner", label: "所属P4负责人", width: "150px" },
      { key: "p4OwnerPhone", label: "所属P4负责人电话", width: "170px", phone: true },
      { key: "p5", label: "所属P5", width: "160px" },
      { key: "p5Owner", label: "所属P5负责人", width: "150px" },
      { key: "p5OwnerPhone", label: "所属P5负责人电话", width: "170px", phone: true },
      { key: "amount", label: "业绩总额（￥）", width: "150px" },
      { key: "selfStockCourseCard", label: "囤课程卡", width: "104px", group: "agentSelf" },
      { key: "selfStockBenefitCard", label: "囤权益卡", width: "104px", group: "agentSelf" },
      { key: "selfConsumeCourseCard", label: "消费课程卡", width: "104px", group: "agentSelf" },
      { key: "selfConsumeProfessionalCourse", label: "消费专业课", width: "104px", group: "agentSelf" },
      { key: "selfConsumeCamp", label: "消费陪学营", width: "104px", group: "agentSelf" },
      { key: "selfConsumeOfflineCourse", label: "消费线下课", width: "104px", group: "agentSelf" },
      { key: "studentStockCourseCard", label: "囤课程卡", width: "104px", group: "normalStudent" },
      { key: "studentStockBenefitCard", label: "囤权益卡", width: "104px", group: "normalStudent" },
      { key: "studentConsumeCourseCard", label: "消费课程卡", width: "104px", group: "normalStudent" },
      { key: "studentConsumeBenefitCard", label: "消费权益卡", width: "104px", group: "normalStudent" },
      { key: "studentConsumeProfessionalCourse", label: "消费专业课", width: "104px", group: "normalStudent" },
      { key: "studentConsumeCamp", label: "消费陪学营", width: "104px", group: "normalStudent" },
      { key: "studentConsumeOfflineCourse", label: "消费线下课", width: "104px", group: "normalStudent" },
      { key: "directStockCourseCard", label: "囤课程卡", width: "104px", group: "directAgent" },
      { key: "directStockBenefitCard", label: "囤权益卡", width: "104px", group: "directAgent" },
      { key: "directConsumeCourseCard", label: "消费课程卡", width: "104px", group: "directAgent" },
      { key: "directConsumeProfessionalCourse", label: "消费专业课", width: "104px", group: "directAgent" },
      { key: "directConsumeCamp", label: "消费陪学营", width: "104px", group: "directAgent" },
      { key: "directConsumeOfflineCourse", label: "消费线下课", width: "104px", group: "directAgent" },
    ],
    columnGroups: [
      { key: "agentSelf", label: "代理商本人（企业账户￥）" },
      { key: "normalStudent", label: "代理商名下普通学员（￥）" },
      { key: "directAgent", label: "代理商直推代理商（课程券￥）" },
    ],
  },
};

function getRankingConfig(type, detailContext) {
  if (type === "agent-order-detail") {
    return {
      pageLabel: "代理商订单明细",
      rows: buildAgentOrderRows(detailContext),
    };
  }

  const detailMatch = type.match(/^(p[345])-agent-detail$/);
  if (detailMatch) {
    const level = detailMatch[1];
    const levelLabel = level.toUpperCase();
    const targetName = detailContext?.[level] || "";
    const scopedRows = agentRankingRows.filter(row => row[level] === targetName);
    const hierarchyOverrides = {
      ...(level === "p3" ? {
        p3: targetName,
        p3Owner: detailContext?.p3Owner,
        p3OwnerPhone: detailContext?.p3OwnerPhone,
        p4: detailContext?.p4,
        p4Owner: detailContext?.p4Owner,
        p4OwnerPhone: detailContext?.p4OwnerPhone,
        p5: detailContext?.p5,
        p5Owner: detailContext?.p5Owner,
        p5OwnerPhone: detailContext?.p5OwnerPhone,
      } : {}),
      ...(level === "p4" ? {
        p4: targetName,
        p4Owner: detailContext?.p4Owner,
        p4OwnerPhone: detailContext?.p4OwnerPhone,
        p5: detailContext?.p5,
        p5Owner: detailContext?.p5Owner,
        p5OwnerPhone: detailContext?.p5OwnerPhone,
      } : {}),
      ...(level === "p5" ? {
        p5: targetName,
        p5Owner: detailContext?.p5Owner || detailContext?.owner,
        p5OwnerPhone: detailContext?.p5OwnerPhone || detailContext?.phone,
      } : {}),
    };
    const rows = scopedRows.length
      ? scopedRows
      : agentRankingRows.slice(0, 36).map((row, index) => ({
        ...row,
        rank: index + 1,
        ...Object.fromEntries(Object.entries(hierarchyOverrides).filter(([, value]) => value !== undefined && value !== "")),
        region: detailContext?.region || row.region,
      }));

    return {
      ...rankingConfigs.agent,
      pageLabel: `${levelLabel}代理商明细`,
      heading: `${levelLabel}代理商明细`,
      subTab: "代理商明细",
      rows,
      minWidth: rankingConfigs.agent.minWidth - 240,
      columns: rankingConfigs.agent.columns.filter(column => !["rank", "identityRank"].includes(column.key)),
    };
  }

  return rankingConfigs[type] || rankingConfigs.p5;
}

function Bars({ values, labels = districts, accent = "#3e9df0" }) {
  const max = Math.max(...values);
  return <div className="bars">
    <div className="grid-lines">
<i/>
<i/>
<i/>
<i/>
<i/>
</div>
    <div className="bar-list">
      {values.map((value, index) => <div className="bar-column" key={`${labels[index]}-${index}`}>
        <div className="bar" style={{ height: `${Math.max(2, value / max * 168)}px`, background: index === 0 && accent === "#ffc650" ? accent : accent }}/>
        <span title={labels[index]}>{String(labels[index]).slice(0, 4)}</span>
      </div>)}
    </div>
  </div>;
}

function Pie({ isOperation }) {
  const style = { background: isOperation ? "conic-gradient(#466ff2 0 55%, #c74ff3 55% 84%, #ff8b20 84% 86%, #ffb267 86% 100%)" : "conic-gradient(#466ff2 0 52%, #c74ff3 52% 75%, #ff8b20 75% 87%, #ffb267 87% 94%, #5bc5a5 94% 100%)" };
  const legend = isOperation ? regional : [...regional, fifthRegion];
  return <div className="pie-block">
    <div className="pie-label label-top">{isOperation ? "东南大区" : "第五大区"}</div>
<div className="pie-label label-left">西部大区</div>
<div className="pie-label label-right">中部大区</div>
    <div className="pie" style={style}/>
    <div className="pie-legend">{legend.map(item => <span key={item.name}>
<i style={{ background: item.color }}/>{item.name}</span>)}</div>
  </div>;
}

function SectionTitle({ children, action = "全部", onActionClick }) {
  return <div className="section-title">
<div>
<b className="section-dot">▥</b>{children}</div>
<button type="button" onClick={onActionClick}>{action}</button>
</div>;
}

function SummaryRank({ title, total, compare, items }) {
  const max = Math.max(...items.map(item => item[1]));
  return <article className="summary-rank card">
<header>
<h3>
<span className="mini-icon">●</span>{title}</h3>
<small>{compare} <em>↑ 368.95%</em>
</small>
</header>
<div className="rank-total">
<span>业绩总计</span>
<strong>{total}</strong>
</div>
<div className="mini-bars">{items.map(([name, value]) => <div key={name}>
<label>{name}</label>
<i>
<b style={{ width: `${value === 0 ? 0 : Math.max(3, value / max * 100)}%` }}/>
</i>
</div>)}</div>
</article>;
}

function Overview({ data, active, onOpenRanking }) {
  const ambassadorItems = active === "finance" ? [["爱心大使刘志力", 100], ["JX爱心大使", 91], ["JX51爱心大使", 8], ["ZHB-代理商", 0], ["爱心大使 董芳英", 0], ["爱心大使白雪", 0]] : [["爱心大使刘志力", 100], ["JX爱心大使", 91], ["艺博集团", 35], ["刘鹏爱心大使", 19], ["JX51爱心大使", 8], ["ZHB-代理商", 0]];
  const maxAgent = Math.max(...data.agents.map(([, value]) => Number(value.replace(/[¥,]/g, ""))));
  return <>
    <section className="overview-grid">
      <article className="performance-card card">
<h2 className="overview-heading">
<span className="metric-icon purple">●</span>{data.label}</h2>
<div className="overview-main">
<Pie isOperation={active === "operation"}/>
<div className="overview-metrics">
<div className="total-display">
<span>总计</span>
<b>{data.total}</b>
<small>{data.compare} <em>↑ {data.rate}</em>
</small>
</div>
</div>
</div>
</article>
    </section>
    <section className="rank-section">
<SectionTitle action="全部" onActionClick={() => onOpenRanking("agent")}>{active === "finance" ? "代理商排行" : `${data.label}排行`}</SectionTitle>
<div className="rank-grid">
<SummaryRank title="分院统计" total={data.branch} compare="较上月: ¥110,900.00" items={[["CY0527爱心大使", 100], ["新疆赵娟分院", 83], ["洛阳程爱霞分院", 50], ["新疆杨利分院", 3], ["乌海孙国栋分院", 1]]}/>
<SummaryRank title="爱心大使统计" total={data.ambassador} compare="较上月: ¥55,389.00" items={ambassadorItems}/>
<article className="national card">
<h3>
<span className="mini-icon purple-dot">●</span>代理商全国排行</h3>{data.agents.slice(0, 10).map(([name, value], index) => { const amount = Number(value.replace(/[¥,]/g, "")); return <div className="national-row" key={name}>
<b className={index < 3 ? `place place-${index + 1}` : "plain-place"}>{index + 1}</b>
<span>{name}</span>
<div className="national-progress">
<i>
<b style={{ width: `${Math.max(3, amount / maxAgent * 100)}%` }}/>
</i>
</div>
<strong>{value}</strong>
</div>; })}</article>
</div>
</section>
  </>;
}

function Detail({ data, active, onOpenRanking }) {
  return <section className="detail-section">
    <SectionTitle action="">P团队业绩排行</SectionTitle>
    <div className="level-grid">{data.levels.map((item, index) => <article className="level-card card" key={item}>
<button className="level-detail-button" type="button">明细</button>
<p>{item}</p>
<strong>{data.levelData[index]}</strong>
<small>较上月&nbsp; ¥168,640 <em>↑ 620.46%</em>
</small>
</article>)}</div>
    <div className="two-panel card wide-panel">
<div className="chart-panel">
<h3>大区业绩</h3>
<div className="large-pie-wrap">
<div className="large-pie" style={{ background: active === "finance" ? "conic-gradient(#5573c8 0 55%, #92cc72 55% 93%, #fac653 93% 100%)" : "conic-gradient(#5573c8 0 53%, #92cc72 53% 88%, #fac653 88% 100%)" }}/>
<span className="callout l-one">中部大区：73,010元</span>
<span className="callout l-two">西部大区：107,910元</span>
<span className="callout l-three">东部大区：14,900元</span>
</div>
<div className="under-legend">
<i className="blue"/>西部大区 <i className="green"/>中部大区 <i className="yellow"/>东部大区 <i className="red"/>东南大区</div>
</div>
<div className="chart-panel">
<h3>P5全国排行 <button type="button" onClick={() => onOpenRanking("p5")}>全部</button>
</h3>
<Bars values={data.p5} accent="#ffc650"/>
</div>
</div>
    <div className="two-panel card wide-panel lower">
<div className="chart-panel">
<h3>P4全国排行 <button type="button" onClick={() => onOpenRanking("p4")}>全部</button>
</h3>
<Bars values={data.p4}/>
</div>
<div className="chart-panel">
<h3>P3全国排行 <button type="button" onClick={() => onOpenRanking("p3")}>全部</button>
</h3>
<Bars values={data.p3} labels={p3Names}/>
</div>
</div>
  </section>;
}

function RankingPage({ type, config: providedConfig, onOpenOrgDetail, onOpenAgentOrderDetail }) {
  const config = providedConfig || getRankingConfig(type);
  const isOrgAgentDetail = /^p[345]-agent-detail$/.test(type);
  const isAgentTable = type === "agent" || isOrgAgentDetail;
  const canOpenAgentDetail = ["p3", "p4", "p5"].includes(type);
  const [draftRegion, setDraftRegion] = useState("全部");
  const [appliedRegion, setAppliedRegion] = useState("全部");
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const regions = ["全部", "中部大区", "西部大区", "东部大区", "东南大区", "中东大区"];
  const filteredRows = config.rows.filter(row => {
    const regionMatched = appliedRegion === "全部" || row.region === appliedRegion;
    const fieldsMatched = [...config.baseFilters, ...config.expandedFilters].every(item => {
      const value = (appliedFilters[item.key] || "").trim();
      if (!value) return true;
      if (item.type === "select") return String(row[item.key] || "") === value;
      if (isAgentTable && item.key === "agentName") {
        return [row.agentName, row.phone].some(field => String(field || "").includes(value));
      }
      return String(row[item.key] || "").includes(value);
    });
    return regionMatched && fieldsMatched;
  });
  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visibleRows = filteredRows.slice((safePage - 1) * pageSize, safePage * pageSize);

  const runSearch = () => {
    setAppliedRegion(draftRegion);
    setAppliedFilters(filters);
    setPage(1);
  };
  const resetSearch = () => {
    setDraftRegion("全部");
    setAppliedRegion("全部");
    setFilters({});
    setAppliedFilters({});
    setPage(1);
  };
  const changePageSize = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };
  const paginationItems = (() => {
    if (pageCount <= 8) return Array.from({ length: pageCount }, (_, index) => index + 1);
    if (safePage <= 4) return [1, 2, 3, 4, 5, 6, "…", pageCount];
    if (safePage >= pageCount - 3) return [1, "…", pageCount - 5, pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
    return [1, "…", safePage - 1, safePage, safePage + 1, "…", pageCount];
  })();

  const renderField = (item) => {
    if (item.type === "select") {
      return <label key={item.key}>
        <span>{item.label}</span>
        <select value={filters[item.key] || ""} onChange={(event) => setFilters({ ...filters, [item.key]: event.target.value })}>
          {item.options.map(option => <option key={option} value={option === item.label ? "" : option}>{option}</option>)}
        </select>
      </label>;
    }
    return <label key={item.key}>
      <span>{item.label}</span>
      <input value={filters[item.key] || ""} onChange={(event) => setFilters({ ...filters, [item.key]: event.target.value })} placeholder={item.placeholder} />
    </label>;
  };
  const renderCell = (row, column) => {
    const value = row[column.key];
    if (type === "p3" && column.key === "p3") {
      return <span className="p3-name-with-marker">
        <span>{value}</span>
        {row.hasSplitPerformance && <span className="ranking-split-icon" data-tooltip="存在拆分业绩" aria-label="存在拆分业绩">!</span>}
      </span>;
    }
    if (isOrgAgentDetail && column.key === "agentName") {
      return <span className="agent-name-with-marker">
        <span>{value}</span>
        {row.hasSplitPerformance && <span className="ranking-split-icon" data-tooltip="存在拆分业绩" aria-label="存在拆分业绩">!</span>}
      </span>;
    }
    if (column.tag) {
      return value
        ? <span className="ranking-split-icon" data-tooltip={value} aria-label={value}>!</span>
        : <span className="muted-cell">-</span>;
    }
    return value;
  };

  if (isAgentTable) {
    const standaloneColumns = config.columns.filter(column => !column.group);
    const groupedColumnSections = config.columnGroups.map(group => ({
      ...group,
      columns: config.columns.filter(column => column.group === group.key),
    }));

    return <section className="ranking-page ranking-page-agent">
      <div className="ranking-period">统计周期:2026-07-01至2026-07-31</div>
      <div className="ranking-agent-shell card">
        <div className="ranking-agent-heading">{config.heading}</div>
        <div className="ranking-agent-tabline">
          <button type="button" className="active">{config.subTab}</button>
        </div>
        <div className="ranking-filter-card ranking-filter-card-agent">
          <div className="ranking-filter-row ranking-filter-row-agent">
            {config.baseFilters.slice(0, 2).map(renderField)}
            <label>
              <span>所属大区</span>
              <select value={draftRegion} onChange={(event) => setDraftRegion(event.target.value)}>
                {regions.map(region => <option key={region} value={region}>{region === "全部" ? "请选择所属大区" : region}</option>)}
              </select>
            </label>
            {config.baseFilters.slice(2).map(renderField)}
            <button className="search-button" type="button" onClick={runSearch}>⌕ 搜索</button>
            <button className="reset-button" type="button" onClick={resetSearch}>↻ 重置</button>
            <button className="expand-button" type="button" onClick={() => setExpanded(!expanded)}>⌄ {expanded ? "收起" : "展开"}</button>
          </div>
          {expanded && <div className="ranking-extra-row">
            {config.expandedFilters.map(renderField)}
          </div>}
          {config.showExport && <button className="export-button" type="button">↓ 导出</button>}
        </div>
        <div className="ranking-table-card ranking-table-card-agent">
          <table className="ranking-table ranking-table-agent" style={{ minWidth: `${config.minWidth}px` }}>
            <thead>
              <tr>
                {standaloneColumns.map(column => <th key={column.key} rowSpan={2} style={{ width: column.width }}>{column.label}</th>)}
                {groupedColumnSections.map(group => <th key={group.key} colSpan={group.columns.length} className="ranking-group-title">{group.label}</th>)}
                <th className="ranking-sticky-action" rowSpan={2} style={{ width: "112px" }}>操作</th>
              </tr>
              <tr>
                {groupedColumnSections.flatMap(group => group.columns).map(column => <th key={column.key} style={{ width: column.width }}>{column.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map(row => <tr key={row.rank}>
                {config.columns.map(column => <td key={column.key} className={`${column.phone ? "ranking-phone" : ""}${type === "p3" && column.key === "p3" || isOrgAgentDetail && column.key === "agentName" ? " ranking-marker-cell" : ""}`}>{renderCell(row, column)}</td>)}
                <td className="ranking-sticky-action"><button className="ranking-detail-button" type="button" onClick={() => onOpenAgentOrderDetail?.(row)}>明细</button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className="ranking-pagination ranking-pagination-agent">
          <span>共 {filteredRows.length} 条</span>
          <select value={pageSize} onChange={changePageSize}>
            <option value={5}>5条/页</option>
            <option value={10}>10条/页</option>
            <option value={20}>20条/页</option>
          </select>
          <button type="button" disabled={safePage === 1} onClick={() => setPage(Math.max(1, safePage - 1))}>‹</button>
          {paginationItems.map((item, index) => item === "…" ? <span key={`ellipsis-${index}`}>…</span> : <button type="button" key={item} className={safePage === item ? "active-page-number" : ""} onClick={() => setPage(item)}>{item}</button>)}
          <button type="button" disabled={safePage === pageCount} onClick={() => setPage(Math.min(pageCount, safePage + 1))}>›</button>
          <span>前往</span>
          <input value={safePage} onChange={(event) => setPage(Number(event.target.value) || 1)} />
          <span>页</span>
        </div>
      </div>
    </section>;
  }

  return <section className="ranking-page">
    <div className="ranking-period">统计周期:2026-07-01至2026-07-31</div>
    <div className={`ranking-filter-card ranking-filter-card-${type}`}>
      <div className="ranking-filter-row">
        <label>
          <span>所属大区</span>
          <select value={draftRegion} onChange={(event) => setDraftRegion(event.target.value)}>
            {regions.map(region => <option key={region} value={region}>{region === "全部" ? "请选择所属大区" : region}</option>)}
          </select>
        </label>
        {config.baseFilters.map(renderField)}
        <button className="search-button" type="button" onClick={runSearch}>⌕ 搜索</button>
        <button className="reset-button" type="button" onClick={resetSearch}>↻ 重置</button>
        <button className="expand-button" type="button" onClick={() => setExpanded(!expanded)}>⌄ {expanded ? "收起" : "展开"}</button>
      </div>
      {expanded && <div className="ranking-extra-row">
        {config.expandedFilters.map(renderField)}
      </div>}
    </div>
    <div className="ranking-table-card">
      <table className={`ranking-table ranking-table-${type}`}>
        <thead>
          <tr>
            {config.columns.map(column => <th key={column.key}>{column.label}</th>)}
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map(row => <tr key={row.rank}>
            {config.columns.map(column => <td key={column.key} className={`${column.phone ? "ranking-phone" : ""}${type === "p3" && column.key === "p3" || isOrgAgentDetail && column.key === "agentName" ? " ranking-marker-cell" : ""}`}>{renderCell(row, column)}</td>)}
            <td><button className="ranking-detail-button" type="button" onClick={() => canOpenAgentDetail && onOpenOrgDetail?.(type, row)}>明细</button></td>
          </tr>)}
        </tbody>
      </table>
      <div className="ranking-pagination">
        <span>共 {filteredRows.length} 条</span>
        <select value={pageSize} onChange={changePageSize}>
          <option value={5}>5条/页</option>
          <option value={10}>10条/页</option>
          <option value={20}>20条/页</option>
        </select>
        <button type="button" disabled={safePage === 1} onClick={() => setPage(Math.max(1, safePage - 1))}>‹</button>
        {paginationItems.map((item, index) => item === "…" ? <span key={`ellipsis-${index}`}>…</span> : <button type="button" key={item} className={safePage === item ? "active-page-number" : ""} onClick={() => setPage(item)}>{item}</button>)}
        <button type="button" disabled={safePage === pageCount} onClick={() => setPage(Math.min(pageCount, safePage + 1))}>›</button>
        <span>前往</span>
        <input value={safePage} onChange={(event) => setPage(Number(event.target.value) || 1)} />
        <span>页</span>
      </div>
    </div>
  </section>;
}

function AgentOrderDetailPage({ agent }) {
  const [draftRegion, setDraftRegion] = useState("全部");
  const [appliedRegion, setAppliedRegion] = useState("全部");
  const [filters, setFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const regions = ["全部", "中部大区", "西部大区", "东部大区", "东南大区", "中东大区"];
  const columns = [
    { key: "detailNo", label: "明细单号", width: "126px" },
    { key: "payer", label: "支付人", width: "92px" },
    { key: "payerPhone", label: "支付人手机号", width: "136px", phone: true },
    { key: "identityTag", label: "身份标签", width: "82px" },
    { key: "productType", label: "商品类型", width: "88px" },
    { key: "purchaseContent", label: "购买内容", width: "108px" },
    { key: "paymentAmount", label: "支付金额", width: "96px" },
    { key: "paymentMethod", label: "支付方式", width: "96px" },
    { key: "transactionTime", label: "交易时间", width: "128px" },
    { key: "ambassador", label: "所属爱心大使", width: "112px" },
    { key: "branch", label: "所属分院", width: "118px" },
    { key: "region", label: "所属大区", width: "100px" },
    { key: "p3", label: "所属P3", width: "108px" },
    { key: "p3Owner", label: "所属P3负责人", width: "122px" },
    { key: "p4", label: "所属P4", width: "108px" },
    { key: "p4Owner", label: "所属P4负责人", width: "122px" },
    { key: "p5", label: "所属P5", width: "108px" },
    { key: "p5Owner", label: "所属P5负责人", width: "122px" },
  ];
  const rows = buildAgentOrderRows(agent);
  const filteredRows = rows.filter(row => {
    const regionMatched = appliedRegion === "全部" || row.region === appliedRegion;
    const payerValue = (appliedFilters.payer || "").trim();
    const ambassadorValue = (appliedFilters.ambassador || "").trim();
    const branchValue = (appliedFilters.branch || "").trim();
    const p3Value = (appliedFilters.p3 || "").trim();
    const p4Value = (appliedFilters.p4 || "").trim();
    const p5Value = (appliedFilters.p5 || "").trim();
    return regionMatched
      && (!payerValue || [row.payer, row.payerPhone].some(field => String(field || "").includes(payerValue)))
      && (!ambassadorValue || String(row.ambassador || "").includes(ambassadorValue))
      && (!branchValue || String(row.branch || "").includes(branchValue))
      && (!p3Value || String(row.p3 || "").includes(p3Value))
      && (!p4Value || String(row.p4 || "").includes(p4Value))
      && (!p5Value || String(row.p5 || "").includes(p5Value));
  });
  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visibleRows = filteredRows.slice((safePage - 1) * pageSize, safePage * pageSize);
  const runSearch = () => {
    setAppliedRegion(draftRegion);
    setAppliedFilters(filters);
    setPage(1);
  };
  const resetSearch = () => {
    setDraftRegion("全部");
    setAppliedRegion("全部");
    setFilters({});
    setAppliedFilters({});
    setPage(1);
  };
  const setFilter = (key, value) => setFilters({ ...filters, [key]: value });
  const renderAmount = (row) => <span className="order-amount-cell">
    <span>{row.paymentAmount}</span>
    {row.hasSplitPerformance && <span className="ranking-split-icon" data-tooltip="存在拆分业绩" aria-label="存在拆分业绩">!</span>}
  </span>;

  return <section className="ranking-page order-detail-page">
    <div className="order-detail-shell card">
      <div className="order-filter-row">
        <label>
          <span>支付人名称或手机号</span>
          <input value={filters.payer || ""} onChange={(event) => setFilter("payer", event.target.value)} placeholder="请输入支付人名称或手机号" />
        </label>
        <label>
          <span>所属爱心大使</span>
          <input value={filters.ambassador || ""} onChange={(event) => setFilter("ambassador", event.target.value)} placeholder="请输入所属爱心大使" />
        </label>
        <label>
          <span>所属分院</span>
          <input value={filters.branch || ""} onChange={(event) => setFilter("branch", event.target.value)} placeholder="请输入所属分院" />
        </label>
        <label>
          <span>所属大区</span>
          <select value={draftRegion} onChange={(event) => setDraftRegion(event.target.value)}>
            {regions.map(region => <option key={region} value={region}>{region === "全部" ? "请选择所属大区" : region}</option>)}
          </select>
        </label>
        <button className="search-button" type="button" onClick={runSearch}>⌕ 搜索</button>
        <button className="reset-button" type="button" onClick={resetSearch}>↻ 重置</button>
        <button className="expand-button" type="button" onClick={() => setExpanded(!expanded)}>⌄ {expanded ? "收起" : "展开"}</button>
        <button className="export-button order-export-button" type="button">↓ 导出</button>
        <button className="export-button order-export-button" type="button">↓ 导出</button>
      </div>
      {expanded && <div className="order-extra-row">
        <label>
          <span>所属P3</span>
          <input value={filters.p3 || ""} onChange={(event) => setFilter("p3", event.target.value)} placeholder="请输入所属P3" />
        </label>
        <label>
          <span>所属P4</span>
          <input value={filters.p4 || ""} onChange={(event) => setFilter("p4", event.target.value)} placeholder="请输入所属P4" />
        </label>
        <label>
          <span>所属P5</span>
          <input value={filters.p5 || ""} onChange={(event) => setFilter("p5", event.target.value)} placeholder="请输入所属P5" />
        </label>
      </div>}
      <div className="order-table-card">
        <table className="ranking-table order-detail-table">
          <thead>
            <tr>{columns.map(column => <th key={column.key} style={{ width: column.width }}>{column.label}</th>)}</tr>
          </thead>
          <tbody>
            {visibleRows.map(row => <tr key={row.detailNo}>
              {columns.map(column => <td key={column.key} className={`${column.phone ? "ranking-phone" : ""}${column.key === "paymentAmount" ? " ranking-marker-cell" : ""}`}>
                {column.key === "paymentAmount" ? renderAmount(row) : row[column.key]}
              </td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
      <div className="ranking-pagination order-pagination">
        <span>共 {filteredRows.length} 条</span>
        <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}>
          <option value={5}>5条/页</option>
          <option value={10}>10条/页</option>
          <option value={20}>20条/页</option>
        </select>
        <button type="button" disabled={safePage === 1} onClick={() => setPage(Math.max(1, safePage - 1))}>‹</button>
        <button type="button" className="active-page-number">1</button>
        <button type="button" disabled={safePage === pageCount} onClick={() => setPage(Math.min(pageCount, safePage + 1))}>›</button>
        <span>前往</span>
        <input value={safePage} onChange={(event) => setPage(Number(event.target.value) || 1)} />
        <span>页</span>
      </div>
    </div>
  </section>;
}

function Sidebar() {
  const primary = ["艺博士", "感召学员", "感召学员-爱心大使", "感召学院-分院", "平台业绩"];
  const secondary = ["P团队业绩", "大区感召学员", "区域感召学员", "任务执行统计看板", "未下发计划学员", "活动统计排行榜", "k线运营看板"];
  return <aside className="sidebar">
<div className="brand">
<div className="brand-mark">♛</div>
<div>
<b>艺博教育</b>
<small>YIBO EDUCATION</small>
</div>
</div>
<nav>
<a className="home">
<i>⌂</i>首页</a>
<div className="nav-group-title">数据展示 <b>⌃</b>
</div>{primary.map((item, i) => <a key={item} className={i === 0 ? "icon-nav" : item === "平台业绩" ? "sub-nav selected" : "sub-nav"}>{i === 0 && <i>◆</i>}{item}</a>)}{secondary.map((item, i) => <a key={item} className={i === 0 ? "icon-nav" : "sub-nav"}>{i === 0 && <i>▣</i>}{item}</a>)}</nav>
<div className="bottom-nav">
<a>
<i>◆</i>艺博士 <b>⌄</b>
</a>
<a>
<i>▣</i>感召产品配置 <b>⌄</b>
</a>
<a>数据展示配置 <b>⌄</b>
</a>
</div>
</aside>;
}

export function App() {
  const [active, setActive] = useState("finance");
  const [region, setRegion] = useState("全国");
  const [view, setView] = useState("dashboard");
  const [detailContext, setDetailContext] = useState(null);
  const [orderContext, setOrderContext] = useState(null);
  const [agentListReturnView, setAgentListReturnView] = useState("ranking-agent");
  const data = useMemo(() => active === "finance" ? finance : operation, [active]);
  const rankingType = view.startsWith("ranking-") ? view.replace("ranking-", "") : "p5";
  const isRanking = view.startsWith("ranking-");
  const rankingConfig = getRankingConfig(rankingType, detailContext);
  const openRanking = (type) => {
    setDetailContext(null);
    setOrderContext(null);
    setAgentListReturnView("ranking-agent");
    setView(`ranking-${type}`);
  };
  const openOrgDetail = (type, row) => {
    setDetailContext(row);
    setOrderContext(null);
    setAgentListReturnView(`ranking-${type}-agent-detail`);
    setView(`ranking-${type}-agent-detail`);
  };
  const openAgentOrderDetail = (row) => {
    setOrderContext(row);
    setAgentListReturnView(view);
    setView("ranking-agent-order-detail");
  };
  const detailTypeMatch = rankingType.match(/^(p[345])-agent-detail$/);
  const isOrderDetail = rankingType === "agent-order-detail";
  const pageTabs = isRanking
    ? (rankingType === "agent"
      ? [
        { label: "首页", view: "dashboard" },
        { label: "P团队业绩 ×", view: "dashboard" },
        { label: "平台业绩 ×", view: "dashboard" },
        { label: `● ${rankingConfig.pageLabel} ×`, view },
      ]
      : detailTypeMatch
        ? [
          { label: "首页", view: "dashboard" },
          { label: "业绩-P组织、代理商 ×", view: "dashboard" },
          { label: `${detailTypeMatch[1].toUpperCase()}全国排行 ×`, view: `ranking-${detailTypeMatch[1]}` },
          { label: `● ${rankingConfig.pageLabel} ×`, view },
        ]
        : isOrderDetail
          ? [
            { label: "首页", view: "dashboard" },
            { label: "业绩-P组织、代理商 ×", view: "dashboard" },
            { label: agentListReturnView === "ranking-agent" ? "代理商排行 ×" : "代理商明细 ×", view: agentListReturnView },
            { label: `● ${rankingConfig.pageLabel} ×`, view },
          ]
        : [
          { label: "首页", view: "dashboard" },
          { label: "业绩-P组织、代理商 ×", view: "dashboard" },
          { label: `● ${rankingConfig.pageLabel || "业绩-全国排行"} ×`, view },
        ])
    : [{ label: "首页", view: "dashboard" }, { label: "● 平台业绩 ×", view: "dashboard" }];
  const navigateToTab = (targetView) => {
    if (!/^ranking-p[345]-agent-detail$/.test(targetView) && targetView !== "ranking-agent-order-detail") setDetailContext(null);
    if (targetView !== "ranking-agent-order-detail") setOrderContext(null);
    setView(targetView);
  };
  return <div className="app-shell">
<Sidebar/>
<main className="content">
<header className="topbar">
<div className="crumb">
<span className="hamburger">☰</span>
<b>首页</b>
<i>/</i>
<span>{isRanking ? rankingConfig.pageLabel : "业绩统计报表"}</span>
</div>
<div className="top-actions">
<button>切换系统</button>
<span>⌕</span>
<span className="notice">♟<i>16</i>
</span>
<span>⛶</span>
<div className="avatar">管</div>
</div>
</header>
<div className="page-tabs">
{pageTabs.map((tab, index) => index === pageTabs.length - 1
  ? <span className="active-page" key={tab.label}>{tab.label}</span>
  : <span className="tab-link" key={tab.label} role="button" tabIndex={0} onClick={() => navigateToTab(tab.view)}>{tab.label}</span>)}
</div>
{isRanking ? (isOrderDetail
  ? <AgentOrderDetailPage agent={orderContext}/>
  : <RankingPage key={`${rankingType}-${detailContext?.p3 || detailContext?.p4 || detailContext?.p5 || ""}`} type={rankingType} config={rankingConfig} onOpenOrgDetail={openOrgDetail} onOpenAgentOrderDetail={openAgentOrderDetail}/>) : <>
<div className="page-title">业绩统计看板</div>
<section className="filter-bar">
<strong>统计周期: 2026-07-01 至 2026-07-31</strong>
<div className="filter-actions">
<label className="region-filter">
<span>大区</span>
<select value={region} onChange={(event) => setRegion(event.target.value)}>
<option value="全国">全国</option>
<option value="全部">全部</option>
<option value="西部大区">西部大区</option>
<option value="中部大区">中部大区</option>
<option value="东部大区">东部大区</option>
<option value="东南大区">东南大区</option>
</select>
</label>
<div className="time-filters">
<button className="active-filter">本月</button>
<button>本季</button>
<button>本年</button>
<button>日历</button>
</div>
</div>
</section>
<section className="business-tabs">
<button className={active === "finance" ? "active" : ""} onClick={() => setActive("finance")}>
<span className="tab-dot finance-dot"/>财务业绩</button>
<button className={active === "operation" ? "active" : ""} onClick={() => setActive("operation")}>
<span className="tab-dot op-dot"/>运营业绩</button>
</section>
<div className="tab-content" key={`${active}-${region}`}>
<Detail data={data} active={active} onOpenRanking={openRanking}/>
<Overview data={data} active={active} onOpenRanking={openRanking}/>
</div>
</>}
</main>
</div>;
}
