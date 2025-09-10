/*BUSCA*/
function busca(){	
	$('.ui-autocomplete').appendTo('header#header div.busca');
}
function autocompleteClone(){
	$('.ui-autocomplete').appendTo('header#header div.busca');
	if($('ul.product-found').size() > 0){
		$('ul.product-found').remove();
	}
		
	$('.ui-autocomplete li').each(function() {
		if($(this).find('img').length > 0) {
			
			$(this).find('a').wrapInner('<span/>')
			$(this).find('a').prepend($(this).find('img'));
			
			$(this).addClass('hasImage');
			var imgSrc = $(this).find('img').attr('src').replace('25-25','267-400');
			$(this).find('img').attr('src' , imgSrc).prop('width','237').prop('height','400');
		}
	});
	$('.hasImage').wrapAll('<ul class="product-found"></ul>');
}

busca();

$(document).ajaxStop(function(){
	autocompleteClone();
});

$('header#header .stpl-header div.busca button.close').live('click',function(){
	$('header#header .stpl-header div.busca').removeClass('slide-in-top');
	$('body').removeClass('menuOpen');
});
$('header#header .middle ul li.busca a').live('click',function(){
	$('header#header .stpl-header div.busca').addClass('slide-in-top');
	$('body').addClass('menuOpen');

	return false;
});
/*FIM BUSCA*/
