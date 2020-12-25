<template>
    <div>
        <page-header-wrapper></page-header-wrapper>
        <div style="margin-top: 20px;">
            <a-card :bordered='false'>
                <a-descriptions title='单号：234231029431'>
                    <a-descriptions-item label='创建人'>李四</a-descriptions-item>
                    <a-descriptions-item label='订购产品'>XX 服务</a-descriptions-item>
                    <a-descriptions-item label='创建时间'>2017-07-07</a-descriptions-item>
                    <a-descriptions-item label='关联单据'>12421</a-descriptions-item>
                    <a-descriptions-item label='生效日期'>2017-07-07 ~ 2017-07-25</a-descriptions-item>
                    <a-descriptions-item label='备注'>请于两个工作日内确认</a-descriptions-item>
                </a-descriptions>
            </a-card>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>