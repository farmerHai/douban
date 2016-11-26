/**
 * Created by USER on 2016/11/26.
 */
(function(angular){
    var http=angular.module('myapp.services',[]);
	http.service('HttpService',['$document','$window', function ($document, $window) {
		this.$jsonp= function (url, data, callback) {
			var fnSuffix=Math.random().toString().replace('.','');
			var cbFuncName='my_json_cb'+fnSuffix;
			$window[cbFuncName]=callback;
			var querystring=url.indexOf('?')==-1?'?':'&';
			for (var key in data) {
				querystring+=key+'='+data[key]+'&';
			}
			querystring+='callback'+'='+cbFuncName;
			var scriptElement=$document[0].createElement('script')
			scriptElement.src=url+querystring;
			$document[0].body.appendChild(scriptElement);
		}
	}])
})(angular);
