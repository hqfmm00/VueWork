<template>
   <div class="star" :class="'star-'+size">
      <span class="star-item" v-for="(sc, index) in starClass" :key="index" :class="sc"></span>
     
  </div>
                     
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      score:Number,
      size:Number
    },
    computed: {
      starClass(){
        const {score} = this
        const arrStar= []

        const Zs = Math.floor(score)
        for (let index = 0; index < Zs; index++) {
          arrStar.push('on')
        }
      

        if(score*10-Zs*10>=5){
          arrStar.push('half')
        }

        while (arrStar.length<5) {
          arrStar.push('off')
        }
          return arrStar
      }
    },
  }
  
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import'../../common/stylus/mixins.styl' 
  .star 
      float left
      font-size 0
      .star-item
        display inline-block
        background-repeat no-repeat
      &.star-48
        .star-item
          width 20px
          height 20px
          margin-right 22px
          background-size 20px 20px
          &:last-child
            margin-right: 0
          &.on
            bg-image('./images/star48_on')
          &.half
            bg-image('./images/star48_half')
          &.off
            bg-image('./images/star48_off')
      &.star-36
        .star-item
          width 15px
          height 15px
          margin-right 6px
          background-size 15px 15px
          &:last-child
            margin-right 0
          &.on
            bg-image('./images/star36_on')
          &.half
            bg-image('./images/star36_half')
          &.off
            bg-image('./images/star36_off')
      &.star-24
        .star-item
          width 10px
          height 10px
          margin-right 3px
          background-size 10px 10px
          &:last-child
            margin-right 0
          &.on
            bg-image('./images/star24_on')
          &.half
            bg-image('./images/star24_half')
          &.off
            bg-image('./images/star24_off')
    
  
</style>
