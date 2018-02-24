<template>
  <div >
			<div id="example-1">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition name="slide-fade">
          <div v-show="show"   class="cart-decrease " >
                <span class="inner icon-remove_circle_outline"></span>
          </div>
      </transition>
  
</div>
  </div>
</template>

<script>
	export default{
		name:'ccc',
		data(){
			return {
				show:true
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' rel='stylesheet/stylus'>
 .cart-decrease
    display :inline-block
    font-size :24px
    line-height:24px
    color:rgb(0,160,220)
    padding:6px
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-50px);
  opacity :1
}
</style>