<template>
	<div>
		<vheader :seller='seller'></vheader>
		<div class="tab border-1px">
			<router-link to='/goods' class="tab-item">商品</router-link>
			<router-link to='/bbb' class="tab-item">评价</router-link>
			<router-link to='/ccc' class="tab-item">商家</router-link>
		</div>
		
		<router-view :seller="seller"></router-view>
	</div>
</template>

<script>
	import Vue from 'vue'
	import vueResource from 'vue-resource'
	import vheader from '@/components/header/header'
	
	
	
	Vue.use(vueResource)
	const ERROR_OK = 0;
	export default {
		data() {
			return {
				seller: {}
			}
		},
		name: 'Content1',
		components: {
			vheader
			
		},
		created() {
			this.$http.get('/api/seller').then((res)=>{
				var data = res.body;
				console.log(data)
				if(data.errno === ERROR_OK){
					this.seller = data.data
				}
			})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../common/stylus/mixin.styl";
	.tab
		width:100%
		border-1px(#ccc)
		display:flex
		.tab-item
			font-size:12px
			height:40px
			line-height:40px
			text-align:center
			flex:1
			background:#fff
			&.router-link-active
				color:red
</style>