export function getBankData(){
  let data = [
    {
        "label": "中国工商银行", 
        "value": "ICBC"
    }, 
    {
        "label": "招商银行", 
        "value": "CMB"
    }, 
    {
        "label": "中国光大银行", 
        "value": "CEB"
    }, 
    {
        "label": "中信银行", 
        "value": "CITIC"
    }, 
    {
        "label": "浦发银行", 
        "value": "SPDB"
    }, 
    {
        "label": "广发银行", 
        "value": "GDB"
    }, 
    {
        "label": "华夏银行", 
        "value": "HXBANK"
    }, 
    {
        "label": "中国建设银行", 
        "value": "CCB"
    }, 
    {
        "label": "交通银行", 
        "value": "COMM"
    }, 
    {
        "label": "中国银行", 
        "value": "BOC"
    }, 
    {
        "label": "中国民生银行", 
        "value": "CMBC"
    }, 
    {
        "label": "兴业银行", 
        "value": "CIB"
    }, 
    {
        "label": "平安银行", 
        "value": "SPABANK"
    }, 
    {
        "label": "营口银行", 
        "value": "BOYK"
    }, 
    {
        "label": "友利银行", 
        "value": "WOORI"
    }, 
    {
        "label": "乌海银行", 
        "value": "WHBANK"
    }, 
    {
        "label": "长春经开融丰村镇银行", 
        "value": "JKRFCZYH"
    }, 
    {
        "label": "江西省农村信用社", 
        "value": "JXRCU"
    }, 
    {
        "label": "海南省农村信用社", 
        "value": "BOHN"
    }, 
    {
        "label": "重庆农村商业银行", 
        "value": "CRCBANK"
    }, 
    {
        "label": "鞍山银行", 
        "value": "ASCB"
    }, 
    {
        "label": "海口联合农商银行", 
        "value": "UBCHN"
    }, 
    {
        "label": "包商银行", 
        "value": "BSB"
    }, 
    {
        "label": "常熟农商银行", 
        "value": "CSRCB"
    }, 
    {
        "label": "晋商银行", 
        "value": "JSB"
    }, 
    {
        "label": "湖北省农信社", 
        "value": "HURCB"
    }, 
    {
        "label": "恒丰银行", 
        "value": "EGBANK"
    }, 
    {
        "label": "莱商银行", 
        "value": "LSBANK"
    }, 
    {
        "label": "金华银行", 
        "value": "JHBANK"
    }, 
    {
        "label": "临商银行", 
        "value": "LSBC"
    }, 
    {
        "label": "银座村镇银行", 
        "value": "YZBANK"
    }, 
    {
        "label": "厦门银行", 
        "value": "XMBANK"
    }, 
    {
        "label": "东莞农村商业银行", 
        "value": "DRCBCL"
    }, 
    {
        "label": "攀枝花市商业银行", 
        "value": "PZHCCB"
    }, 
    {
        "label": "广东省农村信用社联合社", 
        "value": "GDRCC"
    }, 
    {
        "label": "珠海华润银行", 
        "value": "RBOZ"
    }, 
    {
        "label": "韩亚银行", 
        "value": "HANABANK"
    }, 
    {
        "label": "浙江民泰商业银行", 
        "value": "MTBANK"
    }, 
    {
        "label": "锦州银行", 
        "value": "BOJZ"
    }, 
    {
        "label": "廊坊银行", 
        "value": "LANGFB"
    }, 
    {
        "label": "中国农业银行", 
        "value": "ABC"
    }, 
    {
        "label": "天津滨海农村商业银行", 
        "value": "TJBHB"
    }, 
    {
        "label": "徽商银行", 
        "value": "HSBANK"
    }, 
    {
        "label": "宁夏黄河农村商业银行", 
        "value": "NXRCU"
    }, 
    {
        "label": "齐鲁银行", 
        "value": "QLBANK"
    }, 
    {
        "label": "无锡农村商业银行", 
        "value": "WRCB"
    }, 
    {
        "label": "潍坊银行", 
        "value": "BANKWF"
    }, 
    {
        "label": "浙商银行", 
        "value": "CZBANK"
    }, 
    {
        "label": "北京银行", 
        "value": "BJBANK"
    }, 
    {
        "label": "华融湘江银行", 
        "value": "HRXJB"
    }, 
    {
        "label": "焦作中旅银行", 
        "value": "JZCBANK"
    }, 
    {
        "label": "东亚银行", 
        "value": "HKBEA"
    }, 
    {
        "label": "江苏省农村信用社联合社", 
        "value": "JSRCU"
    }, 
    {
        "label": "贵州省农村信用社联合社", 
        "value": "GZRCU"
    }, 
    {
        "label": "枣庄银行", 
        "value": "ZZYH"
    }, 
    {
        "label": "张家港农村商业银行", 
        "value": "ZRCBANK"
    }, 
    {
        "label": "青岛银行", 
        "value": "QDCCB"
    }, 
    {
        "label": "广东南粤银行", 
        "value": "NYBANK"
    }, 
    {
        "label": "广西北部湾银行", 
        "value": "BGB"
    }, 
    {
        "label": "龙江银行", 
        "value": "DAQINGB"
    }, 
    {
        "label": "成都银行", 
        "value": "CDCB"
    }, 
    {
        "label": "葫芦岛银行", 
        "value": "HLDB"
    }, 
    {
        "label": "温州银行", 
        "value": "WZCB"
    }, 
    {
        "label": "广州农村商业银行", 
        "value": "GRCB"
    }, 
    {
        "label": "内蒙古银行", 
        "value": "H3CB"
    }, 
    {
        "label": "青海省农村信用社", 
        "value": "QHRC"
    }, 
    {
        "label": "吴江农村商业银行", 
        "value": "WJRCB"
    }, 
    {
        "label": "阜新银行", 
        "value": "FXCB"
    }, 
    {
        "label": "辽阳银行", 
        "value": "LYCB"
    }, 
    {
        "label": "湖北银行", 
        "value": "HBC"
    }, 
    {
        "label": "顺德农商银行", 
        "value": "SDEB"
    }, 
    {
        "label": "渤海银行", 
        "value": "BOHAIB"
    }, 
    {
        "label": "自贡银行", 
        "value": "ZGCCB"
    }, 
    {
        "label": "石嘴山银行", 
        "value": "SZSBK"
    }, 
    {
        "label": "乐山市商业银行", 
        "value": "LSCCB"
    }, 
    {
        "label": "重庆三峡银行", 
        "value": "CCQTGB"
    }, 
    {
        "label": "衡水市商业银行", 
        "value": "HSBK"
    }, 
    {
        "label": "大连银行", 
        "value": "DLB"
    }, 
    {
        "label": "河北银行", 
        "value": "BHB"
    }, 
    {
        "label": "盛京银行", 
        "value": "SJBANK"
    }, 
    {
        "label": "邢台银行", 
        "value": "XTB"
    }, 
    {
        "label": "东营银行", 
        "value": "DYCCB"
    }, 
    {
        "label": "网商银行", 
        "value": "ANTBANK"
    }, 
    {
        "label": "德州银行", 
        "value": "DZBANK"
    }, 
    {
        "label": "保定银行", 
        "value": "BDCBANK"
    }, 
    {
        "label": "长沙银行", 
        "value": "CSCB"
    }, 
    {
        "label": "浙江省农村信用社联合社", 
        "value": "ZJNX"
    }, 
    {
        "label": "杭州银行", 
        "value": "HZCB"
    }, 
    {
        "label": "晋中银行", 
        "value": "JZBANK"
    }, 
    {
        "label": "中银富登村镇银行", 
        "value": "BOCFCB"
    }, 
    {
        "label": "深圳农村商业银行", 
        "value": "SRCB"
    }, 
    {
        "label": "中原银行", 
        "value": "ZYB"
    }, 
    {
        "label": "山东省农村信用社联合社", 
        "value": "SDRCU"
    }, 
    {
        "label": "广州银行", 
        "value": "GCB"
    }, 
    {
        "label": "新疆农村信用社", 
        "value": "XJRCU"
    }, 
    {
        "label": "陕西省农信社", 
        "value": "SXRCCU"
    }, 
    {
        "label": "吉林银行", 
        "value": "JLBANK"
    }, 
    {
        "label": "泰安银行", 
        "value": "TACCB"
    }, 
    {
        "label": "贵阳银行", 
        "value": "GYCB"
    }, 
    {
        "label": "甘肃银行", 
        "value": "GSBANK"
    }, 
    {
        "label": "日照银行", 
        "value": "RZB"
    }, 
    {
        "label": "昆仑银行", 
        "value": "KLB"
    }, 
    {
        "label": "九江银行", 
        "value": "JJBANK"
    }, 
    {
        "label": "山西省农村信用社", 
        "value": "SXRCU"
    }, 
    {
        "label": "四川天府银行", 
        "value": "CGNB"
    }, 
    {
        "label": "浙江稠州商业银行", 
        "value": "CZCB"
    }, 
    {
        "label": "上海农商银行", 
        "value": "SHRCB"
    }, 
    {
        "label": "遂宁银行", 
        "value": "SNCCB"
    }, 
    {
        "label": "宁夏银行", 
        "value": "NXBANK"
    }, 
    {
        "label": "内蒙古农村信用社联合社", 
        "value": "NMGNXS"
    }, 
    {
        "label": "河北省农村信用社", 
        "value": "HBRCU"
    }, 
    {
        "label": "辽宁省农村信用社", 
        "value": "LNRCC"
    }, 
    {
        "label": "东营莱商村镇银行", 
        "value": "DYLSCB"
    }, 
    {
        "label": "天津银行", 
        "value": "TCCB"
    }, 
    {
        "label": "泉州银行", 
        "value": "BOQZ"
    }, 
    {
        "label": "宁波银行", 
        "value": "NBBANK"
    }, 
    {
        "label": "武汉农村商业银行", 
        "value": "WHRCB"
    }, 
    {
        "label": "江西银行", 
        "value": "NCB"
    }, 
    {
        "label": "北京农商行", 
        "value": "BJRCB"
    }, 
    {
        "label": "张家口银行", 
        "value": "ZJKCCB"
    }, 
    {
        "label": "济宁银行", 
        "value": "JNBANK"
    }, 
    {
        "label": "哈尔滨银行", 
        "value": "HRBANK"
    }, 
    {
        "label": "青海银行", 
        "value": "BOQH"
    }, 
    {
        "label": "宜宾市商业银行", 
        "value": "YBCCB"
    }, 
    {
        "label": "兰州银行", 
        "value": "LZYH"
    }, 
    {
        "label": "南京银行", 
        "value": "NJCB"
    }, 
    {
        "label": "晋城银行", 
        "value": "JINCHB"
    }, 
    {
        "label": "台州银行", 
        "value": "TZCB"
    }, 
    {
        "label": "重庆银行", 
        "value": "CQBANK"
    }, 
    {
        "label": "联合村镇银行", 
        "value": "URB"
    }, 
    {
        "label": "四川省农村信用社联合社", 
        "value": "SCRCU"
    }, 
    {
        "label": "长春绿园融泰村镇银行", 
        "value": "LYRTCZYH"
    }, 
    {
        "label": "富滇银行", 
        "value": "FDB"
    }, 
    {
        "label": "烟台银行", 
        "value": "YTBANK"
    }, 
    {
        "label": "中国邮政储蓄银行", 
        "value": "PSBC"
    }, 
    {
        "label": "广西壮族自治区农村信用社联合社", 
        "value": "GXRCU"
    }, 
    {
        "label": "平顶山银行", 
        "value": "BOP"
    }, 
    {
        "label": "绍兴银行", 
        "value": "SXCB"
    }, 
    {
        "label": "上海银行", 
        "value": "SHBANK"
    }, 
    {
        "label": "营口沿海银行", 
        "value": "YKYHCCB"
    }, 
    {
        "label": "齐商银行", 
        "value": "ZBCB"
    }, 
    {
        "label": "福建省农村信用社联合社", 
        "value": "FJNX"
    }, 
    {
        "label": "赣州银行", 
        "value": "GZB"
    }, 
    {
        "label": "湖州银行", 
        "value": "HZCCB"
    }, 
    {
        "label": "曲靖市商业银行", 
        "value": "QJCCB"
    }, 
    {
        "label": "嘉兴银行", 
        "value": "JXBANK"
    }, 
    {
        "label": "昆山农村商业银行", 
        "value": "KSRB"
    }, 
    {
        "label": "福建海峡银行", 
        "value": "FJHXBC"
    }, 
    {
        "label": "贵州银行", 
        "value": "ZYCBANK"
    }, 
    {
        "label": "浙江泰隆商业银行", 
        "value": "ZJTLCB"
    }, 
    {
        "label": "江苏长江商业银行", 
        "value": "CJCCB"
    }, 
    {
        "label": "南海农商银行", 
        "value": "NHB"
    }, 
    {
        "label": "柳州银行", 
        "value": "LZCCB"
    }, 
    {
        "label": "富邦华一银行", 
        "value": "FBBANK"
    }, 
    {
        "label": "泸州市商业银行", 
        "value": "LUZBANK"
    }, 
    {
        "label": "甘肃省农村信用社", 
        "value": "GSRCU"
    }, 
    {
        "label": "桂林银行", 
        "value": "GLBANK"
    }, 
    {
        "label": "郑州银行", 
        "value": "ZZBANK"
    }, 
    {
        "label": "江苏太仓农村商业银行", 
        "value": "TCRCB"
    }, 
    {
        "label": "湖商村镇银行", 
        "value": "HSCZB"
    }, 
    {
        "label": "成都农商银行", 
        "value": "CDRCB"
    }, 
    {
        "label": "尧都农商银行村镇银行", 
        "value": "YDNSCZYH"
    }, 
    {
        "label": "鄂尔多斯银行", 
        "value": "ORBANK"
    }, 
    {
        "label": "宁波鄞州农商行", 
        "value": "NBYZ"
    }, 
    {
        "label": "江苏银行", 
        "value": "JSBANK"
    }, 
    {
        "label": "吉林省农村信用社联合社", 
        "value": "JLRCU"
    }, 
    {
        "label": "云南省农村信用社", 
        "value": "YNRCC"
    }
]
  return data;
}
