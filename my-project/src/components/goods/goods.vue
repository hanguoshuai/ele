<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class='{"current":currentIndex===index}' @click='selectMenu(index,$event)'>
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]">
						</span>
						{{item.name}}
					</span>				
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref="goodsWrapper">
			<ul>
				<li v-for="item in goods" class="goods-list" ref="goodList">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="goods-item">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" >
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p  class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food='food'></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		
		</div>
		<shopcart :select-foods='selectFoods' :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice'></shopcart>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart/shopcart'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
const ERROR_OK = 0;
	export default{
		components:{
			shopcart,
			cartcontrol
		},
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				goods:[],
				listHeight:[],
				scrollY:0
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			this.$http.get('/api/goods').then((res)=>{
				var data = res.body;
				console.log(data)
				if(data.errno === ERROR_OK){
					this.goods = data.data
					console.log(this.goods)
					this.$nextTick(()=>{
						this._initScroll(this.goods)
						this._calculateHeight()
					})	
				}
			})
		},
		computed:{
			
			currentIndex(){
				for(let i=0;i<this.listHeight.length;i++){
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i+1];	
					if(!height2 || (this.scrollY>=height1&&this.scrollY<height2)){
						return i
					}
				}
				return 0
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food)
						}
					})
				})	
				return foods
			}
		},
		
		methods:{
			selectMenu(index,event){
				if(!event._constructed){
					return
				}
				console.log(index)
				let goodList = this.$refs.goodList;
				let el = goodList[index];
				this.foodsScroll.scrollToElement(el,600)
			},
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				})
				this.foodsScroll = new BScroll(this.$refs.goodsWrapper,{
					click:true,
					probeType:3
					
				});
				this.foodsScroll.on('scroll',(pos)=>{
					console.log(pos)
					this.scrollY = Math.abs(Math.round(pos.y))
					console.log(this.scrollY)
				})
			},
			_calculateHeight(){
				let Height = 0;
				let goodList = this.$refs.goodList;
				this.listHeight.push(Height)
				for(let i=0;i<goodList.length;i++){
					Height+=goodList[i].clientHeight
					this.listHeight.push(Height)
				}
				console.log(this.listHeight)
			}
		}
	}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
@import "../../common/stylus/index.styl"
@import "../../common/stylus/style.styl"

.goods
	display:flex
	position absolute
	top:174px
	bottom :46px
	overflow hidden
	width:100%
	.menu-wrapper
		flex:0 0 80px
		width:80px 
		background :#f3f5f7
		.menu-item
			display :table
			padding :0 12px
			height :54px
			&.current
				position relative
				font-weight :700
				z-index 10
				margin-top:-1px
				background:#fff
				.text
					border-none()
			.text
				display :table-cell
				vertical-align :middle
				font-size:12px
				line-height :14px
				width:56px
				border-1px(rgba(7,17,27,0.1))
				.icon
					display:inline-block
					vertical-align:top
					width:12px
					height:12px
					margin-bottom:2px
					
					background-repeat:no-repeat
					background-size:12px 12px
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
				
	.goods-wrapper
		flex :1
		.goods-list
			.title
				height :26px
				padding-left 14px
				background-color:#f3f5f7
				color:rgb(147,153,159)
				line-height:26px
				border-left:2px solid #d9dde1
			.goods-item
				display:flex
				margin:18px
				border-1px(rgba(7,17,27,0.1))
				padding-bottom:18px
				&:last-child
					margin-bottom:0px
					border-none()
				.icon
					width:57px
					flex:0 0 57px
					margin-right :10px
				.content
					flex:1
					.name
						font-size:14px
						color:rgb(7,17,27)
						line-height:14px
						margin:2px 0 8px 0 
						height:14px
					.desc
						margin: 0 0 8px 0
						font-size:10px
						color:rgb(147,153,159)
						line-height:12px
					.extra
						font-size :10px
						line-height :10px
						height:10px
						color:rgb(147,153,159)
						margin-bottom:8px
						.count
							margin-right:12px
					.price
						line-height:24px
						font-weight:700
						.now
							margin-right:8px
							color:rgb(240,20,20)
							font-size:14px
						.old
							text-decoration :line-through
							color:rgb(147,153,159)
							font-size :14px
					.cartcontrol-wrapper
						position:absolute
						right:24px
						bottom:0px
						


</style>