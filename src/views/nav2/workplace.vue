<template>
  <page-view :avatar="sysUserAvatar" :title="false">
    <div slot="headerContent">
      <div class="title"><span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span></div>
      <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info title="项目" content="56" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info title="团队排名" content="8/24" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info title="项目数" content="2,223" :center="false" />
        </a-col>
      </a-row>
    </div>
  </page-view>
  
</template>



<script>

  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  // import Avatar from 'vue-avatar'
  export default {
    data() {
			return {
        sysUserName: '',
        sysUserAvatar: '',
        user:'',
			
			}
		},
    computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ]),
    
    },
    methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
      'decrement'
    ])
      //...mapActions({
      //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
      //})
    },
    mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}

		}
  }
</script>
<style scoped>
/* .title img{
    border-radius: 50%;
    float: left;
}
.title span{
    display: inline-block;
    margin: 5% 2%;
    font-size: 22px;
    float: left;
} */
</style>>