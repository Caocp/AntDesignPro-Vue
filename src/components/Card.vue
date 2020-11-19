<template>
    <div class="cardDiv">
		<a-card :bordered="false">
            <div class="cardIcon">
                <img :src='require("../assets/logo4.png")'>
            </div>
            <div class="cardContent">
                <p>Card content</p>
                <p>Card content</p>
            </div>
		</a-card>
        <a-card :bordered="false">
            <div class="cardIcon">
                <img :src='require("../assets/logo4.png")'>
            </div>
            <div class="cardContent">
                <p>Card content</p>
                <p>Card content</p>
            </div>
		</a-card>
        <a-card :bordered="false">
            <div class="cardIcon">
                <img :src='require("../assets/logo4.png")'>
            </div>
            <div class="cardContent">
                <p>Card content</p>
                <p>Card content</p>
            </div>
		</a-card>
        <a-card :bordered="false">
            <div class="cardIcon">
                <img :src='require("../assets/logo4.png")'>
            </div>
            <div class="cardContent">
                <p>Card content</p>
                <p>Card content</p>
            </div>
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
        margin: 2% 0;
    }
    .cardDiv .ant-card {
        width: 23%;
        float: left;
        box-shadow: 4px 4px 20px 11px rgba(0,0,0,.05);
        margin-left: 2%;
        border-color: rgba(0,0,0,.05);
    }
    .cardIcon {
        width: 45%;
        float: left;
    }
    .cardIcon img{
        width: 40%;
    }
</style>