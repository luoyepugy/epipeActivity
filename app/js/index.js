
;(function() {

	var app = angular.module('myApp', []);
	app.controller('indexCtrl', indexCtrl);

	function indexCtrl($scope, $http, $timeout) {

		// 数据
		$scope.itemList = [];		// 列表项目
		$scope.tabActive = {};		
		$scope.tabActive[0] = true;	// 默认tab当前高亮为第一个
		$scope.prevIndex = 0;		// tab上一个索引对象
		// $scope.host = 'http://192.168.1.68:8007';
		$scope.host = 'http://192.168.1.68:8007';

		$scope.errorShow = false;
		$scope.errorMessage = '';

		$scope.tabList = [
			{
				'name': '双壁波纹管',
				'type': '双壁波纹管'
			},
			{
				'name': '中空壁缠绕管',
				'type': '中空壁缠绕管'
			},
			{
				'name': '塑钢缠绕管',
				'type': '塑钢缠绕管'
			},
			{
				'name': '钢丝网骨架复合管',
				'type': '钢丝网骨架复合管'
			},
			{
				'name': '钢带增强螺旋波纹管',
				'type': '钢带增强螺旋波纹管'
			}];
		
		$scope.vote = vote;		// 投票
		$scope.filter = filter;	// 分类

		// 初次加载
		load();

		function errorTip(tips) {
			$scope.errorShow = true;
			$scope.errorMessage = tips;

			$timeout.cancel($scope.timer);
			$scope.timer = $timeout(function() {
				$scope.errorShow = false;
				$scope.errorMessage = '';
			}, 3000);
		}

		function http(options) {
			var req = {
				method: options.method,
				url: $scope.host + options.url,
				data: options.datas
			};
			if(options.method == 'GET') {
				req = {
					method: options.method,
					url: $scope.host + options.url,
					params: options.datas
				};
			}

			$http(req)
			.success(function(response, status) {
				if(response.Success) {
					options.success.call(this, response);
				} else {
					options.error.call(this, response);
				}
			})
			.error(function(error, status) {
				options.error.call(this, error);
			});
		}

		function load() {
			http({
				method: 'GET',
				url: '/api/vote/GetVotes',
				datas: { 'voteTypes': '双壁波纹管,中空壁缠绕管,塑钢缠绕管,钢丝网骨架复合管,钢带增强螺旋波纹管' },
				success: function(datas) {
					$scope.datas = datas.Data;
					$scope.itemList = datas.Data['双壁波纹管'];
				},
				error: function(error) {
					errorTip('服务器请求失败');
				}
			});
		}

		
		function vote(index) {
			var id = $scope.itemList[index].Id;
			if($scope.itemList[index].HasVote) {
				return false;
			}

			http({
				method: 'POST',
				url: '/api/vote/postVote',
				datas: { 'id': id },
				success: function(datas) {
					$scope.itemList[index].VoteNum += 1;
					$scope.itemList[index].HasVote = true;
				},
				error: function(error) {
					if(error.StatusCode === 5000) {
						$scope.itemList[index].HasVote = true;
					}
					errorTip(error.ErrorMessage);
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