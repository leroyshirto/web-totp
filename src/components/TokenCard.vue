<template>
  <div class="token-card">
    {{token.issuer}} {{totpToken}} {{updatingIn}}
    <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
      <b-icon icon="dots-vertical" slot="trigger"></b-icon>
      <b-dropdown-item aria-role="listitem" @click="deleteToken">Delete</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import * as OTPAuth from 'otpauth'

export default {
  name: 'token-card',
  props: {
    token: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      updatingIn: null,
      totp: null,
      totpToken: ''
    }
  },
  mounted () {
    this.totp = new OTPAuth.TOTP({
      algorithm: this.token.algorithm,
      digits: this.token.digits,
      period: this.token.period,
      secret: OTPAuth.Secret.fromB32(this.stripSpaces(this.token.secret))
    })

    this.update()

    this.intervalHandle = setInterval(this.update, 1000)
  },
  destroyed () {
    clearInterval(this.intervalHandle)
  },
  methods: {
    stripSpaces (str) {
      return str.replace(/\s/g, '')
    },
    getCurrentSeconds () {
      return Math.round(new Date().getTime() / 1000.0)
    },
    truncateTo (str, digits) {
      if (str.length <= digits) {
        return str
      }

      return str.slice(-digits)
    },
    update () {
      this.updatingIn = this.token.period - (this.getCurrentSeconds() % this.token.period)
      this.totpToken = this.truncateTo(this.totp.generate(), this.token.digits)
    },
    deleteToken () {
      this.$store.commit('REMOVE_TOKEN', this.token.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.token-card {
  display: flex;
  align-items: flex-start;

  .token-image {
  }

  .token-body {

  }
}
</style>
