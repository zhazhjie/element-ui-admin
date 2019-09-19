/**
 * @author: zzj
 * @date: 2019-09-17 17:57:11
 * @version: 1.0
 */	
export default [
  {
    path: '/richText',
    meta:{
      icon:"icon-align-left",
      name:'富文本'
    },
    component: (resolve)=>require(['@/views/help/richText'],resolve),
  },
  {
    path: '/excel',
    meta:{
      icon:"icon-swap",
      name:'导入导出excel'
    },
    component: (resolve)=>require(['@/views/help/excel'],resolve),
  },
  {
    path: '/iconfont',
    meta:{
      icon:"icon-font-colors",
      name:'小图标'
    },
    component: (resolve)=>require(['@/views/help/iconfont'],resolve),
  },
]
