
import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios'
Vue.use(Vuex)
const data=new Vuex.Store({
	state:{
		dateList:[],
		onlineList:[]
	},
	created:{
		axios.get('http://127.0.0.1:8000/mock.js')
	        .then(function(response){
	        	console.log(22222);
	        	console.log("response"+response.data);
	        	//SET_ONLINELIST(state,response.data);
	        	content.commit('SET_DATALIST',response.data);
	          	//content.commit('SET_ONLINELIST',response.body.data.onLineStu);

	        })
	        .catch(function(error){
	          console.log(error);
	        })
	},
	mutations:{
		SET_DATALIST(state,dataList){
			commit(state.dataList,dataList);
		},
		SET_ONLINELIST(state,onlineList){
			commit(state.onlineList,onlineList);
		}
	},
	// actions:{
 //        fetchData:function(content){
 //        	console.log(44444);
	//          axios.get('./mock.js')
	//         .then(function(response){
	//         	console.log(22222);
	//         	console.log("response"+response.data);
	//         	//SET_ONLINELIST(state,response.data);
	//         	content.commit('SET_DATALIST',response.data);
	//           	//content.commit('SET_ONLINELIST',response.body.data.onLineStu);

	//         })
	//         .catch(function(error){
	//           console.log(error);
	//         })
 //   		}
	// }

})
console.log(1111188883);
console.log(data.state);
export default data;