
;(function() {

	var app = angular.module('myApp', []);
	app.controller('indexCtrl', indexCtrl);

	function indexCtrl($scope, $http) {

		// 数据
		$scope.itemList = [];		// 列表项目
		$scope.tabActive = {};		
		$scope.tabActive[0] = true;	// 默认tab当前高亮为第一个
		$scope.prevIndex = 0;		// tab上一个索引对象

		$scope.tabList = [
			{
				'name': '双壁波纹管',
				'type': 'type1'
			},
			{
				'name': '中空壁缠绕管',
				'type': 'type2'
			},
			{
				'name': '塑钢缠绕管',
				'type': 'type3'
			},
			{
				'name': '钢丝网骨架复合管',
				'type': 'type4'
			},
			{
				'name': '钢带增强螺旋波纹管',
				'type': 'type5'
			}];
		
		$scope.vote = vote;		// 投票
		$scope.filter = filter;	// 分类

		// 初次加载
		load();

		function http(options) {
			$http({
				method: options.method,
				url: options.url,
				data: options.data
			})
			.success(function(response, status) {
				if(response.Success) {
					options.success.call(this, response.Data);
				}
			})
			.error(function(error, status) {
				options.error.call(this, error)
			});
		}

		function load() {
			http({
				method: 'GET',
				url: './js/index.json',
				data: { 'type': ['type1', 'type2', 'type3', 'type4', 'type5'] },
				success: function(datas) {
					$scope.datas = datas;
					$scope.itemList = datas['type1'];
				},
				error: function(error) {
					console.log(error);
				}
			});
		}
		
		// $http({
		// 	method: 'GET',
		// 	url: './js/index.json',
		// 	data: { 'type': ['type1', 'type2', 'type3', 'type4', 'type5'] }
		// })
		// .success(function(response, status) {
		// 	if(response.Success) {
		// 		$scope.datas = response.Data;
		// 		$scope.itemList = $scope.datas['type1'];
		// 	}
		// })
		// .error(function(error, status) {
		// 	alert('error');
		// });

		
		function vote(index) {
			var id = $scope.itemList[index].Id;
			http({
				method: 'GET',
				url: './js/index.json',
				data: { 'id': id },
				success: function(datas) {
					$scope.itemList[index].VoteNum += 1;
				},
				error: function(error) {
					console.log(error);
				}
			});
		}

		function filter(type, index) {
			$scope.itemList = $scope.datas[type];
			// tab高亮
			$scope.tabActive[index] = true;
			$scope.tabActive[$scope.prevIndex] = false;
			$scope.prevIndex = index;
		}
	}

})();