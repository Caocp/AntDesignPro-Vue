<template>
  <div>
    <page-header-wrapper></page-header-wrapper>
    <div style="margin-top: 40px;">
      <a-row>
        <a-col :span="4"><a-input-search placeholder="输入部门名称搜索" style="width: 80%"/></a-col>
        <a-col :span="4"><a-input placeholder="输入名称或者邮箱搜索" style="width: 80%"/></a-col>
        <a-col :span="4"><a-range-picker @change="onChange"/></a-col>
        <a-col :span="4">
          <a-select
            show-search
            placeholder="状态"
            option-filter-prop="children"
            style="width: 80%;margin-left: 40px;"
            @change="handleChange"
          >
            <a-select-option value="1">激活</a-select-option>
            <a-select-option value="2">锁定</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="8" style="padding-left: 2%;">
          <a-button icon="search" type="primary">
            Search
          </a-button>
          <a-button icon="reset" type="primary" style="margin-left: 2%;">
            重置
          </a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="4">
          <a-tree :load-data="onLoadData" :tree-data="treeData" @select="onSelect" />
        </a-col>
        <a-col :span="20"> 
            <a-row>
                <a-button icon="reset" type="primary" style="margin-left: 2%;">
                    新增
                </a-button>
                <!-- <a-button icon="reset" type="primary" style="margin-left: 2%;">
                    修改
                </a-button>
                <a-button icon="reset" type="primary" style="margin-left: 2%;">
                    删除
                </a-button> -->
                <a-button icon="reset" type="primary" style="margin-left: 2%;">
                    导出
                </a-button>
            </a-row>
            <a-row>
                <a-table
                    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                    :columns="columns"
                    :data-source="data"
                />
            </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { deptList, deptTableList } from '../../../api/service'
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
        dataIndex:'id'
    },
    {
        title:'操作',
        dataIndex:'id'
    },
]


export default {
  data() {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      treeData: [],
      pid: '',
      columns,
      selectedRowKeys: [],
      deptTableresult: [],
      loading: false,
      page: '0',
      deptId:''
    }
  },
  created() {
    this.getDeptList(this.pid)
    this.getDeptTableList(this.page,this.deptId)
  },
  methods: {
    onChange(date, dateString) {
      //日期选择
      console.log(date, dateString)
    },
    handleChange(value) {
      //状态选择
      console.log(`selected ${value}`)
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
   onSelect(selectedKeys, info) {
      console.log(selectedKeys);
      console.log(info);

    },

    onLoadData(treeNode) {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        const id = treeNode.dataRef.key;
        const result = deptList(id).then((res) => {
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
    async getDeptList(pid) {
      const { content } = await deptList(pid)
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
    async getDeptTableList(page,deptId){
        const { content } = await deptTableList(page,deptId);
        this.deptTableresult = content

    }
  }
}
</script>

<style scoped></style>
