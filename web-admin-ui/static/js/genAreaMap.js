/** 
* @author: zhazhjie 
* @email: zhazhjie@vip.qq.com
* @date: 2019-03-04 10:42:04 
* @version: 1.0 
*/	
onmessage = function(e) {
  let areaMap={};
  e.data.forEach(area=>{
    areaMap[area.regionCode]=area;
  })
  postMessage(areaMap);
}