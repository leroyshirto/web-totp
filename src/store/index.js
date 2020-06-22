import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'

Vue.use(Vuex)

const WEB_TOTP_KEY = 'w_totp'

const readTokens = () => {
  let tokens = []
  const tokenString = localStorage.getItem(WEB_TOTP_KEY)
  if (tokenString) {
    tokens = JSON.parse(tokenString)
  }
  return tokens
}

const writeTokens = (tokens) => {
  localStorage.setItem(WEB_TOTP_KEY, JSON.stringify(tokens))
}

export default new Vuex.Store({
  state: {
    tokens: []
  },
  mutations: {
    SET_TOKENS (state, newTokens) {
      state.tokens = newTokens
    },
    UPDATE_TOKEN (state, newToken) {
      const tokenIndex = state.tokens.findIndex((item) => { return item.id === newToken.id })
      if (tokenIndex && tokenIndex !== -1) {
        state.tokens[tokenIndex] = newToken
      } else {
        state.tokens.push(newToken)
      }

      writeTokens(state.tokens)
    },
    REMOVE_TOKEN (state, tokenId) {
      state.tokens = state.tokens.filter((item) => { return item.id !== tokenId })
      writeTokens(state.tokens)
    }
  },
  actions: {
    loadLocalTokens (context) {
      const tokens = readTokens()
      context.commit('SET_TOKENS', tokens)
    },
    addToken (context, tokenData) {
      const newToken = {
        id: uuidv4(),
        issuer: tokenData.issuer || 'Unknown',
        label: tokenData.label || '',
        algorithm: tokenData.algorithm || 'SHA1',
        digits: tokenData.digits || 6,
        period: tokenData.period || 30,
        secret: tokenData.secret
      }
      context.commit('UPDATE_TOKEN', newToken)
    }
  }
})
