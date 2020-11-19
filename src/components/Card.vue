<template>
    <div class="cardDiv">
		<a-card title="Card title" :bordered="false">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
		</a-card>
        <a-card title="Card title" :bordered="false">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
		</a-card>
        <a-card title="Card title" :bordered="false">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
		</a-card>
        <a-card title="Card title" :bordered="false">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
		</a-card>
	</div>
</template>
<script>
export default {
    
}
</script>

<style scoped>
    .cardDiv {
        background:#ECECEC;
    
    }
    .cardDiv .ant-card{
        width: 23%;
        float:left;
        box-shadow: 4px 4px 40px rgba(0,0,0,.05);
        margin-left: 2%;
    }
</style>