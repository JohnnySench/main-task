import { createStore } from 'vuex'
import actions from './actions/actions';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import state from './state/state';

export default createStore({
  state,
  getters,
  mutations,
  actions
})
