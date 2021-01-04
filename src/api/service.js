import request from '@/utils/request'

//用户管理部门列表数据
export function deptList(pid,name) {
    name = name == undefined ? '' : name
    pid = pid == undefined ? '' : pid
    return request({
        url: `/api/dept?sort=id,desc&pid=${pid}&name=${name}`,
        method: 'get'
    })

    
}

export function deptTableList(page,deptId,blurry,createTime,enabled){
    blurry = blurry == undefined ? '' : blurry
    createTime = createTime == undefined ? '' : createTime
    enabled = enabled == undefined ? '' : enabled
    deptId = deptId == undefined ? '' : deptId
    page = page == undefined ? '' : page
    return request({
        url:`/api/users?page=${page}&size=10&sort=id,desc&deptId=${deptId}&blurry=${blurry}&createTime=${createTime}&enabled=${enabled}`,
        method: 'get'
    })
}


export function usersDownload(page){
    return request({
        url:`/api/users/download?page=${page}&size=10&sort=id,desc`,
        method: 'get'

    })
}
export function deleteDeptTableList(parems){
    return request({
        url:'/api/users',
        method: 'DELETE',
        data:parems
        
    })
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

export function addUser(parsams){
    return request({
        url: 'api/users',
        method: 'post',
        data: parsams
    })
}

