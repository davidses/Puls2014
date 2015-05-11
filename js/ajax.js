$(function(){

	$("footer").load("logos_footer.html"); //Forma mas sencilla de hacer lo de abajo
											// pero solo en div vacios

	// $.get("logos_footer.html", function(html){
	// 	$("footer").append(html);
	// });


	$.get("usuarios.json", function(user){
		var avatar  = new Image();
		avatar.src  = "img/" + user.avatar;
		avatar.title = user.nombre + " " + user.apellido;

		$("#avatar").append(avatar);
	});


});

var yql_url = "http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon){
	// select * from geo.placefinder where text="Cordoba, Argentina"
	var query = "SELECT * FROM geo.placefinder WHERE text='" + lat + ", "+ lon + "' AND gflags='R'";
	query = encodeURIComponent(query);

	$.ajax({
		url: yql_url+"q="+query,
		dataType: "jsonp",
		jsonpCallback: "procesarGeoInfo",
		data: {
			format: "json"
		}
	});
}

function obtenerClima(woeid){

	var query = "SELECT * FROM weather.forecast WHERE woeid='" + woeid +"' AND u='c'";
	query = encodeURIComponent(query);

	$.ajax({
		url: yql_url+"q="+query,
		dataType: "jsonp",
		jsonpCallback: "procesarClima",
		data: {
			format: "json"
		}
	});
}

function procesarClima(datos){
	var clima = datos.query.results.channel;
	var temp  = clima.item.condition.temp;

	$("#clima").append("<p>"+"Temperatura: "+temp+"c"+"</p>");

	console.log(datos);
};

function procesarGeoInfo(datos){
	var res = datos.query.results.Result;
	var barrio = res.neighborhood; 
	var ciudad = res.city;
	var pais   = res.country;
	var woeid  = res.woeid;

	console.log(datos);
	
	$("#geo").prepend("<p>" + ciudad + "<br>" + pais + "</p>");

	obtenerClima(woeid);
}