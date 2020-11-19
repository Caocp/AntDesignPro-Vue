<template>
		<card v-if='show'></card>
		<linear-table v-else />
	
	
</template>

<script>
import Card from '../components/Card'
import LinearTable from '../components/LinearTable'
	export default {
  		components: { 
			  Card,
			  LinearTable
			  },
		data(){
			return{
				show:true
			}
		}	  
	}

</script>

<style scoped>

</style>