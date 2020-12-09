<template>
    <div>
        <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection" >
            <template slot="operation" slot-scope="text, record">
                <a-button @click="onEdit(record)">编辑</a-button>
            </template>
        </a-table>
        <a-modal title="编辑" :visible="visible" @ok="handleOk" @cancel="handleCancel" width="800px">
            <span>9089889</span>
        </a-modal>
        
    </div>
    
</template>
<script>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots:{ customRender: 'operation' }
  }
]
const dataSource = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: 11,
    name: 'John Brown',
    age: 42,
    address: 'New York No. 2 Lake Park',
    },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: 12,
    name: 'John Brown jr.',
    age: 30,
    address: 'New York No. 3 Lake Park',
    },
    {
        key: 131,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 2 Lake Park',
    },
    {
    key: 13,
    name: 'Jim Green sr.',
    age: 72,
    address: 'London No. 1 Lake Park',
    },
]


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
      console.log(record)
      console.log(selected)
      console.log(selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  },
}

export default {
    data(){
        return{
            dataSource,
            columns,
            rowSelection,
            visible: false,
        }
    },
    methods:{
        onEdit(record){
            this.visible = true
        },
        handleCancel(){
            this.visible = false
        }
    }
}
</script>
<style scoped>

</style>




