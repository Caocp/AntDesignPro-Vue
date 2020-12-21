<template>
    <div>
        <page-header-wrapper>

        </page-header-wrapper>
        <div style="margin-top: 20px;">
            <a-card :bordered='false'>
                <a-descriptions title="退款申请">
                    <a-descriptions-item label="订货单号">0000000</a-descriptions-item>
                    <a-descriptions-item label="状态">已取货</a-descriptions-item>
                    <a-descriptions-item label="销售单号">110000000</a-descriptions-item>
                    <a-descriptions-item label="子订单">54578967654657</a-descriptions-item>
                </a-descriptions>
            </a-card>
            <a-card :bordered='false'>
                <a-descriptions title='用户信息'>
                    <a-descriptions-item label="用户姓名">张三</a-descriptions-item>
                    <a-descriptions-item label="联系电话">18845245245</a-descriptions-item>
                    <a-descriptions-item label="常用仓库">菜鸟驿站</a-descriptions-item>
                    <a-descriptions-item label="取货地址">xxx路xx号</a-descriptions-item>
                    <a-descriptions-item label="备注">取快递时间不得超过12小时</a-descriptions-item>
                </a-descriptions>
            </a-card>
            <a-card title='退货商品'  :bordered='false'>
                <a-table :columns='goodsColumns' :data-source='loadGoodsData' :pagination='false'></a-table>
            </a-card>
            <a-card title='退货进度'  :bordered='false'>
                <a-table :columns='scheduleColumns' :data-source='loadScheduleData' :pagination='false'></a-table>
            </a-card>
        </div>
    </div>
</template>
<script>
const goodsColumns = [
    {
        title:'商品编号',   
        dataIndex: 'id',
        key: 'id',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'id' }
    },
    {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '商品条码',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: '单价',
        key:'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' }
    },
    {
        title: '数量（件）',
        key: 'action',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
    },
    {
        title: '金额',
        key: 'action',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
    }
    ]
    const loadGoodsData = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        
    ]
    const scheduleColumns = [
        {
            title: '时间',
            key: 'time',
            dataIndex: 'time'
        },
        {
            title: '当前进度',
            key: 'rate',
            dataIndex: 'rate'
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
        },
        {
            title: '操作员ID',
            key: 'operator',
            dataIndex: 'operator',
        },
        {
            title: '耗时',
            dataIndex: 'cost',
            key: 'cost'
        }
    ]
    const loadScheduleData = [
       {
                key: '1',
                time: '2017-10-01 14:10',
                rate: '联系客户',
                status: 'processing',
                operator: '取货员 ID1234',
                cost: '5mins'
              },
              {
                key: '2',
                time: '2017-10-01 14:05',
                rate: '取货员出发',
                status: 'success',
                operator: '取货员 ID1234',
                cost: '1h'
              },
              {
                key: '3',
                time: '2017-10-01 13:05',
                rate: '取货员接单',
                status: 'success',
                operator: '取货员 ID1234',
                cost: '5mins'
              },
              {
                key: '4',
                time: '2017-10-01 13:00',
                rate: '申请审批通过',
                status: 'success',
                operator: '系统',
                cost: '1h'
              },
              {
                key: '5',
                time: '2017-10-01 12:00',
                rate: '发起退货申请',
                status: 'success',
                operator: '用户',
                cost: '5mins'
              }
    ]
export default {
    data(){
        return{
            loadGoodsData,
            goodsColumns,
            scheduleColumns,
            loadScheduleData
        }
    }
}
</script>
<style scoped>
    
</style>