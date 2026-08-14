import React, { useMemo, useState } from "react";

const regional = [
  { name: "中部大区", value: 51, color: "#466ff2" },
  { name: "西部大区", value: 28, color: "#c74ff3" },
  { name: "东南大区", value: 14, color: "#ff8b20" },
  { name: "东部大区", value: 7, color: "#ffb267" },
];
const fifthRegion = { name: "第五大区", value: 6, color: "#5bc5a5" };

const financeRegionTotals = {
  "西部大区": 107910,
  "中部大区": 73010,
  "东部大区": 14900,
  "东南大区": 9860,
  "第五大区": 6200,
};

const operationRegionTotals = {
  "西部大区": 112680,
  "中部大区": 76840,
  "东部大区": 15180,
  "东南大区": 10360,
  "第五大区": 7350,
};

const formatShortCurrency = value => `¥${Number(value || 0).toLocaleString("zh-CN")}`;
const stripCurrencyDecimal = value => String(value || "").replace(/\.00$/, "");
const formatRegionAmount = value => `${Number(value || 0).toLocaleString("zh-CN")}元`;
const regionPerformanceItems = [
  { name: "西部大区", color: "#5573c8", legendClass: "blue", calloutClass: "l-two" },
  { name: "中部大区", color: "#92cc72", legendClass: "green", calloutClass: "l-one" },
  { name: "东部大区", color: "#fac653", legendClass: "yellow", calloutClass: "l-three" },
  { name: "东南大区", color: "#ec6b70", legendClass: "red", calloutClass: "l-four" },
  { name: "第五大区", color: "#5bc5a5", legendClass: "teal", calloutClass: "l-five" },
];
const buildRegionPieGradient = (totals = {}) => {
  const sum = regionPerformanceItems.reduce((total, item) => total + Number(totals[item.name] || 0), 0);
  if (!sum) return "conic-gradient(#eef2f7 0 100%)";
  let current = 0;
  return `conic-gradient(${regionPerformanceItems.map(item => {
    const value = Number(totals[item.name] || 0);
    const start = current;
    current += value / sum * 100;
    return `${item.color} ${start.toFixed(2)}% ${current.toFixed(2)}%`;
  }).join(", ")})`;
};

