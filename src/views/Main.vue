<template>
	<template v-if='show'>
		<card></card>
	</template>
	<template v-else>
		<linear-table />
	</template>
	
	
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