<template>
  <section class="section">
    <b-field grouped>
      <b-field label="Issuer" label-position="inside">
        <b-input v-model="newSecretIssuer"></b-input>
      </b-field>
      <b-field label="Secret" label-position="inside">
        <b-input v-model="newSecret"></b-input>
        <p class="control">
          <b-button class="button is-primary" @click="addSecret" :disabled="newSecret === ''">Add Secret</b-button>
        </p>
      </b-field>
    </b-field>

    <token-card v-for="(token, id) in filteredTokens" :key="id" :token="token"/>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import TokenCard from '../components/TokenCard'

export default {
  name: 'Home',
  components: {
    TokenCard
  },
  computed: {
    ...mapState(['tokens']),
    filteredTokens () {
      return this.tokens
    }
  },
  data () {
    return {
      newSecret: '',
      newSecretIssuer: ''
    }
  },
  created () {
    this.$store.dispatch('loadLocalTokens')
  },
  methods: {
    async addSecret () {
      const newToken = {
        issuer: this.newSecretIssuer,
        secret: this.newSecret
      }
      await this.$store.dispatch('addToken', newToken)
      this.newSecretIssuer = ''
      this.newSecret = ''
    }
  }
}
</script>
