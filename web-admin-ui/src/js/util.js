/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2018-11-05 14:20:38
 * @version: 1.0
 */
export function setMenu(menu) {
  return menu.map(el => {
    const {
      id,
      url,
      name,
      icon,
      children,
      parentId,
      hidden
    } = el;
    return {
      path: url || '/' + id,
      component: (resolve) => {
        if (!url) {
          if (parentId === "0") {
            require(['@/views/index'], resolve)
          } else {
            require(['@/views/routerView'], resolve)
          }
        } else {
          require([`@/views${url}`], resolve)
        }
      },
      //name:name,
      meta: {
        name: name,
        icon: icon,
        hidden: hidden
      },
      children: (children && children.length) ? setMenu(children) : []
    }
  })
}

export function setStore(name, data, type) {
  if (type) {
    localStorage.setItem(name, JSON.stringify(data))
  } else {
    sessionStorage.setItem(name, JSON.stringify(data))
  }
}

export function getStore(name, type) {
  if (type) {
    return JSON.parse(localStorage.getItem(name) || 'null')
  } else {
    return JSON.parse(sessionStorage.getItem(name) || 'null')
  }
}

export function toTreeData(list, parentId = 0, idKey = "id", parentIdKey = "parentId") {
  let treeList = [];
  list.forEach(el => {
    if (el[parentIdKey] === parentId) {
      treeList.push(findChildren(el, list, idKey, parentIdKey, 1));
    }
  });
  return treeList;
}

function findChildren(parent, list, idKey, parentIdKey, level) {
  parent._level = level;
  level++;
  list.forEach((el) => {
    if (parent[idKey] === el[parentIdKey]) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(findChildren(el, list, idKey, parentIdKey, level));
    }
  });
  return parent;
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  let res = []
  let temp = {}
  for (let i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * list转map
 * @param list
 * @param key
 * @returns {*}
 */
export function listToMap(list, key = "id") {
  let map = {};
  list.forEach(item => {
    map[item[key]] = item;
  })
  return map;
}

Date.prototype.Format = function (fmt) { //author: meizz
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 验证手机号
 * @param phone
 * @returns {boolean}
 */
export function phoneValidate(phone) {
  let reg = /^1[23456789]\d{9}$/;
  return reg.test(phone);
}

/**
 * base64转文件流
 * @param dataURI
 * @param fileName
 * @returns {File}
 */
export function dataURLtoFile(dataURI, fileName) {
  let type = dataURI.split(';')[0].split('/')[1];
  let byteString = atob(dataURI.split(',')[1]);
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  // return new Blob([ab], { type: 'image/jpeg' });
  return new File([ia], fileName || 'file', {
    type: type,
    lastModified: Date.now()
  })
}

/**
 * 文件流转base64
 * @param file
 * @param cb
 */
export function fileToDataURL(file, cb) {
  let fr = new FileReader();
  fr.onload = function () {
    if (cb)
      cb(fr.result);
  };
  fr.readAsDataURL(file);
}

/**
 * 判断是否为IOS系统
 * @returns {boolean}
 */
export function isIOS() {
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}

/**
 * 获取cookie
 * @param name
 * @returns {string}
 */
export function getCookie(name) {
  name += "=";
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(name) === 0) return cookie.substring(name.length, cookie.length);
  }
  return "";
}

/**
 * 设置cookie
 * @param name
 * @param value
 * @param exTime
 * @param domain
 */
export function setCookie(name, value, exTime, domain) {
  let date = new Date();
  if (exTime) date.setTime(date.getTime() + (exTime * 1000 || 0));
  let expires = "expires=" + date.toGMTString();
  document.cookie = name + "=" + value + "; " + expires + (domain ? ";domain=" + domain : "");
}

/**
 * 压缩图片
 * @param data
 */
