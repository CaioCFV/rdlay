if($('body').hasClass('internasComum')){
	$(".wrapperFiltros input[type='checkbox']").vtexSmartResearch({
	    pageLimit:null,
	    loadContent:".prateleira[id^=ResultItems]",
	    shelfClass:".prateleira",
	    filtersMenu:".search-multiple-navigator",
	    linksMenu:".search-single-navigator",
	    menuDepartament:".navigation .menu-departamento",
	    mergeMenu:true, 
	    insertMenuAfter:".search-multiple-navigator h3:first",
	    emptySearchElem:jQuery('<div class="vtexsr-emptySearch"></div>'),
	    elemLoading:'<div id="scrollLoading">Carregando...</div>',
	    // elemLoading:'<div id="scrollLoading" class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
	    returnTopText:'<span class="text">voltar ao</span><span class="text2">TOPO</span>',
	    emptySearchMsg:'<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>',
	    filterErrorMsg:"Houve um erro ao tentar filtrar a página!",
	    showLinks:true,
	    popupAutoCloseSeconds:3, 
	    filterScrollTop:function(shelfOffset){
	        //return (shelfOffset.top-20);
	    },
	    callback:function(){
	    },
	    shelfCallback:function(){
	    	window.descontoPrateleira();
	    },
	    getShelfHeight:function(container){
	        return (container.scrollTop()+container.height());
	    }
	});	

	$(document).ajaxStop(function(){
		window.descontoPrateleira();
	});

	$('.wrapperFiltros .tpl-center .middle .navigation-tabs .search-multiple-navigator fieldset.filtro_cor div label').each(function(){
		var thisCorClass = $(this).attr('class');
		var thisCor = $(this).attr('title');
		$(this).find('.sr_box').css('background-image', 'url("/arquivos/thumb-'+thisCorClass+'.png?v=3")');
		$(this).append('<label>'+thisCor+'</label>');

	});

	$('.wrapperFiltros .productClusterSearchableIds').remove();

	$('body.departamento .wrapperFiltros .search-multiple-navigator h3').remove();
	$('body.departamento .wrapperFiltros .search-multiple-navigator h4').remove();

	$('body.departamento .wrapperFiltros .search-single-navigator h3').remove();
	$('body.departamento .wrapperFiltros .search-single-navigator h5').remove();
	$('body.departamento .wrapperFiltros .search-single-navigator ul').remove();

	if($('body.departamento .wrapperFiltros .search-single-navigator h4').size() > 0){
		$('body.departamento .wrapperFiltros .search-multiple-navigator').prepend('<fieldset class="refino even categorias"><h5>Categorias</h5><div></div></fieldset>');
		$('body.departamento .wrapperFiltros .search-single-navigator h4').each(function(){
			$(this).find('a').html($(this).find('a').attr('title'));
			var thisH4 = $(this).html();
			$('body.departamento .wrapperFiltros .search-multiple-navigator fieldset.categorias div').append('<label>'+thisH4+'</label>');
		});
	}

	if($('body.resultado-busca .wrapperFiltros .search-single-navigator h3').size() > 0){
		$('body.resultado-busca .wrapperFiltros .search-single-navigator').prepend('<fieldset class="refino even categorias"><h5>Categorias</h5><div></div></fieldset>');
		
		$('body.resultado-busca .wrapperFiltros .search-single-navigator a').each(function(){
			var thisA = $(this).html();
			var thisATEXT = $(this).text()
			var thisALink = $(this).attr('href');
			var subcategoria;

			if(thisATEXT.indexOf('(') > -1){
				var subcategoria = true;
			}else{
				var subcategoria = false;
			}
			$('body.resultado-busca .wrapperFiltros .search-single-navigator fieldset.categorias div').append('<label subcategoria="'+subcategoria+'"><a href="'+thisALink+'">'+thisA+'</a></label>');
		});
	}

	/*categoria*/
	if($('body.categoria .wrapperFiltros .search-multiple-navigator h4').size() > 0){
		$('body.categoria .wrapperFiltros .search-multiple-navigator').prepend('<fieldset class="refino even categorias"><h5>Categorias</h5><div></div></fieldset>');
		$('body.categoria .wrapperFiltros .search-multiple-navigator h4').each(function(){
			var _this = $(this);
			var thisH4 = _this.html();

			if(_this.next('ul').find('li').size() > 0){
				_this.next('ul').find('li').each(function(){
					console.log('class: ',$(this).find('a').attr('title'));
					$('body.categoria .wrapperFiltros .search-multiple-navigator fieldset.categorias div').append('<label class="filho">'+$(this).html()+'</label>');
				});
			}else{
				$('body.categoria .wrapperFiltros .search-multiple-navigator fieldset.categorias div').append('<label>'+thisH4+'</label>');
			}
		});
	}

	$('body.categoria .wrapperFiltros .search-multiple-navigator h3').remove();
	$('body.categoria .wrapperFiltros .search-multiple-navigator h4').remove();
	$('body.categoria .wrapperFiltros .search-multiple-navigator ul').remove();

	$('.wrapperFiltros a.bt-refinar').remove();
	$('.wrapperFiltros fieldset.filtro_marca').remove();
	$('.wrapperFiltros .menu-navegue').remove();
	$('.wrapperFiltros fieldset h5').append('<span class="icon-lp-arrow-down"></span>');

	var thisBuscaNumero = $('.resultado-busca-numero').first().find('span.value').text();
	// $('.wrapperInfos .right .pecas').html(''+thisBuscaNumero+' peças');

	if($('body').hasClass('resultado-busca')){
		if(!$('body').hasClass('colecao')){
			var thisTermoDigitado = $('.resultado-busca-termo strong.value').html();
			$('.bread-crumb ul').append('<li class="last"><a>Busca por: <span>'+thisTermoDigitado+'</span></a></li>');

			$('.wrapperFiltros').before('<div class="wrapperResultadoBusca"><div class="tpl-center"><h2>você buscou por <strong>"'+thisTermoDigitado+'"</strong></h2><h3>encontrou '+thisBuscaNumero+' produtos</h3></div></div>');
		}else if($('body').hasClass('colecao')){
			var thisTermoDigitado = $('.wrapperFiltros .tpl-center .middle .navigation-tabs .search-multiple-navigator h3 a').text();
			$('.bread-crumb ul').append('<li class="last"><a>Busca por: <span>'+thisTermoDigitado+'</span></a></li>');

			$('.wrapperFiltros').before('<div class="wrapperResultadoBusca"><div class="tpl-center"><h2>você buscou por <strong>"'+thisTermoDigitado+'"</strong></h2><h3>encontrou '+thisBuscaNumero+' produtos</h3></div></div>');
		}

		if($('.tpl-content .topoTitulo a img').size() > 0){
			$('.tpl-content .wrapperResultadoBusca').hide();
		}else{
			$('.tpl-content .wrapperResultadoBusca').show();
		}

		if(window.location.href.indexOf("fq=P") > -1){
			$('body.internasComum main .tpl-content .wrapperFiltros').hide();

			if(window.location.href.indexOf("fq=C") > -1){
				$('body.internasComum main .tpl-content .wrapperResultadoBusca h2').html('A busca pelo termo "'+vtxctx.departmentName+'"');
			}

			$('.bread-crumb ul li.last').hide();
		}
	}

	$('.wrapperFiltros .middle').animate({
		opacity: 1
	},400);//FIM FILTROS

	$('.wrapperFiltros .tpl-center .middle .navigation-tabs .search-multiple-navigator fieldset').each(function(){
		var thisH5 = $(this).find('h5').text();
		$(this).attr('rel', thisH5);
	});

	$('.wrapperFiltros .tpl-center .middle .navigation-tabs .search-multiple-navigator fieldset div label').live('click', function(){
		var _this = $(this);

		$(document).ajaxComplete(function(){
			var thisSelect = _this.parents('fieldset').find('label.sr_selected').size();
			if(thisSelect > 0){
				var thisFiltro = _this.parents('fieldset').attr('rel')

				_this.parents('fieldset').find('h5').html(''+thisFiltro+' <em>('+thisSelect+')</em> <span class="icon-lp-arrow-down"></span>');
				if($(window).width() > 1024){
					$('.wrapperFiltros .tpl-center .right button.limparFiltros').fadeIn('fast');
				}
			}
			
			$('.prateleira ul li').each(function (index, element) {
				// compraRapidaPrateleira(element);
			});
		});
	});

	$('.wrapperFiltros .tpl-center .right button.limparFiltros').live('click',function(){
		$(this).html('Aguarde...');
		$('#ajaxBusy').fadeIn();
		location.reload();
	});

	/*ORDER BY*/
	var thisSelect = $('.wrapperFiltros .tpl-center .right fieldset').first().find('select option[selected="selected"]').text();
	if(thisSelect != 'Ordenar' || thisSelect != 'Ordenar por'){
		$('.wrapperFiltros .tpl-center .right fieldset h5 label').html(thisSelect);
	}

	$('.wrapperFiltros .tpl-center .right fieldset select').on('change', function(){
		var text = $('option:selected', this).text();
		var thisVal = $('option:selected', this).val();
		$('.wrapperFiltros .tpl-center .right fieldset h5 label').html(text);

		//var thisURL = window.location.origin+window.location.pathname+'?O='+thisVal;
		var thisURL = window.location.href;
		$('#ajaxBusy').fadeIn();
		if(!$('body').hasClass('pagwishlist')){
				var url = new URL(thisURL);

				url.searchParams.set('O', thisVal);

				window.history.replaceState({}, '', url);

				window.location = url.href;
		}
	});
	
	var thisUrlOrderBy = window.location.search;
	if(thisUrlOrderBy.indexOf("OrderByPriceASC") > -1){
		$('.wrapperFiltros .tpl-center .right fieldset h5 label').html("Menor Preço");
	}else if(thisUrlOrderBy.indexOf("OrderByPriceDESC") > -1){
		$('.wrapperFiltros .tpl-center .right fieldset h5 label').html("Maior Preço")
	}else if(thisUrlOrderBy.indexOf("OrderByTopSaleDESC") > -1){
		$('.wrapperFiltros .tpl-center .right fieldset h5 label').html("Mais vendidos");
	}else if(thisUrlOrderBy.indexOf("OrderByReviewRateDESC") > -1){
		$('.wrapperFiltros .tpl-center .right fieldset h5 label').html("Melhores avaliações");
	}else if(thisUrlOrderBy.indexOf("OrderByNameASC") > -1){
		$('.wrapperFiltros .tpl-center .right fieldset h5 label').html("A - Z"); 
	}else if(thisUrlOrderBy.indexOf("OrderByNameDESC") > -1){
		$('.wrapperFiltros .tpl-center .right fieldset h5 label').html("Z - A");
	}else if(thisUrlOrderBy.indexOf("OrderByReleaseDateDESC") > -1){
		$('.wrapperFiltros .tpl-center .right fieldset h5 label').html("Data de lançamento");
	}else if(thisUrlOrderBy.indexOf("OrderByBestDiscountDESC") > -1){
		$('.wrapperFiltros .tpl-center .right fieldset h5 label').html("Melhor Desconto");
	}/*FIM ORDER BY*/

	$('ul.organizaPrateleira li').live('click',function(){
		$('ul.organizaPrateleira li').removeClass('ativo');
		$(this).addClass('ativo');

		if($(this).hasClass('quintuplo')){
			$('.wrapperRight .prateleira ul').addClass('quintuplo');
		}else{
			$('.wrapperRight .prateleira ul').removeClass('quintuplo');
		}
	});

	$('label input[type=checkbox]').live('click', function(){
		$(document).ajaxStop(function(){
			setTimeout(function(){
				if($('.wrapperRight .main .vtexsr-emptySearch h3').size() > 0){
					$('.wrapperRight .main .confira-todos-produtos').hide();
				}

				if($('.wrapperRight .main .prateleira ul li').size() < 24){
					$('.wrapperRight .main .confira-todos-produtos').hide();	
				}
			},1000);
		});
	});

	//Filtro mobile
	if($(window).width() <= 980){
		$('.wrapperFiltros .wrapperMobile .navigation-tabs .search-multiple-navigator').append('<button class="filtrarItens">Filtrar Itens</button>');

		function openSidebarFiltros(){
			$('body').addClass('hidden');

			setTimeout(function(){
				$('.wrapperFiltros .tpl-center .middle .overflow').fadeIn('slow');
			},100);

			$('.wrapperFiltros .tpl-center .middle').animate({
				left: "0"
			},400);
		}

		function closeSidebarFiltros(){
			$('body').removeClass('hidden');

			$('.wrapperFiltros .tpl-center .middle .overflow').fadeOut('slow');

			$('.wrapperFiltros .tpl-center .middle').animate({
				left: "-110%"
			},300);
		}

		$('.wrapperFiltros .tpl-center .left').live('click',function(){
			openSidebarFiltros();
		});

		$('.wrapperFiltros .wrapperMobile .navigation-tabs .search-multiple-navigator button.filtrarItens').live('click',function(){
			closeSidebarFiltros();
		});

		$('.wrapperFiltros .tpl-center .middle .overflow button, .wrapperFiltros .tpl-center button.close').live('click', function(){
			closeSidebarFiltros();
		});
	}
	//Fim Filtro mobile

	if($(window).width() < 1024){
		if($('.wrapperFiltros .wrapperMobile .search-single-navigator a').size() < 1, $('.wrapperFiltros .wrapperMobile .search-single-navigator h3').size() < 1 || $('.wrapperFiltros .wrapperMobile .search-single-navigator h4').size() < 1 || $('.wrapperFiltros .wrapperMobile .search-single-navigator h5').size() < 1){
			$('.wrapperFiltros .wrapperMobile .search-single-navigator').html('<strong class="nenhumFiltro">Nenhum filtro encontrado para essa página</strong>');
		}
	}

}/*FIM INTERNASCOMUM*/
