export default function strPro() {
  let str = String
  str.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "")
  }
  str.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "")
  }
  str.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "")
  }
}
