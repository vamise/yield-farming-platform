import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  trading: 'https://dex.fyfy.app',
  explorer: 'https://solscan.io',
  trade: 'https://dex.fyfy.app/#/market',
  whitelist : '#'
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {})

export const actions = actionTree({ state, getters, mutations }, {})
