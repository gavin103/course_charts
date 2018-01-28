'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var state = {
	dateList: [],
	onlineList: []
};
var mutations = {
	getData: function getData(state) {
		axios.get('http://localhost:8800/getlist').then(function (response) {
			var obj = response.data;
			var total = obj.data;
			total.map(function (obj) {
				state.dateList.push(obj.createDate);
				state.onlineList.push(obj.onLineStu);
				console.log(state.dateList);
			});
			// console.log(state.dateList);
		}).catch(function (error) {
			console.log(error);
		});
	}
};
console.log('mutations');
exports.default = {
	state: state,
	mutations: mutations
};