//some default pre init
var Countly = Countly || {};
Countly.q = Countly.q || [];

//provide countly initialization parameters
Countly.app_key = '941c8617fc599bd077f85b1713c124521d245377';
Countly.url = 'http://countly.wolfogre.com'; //or none for default countly cloud

Countly.q.push(['track_sessions']);
Countly.q.push(['track_pageview']);
Countly.q.push(['track_clicks']);
Countly.q.push(['track_errors']);
Countly.q.push(['track_links']);
Countly.q.push(['track_forms']);

//load countly script asynchronously
(function() {
   var cly = document.createElement('script'); cly.type = 'text/javascript';
   cly.async = true;
   //enter url of script here
   cly.src = 'https://cdnjs.cloudflare.com/ajax/libs/countly-sdk-web/16.2.0/countly.min.js';
   cly.onload = function(){Countly.init()};
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cly, s);
})();