/** 
* @author: zhazhjie 
* @email: zhazhjie@vip.qq.com
* @date: 2018-09-20 10:25:27 
* @version: 1.0 
*/	
import permissionBtn from '../components/permissionBtn';
import tableTemplate from '../components/tableTemplate';

const commonEl=Object.create(null);
commonEl.install = function (Vue) {
  Vue.component(permissionBtn.name, permissionBtn);
  Vue.component(tableTemplate.name, tableTemplate);
};

export default commonEl;
