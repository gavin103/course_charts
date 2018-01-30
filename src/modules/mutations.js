const state={
	list:[],
	dateList:[],
	onlinestu:[],
	totalstu:[]
}
const mutations={
	getData:function(state){
		axios.get('http://localhost:8800/getlist')
	    .then(function(response){
	        let obj = response.data.list;
	        state.list=obj;
	        console.log(obj);
	        const index=obj[0].data.length;
	        const student=[];
	        const total=[];
	        for(let i=0;i<index;i++){
	        	state.dateList.push(obj[0].data[i].createDate);
	        }
	        for(let i=0;i<obj.length;i++){
	        	for(let j=0;j<obj[i].data.length;j++){
	        		student.push(obj[i].data[j].onLineStu);
	        		total.push(obj[i].data[j].totalStu);
	        	}
	        	state.onlinestu.push(student);
	        	state.totalstu.push(total);
	        }
	    })
	    .catch(function(error){
	        console.log(error);
	    })
	}
}
export default{
	state,
	mutations
}