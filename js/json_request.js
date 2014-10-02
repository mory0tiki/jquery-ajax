var JsonRequest = (function() {
	var my = {}
	my.base_url = 'http://23.92.220.46:8000/'
	my.result = {	hasError : true,
			data: null
			};

	my.send = function(url, type, data, callback){
			$.ajax({

				url: my.base_url + url,
				type: type,
				data: data,
				xhrFields: {withCredentials: true}
			}).done(function (data, state, jXHR){

				my.result = { hasError: false, data: JSON.parse(data) };
				callback(my.result);

			}).fail(function(data, state, jXHR){
				my.result = {hasError: true, data: data}
				callback(my.result);
			});
		}

	return my;
}())