const finance = {
  label: "代理商业绩",
  total: "¥199,876.00",
  compare: "较上月：¥166,289.00",
  rate: "495.1%",
  ambassador: "¥58,918.00",
  branch: "¥140,958.00",
  regionTotals: financeRegionTotals,
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
  regionTotals: operationRegionTotals,
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
  { rank: 33, p5: "第五区域", owner: "沈嘉怡", phone: "138 0571 5612", region: "第五大区", amount: 6200 },
];
const p4RankingRows = [
  { rank: 1, p4: "新疆区域", p4Owner: "魏永红", p4OwnerPhone: "138 9910 3081", p5: "新疆区域", p5Owner: "梁丽红", p5OwnerPhone: "138 9910 7201", region: "西部大区", amount: 64700 },
  { rank: 2, p4: "西南区域", p4Owner: "卢秋羽", p4OwnerPhone: "139 0281 7620", p5: "西南区域", p5Owner: "-", p5OwnerPhone: "-", region: "西部大区", amount: 43210 },
  { rank: 3, p4: "鲁太吕区域", p4Owner: "宁静", p4OwnerPhone: "137 0531 4082", p5: "鲁太吕区域", p5Owner: "-", p5OwnerPhone: "-", region: "中部大区", amount: 29800 },
  { rank: 4, p4: "京津冀区域", p4Owner: "肖君", p4OwnerPhone: "136 0108 6917", p5: "京津冀区域", p5Owner: "王丽娜", p5OwnerPhone: "136 0108 4527", region: "中部大区", amount: 29800 },
  { rank: 5, p4: "洛阳区域", p4Owner: "王志刚", p4OwnerPhone: "137 3790 6681", p5: "洛阳区域", p5Owner: "王志刚", p5OwnerPhone: "137 3790 6681", region: "中东大区", amount: 14900 },
  ...Array.from({ length: 59 }, (_, index) => {
    const rank = index + 6;
    const regions = ["西部大区", "中部大区", "东部大区", "东南大区", "第五大区"];
    const names = ["江浙区域", "华南区域", "湖北区域", "豫北区域", "江西区域", "川渝区域", "山东区域", "桂滇区域"];
    const owners = ["周晓梅", "陈静", "刘霞", "李国强", "胡敏", "唐燕", "张云", "何丽"];
    const p5NamesList = ["新疆区域", "西南区域", "京津冀区域", "洛阳区域", "山东区域", "第五区域"];
    const p5Owners = ["梁丽红", "-", "王丽娜", "王志刚", "张云", "沈嘉怡"];
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
    const regions = ["西部大区", "中部大区", "东部大区", "东南大区", "第五大区"];
    const p3NamesList = ["刘霞", "李国强", "胡敏", "唐燕", "张云", "何丽", "黄洁", "谢琳", "赵芳", "孙梅"];
    const p4NamesList = ["江浙区域", "华南区域", "湖北区域", "豫北区域", "江西区域"];
    const p5NamesList = ["新疆区域", "西南区域", "京津冀区域", "洛阳区域", "山东区域", "第五区域"];
    const p4Owners = ["周晓梅", "陈静", "刘霞", "李国强", "胡敏"];
    const p5Owners = ["梁丽红", "-", "王丽娜", "王志刚", "张云", "沈嘉怡"];
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
  const regionCycle = ["中部大区", "西部大区", "中部大区", "中东大区", "东南大区", "第五大区"];
  const p3Names = ["高源徽", "赵云珊", "贾嘉男", "王志刚", "刘俊云", "张玉红", "蒲丽梅", "魏永红", "宁静", "肖君"];
  const p4Names = ["蒲丽梅", "魏永红", "宁静", "肖君", "王志刚", "卢秋羽", "赵云珊", "刘俊云"];
  const p5Names = ["临汾区域", "新疆区域", "鲁太吕区域", "洛阳区域", "新西区域", "重庆区域", "华东区域", "华南区域", "第五区域"];
  const p5Owners = ["许芳莲", "梁丽红", "-", "王志刚", "赵云珊", "刘俊云", "高源徽", "魏永红", "沈嘉怡"];
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
<div className="mini-bars">{items.map(([name, value, amount], index) => <div className="summary-row" key={name}>
<span className={index < 3 ? `summary-place place place-${index + 1}` : "summary-place plain-place"}>{index + 1}</span>
<label>{name}</label>
<i>
<b style={{ width: `${value === 0 ? 0 : Math.max(3, value / max * 100)}%` }}/>
</i>
<strong className="summary-amount">{amount}</strong>
</div>)}</div>
</article>;
}

function RegionPerformanceCard({ title, totals, extraClassName = "" }) {
  return <article className={`chart-panel regional-performance-card card ${extraClassName}`.trim()}>
<h3>{title}</h3>
<div className="large-pie-wrap">
<div className="large-pie" style={{ background: buildRegionPieGradient(totals) }}/>
{regionPerformanceItems.map(item => <div className={`pie-callout ${item.calloutClass}`} style={{ "--callout-color": item.color }} key={item.name}>
<i className="pie-callout-dot"/>
<b>{item.name}</b><span>{formatRegionAmount(totals?.[item.name])}</span></div>)}
</div>
<div className="under-legend">
{regionPerformanceItems.map(item => <span className="legend-item" key={item.name}>
<i className={item.legendClass}/>{item.name}</span>)}</div>
  </article>;
}

function Overview({ data, active, onOpenRanking }) {
  const branchItems = [["CY0527爱心大使", 100, "¥59,600"], ["新疆赵娟分院", 83, "¥49,800"], ["洛阳程爱霞分院", 50, "¥29,800"], ["新疆杨利分院", 3, "¥1,080"], ["乌海孙国栋分院", 1, "¥678"]];
  const ambassadorItems = active === "finance" ? [["爱心大使刘志力", 100, "¥26,820"], ["JX爱心大使", 91, "¥24,500"], ["JX51爱心大使", 8, "¥7,598"], ["ZHB-代理商", 0, "¥0"], ["爱心大使 董芳英", 0, "¥0"], ["爱心大使白雪", 0, "¥0"]] : [["爱心大使刘志力", 100, "¥29,800"], ["JX爱心大使", 91, "¥27,018"], ["艺博集团", 35, "¥10,200"], ["刘鹏爱心大使", 19, "¥4,380"], ["JX51爱心大使", 8, "¥2,300"], ["ZHB-代理商", 0, "¥0"]];
  const maxAgent = Math.max(...data.agents.map(([, value]) => Number(value.replace(/[¥,]/g, ""))));
  return <>
    <section className="rank-section">
<SectionTitle action="全部" onActionClick={() => onOpenRanking("agent")}>{active === "finance" ? "代理商排行" : `${data.label}排行`}</SectionTitle>
<div className="rank-grid">
<SummaryRank title="分院统计" total={data.branch} compare="较上月: ¥110,900.00" items={branchItems}/>
<SummaryRank title="爱心大使统计" total={data.ambassador} compare="较上月: ¥55,389.00" items={ambassadorItems}/>
<article className="national card">
<header>
<h3>
<span className="mini-icon purple-dot">●</span>代理商全国排行</h3>
</header>
<div className="national-list">{data.agents.slice(0, 10).map(([name, value], index) => { const amount = Number(value.replace(/[¥,]/g, "")); return <div className="national-row" key={name}>
<b className={index < 3 ? `place place-${index + 1}` : "plain-place"}>{index + 1}</b>
<span>{name}</span>
<div className="national-progress">
<i>
<b style={{ width: `${Math.max(3, amount / maxAgent * 100)}%` }}/>
</i>
</div>
<strong>{value}</strong>
</div>; })}</div></article>
</div>
</section>
  </>;
}

function Detail({ data, region, onOpenRanking }) {
  const selectedRegionTotal = region === "全国"
    ? stripCurrencyDecimal(data.total)
    : formatShortCurrency(data.regionTotals?.[region] || 0);
  const selectedRegionCompare = region === "全国"
    ? stripCurrencyDecimal(data.compare.replace("较上月：", ""))
    : formatShortCurrency(Math.round((data.regionTotals?.[region] || 0) * 0.86));
  const performanceCards = data.levels.map((title, index) => ({
      type: ["p5", "p4", "p3"][index],
      title,
      value: data.levelData[index],
      compare: "较上月 ¥168,640",
      showDetail: true,
    }));
  return <section className="detail-section">
    <div className="dashboard-top-grid">
      <article className="level-card total-performance-card card">
<div className="total-performance-content">
<div className="total-performance-head">
<span><i/>总业绩</span>
<small>{region === "全国" ? "全国汇总" : region}</small>
</div>
<div className="total-performance-main">
<span>总业绩统计</span>
<strong>{selectedRegionTotal}</strong>
</div>
<div className="total-performance-summary">
<div className="summary-item">
<span>较上月</span>
<b>{selectedRegionCompare}</b>
</div>
<div className="summary-item">
<span>增长率</span>
<b className="up">↑ {data.rate}</b>
</div>
</div>
</div>
      </article>
      <RegionPerformanceCard title="大区业绩" totals={data.regionTotals}/>
    </div>
    <div className="level-grid p-level-grid">{performanceCards.map(item => <article className="level-card card" key={item.title}>
 {item.showDetail && <button className="level-detail-button" type="button" onClick={() => onOpenRanking(item.type)}>明细</button>}
<p>{item.title}</p>
<strong>{item.value}</strong>
<small>{item.compare} <em>↑ 620.46%</em>
</small>
</article>)}</div>
    <div className="ranking-chart-grid">
<article className="chart-panel ranking-chart-card card">
<h3>P5全国排行 <button type="button" onClick={() => onOpenRanking("p5")}>全部</button>
</h3>
<Bars values={data.p5} accent="#ffc650"/>
</article>
<article className="chart-panel ranking-chart-card card">
<h3>P4全国排行 <button type="button" onClick={() => onOpenRanking("p4")}>全部</button>
</h3>
<Bars values={data.p4}/>
</article>
<article className="chart-panel ranking-chart-card card">
<h3>P3全国排行 <button type="button" onClick={() => onOpenRanking("p3")}>全部</button>
</h3>
<Bars values={data.p3} labels={p3Names}/>
</article>
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
  const regions = ["全部", "中部大区", "西部大区", "东部大区", "东南大区", "中东大区", "第五大区"];
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
  const regions = ["全部", "中部大区", "西部大区", "东部大区", "东南大区", "中东大区", "第五大区"];
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

const lineReportMetrics = {
  p: [
    { label: "累计有效业绩", value: "8,426", note: "较上周期 +12.6%", tone: "primary" },
    { label: "累计激活数", value: "8,693", note: "日均 272 人" },
    { label: "累计退款数", value: "267", note: "退款率 3.1%", tone: "danger" },
    { label: "日均有效业绩", value: "264", note: "统计 32 个自然日" },
    { label: "环比增长率", value: "+12.6%", note: "较上一统计周期", tone: "success" },
  ],
  s: [
    { label: "累计有效业绩", value: "8,426", note: "较上周期 +10.8%", tone: "primary" },
    { label: "累计激活数", value: "8,693", note: "日均 272 人" },
    { label: "累计退款数", value: "267", note: "退款率 3.1%", tone: "danger" },
    { label: "日均有效业绩", value: "264", note: "服务 S2 贡献" },
    { label: "环比增长率", value: "+10.8%", note: "较上一统计周期", tone: "success" },
  ],
};

const lineReportRows = {
  p: {
    region: [
      ["华北大区", "王静", "2 个下级", 2846, 2935, 89],
      ["华中大区", "刘璐", "4 个下级", 2214, 2288, 74],
      ["华南大区", "陈思", "6 个下级", 1886, 1945, 59],
      ["西部大区", "赵敏", "5 个下级", 1480, 1525, 45],
    ],
    p5: [["惠赣区域", "运营总监", "2 个下级", 2846, 2935, 89], ["深莞港区域", "运营总监", "4 个下级", 2214, 2288, 74], ["南粤闽湘江区域", "运营总监", "6 个下级", 1886, 1945, 59], ["大湾区区域", "运营总监", "5 个下级", 1480, 1525, 45], ["华东区域", "运营总监", "2 个下级", 1342, 1390, 48], ["测试测试测试", "运营总监", "6 个下级", 1126, 1164, 38], ["广佛闽荆湘区域", "运营总监", "2 个下级", 978, 1005, 27]],
    p4: [["P4-京津冀", "孙菲", "5 个 P3", 1128, 1164, 36], ["P4-山东", "李楠", "4 个 P3", 948, 973, 25], ["P4-河南", "周倩", "3 个 P3", 812, 846, 34]],
    p3: [["P3-京津冀一组", "张敏", "绑定 3 个 S3", 468, 486, 18], ["P3-京津冀二组", "陆然", "绑定 2 个 S3", 379, 392, 13], ["P3-山东一组", "高宁", "绑定 4 个 S3", 281, 294, 13]],
  },
  s: {
    s3: [["韦小群", "韦小群", "8 个下级", 1936, 1994, 58], ["张雪丽", "张雪丽", "7 个下级", 1714, 1768, 54], ["文贞粉", "文贞粉", "6 个下级", 1480, 1522, 42], ["王彦", "王彦", "5 个下级", 1218, 1250, 32]],
    s2: [["张世海", "张世海", "12 个下级", 634, 651, 17], ["翟红娜", "翟红娜", "10 个下级", 581, 600, 19], ["李小瑞", "李小瑞", "8 个下级", 499, 516, 17], ["刘晓丽", "刘晓丽", "7 个下级", 438, 452, 14], ["刘园园", "刘园园", "6 个下级", 385, 398, 13], ["张延芳", "张延芳", "5 个下级", 342, 353, 11], ["张晓燕", "张晓燕", "4 个下级", 296, 305, 9]],
    s1: [["S1-北京东区", "赵林", "0 个下级", 246, 254, 8], ["S1-北京西区", "孙璐", "0 个下级", 218, 224, 6], ["S1-天津服务组", "李薇", "0 个下级", 170, 173, 3]],
  },
};

const pLinePlatformFields = {
  "大区": {
    headers: ["大区", "大区负责人", "负责人电话", "下级数量"],
    values: (row, index) => [row[0], row[1], ["139 0108 6321", "138 0371 5568", "136 0206 7824", "137 0991 2406"][index], row[2]],
  },
  P5: {
    headers: ["P5", "P5负责人", "负责人电话", "下级数量"],
    values: (row, index) => [row[0], row[1], ["139 0108 6321", "138 0371 5568", "136 0206 7824", "137 0206 7825", "138 0571 2860", "139 0108 4852", "136 0206 3198"][index], row[2]],
  },
  P4: {
    headers: ["P4", "P4负责人", "负责人电话", "所属 P5", "P5负责人"],
    values: (row, index) => [row[0], row[1], ["138 0101 2368", "139 0531 8132", "137 0371 6624"][index], ["P5-华北", "P5-华北", "P5-华中"][index], ["王静", "王静", "刘璐"][index]],
  },
  P3: {
    headers: ["P3", "P3负责人", "负责人电话", "所属 P4", "P4负责人", "所属 P5", "P5负责人", "绑定 S3"],
    values: (row, index) => [row[0], row[1], ["136 0108 4852", "138 0108 5704", "139 0531 6842"][index], ["P4-京津冀", "P4-京津冀", "P4-山东"][index], ["孙菲", "孙菲", "李楠"][index], ["P5-华北", "P5-华北", "P5-华北"][index], "王静", row[2]],
  },
};

const lineReportTrend = {
  day: { labels: ["07-01", "07-05", "07-09", "07-13", "07-17", "07-21", "07-25", "07-31"], effective: [198, 232, 219, 274, 251, 305, 286, 318], activation: [214, 245, 238, 296, 271, 329, 312, 344], refund: [16, 13, 19, 22, 20, 24, 26, 26] },
  week: { labels: ["第 1 周", "第 2 周", "第 3 周", "第 4 周", "第 5 周"], effective: [1238, 1486, 1598, 1782, 2322], activation: [1290, 1540, 1661, 1843, 2359], refund: [52, 54, 63, 61, 37] },
  month: { labels: ["3 月", "4 月", "5 月", "6 月", "7 月"], effective: [6240, 6758, 7024, 7482, 8426], activation: [6421, 6960, 7236, 7725, 8693], refund: [181, 202, 212, 243, 267] },
};

function LineReportTrend({ granularity, visibleSeries, onToggleSeries }) {
  const trend = lineReportTrend[granularity];
  const series = [
    { key: "effective", label: "有效业绩", color: "#2f68d6", values: trend.effective },
    { key: "activation", label: "激活数", color: "#34a879", values: trend.activation },
    { key: "refund", label: "退款数", color: "#e26b6d", values: trend.refund },
  ];
  const max = Math.max(...series.flatMap(item => item.values)) * 1.15;
  const points = values => values.map((value, index) => `${46 + index * (350 / (values.length - 1))},${166 - value / max * 126}`).join(" ");
  return <section className="line-report-panel line-trend-panel">
    <div className="line-panel-head"><div><h3>业绩趋势</h3><span>按 {granularity === "day" ? "日" : granularity === "week" ? "周" : "月"} 汇总</span></div>
      <div className="line-legend">{series.map(item => <button className={visibleSeries[item.key] ? "active" : ""} type="button" onClick={() => onToggleSeries(item.key)} key={item.key}><i style={{ background: item.color }}/>{item.label}</button>)}</div></div>
    <div className="trend-canvas">
      <svg viewBox="0 0 420 205" role="img" aria-label="业绩趋势图">
        {[40, 82, 124, 166].map(y => <line key={y} x1="46" x2="396" y1={y} y2={y} className="trend-grid-line"/>)}
        {series.filter(item => visibleSeries[item.key]).map(item => <g key={item.key}><polyline points={points(item.values)} fill="none" stroke={item.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>{item.values.map((value, index) => <circle key={index} cx={46 + index * (350 / (item.values.length - 1))} cy={166 - value / max * 126} r="3" fill="#fff" stroke={item.color} strokeWidth="2"><title>{`${trend.labels[index]} ${item.label} ${value}`}</title></circle>)}</g>)}
        {trend.labels.map((label, index) => <text key={label} x={46 + index * (350 / (trend.labels.length - 1))} y="194" textAnchor="middle">{label}</text>)}
      </svg>
    </div>
  </section>;
}

function PTeamPerformanceRanking({ title, rows, nameKey }) {
  const rankingRows = rows.slice(0, 10);
  const maxAmount = Math.max(...rankingRows.map(row => row.amount));
  return <section className="line-team-ranking-card">
    <header><h3><i/> {title}</h3><span>业绩数量</span></header>
    <div className="line-team-ranking-list">{rankingRows.map((row, index) => <div className="line-team-ranking-row" key={row.rank}>
      <b className={index < 3 ? `team-rank rank-${index + 1}` : "team-rank"}>{index + 1}</b>
      <span className="team-rank-name">{row[nameKey]}</span>
      <i className="team-rank-track"><em style={{ width: `${Math.max(3, row.amount / maxAmount * 100)}%` }}/></i>
      <strong>{Number(row.amount).toLocaleString("zh-CN")}</strong>
    </div>)}</div>
  </section>;
}

function LinePerformanceReport() {
  const [line, setLine] = useState("p");
  const [granularity, setGranularity] = useState("day");
  const [period, setPeriod] = useState("month");
  const [region, setRegion] = useState("全部大区");
  const [keyword, setKeyword] = useState("");
  const [drill, setDrill] = useState([]);
  const [lineDetailPage, setLineDetailPage] = useState(null);
  const [memberDetailPage, setMemberDetailPage] = useState(null);
  const [detailKeyword, setDetailKeyword] = useState("");
  const [detailOwner, setDetailOwner] = useState("all");
  const [detailPageNumber, setDetailPageNumber] = useState(1);
  const [detailPageSize, setDetailPageSize] = useState(5);
  const [memberDetail, setMemberDetail] = useState(false);
  const [visibleSeries, setVisibleSeries] = useState({ effective: true, activation: true, refund: true });
  const pLevels = ["大区", "P5", "P4", "P3"];
  const sLevels = ["S3", "S2", "S1"];
  const levels = line === "p" ? pLevels : sLevels;
  const levelKey = line === "p" ? ["region", "p5", "p4", "p3"][drill.length] : ["s3", "s2", "s1"][drill.length];
  const currentLevel = levels[drill.length] || levels[levels.length - 1];
  const sourceRows = lineReportRows[line][levelKey] || [];
  const rows = sourceRows.filter(row => !keyword || row.slice(0, 3).join(" ").includes(keyword));
  const platformFields = line === "p" ? pLinePlatformFields[currentLevel] : null;
  const metadataHeaders = platformFields?.headers || [currentLevel + "名称", "负责人", line === "p" && currentLevel === "P3" ? "绑定 S线" : "下级数量"];
  const tableHeaders = [...metadataHeaders, "有效业绩", "激活数", "退款数", "日均业绩"];
  const tableCells = (row, index) => [
    ...(platformFields ? platformFields.values(row, index) : [row[0], row[1], row[2]]),
    row[3], row[4], row[5], Math.round(row[3] / 32),
  ];
  const exportCurrent = () => {
    const csv = ["组织,负责人,下级组织,有效业绩,激活数,退款数", ...rows.map(row => `${row[0]},${row[1]},${row[2]},${row[3]},${row[4]},${row[5]}`)].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
    link.download = `${line === "p" ? "P线" : "S线"}业绩报表_${region}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  const resetDetailList = () => { setDetailKeyword(""); setDetailOwner("all"); setDetailPageNumber(1); };
  const switchLine = nextLine => { setLine(nextLine); setDrill([]); setMemberDetail(false); setLineDetailPage(null); setMemberDetailPage(null); resetDetailList(); };
  const detailStartLevel = {
    p: { "大区": "P5", P5: "P4", P4: "P3", P3: "P3" },
    s: { S3: "S2", S2: "S1", S1: "S1" },
  };
  const detailNextLevel = {
    p: { P5: "P4", P4: "P3" },
    s: { S3: "S2" },
  };
  const detailRowKey = {
    p: { P5: "p5", P4: "p4", P3: "p3" },
    s: { S3: "s3", S2: "s2", S1: "s1" },
  };
  const p3BoundS3Rows = {
    "P3-京津冀一组": lineReportRows.s.s3.slice(0, 3),
    "P3-京津冀二组": lineReportRows.s.s3.slice(1, 3),
    "P3-山东一组": lineReportRows.s.s3,
  };
  const openLineDetailPage = row => {
    const childLevel = detailStartLevel[line][currentLevel];
    setLineDetailPage({ rootLine: line, pages: [{ line, parentName: row[0], level: childLevel }] });
    resetDetailList();
  };
  const drillDetailPage = row => {
    const activePage = lineDetailPage.pages[lineDetailPage.pages.length - 1];
    const isP3Binding = activePage.line === "p" && activePage.level === "P3";
    const childLine = isP3Binding ? "s" : activePage.line;
    const childLevel = isP3Binding ? "S3" : detailNextLevel[activePage.line][activePage.level];
    if (!childLevel) return;
    const childPage = { line: childLine, parentName: row[0], level: childLevel };
    if (isP3Binding) childPage.rows = p3BoundS3Rows[row[0]] || [];
    setLineDetailPage({ ...lineDetailPage, pages: [...lineDetailPage.pages, childPage] });
    resetDetailList();
  };
  const openMemberDetailPage = row => {
    const activePage = lineDetailPage.pages[lineDetailPage.pages.length - 1];
    setMemberDetailPage({ s2Name: row[0], s3Name: activePage.parentName, p3Name: "P3-京津冀一组" });
    resetDetailList();
  };
  if (memberDetailPage) {
    const members = [["张语涵", "138 0108 4852", "2026-07-29 10:26", "-"], ["陈思远", "139 0531 6842", "2026-07-29 14:18", "-"], ["周雨桐", "137 0371 6624", "2026-07-28 09:42", "2026-07-30 11:08"], ["李明轩", "136 0206 3198", "2026-07-27 16:06", "-"], ["王诗涵", "138 0571 2860", "2026-07-27 11:32", "-"]];
    return <section className="line-detail-page"><div className="line-detail-page-head"><div><div className="line-breadcrumb"><button type="button" onClick={() => { setMemberDetailPage(null); resetDetailList(); }}>返回 S2业绩明细</button><i>/</i><button type="button" onClick={() => { setMemberDetailPage(null); resetDetailList(); }}>{memberDetailPage.s2Name}</button></div><h1>卓越家族会员明细</h1><p>{memberDetailPage.s2Name} 服务的卓越家族会员列表</p></div></div><section className="line-report-panel line-detail-list-panel"><div className="line-table-wrap"><table className="line-table member-table"><thead><tr>{["学员名称", "电话号码", "激活时间", "退款时间", "服务 S2", "归属 S3", "绑定 P3"].map(header => <th key={header}>{header}</th>)}</tr></thead><tbody>{members.map(member => <tr key={member[1]}>{[...member, memberDetailPage.s2Name, memberDetailPage.s3Name, memberDetailPage.p3Name].map((cell, index) => <td className={index === 3 && cell !== "-" ? "line-refund" : ""} key={index}>{cell}</td>)}</tr>)}</tbody></table></div></section></section>;
  }
  if (lineDetailPage) {
    const activeDetailPage = lineDetailPage.pages[lineDetailPage.pages.length - 1];
    const detailLine = activeDetailPage.line;
    const detailKey = detailRowKey[detailLine][activeDetailPage.level];
    const detailRows = activeDetailPage.rows || lineReportRows[detailLine][detailKey] || [];
    const detailFields = detailLine === "p"
      ? pLinePlatformFields[activeDetailPage.level]
      : { headers: [`${activeDetailPage.level}名称`, "负责人", "下级数量"], values: row => [row[0], row[1], row[2]] };
    const detailHeaders = [...detailFields.headers, "有效业绩", "激活数", "退款数", "日均业绩"];
    const canDrillDetail = activeDetailPage.level === "P3" || Boolean(detailNextLevel[detailLine][activeDetailPage.level]);
    const opensMemberDetail = detailLine === "s" && activeDetailPage.level === "S2";
    const detailOwners = [...new Set(detailRows.map(row => row[1]))];
    const filteredDetailRows = detailRows.filter(row => (!detailKeyword || row.slice(0, 3).join(" ").includes(detailKeyword)) && (detailOwner === "all" || row[1] === detailOwner));
    const totalDetailPages = Math.max(1, Math.ceil(filteredDetailRows.length / detailPageSize));
    const activeDetailPageNumber = Math.min(detailPageNumber, totalDetailPages);
    const pagedDetailRows = filteredDetailRows.slice((activeDetailPageNumber - 1) * detailPageSize, activeDetailPageNumber * detailPageSize);
    return <section className="line-detail-page">
      <div className="line-detail-page-head"><div><div className="line-breadcrumb"><button type="button" onClick={() => { setLineDetailPage(null); resetDetailList(); }}>返回 {lineDetailPage.rootLine === "p" ? "P线业绩统计" : "S线业绩统计"}</button>{lineDetailPage.pages.map((page, index) => <React.Fragment key={`${page.line}-${page.parentName}-${page.level}`}><i>/</i><button type="button" onClick={() => { setLineDetailPage({ ...lineDetailPage, pages: lineDetailPage.pages.slice(0, index + 1) }); resetDetailList(); }}>{page.parentName}</button></React.Fragment>)}</div><h1>{activeDetailPage.parentName} - {activeDetailPage.level}业绩明细</h1><p>当前组织下属 {activeDetailPage.level} 的业绩列表</p></div></div>
      <section className="line-report-panel line-detail-list-panel"><div className="line-detail-tools"><label><span>组织/负责人</span><input value={detailKeyword} onChange={event => { setDetailKeyword(event.target.value); setDetailPageNumber(1); }} placeholder="输入组织或负责人"/></label><label><span>负责人</span><select value={detailOwner} onChange={event => { setDetailOwner(event.target.value); setDetailPageNumber(1); }}><option value="all">全部负责人</option>{detailOwners.map(owner => <option value={owner} key={owner}>{owner}</option>)}</select></label><button className="line-search-button" type="button" onClick={() => setDetailPageNumber(1)}>查询</button><button className="line-detail-reset" type="button" onClick={resetDetailList}>重置</button></div><div className="line-table-wrap"><table className="line-table"><thead><tr>{detailHeaders.map(header => <th key={header}>{header}</th>)}<th>操作</th></tr></thead><tbody>{pagedDetailRows.map(row => <tr key={row[0]}>{[...detailFields.values(row, detailRows.indexOf(row)), row[3], row[4], row[5], Math.round(row[3] / 32)].map((cell, cellIndex) => <td className={cellIndex === detailFields.headers.length ? "line-amount" : cellIndex === detailFields.headers.length + 2 ? "line-refund" : ""} key={`${row[0]}-${cellIndex}`}>{cell}</td>)}<td>{canDrillDetail && <button className="line-detail-button" type="button" onClick={() => drillDetailPage(row)}>{activeDetailPage.level === "P3" ? "查看绑定S3" : "查看详情"}</button>}</td></tr>)}{!pagedDetailRows.length && <tr><td colSpan={detailHeaders.length + 1} className="line-empty">暂无符合筛选条件的数据</td></tr>}</tbody></table></div><footer className="line-detail-pagination"><span>共 {filteredDetailRows.length} 条</span><label>每页 <select value={detailPageSize} onChange={event => { setDetailPageSize(Number(event.target.value)); setDetailPageNumber(1); }}><option value="5">5 条</option><option value="10">10 条</option><option value="20">20 条</option></select></label><button type="button" disabled={activeDetailPageNumber === 1} onClick={() => setDetailPageNumber(activeDetailPageNumber - 1)}>上一页</button>{Array.from({ length: totalDetailPages }, (_, index) => index + 1).map(page => <button type="button" className={page === activeDetailPageNumber ? "active" : ""} onClick={() => setDetailPageNumber(page)} key={page}>{page}</button>)}<button type="button" disabled={activeDetailPageNumber === totalDetailPages} onClick={() => setDetailPageNumber(activeDetailPageNumber + 1)}>下一页</button></footer></section>
    </section>;
  }
  return <section className="line-report-page">
    <div className="line-report-title"><div><h1>P线 &amp; S线业绩统计报表</h1><p>卓越家族会员日激活量，退款按审核通过日扣减</p></div><span className="data-freshness">数据更新：T+1</span></div>
    <section className="line-report-filters">
      <div className="line-period-filter"><span>统计周期</span><div className="line-period-options">{[["yesterday", "昨日"], ["week", "本周"], ["month", "本月"], ["year", "本年"], ["calendar", "日历"]].map(([value, label]) => <button key={value} className={period === value ? "active" : ""} type="button" onClick={() => setPeriod(value)}>{label}</button>)}</div>{period === "calendar" && <div className="line-custom-date"><input type="date" defaultValue="2026-07-01"/><b>至</b><input type="date" defaultValue="2026-07-31"/></div>}</div>
      <label><span>所属大区</span><select value={region} onChange={event => setRegion(event.target.value)}><option>全部大区</option><option>华北大区</option><option>华中大区</option><option>华南大区</option><option>西部大区</option></select></label>
      <label><span>组织/人员</span><input value={keyword} onChange={event => setKeyword(event.target.value)} placeholder="输入组织或负责人"/></label>
      <button className="line-search-button" type="button">查询</button><button className="line-export-button" type="button" onClick={exportCurrent}>导出列表</button>
    </section>
    <div className="line-report-tabs"><button type="button" className={line === "p" ? "active" : ""} onClick={() => switchLine("p")}>P线业绩统计</button><button type="button" className={line === "s" ? "active" : ""} onClick={() => switchLine("s")}>S线业绩统计</button></div>
    <section className="line-metric-grid">{lineReportMetrics[line].map(metric => <article className={`line-metric ${metric.tone || ""}`} key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.note}</small></article>)}</section>
    <section className="line-content-grid">
      <LineReportTrend granularity={granularity} visibleSeries={visibleSeries} onToggleSeries={key => setVisibleSeries({ ...visibleSeries, [key]: !visibleSeries[key] })}/>
      <aside className="line-report-note"><span>统计口径</span><strong>有效业绩 = 激活数 - 退款数</strong><p>同一会员多次激活仅首次计入；退款只扣减一次。</p></aside>
    </section>
    <section className="line-report-panel line-table-panel">
      <div className="line-panel-head"><div><h3>{line === "p" ? "P线层级业绩明细" : "S线层级业绩明细"}</h3><span>点击查看详情可下钻查看下级</span></div>{line === "s" && <div className="line-granularity">{["day", "week", "month"].map(item => <button type="button" className={granularity === item ? "active" : ""} onClick={() => setGranularity(item)} key={item}>{item === "day" ? "日" : item === "week" ? "周" : "月"}</button>)}</div>}</div>
      <div className="line-breadcrumb"><button type="button" onClick={() => { setDrill([]); setMemberDetail(false); }}>{line === "p" ? "P线总览" : "S6总览"}</button>{drill.map((item, index) => <React.Fragment key={item}><i>/</i><button type="button" onClick={() => { setDrill(drill.slice(0, index + 1)); setMemberDetail(false); }}>{item}</button></React.Fragment>)}</div>
      <div className="line-table-wrap"><table className="line-table"><thead><tr>{tableHeaders.map(header => <th key={header}>{header}</th>)}<th>操作</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]}>{tableCells(row, index).map((cell, cellIndex) => <td className={cellIndex === metadataHeaders.length ? "line-amount" : cellIndex === metadataHeaders.length + 2 ? "line-refund" : ""} key={`${row[0]}-${cellIndex}`}>{cell}</td>)}<td><button className="line-detail-button" type="button" onClick={() => openLineDetailPage(row)}>{currentLevel === "S2" ? "查看明细" : "查看详情"}</button></td></tr>)}{!rows.length && <tr><td colSpan={tableHeaders.length + 1} className="line-empty">暂无符合筛选条件的数据</td></tr>}</tbody></table></div>
    </section>
    {line === "p" && drill.length === 0 && <section className="line-team-ranking-section">
      <PTeamPerformanceRanking title="P5团队业绩排行" rows={p5RankingRows} nameKey="p5"/>
      <PTeamPerformanceRanking title="P4团队业绩排行" rows={p4RankingRows} nameKey="p4"/>
      <PTeamPerformanceRanking title="P3团队业绩排行" rows={p3RankingRows} nameKey="p3"/>
    </section>}
    {line === "p" && currentLevel === "P3" && <section className="line-report-panel line-binding-panel"><div className="line-panel-head"><div><h3>绑定 S线业绩透视</h3><span>当前 P3 绑定的 S3 / S2 业绩贡献</span></div></div><div className="binding-list">{[["S3-京津冀服务中心", "2,184", "3 个 S2"], ["S3-山东服务中心", "1,560", "4 个 S2"], ["S3-河南服务中心", "1,128", "2 个 S2"]].map(item => <div key={item[0]}><span>{item[0]}</span><small>{item[2]}</small><strong>{item[1]}</strong><button type="button" onClick={() => setMemberDetail(true)}>查看 S2</button></div>)}</div></section>}
    {memberDetail && <section className="line-report-panel member-detail-panel"><div className="line-panel-head"><div><h3>服务会员明细</h3><span>最多可导出 100,000 行</span></div><button className="line-export-button" type="button" onClick={exportCurrent}>导出 Excel</button></div><div className="line-table-wrap"><table className="line-table member-table"><thead><tr><th>会员 ID</th><th>会员名称</th><th>激活时间</th><th>退款时间</th><th>服务 S2</th><th>归属 S3</th><th>状态</th></tr></thead><tbody>{[["JF202607001", "张语涵", "2026-07-29 10:26", "-", "S2-京津冀会员服务", "S3-华北服务中心", "已激活"], ["JF202607002", "陈思远", "2026-07-29 14:18", "-", "S2-山东会员服务", "S3-华北服务中心", "已激活"], ["JF202607003", "周雨桐", "2026-07-28 09:42", "2026-07-30 11:08", "S2-河南会员服务", "S3-华中服务中心", "已退款"]].map(row => <tr key={row[0]}>{row.map((cell, index) => <td className={index === 6 ? (cell === "已退款" ? "member-refunded" : "member-active") : ""} key={index}>{cell}</td>)}</tr>)}</tbody></table></div></section>}
  </section>;
}

function Sidebar({ onOpenDashboard, onOpenLineReport, lineReportOpen }) {
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
  </div>{primary.map((item, i) => <a key={item} className={i === 0 ? "icon-nav" : item === "平台业绩" && !lineReportOpen ? "sub-nav selected" : "sub-nav"} role={item === "平台业绩" ? "button" : undefined} tabIndex={item === "平台业绩" ? 0 : undefined} onClick={item === "平台业绩" ? onOpenDashboard : undefined}>{i === 0 && <i>◆</i>}{item}</a>)}{secondary.map((item, i) => <a key={item} className={i === 0 ? "icon-nav" : "sub-nav"}>{i === 0 && <i>▣</i>}{item}</a>)}<a className={`icon-nav line-report-nav ${lineReportOpen ? "selected" : ""}`} role="button" tabIndex={0} onClick={onOpenLineReport}><i>▣</i>P线 &amp; S线业绩统计报表</a></nav>
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
  const isLineReport = view === "line-report";
  const rankingConfig = getRankingConfig(rankingType, detailContext);
  const openRanking = (type) => {
    setDetailContext(null);
    setOrderContext(null);
    setAgentListReturnView("ranking-agent");
    setView(`ranking-${type}`);
  };
  const openOrgDetail = (type, row) => {
    const childRankingType = { p5: "p4", p4: "p3" }[type];
    if (childRankingType) {
      setDetailContext(null);
      setOrderContext(null);
      setAgentListReturnView("ranking-agent");
      setView(`ranking-${childRankingType}`);
      return;
    }
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
  const pageTabs = isLineReport
    ? [{ label: "首页", view: "dashboard" }, { label: "P线 & S线业绩统计报表 ×", view: "line-report" }]
    : isRanking
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
<Sidebar onOpenDashboard={() => setView("dashboard")} onOpenLineReport={() => setView("line-report")} lineReportOpen={isLineReport}/>
<main className="content">
<header className="topbar">
<div className="crumb">
<span className="hamburger">☰</span>
<b>首页</b>
<i>/</i>
<span>{isLineReport ? "P线 & S线业绩统计报表" : isRanking ? rankingConfig.pageLabel : "业绩统计报表"}</span>
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
  : <RankingPage key={`${rankingType}-${detailContext?.p3 || detailContext?.p4 || detailContext?.p5 || ""}`} type={rankingType} config={rankingConfig} onOpenOrgDetail={openOrgDetail} onOpenAgentOrderDetail={openAgentOrderDetail}/>) : isLineReport ? <LinePerformanceReport/> : <>
<div className="page-title">业绩统计看板</div>
<section className="filter-bar">
<strong>统计周期: 2026-07-01 至 2026-07-31</strong>
<div className="filter-actions">
<label className="region-filter">
<span>大区</span>
<select value={region} onChange={(event) => setRegion(event.target.value)}>
<option value="全国">全国</option>
<option value="西部大区">西部大区</option>
<option value="中部大区">中部大区</option>
<option value="东部大区">东部大区</option>
<option value="东南大区">东南大区</option>
<option value="第五大区">第五大区</option>
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
<Detail data={data} region={region} onOpenRanking={openRanking}/>
<Overview data={data} active={active} onOpenRanking={openRanking}/>
</div>
</>}
</main>
</div>;
}
