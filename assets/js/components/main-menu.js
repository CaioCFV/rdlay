/*MENU*/
jQuery.fn.extend({
    splitListMany: function(cols){
        var list = $(this);
        var listLen = $(this).length;
        var colSize;
        var columns;
         
        if ((cols == null)||(cols <= 0)||(columns >= listLen)) { columns = 2; }
        else if (cols >= (listLen/2)) { columns = Math.floor(listLen/2); }
        else { columns = cols; }
         
        if (listLen%columns > 0) { colSize = Math.ceil(listLen/columns); }
        else { colSize = listLen/columns; }
         
        for(var i=1; i <= columns; i++){
            list.slice((i-1)*colSize,i*colSize).wrapAll('<div class="lists list-'+i+'">');
        }
    return $(this);
    }
});
$.ajax({
    type: 'GET',
    url: '/api/catalog_system/pub/category/tree/1356',
    success: function(dataMenu) {
    	console.log('dataMenu: ',dataMenu);

		for(var y = 0; y < dataMenu.length; y++) {
			
			if(dataMenu[y].name == 'BLUSAS'){
				$('header#header ul.menu li.itemDepartamento.blusas').addClass('comSub');
				for(var blusas = 0; blusas < dataMenu[y].children.length; blusas++) {
					var urlSub = dataMenu[y].children[blusas].url;
					var urlSub = urlSub.split('.com.br')[1];
					var nomeSub = dataMenu[y].children[blusas].name;

					$('header#header ul.menu li.itemDepartamento.blusas .submenu ul').append('<li><a href="'+urlSub+'?O=OrderByReleaseDateDESC" title="'+nomeSub+'">'+nomeSub+'</a></li>');

					if(blusas+1 == dataMenu[y].children.length){
						$('header#header ul.menu li.itemDepartamento.blusas .submenu ul').append("<li class='verTudo'><a href='/blusas?O=OrderByReleaseDateDESC'>Ver todos os itens</a></li>");
					
						if($('header#header ul.menu li.itemDepartamento.blusas .submenu ul li').size() > 5){
							$('header#header ul.menu li.itemDepartamento.blusas .submenu ul li').splitListMany(2);
						}
					}
				}
			}

			if(dataMenu[y].name == 'CALÇAS'){
				$('header#header ul.menu li.itemDepartamento.calcas').addClass('comSub');
				for(var calcas = 0; calcas < dataMenu[y].children.length; calcas++) {
					var urlSub = dataMenu[y].children[calcas].url;
					var urlSub = urlSub.split('.com.br')[1];
					var nomeSub = dataMenu[y].children[calcas].name;

					$('header#header ul.menu li.itemDepartamento.calcas .submenu ul').append('<li><a href="'+urlSub+'?O=OrderByReleaseDateDESC" title="'+nomeSub+'">'+nomeSub+'</a></li>');

					if(calcas+1 == dataMenu[y].children.length){
						$('header#header ul.menu li.itemDepartamento.calcas .submenu ul').append("<li class='verTudo'><a href='/calcas?O=OrderByReleaseDateDESC'>Ver todos os itens</a></li>");
					
						if($('header#header ul.menu li.itemDepartamento.calcas .submenu ul li').size() > 5){
							$('header#header ul.menu li.itemDepartamento.calcas .submenu ul li').splitListMany(2);
						}
					}
				}
			}

			if(dataMenu[y].name == 'CASACOS'){
				$('header#header ul.menu li.itemDepartamento.casacos').addClass('comSub');
				for(var casacos = 0; casacos < dataMenu[y].children.length; casacos++) {
					var urlSub = dataMenu[y].children[casacos].url;
					var urlSub = urlSub.split('.com.br')[1];
					var nomeSub = dataMenu[y].children[casacos].name;

					$('header#header ul.menu li.itemDepartamento.casacos .submenu ul').append('<li><a href="'+urlSub+'?O=OrderByReleaseDateDESC" title="'+nomeSub+'">'+nomeSub+'</a></li>');

					if(casacos+1 == dataMenu[y].children.length){
						$('header#header ul.menu li.itemDepartamento.casacos .submenu ul').append("<li class='verTudo'><a href='/casacos?O=OrderByReleaseDateDESC'>Ver todos os itens</a></li>");
					
						if($('header#header ul.menu li.itemDepartamento.casacos .submenu ul li').size() > 5){
							$('header#header ul.menu li.itemDepartamento.casacos .submenu ul li').splitListMany(2);
						}
					}
				}
			}

			if(dataMenu[y].name == 'MACACÕES'){
				$('header#header ul.menu li.itemDepartamento.macacoes').addClass('comSub');
				for(var macacoes = 0; macacoes < dataMenu[y].children.length; macacoes++) {
					var urlSub = dataMenu[y].children[macacoes].url;
					var urlSub = urlSub.split('.com.br')[1];
					var nomeSub = dataMenu[y].children[macacoes].name;

					$('header#header ul.menu li.itemDepartamento.macacoes .submenu ul').append('<li><a href="'+urlSub+'?O=OrderByReleaseDateDESC" title="'+nomeSub+'">'+nomeSub+'</a></li>');

					if(macacoes+1 == dataMenu[y].children.length){
						$('header#header ul.menu li.itemDepartamento.macacoes .submenu ul').append("<li class='verTudo'><a href='/macacoes---jardineiras?O=OrderByReleaseDateDESC'>Ver todos os itens</a></li>");
					
						if($('header#header ul.menu li.itemDepartamento.macacoes .submenu ul li').size() > 5){
							$('header#header ul.menu li.itemDepartamento.macacoes .submenu ul li').splitListMany(2);
						}
					}
				}
			}

			if(dataMenu[y].name == 'SAIAS'){
				$('header#header ul.menu li.itemDepartamento.saias').addClass('comSub');
				for(var saias = 0; saias < dataMenu[y].children.length; saias++) {
					var urlSub = dataMenu[y].children[saias].url;
					var urlSub = urlSub.split('.com.br')[1];
					var nomeSub = dataMenu[y].children[saias].name;

					$('header#header ul.menu li.itemDepartamento.saias .submenu ul').append('<li><a href="'+urlSub+'?O=OrderByReleaseDateDESC" title="'+nomeSub+'">'+nomeSub+'</a></li>');

					if(saias+1 == dataMenu[y].children.length){
						$('header#header ul.menu li.itemDepartamento.saias .submenu ul').append("<li class='verTudo'><a href='/saias?O=OrderByReleaseDateDESC'>Ver todos os itens</a></li>");
					
						if($('header#header ul.menu li.itemDepartamento.saias .submenu ul li').size() > 5){
							$('header#header ul.menu li.itemDepartamento.saias .submenu ul li').splitListMany(2);
						}
					}
				}
			}

			if(dataMenu[y].name == 'SHORT / BERMUDA'){
				$('header#header ul.menu li.itemDepartamento.short').addClass('comSub');
				for(var short = 0; short < dataMenu[y].children.length; short++) {
					var urlSub = dataMenu[y].children[short].url;
					var urlSub = urlSub.split('.com.br')[1];
					var nomeSub = dataMenu[y].children[short].name;

					$('header#header ul.menu li.itemDepartamento.short .submenu ul').append('<li><a href="'+urlSub+'?O=OrderByReleaseDateDESC" title="'+nomeSub+'">'+nomeSub+'</a></li>');

					if(short+1 == dataMenu[y].children.length){
						$('header#header ul.menu li.itemDepartamento.short .submenu ul').append("<li class='verTudo'><a href='/short?O=OrderByReleaseDateDESC'>Ver todos os itens</a></li>");
					
						if($('header#header ul.menu li.itemDepartamento.short .submenu ul li').size() > 5){
							$('header#header ul.menu li.itemDepartamento.short .submenu ul li').splitListMany(2);
						}
					}
				}
			}

			if(dataMenu[y].name == 'TOPS'){
				$('header#header ul.menu li.itemDepartamento.tops').addClass('comSub');
				for(var tops = 0; tops < dataMenu[y].children.length; tops++) {
					var urlSub = dataMenu[y].children[tops].url;
					var urlSub = urlSub.split('.com.br')[1];
					var nomeSub = dataMenu[y].children[tops].name;

					$('header#header ul.menu li.itemDepartamento.tops .submenu ul').append('<li><a href="'+urlSub+'?O=OrderByReleaseDateDESC" title="'+nomeSub+'">'+nomeSub+'</a></li>');

					if(tops+1 == dataMenu[y].children.length){
						$('header#header ul.menu li.itemDepartamento.tops .submenu ul').append("<li class='verTudo'><a href='/tops?O=OrderByReleaseDateDESC'>Ver todos os itens</a></li>");
					
						if($('header#header ul.menu li.itemDepartamento.tops .submenu ul li').size() > 5){
							$('header#header ul.menu li.itemDepartamento.tops .submenu ul li').splitListMany(2);
						}
					}
				}
			}

			if(dataMenu[y].name == 'VESTIDOS'){
				$('header#header ul.menu li.itemDepartamento.vestidos').addClass('comSub');
				for(var vestidos = 0; vestidos < dataMenu[y].children.length; vestidos++) {
					var urlSub = dataMenu[y].children[vestidos].url;
					var urlSub = urlSub.split('.com.br')[1];
					var nomeSub = dataMenu[y].children[vestidos].name;

					$('header#header ul.menu li.itemDepartamento.vestidos .submenu ul').append('<li><a href="'+urlSub+'?O=OrderByReleaseDateDESC" title="'+nomeSub+'">'+nomeSub+'</a></li>');

					if(vestidos+1 == dataMenu[y].children.length){
						$('header#header ul.menu li.itemDepartamento.vestidos .submenu ul').append("<li class='verTudo'><a href='/vestidos?O=OrderByReleaseDateDESC'>Ver todos os itens</a></li>");
					
						if($('header#header ul.menu li.itemDepartamento.vestidos .submenu ul li').size() > 5){
							$('header#header ul.menu li.itemDepartamento.vestidos .submenu ul li').splitListMany(2);
						}
					}
				}
			}

			if(y+1 == dataMenu.length){
				var menuClone = $('header .stpl-header menu').html();
				$('#menuMobile .left menu#menu').html(menuClone);
				$('#menuMobile .left menu#menu .box-banner').remove();
				$('#menuMobile .left menu#menu a.linkDepartamento').wrap('<h3>');
				$('#menuMobile .left menu#menu li.comSub h3').append('<button></button>');
			}
		}
	}
});

