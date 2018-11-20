// 此处放置公用配置内容
let isDesktop = false // 桌面端设为true, 网页端为false,

export default {
  isDesktop: isDesktop,
  url: process.env.NODE_ENV !== "development" ? 'http://xingke100.com/apis/api' : 'http://localhost:8091' + '/api',
  absUrl: isDesktop ? `${__dirname}` : ''
}
