
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
		getData:function(){
			axios.get('http://localhost:8000/mock.js')
	        .then(function(response){

	        	console.log(22222);
	        	let arr=response.data;
	        	console.log(arr instanceof Object);
	        	

	        })
	        .catch(function(error){
	          console.log(error);
	        })
		}
	},
	

})
console.log(1111188883);
data.commit('getData');
export default data;