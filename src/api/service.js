import request from '@/utils/request'

//用户管理部门列表数据
export function deptList(pid) {
    return request({
        url: `/api/dept?sort=id,desc&pid=${pid}`,
        method: 'get'
    })
}

export function deptTableList(page,deptId){
    if(deptId){
        return request({
            url:`/api/users?page=${page}&size=10&sort=id,desc&deptId=${deptId}`,
            method: 'get'
        })
    }else{
        return request({
            url:`/api/users?page=${page}&size=10&sort=id,desc`,
            method: 'get'
        })
    }
    
}


