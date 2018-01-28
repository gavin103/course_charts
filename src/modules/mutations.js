const state={
	dateList:[],
	onlineList:[]
}
const mutations={
	getData:function(state){
		axios.get('http://localhost:8800/getlist')
	    .then(function(response){
	    	console.log(response)
	        let obj = response.data;
	        let total = obj.data;
	        total.map(function(obj){
	        	state.dateList.push(obj.createDate);
	        	state.onlineList.push(obj.onLineStu);
	        	console.log(state.dateList);
	        })
	        // console.log(state.dateList);
	    })
	    .catch(function(error){
	        console.log(error);
	    })
	}
}
console.log('mutations');
export default{
	state,
	mutations
}