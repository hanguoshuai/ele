<template>
  <div class="shopcart">
      <div class="content-left">
          <div class="logo-wrapper">
             <div class="logo" :class="{'heightlight':totalCount>0}">
                  <span class="icon-shopping_cart" :class="{'heightlight':totalCount>0}"></span>
             </div>
             <div class="count" v-show="totalCount>0">
                 {{totalCount}}
             </div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class='payClass'>{{payDesc}}</div>
  </div>
</template>
<script>
    export default{
        props:{
            deliveryPrice:{
                type:Number,
                default:0
            },
            minPrice:{
                type:Number,
                default:0
            },
            selectFoods:{
                type:Array,
                default() {
                    return [
                       {price:10,count:1}
                     ]
                }
            },
           
        },
        computed:{
            
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) =>{
                    total+= (food.price)*(food.count)

                })
                return total
            },
            totalCount() {
                let total = 0;
                this.selectFoods.forEach((food)=>{
                    total+= food.count
                })
                return total
            },
             payDesc(){
                if(this.totalPrice === 0){
                    return `￥${this.minPrice}起送`
                }else if(this.totalPrice<this.minPrice){
                    let diff = this.minPrice-this.totalPrice
                    return  `￥还差${diff}元起送`
                }else{
                    return `去结算`
                }
            },
            payClass() {
                if(this.totalPrice>=this.minPrice){
                    return 'enough'
                }else {
                    return 'not-enough'
                }
            }
        }
    }
</script>
<style lang="stylus" rel='stylesheet/stylus'>
.shopcart
    display :flex
    position :fixed
    left :0px
    bottom :0px
    height :46px
    width:100% 
    background-color:#141d27
    .content-left
        flex:1
        font-size:0
        .logo-wrapper
            display :inline-block
            position :relative
            top:-12px
            box-sizing :border-box
            padding :6px
            width :56px
            margin-left:12px
            margin-right:12px
            background-color:#141d27
            z-index:50
            border-radius:50%
            .logo
                width:44px
                height:44px
                border-radius:22px
                background-color:rgba(255,255,2555,0.4)
                text-align :center 
                &.heightlight
                    background-color:rgb(0,160,220)         
                .icon-shopping_cart
                    font-size: 24px
                    color:rgba(255,255,255,0.4)
                    line-height:48px
                    text-align :center
                    &.heightlight
                        color:rgb(255,255,255)
            .count
                position :absolute
                top:0px
                right:0px
                width:24px
                height:16px
                line-height:16px
                text-align:center
                border-radius:16px
                font-size:9px
                z-index:51
                color:#fff
                background-color :rgb(240,20,20)
                font-weight :700
                box-shadow :0 4px 8px 0 rgba(0,0,0,0.4)
        .price
            display:inline-block
            font-size:12px
            color:rgba(255,255,255,0.4)
            font-weight:700
            line-height :24px
            margin-top:12px
            vertical-align:top
            border-right:1px solid rgba(255,255,255,0.1)
            padding-right:12px
            &.highlight
                color:#fff
        .desc
            display:inline-block
            vertical-align:top
            font-size:12px
            color:rgba(255,255,255,0.4)
            font-weight:700
            line-height:24px
            margin-top:12px
            margin-left:12px
    .content-right
        flex:0 0 105px
        box-sizing :border-box
        padding:0 8px
        font-size:12px
        color:rgba(255,255,255,0.4)
        line-height:48px
        font-weight:700
        width:105px   
        background-color:#2b333b
        text-align :center
        &.not-enough
            background-color:#2b333b
        &.enough
            background-color:#00b43c
            color:#fff
</style>

