import data from './modules/mutations'

const store=new Vuex.Store({
	// modules:{
	// 	getd
	// }
	state:data.state,
	mutations:data.mutations
})
store.commit('getData');
export 
default store;
