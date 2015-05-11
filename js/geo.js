$(function(){
	var geo = navigator.geolocation;
	var opciones = {}

	function geo_exito(posicion){
		var lat  = posicion.coords.latitude;
		var lon  = posicion.coords.longitude;
		var mapa = new Image();
		mapa.src = "http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=300x300&sensor=false&center=" + lat + ", " + lon;

		$("#geo").append(mapa);

		obtenerGeoInformacion(lat, lon);
	}

	function geo_error(){
		alert("No puedo ubicarte");
	}

	geo.getCurrentPosition(geo_exito, geo_error, opciones);	

});