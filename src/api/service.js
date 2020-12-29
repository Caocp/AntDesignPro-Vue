import request from '@/utils/request'

//用户管理部门列表数据
export function deptList(pid) {
    return request({
        url: `/api/dept?sort=id,desc&pid=${pid}`,
        method: 'get'
    })
}

export function deptTableList(page,deptId){
    return request({
        url:`/api/users?page=${page}&size=10&sort=id,Cdesc&deptId=${deptId}`,
        method: 'get'
    })
}


