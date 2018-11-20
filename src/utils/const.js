// 此处放置公用配置内容
export default {
  // 验证规则
  validate : [
    {
      name: 'username',
      rule : /^[a-zA-Z0-9]$/,
      error:'',
      tip:''
    },
    {
      name: 'mobile',
      rule : /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      error:'',
      tip:''
    }
  ]
}
