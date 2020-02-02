/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2020-02-02 10:25:27
 * @version: 1.0
 */
import tableTemplate from './index';

const build = Object.create(null);
build.install = function (Vue) {
  Vue.component(tableTemplate.name, tableTemplate);
};
if (typeof window !== 'undefined' && window.Vue) {
  Vue.use(build);
}
