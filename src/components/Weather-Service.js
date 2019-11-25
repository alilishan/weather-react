
// Weather API sample javascript code
// Requires: jQuery( removed dependancies ) and crypto-js (v3.1.9)
// 
// Copyright 2019 Oath Inc. Licensed under the terms of the zLib license see https://opensource.org/licenses/Zlib for terms.

// Reference:
	// https://gist.github.com/VerizonMediaOwner/ec22d1568bd136a7e818371cd64ae2f5
	// http://youmightnotneedjquery.com/
	// https://stackoverflow.com/questions/38402025/how-to-create-helper-file-full-of-functions-in-react-native


import QueryString from 'query-string'; 
import CryptoJS from 'crypto-js';


const Service = {

	deepExtend: function(out) {
	  out = out || {};

	  for (var i = 1; i < arguments.length; i++) {
	    var obj = arguments[i];

	    if (!obj)
	      continue;

	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        if (typeof obj[key] === 'object')
	          out[key] = Service.deepExtend(out[key], obj[key]);
	        else
	          out[key] = obj[key];
	      }
	    }
	  }

	  return out;
	}, 

    getWeather: (config, woeid) => {
    	return new Promise((resolve, reject) => {

			var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
			var method = 'GET';
			var app_id = config.a;
			var consumer_key = config.k;
			var consumer_secret = config.s;
			var concat = '&';
			//var query = {'location': 'sunnyvale,ca', 'format': 'json'};
			var query = {'woeid': woeid, 'format': config.format, 'u': config.u};
			var oauth = {
			    'oauth_consumer_key': consumer_key,
			    'oauth_nonce': Math.random().toString(36).substring(2),
			    'oauth_signature_method': 'HMAC-SHA1',
			    'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
			    'oauth_version': '1.0'
			};

			var merged = {}; 
			
			// $.extend(merged, query, oauth);
			Service.deepExtend(merged, query, oauth);
			
			// Note the sorting here is required
			var merged_arr = Object.keys(merged).sort().map(function(k) {
			  return [k + '=' + encodeURIComponent(merged[k])];
			});
			
			var signature_base_str = method
			  + concat + encodeURIComponent(url)
			  + concat + encodeURIComponent(merged_arr.join(concat));

			var composite_key = encodeURIComponent(consumer_secret) + concat;
			var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
			var signature = hash.toString(CryptoJS.enc.Base64);

			oauth['oauth_signature'] = signature;
			var auth_header = 'OAuth ' + Object.keys(oauth).map(function(k) {
			  return [k + '="' + oauth[k] + '"'];
			}).join(',');

			/*$.ajax({
			  url: url + '?' + $.param(query),
			  headers: {
			    'Authorization': auth_header,
			    'X-Yahoo-App-Id': app_id 
			  },
			  method: 'GET',
			  success: function(data){
			    resolve(data);
			  }
			});*/

			fetch(url + '?' + QueryString.stringify(query), {
				headers: {
					'Authorization': auth_header,
					'X-Yahoo-App-Id': app_id 
				}
			})
			    .then(res => (res.ok ? res : reject(res)))
			    .then(res => resolve(res.json()));

		});
    }
}

export default Service;