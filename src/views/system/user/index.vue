<template>
  <div>
    <page-header-wrapper></page-header-wrapper>
    <div style="margin-top: 40px;">
      <a-row>
        <a-col :span="4"><a-input-search placeholder="输入部门名称搜索" style="width: 80%" @search='deptSearch' /></a-col>
        <a-col :span="4"><a-input placeholder="输入名称或者邮箱搜索"  style="width: 80%" v-model="blurry" /></a-col>
        <a-col :span="4"><a-range-picker @change="onRangeChange"/></a-col>
        <a-col :span="4">
          <a-select
            show-search
            placeholder="状态"
            option-filter-prop="children"
            style="width: 80%;margin-left: 40px;"
            @change="handleChange"
          >
            <a-select-option value="true">激活</a-select-option>
            <a-select-option value="false">锁定</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="8" style="padding-left: 2%;">
          <a-button icon="search" type="primary" @click="searchButton">
              搜索
          </a-button>
          <a-button icon="reset" type="primary" style="margin-left: 2%;" @click="resetButton">
            重置
          </a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="4">
          <a-tree :load-data="onLoadData" :tree-data="treeData" @select="onSelect" />
        </a-col>
        <a-col :span="20"> 
            <a-row style="margin: 2% 0px;">
                <a-button icon="reset" type="primary" @click="showModal('', true, 'add','')">
                    新增
                </a-button>
                <a-button icon="reset" type="primary" style="margin-left: 2%;">
                    导出
                </a-button>
            </a-row>
            <a-row>
                <a-table
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                    :columns="columns"
                    :data-source="deptTableresult"
                    :loading="loading"  
                    :locale="{'emptyText':'暂无数据'}"
                 
                >
                    
                    <template slot="operation" slot-scope="text, record">
                        <a-button type="primary" @click="showModal(text, true, 'edit',record)">编辑</a-button>
                    </template>
                </a-table>
                <edit-user :visible="showEitModal" :info='record' :type='type' @cancel='onCancel'></edit-user>
            </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { deptList, deptTableList } from '../../../api/service'
import EditUser from '../user/editUser'
const columns = [
    {
        title:'用户名',
        dataIndex:'username'
    },
    {
        title:'昵称',
        dataIndex:'nickName'
    },
    {
        title:'性别',
        dataIndex:'gender'
    },
    {
        title:'电话',
        dataIndex:'phone'
    },
    {
        title:'邮箱',
        dataIndex:'email'
    },
    {
        title:'部门',
        dataIndex:'dept.name'
    },
    {
        title:'操作',
        dataIndex:'id',
        scopedSlots: { customRender: 'operation' },
    },
]


export default {
    components: {
        EditUser
    },
  data() {
    return {
      searchValue: '',
      autoExpandParent: true,
      treeData: [],
      pid: undefined,
      columns,
      selectedRowKeys: [],
      deptTableresult: [],
      loading: false,
      page: '0',
      deptId:undefined,
      loading: false,
      showEitModal: false,
      type:'add',
      record:{},
      name:undefined,
      blurry:undefined,
      createTime:undefined,
      createTime1:undefined,
      enabled:undefined
    }
  },
  created() {
    this.getDeptList(this.pid,this.name)
    this.getDeptTableList(this.page,this.deptId,this.blurry,this.createTime,this.enabled)
  },
  methods: {
    onRangeChange(date, dateString) {//日期选择
      console.log(date, dateString)
      this.createTime = dateString[0]
    },
    handleChange(value) { //状态选择
      console.log(value)
      this.enabled = value
      this.getDeptTableList(this.page,this.deptId,this.blurry,this.createTime,this.enabled)
    },
    searchButton(){//搜索
        this.getDeptTableList(this.page,this.deptId,this.blurry,this.createTime,this.enabled)
    },
    resetButton(){//重置
        this.page = '0';
        this.deptId = undefined;
        this.blurry  = undefined;
        this.createTime = undefined;
        this.enabled = undefined;
        this.getDeptTableList(this.page,this.deptId,this.blurry,this.createTime,this.enabled)
    },
    deptSearch(value){ //搜索部门
        console.log(value)
        this.getDeptList('',value)
    },
    onSelect(selectedKeys, info) { 
       console.log(selectedKeys)
      this.deptId = selectedKeys[0]
      this.loading = true
      this.getDeptTableList(this.page,this.deptId,this.blurry,this.createTime,this.enabled)
      this.loading = false
    },
    onLoadData(treeNode) { //点击部门加载子项
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        const id = treeNode.dataRef.key;
        const result = deptList(id,this.name).then((res) => {
            const children = res.content.map(item => {
                return {
                    title: item.name,
                    key: item.id,
                }
            })
            treeNode.dataRef.children = children
            this.treeData = [...this.treeData]
            resolve()
        });

      })
    },

    async getDeptList(pid,name) { //部门列表
      const { content } = await deptList(pid,name)
      let customColumns = []
      content.map(item => {
        var obj = {
          title: item.name,
          key: item.id,
          isLeaf: item.leaf
        }
        customColumns.push(obj)
      })
      this.treeData = customColumns
    },
    
    async getDeptTableList(page,deptId,blurry){ //用户列表
        const { content } = await deptTableList(page,deptId,blurry);
        this.deptTableresult = content
        console.log(this.deptTableresult)

    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    showModal(id,showModal,type,record){ //新增、编辑弹窗
        this.showEitModal = showModal,
        this.type = type
        if(type === 'edit'){
            this.record = record
        }
    },
    onCancel(){ //取消按钮
        this.showEitModal = false
    }
  }
}
</script>

<style scoped></style>
