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
			hidden,
			type
		} = el;
		return {
			path: url || '/' + id,
			component: (resolve) => {
				if (!url) {
					if (parentId == 0) {
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
				hidden: hidden,
				type: type
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

export function formatTreeData(data, tier) {
	data.forEach((el, index) => {
		el._expanded = false;
		el._tier = tier;
		if (el.children && el.children.length) {
			formatTreeData(el.children, tier + 1)
		}
	})
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

Date.prototype.Format = function(fmt) { //author: meizz
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

function dataURItoFile(dataURI, fileName) {
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

export function compressImg(file, exprotType, maxWidth, maxHeight, callback) {
	let fr = new FileReader();
	fr.onload = function() {
		if(maxWidth||maxHeight){
			let img = new Image();
			img.onload = function() {
				let NW = img.naturalWidth;
				let NH = img.naturalHeight;
				let realW = NW;
				let realH = NH;
				let NR=NW/NH;
				let MR=maxWidth/maxHeight;
				let canvas = document.createElement('canvas');
				if(maxWidth&&maxHeight){
					if (NR >= MR && NW > maxWidth) {
						realW = maxWidth;
						realH = realW / NR;
					} else if (NR < MR && NH > maxHeight) {
						realH = maxHeight;
						realW = realH * NR;
					}
				}else if(maxWidth&&NW>maxWidth){
					realW = maxWidth;
					realH = realW / NR;
				}else if(maxHeight&&NH>maxHeight){
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
				if (callback)
					callback(exprotType=='file' ? dataURItoFile(imgData, file.name) : imgData);
			}
			img.src = fr.result;
		}else{
			let imgData=fr.result;
			callback(exprotType=='file' ? dataURItoFile(imgData, file.name) : imgData);
		}
	}
	fr.readAsDataURL(file)
}

export function isNumber(value){
  if(value == null || value == ""){
    return false;
  }
  let reg = /^[\d|\.]*$/;
  return reg.test(value);
}

export function validPhone(value){
  if(value == null || value == ""){
    return false;
  }
  let reg = /^\d{11}$/;
  return reg.test(value);
}
