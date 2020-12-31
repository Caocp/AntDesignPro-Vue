<template>
    <a-modal v-model="visible" :title="type === 'add' ? '新增' : '编辑'" ok-text="确认" cancel-text="取消" @ok="onOk" @cancel='onCancel'>
         <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" :hideRequiredMark='false'>
            <a-form-item label="用户名">
                <a-input
                    v-decorator="[
                        'username',
                        {
                            rules: [{ required: true, message: '请输入用户名' }],
                            initialValue:type === 'edit' ? info.username : ''
                            }
                    ]"
                />
            </a-form-item>
            <a-form-item label="电话">
                <a-input
                    v-decorator="[
                        'phone',
                        {
                            rules: [{ required: true, message: '请输入电话' }],
                            initialValue:type === 'edit' ? info.phone : ''
                            }
                    ]"
                />
            </a-form-item>
            <a-form-item label="昵称">
                <a-input
                    v-decorator="[
                        'nickName',
                        {
                            rules: [{ required: true, message: '请输入昵称' }],
                            initialValue:type === 'edit' ? info.nickName : ''
                            }
                    ]"
                />
            </a-form-item>
            <a-form-item label="邮箱">
                <a-input
                    v-decorator="[
                        'email',
                        {
                            rules: [{ required: true, message: '请输入邮箱' }],
                            initialValue:type === 'edit' ? info.email : ''
                            }
                    ]"
                />
            </a-form-item>
            <a-form-item label="部门">
                <a-tree-select
                    v-model="jobValue"
                    v-decorator="[ 'jobValue', { initialValue:type === 'edit'?jobValue:'' } ]"
                    tree-data-simple-mode
                    style="width: 100%"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    :tree-data="treeData"
                    placeholder="请选择部门"
                    :load-data="onLoadData"
                    @change="handleDeptChange"
                    
                />
            </a-form-item>
            <a-form-item label="岗位">
                <a-select
                    mode="multiple"
                    placeholder="请选择岗位"
                    v-decorator="[ 'jobs', { initialValue:type === 'edit'?jobs:[] } ]"
                    style="width: 100%"
                    @change="handleJobChange"
                >
                    <a-select-option v-for="item in jobListOptions" :key="item.id" :value="item.id">
                    {{ item.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="性别">
                <a-radio-group :default-value="1" v-decorator="['gender',{initialValue:type === 'edit'?gender:''}]">
                    <a-radio :value="1">男</a-radio>
                    <a-radio :value="2">女</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="状态">
                <a-radio-group :default-value="true" v-decorator="['enabled',{initialValue:type === 'edit'?enabled:''}]">
                    <a-radio :value="true">激活</a-radio>
                    <a-radio :value="false">禁用</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="角色">
                <a-select
                    mode="multiple"
                    placeholder="请选择角色"
                    v-decorator="[ 'roles', { initialValue:type === 'edit'?roles:[] } ]"
                    style="width: 100%"
                    @change="handleRoleChange"
                >
                    <a-select-option v-for="item in roleListOptions" :key="item.id" :value="item.id">
                    {{ item.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>
   
</template>
<script>
import { jobList, roleList, deptList } from '../../../api/service'
export default {
    props:['visible','type','info'],
    data(){
        return{
            jobValue:undefined,
            treeData:[],
            jobs: [],
            roles:[],
            jobListData:[],
            roleListData:[],
            pid:'',
            dept:{},
            deptId:'',
            form: this.$form.createForm(this, { name: 'dynamic_rule' }),
        }
    },
    watch:{
        jobValue(value){
            console.log(value)
        }
    },
    computed:{
        jobListOptions() {
            return this.jobListData.filter(o => !this.jobs.includes(o));
        },
        roleListOptions() {
            return this.roleListData.filter(o => !this.roles.includes(o));
        },
    },
    created(){
        this.getJobList() 
        this.getRoleList()
        this.getDeptList(this.pid)
    },
    methods:{
        async getJobList(){ //获取岗位列表
            const { content } = await jobList()
            this.jobListData = content
        },
        handleJobChange(selectedItems) {
           this.jobs = selectedItems;
        },
        async getRoleList(){ //获取角色列表
            const   data  = await roleList()
            this.roleListData = data
        },
        handleRoleChange(selectedItems) {
           this.roles = selectedItems;
        },
        handleDeptChange(value, label, extra){
            this.jobValue = extra.triggerNode.dataRef.title
            this.deptId = extra.triggerNode.dataRef.pId
            this.dept = {
                id:this.deptId
            }
        },
        async getDeptList(pid) {
            const { content } = await deptList(pid)
            const random = Math.random()
            .toString(36)
            .substring(2, 6);
            let customColumns = []
            content.map(item => {
                var obj = {
                    id:random,
                title: item.name,
                pId: item.id,
                value:random,
                isLeaf: item.leaf
                }
                customColumns.push(obj)
            })
            this.treeData = customColumns
            },

        onLoadData(treeNode) {
            return new Promise(resolve => {
                if (treeNode.dataRef.children) {
                resolve()
                return
                }
                const id = treeNode.dataRef.pId;
                const result = deptList(id).then((res) => {
                    const children = res.content.map(item => {
                        return {
                            title: item.name,
                            pId: item.id,
                        }
                    })
                    treeNode.dataRef.children = children
                    this.treeData = [...this.treeData]
                    resolve()
                });

            })
            },
            onCancel(){
                this.form.resetFields()
                this.$emit('cancel')
            },
            onOk(){
                alert(88)
                    this.form.validateFields(async(err, values) => {
                    console.log(values) 
                    // values.isSupplier = '2'
                    // values.roleArray = values.roleArray.join(",") //将数组拼接成字符串传递过去
                    // if (!err) {
                    //     let data = {}
                    //     if(this.type === 'add'){
                    //         values.front = 'front4'
                    //         data = await addBusinessUser(values)
                            
                    //     } else {
                    //         values.enterpriseId = this.enterpriseId
                    //         data = await editBusinessUser(values)
                    //     }
                    //     const { data:{success, msg} } = data
                    //     this.$notification[success ? 'success' : 'error']({
                    //         message: '提示',
                    //         description: msg,
                    //     });
                    //     if(success){
                    //         this.form.resetFields()
                    //         this.$emit('cancel')
                    //     }
                    // }
                });
            }





    }
}
</script>
<style scoped>

</style>