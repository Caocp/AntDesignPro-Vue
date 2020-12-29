import request from '@/utils/request'

//用户管理部门列表数据
export function deptList(pid) {
    return request({
        url: `/api/dept?sort=id,desc&pid=${pid}`,
        method: 'get'
    })
}


