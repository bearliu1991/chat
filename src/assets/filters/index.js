const format = function (millisecond, fmt) {
  millisecond = (millisecond + '0000').slice(0, 13)

  const time = new Date(parseInt(millisecond))
  const o = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3),
    'S': time.getMilliseconds()
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }

  return fmt
}

const formatSecond = function (time) {
  let hour = ('00' + parseInt(time / 60 / 60)).slice(-2)
  let minute = ('00' + parseInt((time - hour * 60 * 60) / 60)).slice(-2)
  let second = ('00' + parseInt((time - hour * 60 * 60 - minute * 60))).slice(-2);
  return (hour + ' : ' + minute + ' : ' + second)
}

const transferN = function(str) {
  let reg = new RegExp('\\n', 'g')
  return str.replace(reg, '</br>')
}

export default {
  format,
  formatSecond,
  transferN
}
