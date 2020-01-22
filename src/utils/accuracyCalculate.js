/**
 * @author: zzj
 * @date: 2019-08-05 18:07:09
 * @version: 1.0
 * 扩展Number类
 * 修复如：0.1+0.2，0.58*100等精度问题，toFixed bug
 */

/**
 * 获取小数位长度
 * @param num
 * @returns {number}
 */
let getDecimalLen = num => ((num + "").split(".")[1] || "").length;
/**
 * 去小数点：小数转整数
 * @param num
 * @returns {number}
 */
let decimalToInteger = num => +(num + "").replace(/^0?\.0*|\./g, "");
/**
 * 10的次幂
 * @param index
 * @returns {number}
 */
let powerTen = index => Math.pow(10, index);
/**
 * 加法：支持多个数相加
 * 如：0.1.add(0.2,0.3)
 * @param args
 * @returns {number}
 */
Number.prototype.add = function (...args) {
  let allArgs = [this.valueOf(), ...args];
  let maxDecimalLen = Math.max(...allArgs.map(v => getDecimalLen(v)));
  return allArgs.reduce((total, cur) => {
    let curDecimalLen = getDecimalLen(cur);
    let diffDecimalLen = maxDecimalLen - curDecimalLen;
    return total + decimalToInteger(cur) * powerTen(diffDecimalLen);
  }, 0) / powerTen(maxDecimalLen);
};
/**
 * 减法，同上
 * @param args
 * @returns {number}
 */
Number.prototype.subtract = function (...args) {
  args = args.map(v => -v);
  return this.add(...args);
};
/**
 * 乘法，同上
 * @param args
 * @returns {any | number}
 */
Number.prototype.multiply = function (...args) {
  let allArgs = [this.valueOf(), ...args];
  return allArgs.reduce((total, cur) => {
    let curDecimalLen = getDecimalLen(cur);
    let totalDecimalLen = getDecimalLen(total);
    return decimalToInteger(total) * decimalToInteger(cur) / powerTen(curDecimalLen + totalDecimalLen);
  });
};
/**
 * 除法，同上
 * @param args
 * @returns {any}
 */
Number.prototype.divide = function (...args) {
  let allArgs = [this.valueOf(), ...args];
  return allArgs.reduce((total, cur) => {
    let curDecimalLen = getDecimalLen(cur);
    let totalDecimalLen = getDecimalLen(total);
    let diffDecimalLen = Math.abs(totalDecimalLen - curDecimalLen);
    if (totalDecimalLen > curDecimalLen) {
      return decimalToInteger(total) / (decimalToInteger(cur) * powerTen(diffDecimalLen));
    } else {
      return decimalToInteger(total) * powerTen(diffDecimalLen) / decimalToInteger(cur);
    }
  });
};

/**
 * 四舍五入，修复toFixed bug
 * @param fractionDigits
 * @returns {string}
 */
Number.prototype.$toFixed = function (fractionDigits) {
  let num = this.valueOf();
  if (num % 1 === 0) return this.toFixed(fractionDigits);
  let len = getDecimalLen(num);
  let value = Math.round(decimalToInteger(num) / powerTen(len - fractionDigits)) / powerTen(fractionDigits);
  let result = (value + "").split(".");
  return result[0] + (result[1] ? "." + result[1].padEnd(fractionDigits, "0") : "");
};

/**
 * 取整
 * @param num
 * @param fractionDigits
 * @param down
 * @returns {string}
 */
function rounding(num, fractionDigits, down) {
  let decimalLen = getDecimalLen(num);
  if (decimalLen <= fractionDigits) {
    return num.$toFixed(fractionDigits);
  } else {
    let len = decimalLen - fractionDigits;
    let intVal = decimalToInteger(num);
    let diff = powerTen(len) >> 1;
    intVal = down ? intVal - diff : intVal + diff;
    num = intVal / powerTen(decimalLen);
    return num.$toFixed(fractionDigits);
  }
}

/**
 * 格式化数值
 * @param fractionDigits 保留小数位
 * @param roundingMode 取整模式：0四舍五入，1向上取整，2向下取整
 */
Number.prototype.setScale = function (fractionDigits = 2, roundingMode = 0) {
  let num = this.valueOf();
  if (num % 1 === 0) return this.toFixed(fractionDigits);
  switch (roundingMode) {
    case 0:
      return this.$toFixed(fractionDigits);
    case 1:
      return rounding(num, fractionDigits);
    case 2:
      return rounding(num, fractionDigits, true);
  }
};
