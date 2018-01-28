'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mutations = require('./modules/mutations');

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = new Vuex.Store({
	// modules:{
	// 	getd
	// }
	state: _mutations2.default.state,
	mutations: _mutations2.default.mutations
});
store.commit('getData');
exports.default = store;