
import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios'
Vue.use(Vuex)
const data=new Vuex.Store({
	state:{
		dateList:[],
		onlineList:[]
	},
	mutations:{
		getData:function(state){
			axios.get('http://localhost:8000/mockdata.js')
	        .then(function(response){
	        	let obj = response.data;
	        	console.log(obj.data);
	        	let total = obj.data;
	        	total.map(function(obj){
	        		state.dateList.push(obj.createDate);
	        		state.onlineList.push(obj.onLineStu);
	        		//console.log(state.dateList);
	        	})
	        	console.log(state.dateList);
	        })
	        .catch(function(error){
	          console.log(error);
	        })
		}
	},
	getters:{
		done:state=>{
			return state.dateList+state.onlineList;
		}
	}
	

})
data.commit('getData');
export default data;