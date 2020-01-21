/**
 * @author: zzj
 * @date: 2019-08-05 18:07:09
 * @version: 1.0
 * 扩展Number类
 * 修复如：0.1+0.2，0.58*100等精度问题，toFixed bug
 */

let getDecimalLen = num => ((num + "").split(".")[1] || "").length;

let decimalToInteger = num => +(num + "").replace(/^0?\.0*|\./g, "");

let powerTen = index => Math.pow(10, index);

Number.prototype.add = function (...args) {
  let allArgs = [this.valueOf(), ...args];
  let maxDecimalLen = Math.max(...allArgs.map(v => getDecimalLen(v)));
  return allArgs.reduce((total, cur) => {
    let curDecimalLen = getDecimalLen(cur);
    let diffDecimalLen = maxDecimalLen - curDecimalLen;
    return total + decimalToInteger(cur) * powerTen(diffDecimalLen);
  }, 0) / powerTen(maxDecimalLen);
};

Number.prototype.subtract = function (...args) {
  args = args.map(v => -v);
  return this.add(...args);
};

Number.prototype.multiply = function (...args) {
  let allArgs = [this.valueOf(), ...args];
  return allArgs.reduce((total, cur) => {
    let curDecimalLen = getDecimalLen(cur);
    let totalDecimalLen = getDecimalLen(total);
    return decimalToInteger(total) * decimalToInteger(cur) / powerTen(curDecimalLen + totalDecimalLen);
  });
};

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

function roundingDown(num, fractionDigits) {
  let decimalLen = getDecimalLen(num);
  if (decimalLen <= fractionDigits) {
    return num.$toFixed(fractionDigits);
  } else {
    num += "";
    num = num.substr(0, num.length - (decimalLen - fractionDigits));
    return (+num).$toFixed(fractionDigits);
  }
}

function roundingUp(num, fractionDigits) {
  let decimalLen = getDecimalLen(num);
  if (decimalLen <= fractionDigits) {
    return num.$toFixed(fractionDigits);
  } else {
    num += "";
    let len = decimalLen - fractionDigits;
    let intVal = decimalToInteger(num);
    intVal += powerTen(len);
    num = intVal / powerTen(decimalLen);
    return roundingDown(num, fractionDigits)
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
      return roundingUp(num, fractionDigits);
    case 2:
      return roundingDown(num, fractionDigits);
  }
};
