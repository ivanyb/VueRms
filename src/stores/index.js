import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

import global from './global/index.js';

export default new vuex.Store({
    modules:{
        global
    }
});