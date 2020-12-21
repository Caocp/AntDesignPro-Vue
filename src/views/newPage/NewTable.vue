<template>
  <page-header-wrapper>
    <div>
        <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection">
            <template slot="operation" slot-scope="text, record">
                <a-button @click="onEdit(record)">编辑</a-button>
            </template>
        </a-table>
        <a-modal title="编辑" :visible="visible" @ok="handleOk" @cancel="handleCancel" width="800px">
            <template>
              <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                <a-form-item label="姓名">
                  <a-input
                    v-decorator="['note', { rules: [{ required: true, message: '姓名不能为空' }] }]"
                  />
                </a-form-item>
                <a-form-item label="姓别">
                  <a-select
                    v-decorator="[
                      'gender',
                      { rules: [{ required: true, message: '姓别不能为空' }] },
                    ]"
                    placeholder="请选择"
                    @change="handleSelectChange"
                  >
                    <a-select-option value="1">
                      男
                    </a-select-option>
                    <a-select-option value="2">
                      女
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                  <a-button type="primary" html-type="submit">
                    保存
                  </a-button>
                </a-form-item>
              </a-form>
            </template>
        </a-modal>
        
      </div>
    </page-header-wrapper>
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
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'coordinated' }),
        }
    },
    methods:{
        onEdit(record){
          console.log(record)
            this.visible = true
        },
        handleCancel(){
            this.visible = false
        },
        handleSubmit(e) {
          e.preventDefault()
          this.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values)
            }
          })
        },
        handleSelectChange(value) {
          console.log(value)
          this.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
          })
        },
    }
  }
</script>
<style scoped>

</style>




