// 加载所有plugins下所有的vue组件
const files = require.context('@/components', false, /\.vue$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

export default modules