/*MENU MOBILE*/
$('header .stpl-header .middle .tpl-center button.hamburguer').live('click', function(){
	$('body').addClass('menuMobileOpen');

	$('#menuMobile').animate({
	   left: "0"
	},300);
});
$('#menuMobile .right button, #menuMobile .left button.close, #menuMobile .left .top .saudacao a#login button').live('click', function(){
	$('body').removeClass('menuMobileOpen');

	$('#menuMobile').animate({
	   left: "-110%"
	},150);
});

$('#menuMobile .left menu#menu li.itemDepartamento h3 button').live('click', function(){
	var _this = $(this);

	if(_this.parents('li.itemDepartamento').find('.submenu').length){
		if(_this.parents('li.itemDepartamento').find('.submenu').is(':visible')){
			$('#menuMobile .left menu#menu li.itemDepartamento .submenu').slideUp('fast');
			
			setTimeout(function(){
				$('#menuMobile .left menu#menu li.itemDepartamento').removeClass('ativo');
			},100);
		}else{
			$('#menuMobile .left menu#menu li.itemDepartamento').removeClass('ativo');
			_this.parents('li.itemDepartamento').addClass('ativo');
			$('#menuMobile .left menu#menu li.itemDepartamento .submenu').slideUp('fast');
			_this.parents('li.itemDepartamento').find('.submenu').slideToggle();
		}
	}
});/*FIM MENU MOBILE*/
