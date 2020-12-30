<template>
    <a-modal v-model="visible" :title="type === 'add' ? '新增' : '编辑'" ok-text="确认" cancel-text="取消">
         <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" :hideRequiredMark='false'>
            <a-form-item label="用户名">
                <a-input
                    v-decorator="[
                        'username',
                        {rules: [{ required: true, message: '请输入用户名' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item label="电话">
                <a-input
                    v-decorator="[
                        'username',
                        {rules: [{ required: true, message: '请输入用户名' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item label="昵称">
                <a-input
                    v-decorator="[
                        'username',
                        {rules: [{ required: true, message: '请输入用户名' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item label="邮箱">
                <a-input
                    v-decorator="[
                        'username',
                        {rules: [{ required: true, message: '请输入用户名' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item label="部门">
                <a-select
                    show-search
                    placeholder="请选择部门"
                    option-filter-prop="children"
                
                    :filter-option="filterOption"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                >
                    <a-select-option value="jack">
                    Jack
                    </a-select-option>
                    
                </a-select>
            </a-form-item>
            <a-form-item label="岗位">
                <a-select
                    mode="multiple"
                    placeholder="Inserted are removed"
                    :value="selectedJobItems"
                    style="width: 100%"
                    @change="handleJobChange"
                >
                    <a-select-option v-for="item in jobListOptions" :key="item.id" :value="item.id">
                    {{ item.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="性别">
                <a-input
                    v-decorator="[
                        'username',
                        {rules: [{ required: true, message: '请输入用户名' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item label="状态">
                <a-input
                    v-decorator="[
                        'username',
                        {rules: [{ required: true, message: '请输入用户名' }]}
                    ]"
                />
            </a-form-item>
            <a-form-item label="角色">
                <a-select
                    mode="multiple"
                    placeholder="Inserted are removed"
                    :value="selectedRoleItems"
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
import { jobList, roleList } from '../../../api/service'
export default {
    props:['visible','type'],
    data(){
        return{
            selectedJobItems: [],
            selectedRoleItems:[],
            jobListData:[],
            roleListData:[]
        }
    },
    computed:{
        jobListOptions() {
            return this.jobListData.filter(o => !this.selectedItems.includes(o));
        },
        roleListOptions() {
            return this.roleListData.filter(o => !this.selectedRoleItems.includes(o));
        },
    },
    created(){
        this.getJobList() 
        this.getRoleList()
    },
    methods:{
        async getJobList(){
            const { content } = await jobList()
            console.log(content)
            this.jobListData = content
        },
        handleJobChange(selectedItems) {
           this.selectedJobItems = selectedItems;
        },
        async getRoleList(){
            const   data  = await roleList()
            console.log(data)
            this.roleListData = data
        },
        handleRoleChange(selectedItems) {
           this.selectedRoleItems = selectedItems;
        },
    }
}
</script>
<style scoped>

</style>