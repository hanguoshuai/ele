<template>
  <div class="cartcontrol">
      <transition name="fade">
          <div v-show="food.count>0"  @click="decreaseCart" class="cart-decrease " >
                <span class="inner icon-remove_circle_outline"></span>
          </div>
      </transition>
      <div v-show="(food.count)>0" class="cart-count">{{this.food.count}}</div>
      <div class="cart-add " @click="addCart">
          <span class="inner icon-add_circle"></span>
      </div>
  </div>
</template>
<script>
import Vue from 'vue'
  export default{
      props:{
          food:{
              type:Object,
          }
      },
      methods:{
          addCart(event) {
              console.log(this.food)
              if(!event._constructed){
                  return 
              }
              if(!this.food.count){
                  Vue.set(this.food,'count',1)
              }else{
                  this.food.count++;
              }
          },
          decreaseCart(event){
              if(!event._constructed){
                  return 
              }
              if(this.food.count){
                  this.food.count--;
              }
          }
      }
  }  
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size:0
        .cart-decrease
            font-size :0
            display :inline-block
            vertical-align :top
            .inner
                display :inline-block
                font-size :24px
                line-height:48px
                color:rgb(0,160,220)
                transform :rotate(180deg)
            .fade-enter-active 
                transition: all .3s linear;
            .fade-leave-active 
                transition: all .3s linear;
            .fade-enter, .fade-leave-active
            /* .slide-fade-leave-active for below version 2.1.8 */ 
                transform :rotate(180deg)
                
        .fade-enter-active 
            transition: all .3s linear;
        .fade-leave-active 
            transition: all .3s linear;
        .fade-enter, .fade-leave-active
        /* .slide-fade-leave-active for below version 2.1.8 */ 
            transform: translateX(24px);
            opacity :1
        .cart-count
            display:inline-block
            width:24px
            font-size :10px
            line-height :48px
            color:rgb(147,153,159)
            text-align :center
            vertical-align :top
        .cart-add
            font-size:0
            display :inline-block
            vertical-align :top
            .inner
                display :inline-block
                font-size :24px
                line-height:48px
                color:rgb(0,160,220)
        
</style>
