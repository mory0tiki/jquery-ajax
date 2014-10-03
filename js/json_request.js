var JsonRequest = (function() {
	var my = {}
	my.base_url = 'http://localhost:8000/'
	my.result = {	hasError : true,
			data: null
			};

	my.send = function(url, type, data, callback){
			$.ajaxSetup({ 
					beforeSend: function(xhr, settings) {
						//if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
							// Only send the token to relative URLs i.e. locally.
							xhr.setRequestHeader("X-CSRFToken",$.cookie ('csrftoken'));
						//}
					} 
			});
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