export function compressImg(data) {
  let {file, exportType, maxWidth, maxHeight} = data;
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = function () {
      if (maxWidth || maxHeight) {
        let img = new Image();
        img.onload = function () {
          let NW = img.naturalWidth;
          let NH = img.naturalHeight;
          let realW = NW;
          let realH = NH;
          let NR = NW / NH;
          let MR = maxWidth / maxHeight;
          let canvas = document.createElement('canvas');
          if (maxWidth && maxHeight) {
            if (NR >= MR && NW > maxWidth) {
              realW = maxWidth;
              realH = realW / NR;
            } else if (NR < MR && NH > maxHeight) {
              realH = maxHeight;
              realW = realH * NR;
            }
          } else if (maxWidth && NW > maxWidth) {
            realW = maxWidth;
            realH = realW / NR;
          } else if (maxHeight && NH > maxHeight) {
            realH = maxHeight;
            realW = realH * NR;
          }
          canvas.width = realW;
          canvas.height = realH;
          let ctx = canvas.getContext('2d');
          ctx.rect(0, 0, realW, realH);
          ctx.fillStyle = "rgba(0,0,0,0)";
          ctx.fill();
          ctx.drawImage(img, 0, 0, realW, realH);
          let imgData = canvas.toDataURL();
          resolve(exportType === 'file' ? dataURLtoFile(imgData, file.name) : imgData);
        };
        img.onerror = function () {
          reject();
        };
        img.src = fr.result;
      } else {
        let imgData = fr.result;
        resolve(exportType === 'file' ? dataURLtoFile(imgData, file.name) : imgData);
      }
    };
    fr.onerror = function () {
      reject();
    };
    fr.readAsDataURL(file)
  });
}

/**
 * 防抖函数
 * @param callback
 * @param delay
 */
export function debounce(callback, delay) {
  clearTimeout(callback.tId);
  callback.tId = setTimeout(() => {
    callback();
  }, delay)
}

/**
 * 节流函数
 * @param callback
 * @param delay
 */
export function throttle(callback, delay) {
  if (callback.canDo === false) return;
  callback.canDo = false;
  callback();
  setTimeout(() => {
    callback.canDo = true;
  }, delay)
}

/**
 * 格式化金额（向下取整）
 * @param value
 * @returns {string}
 */
export function formatAmount(value) {
  if (!value) return '0.00';
  value += '';
  let index = value.indexOf('.');
  value = index > -1 ? value.substring(0, index + 3) : value;
  // value = Math.floor(value * 100)/100;
  if (value > 1000000) {
    return (value / 10000).toFixed(2) + '万'
  } else {
    return (+value).toFixed(2);
  }
}

/**
 * 格式化手机号
 * @param value
 * @returns {string}
 */
export function formatPhone(value) {
  value += "";
  return value.substr(0, 3) + "****" + value.substr(7, 4);
}

/**
 * 判断是否为微信浏览器
 * @returns {boolean}
 */
export function isWeiXin() {
  let ua = window.navigator.userAgent.toLowerCase();
  return /MicroMessenger/i.test(ua);
}

/**
 * 复制文本
 * @param el
 * @returns {boolean}
 */
export function copyText(text) {
  let el = document.createElement("span");
  el.innerText = text;
  el.style = "position:absolute;z-index:-1;opacity:0";
  document.body.appendChild(el);
  let range = document.createRange();
  range.selectNode(el);
  let selection = window.getSelection();
  if (selection.rangeCount > 0) selection.removeAllRanges();
  selection.addRange(range);
  let result = document.execCommand('copy');
  document.body.removeChild(el);
  return result;
}

/**
 * 获取小图标列表
 */
export function getIconList() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let iconString = xhr.responseText.replace(/@font-face {[^}]+}/, '');
        let iconList = iconString.match(/icon-[^:]+/ig);
        resolve(iconList);
      }
    };
    xhr.open('GET', '//at.alicdn.com/t/font_904872_39lanr15pjp.css');
    xhr.send();
  });

}
