<template>
  <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:isShowSms}" @click="isShowSms=true">短信登录</a>
            <a href="javascript:;" :class="{on:!isShowSms}" @click="isShowSms=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:isShowSms}">

              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" 
                v-model="phone" name="phone" v-validate="'required|mobile'">

                <button :disabled=!isRightPhone class="get_verification" :class="{is_right_num:isRightPhone}" @click.prevent="sendCode">获取验证码</button>
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="验证码"
                v-model="code" name="code" v-validate="{required: true,regex: /^\d{6}$/}">
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!isShowSms}">
              <section>
                <section class="login_message">
                  <input type="text" placeholder="用户名"
                  v-model="name" name="name" v-validate="'required'">
                <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </section>
                <section class="login_verification">
                  <input :type="isShowPsw?'text':'password'" maxlength="8" placeholder="密码"
                  v-model="pwd" name="pwd" v-validate="'required'">
                  
                  <div class="switch_button" :class="isShowPsw?'on':'off'" @click="isShowPsw=!isShowPsw">
                    <div class="switch_circle" :class="{right:isShowPsw}"></div>
                    <span class="switch_text">{{isShowPsw?'abc':''}}</span>
                  </div>
                  <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" 
                  v-model="captcha" name="captcha" v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}"
                  >
                  <img class="get_verification" src="./images/captcha.svg" alt="captcha">
                   <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                </section>
              </section>
            </div>
            <button class="login_submit">{{$t('login_login')}}</button>
          </form>
          <a href="javascript:;" class="about_us">{{$t('login_aboutUs')}}</a>
          <br>
        <button class="login_submit" @click.prevent="toggleLocale">切换语言</button>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
</template>

<script type="text/ecmascript-6">
  export default {
     name: 'Login',
    data() {
      return {
        phone:'',
        isShowSms:true,
        isShowPsw:false
      }
    },
    computed: {
      // 直接当做普通属性调用不加括号
      // 任何data中数据变化立即重新计算
      // 计算属性会缓存
      isRightPhone(){
        return /^1\d{10}$/.test(this.phone)
      } 
    },
    methods: {
      sendCode(){
        alert('------')
      },
      toggleLocale () {
        // 根据当前的locale确定新的locale
        const locale = this.$i18n.locale === 'en' ? 'zh_CN' : 'en'
        // 指定新的locale
        this.$i18n.locale = locale
        // 保存新的locale
        localStorage.setItem('locale_key', locale)
      },

      async login () {
        // 进行前台表单验证
        let names
        if (this.isShowSms) {
          names = ['phone', 'code']
        } else {
          names = ['name', 'pwd', 'captcha']
        }
        const success = await this.$validator.validateAll(names)
    }
  }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import'../../common/stylus/mixins.styl' 
 .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.is_right_num
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
      
</style>
