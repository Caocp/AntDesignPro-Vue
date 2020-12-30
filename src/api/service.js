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

export function jobList(){
    return request({
        url: '/api/job?page=0&size=9999&enabled=true',
        method: 'get'
    })
}

export function roleList(){
    return request({
        url: '/api/roles/all',
        method: 'get'
    })
}

