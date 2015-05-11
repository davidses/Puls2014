var $form = $("#formulario");
var $titulo = $("#titulo");
var $url = $("#url");
var $button = $("#mostrar-form");
var $list = $("#contenido");
var $post = $(".item").first();


function toggleform(){
	$form.slideToggle();
	$list.slideToggle();
	return false; // PARA QUE NO RECARGUE LA PAGINA POR CONSECUENCIA DE HREF="#"
}

function agregarPost(){
	var url = $url.val();
	var titulo = $titulo.val();
	var $clone = $post.clone(); 

	$clone.find(".titulo_item a")
		.text(titulo)
		.attr("href", url);

	$clone.hide();
	$list.prepend($clone);
	$clone.fadeIn();

	toggleform(); 

	return false;
}



// EVENTOS

$button.click(toggleform);
$form.on("submit", agregarPost);