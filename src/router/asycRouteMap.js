let Ops = () => import('@/components/ops')
let OpsInfo = () => import('@/components/ops/info')
export const asyncRouterMap = [
  {
    path: '/ops',
    component: Ops,
    name: '权限测试',
    meta: { role: ['admin', 'super_editor'] },
    children: [
      {
        path: 'info',
        component: OpsInfo,
        name: '权限测试页',
        meta: { role: ['admin'] }
      }
    ]
  }
]
