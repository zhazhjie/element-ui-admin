/**
 * 
 * @authors zhazhjie (zhazhjie@vip.qq.com)
 * @date    2018-05-14 10:00:27
 * @version 1.0
 */
(function(global, factory) {
  typeof exports !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.importExcel = factory());
})(window, function() {
  var rABS = false; //是否将文件读取为二进制字符串
  function importExcel(obj,callback) { //导入
    if (!obj.files) {
      return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var wb; //读取完成的数据
      var data = e.target.result;
      if (rABS) {
        wb = XLSX.read(btoa(fixdata(data)), { //手动转化
          type: 'base64'
        });
      } else {
        wb = XLSX.read(data, {
          type: 'binary'
        });
      }
      //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
      //wb.Sheets[Sheet名]获取第一个Sheet的数据
      var data=JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
      if(callback)
        callback(data);
    };
    if (rABS) {
      reader.readAsArrayBuffer(f);
    } else {
      reader.readAsBinaryString(f);
    }
  }

  function fixdata(data) { //文件流转BinaryString
    var o = "",
      l = 0,
      w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
  }
  return importExcel;
})
