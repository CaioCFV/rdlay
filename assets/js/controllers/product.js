if ($('body').hasClass('produto')) {
	/*ZOOM*/
	(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,a,r,m,l,s,f=o(t),h=f.css("position"),d=o(n);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=f.outerWidth(),u=f.outerHeight(),n===t?(r=c,a=u):(r=d.outerWidth(),a=d.outerHeight()),m=(e.width-c)/r,l=(e.height-u)/a,s=d.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,a),0),t=Math.max(Math.min(t,r),0),e.style.left=t*-m+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e=o.extend({},t,n||{}),i=e.target&&o(e.target)[0]||this,u=this,c=o(u),a=document.createElement("img"),r=o(a),m="mousemove.zoom",l=!1,s=!1;if(!e.url){var f=u.querySelector("img");if(f&&(e.url=f.getAttribute("data-src")||f.currentSrc||f.src),!e.url)return}c.one("zoom.destroy",function(o,t){c.off(".zoom"),i.style.position=o,i.style.overflow=t,a.onload=null,r.remove()}.bind(this,i.style.position,i.style.overflow)),a.onload=function(){function t(t){f.init(),f.move(t),r.stop().fadeTo(o.support.opacity?e.duration:0,1,o.isFunction(e.onZoomIn)?e.onZoomIn.call(a):!1)}function n(){r.stop().fadeTo(e.duration,0,o.isFunction(e.onZoomOut)?e.onZoomOut.call(a):!1)}var f=o.zoom(i,u,a,e.magnify);"grab"===e.on?c.on("mousedown.zoom",function(e){1===e.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(m,f.move)}),t(e),o(document).on(m,f.move),e.preventDefault())}):"click"===e.on?c.on("click.zoom",function(e){return l?void 0:(l=!0,t(e),o(document).on(m,f.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(m,f.move)}),!1)}):"toggle"===e.on?c.on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===e.on&&(f.init(),c.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(m,f.move)),e.touch&&c.on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),f.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),s&&(s=!1,n())}),o.isFunction(e.callback)&&e.callback.call(a)},a.src=e.url})},o.fn.zoom.defaults=t})(window.jQuery);

	$(window).load(function() {
			$('section#area-a ul.topic li.item-dimension-Cor input:first-child').click();
	});

	const urlPath = window.location.pathname;
	const cleanPath = urlPath.replace(/\/p$/, '');
	const productName = cleanPath.split('/').filter(part => part !== "").pop();
	// Faz a requisição AJAX usando o nome do produto na URL
	$.ajax({
			url: `/api/catalog_system/pub/products/search/${productName}/p`,
			method: "GET",
			headers: {
					"Accept": "application/json",
					"X-VTEX-API-AppKey": "", // Insira sua AppKey aqui
					"X-VTEX-API-AppToken": "" // Insira seu AppToken aqui
			},
			success: function(data) {
					// Verifica se o primeiro objeto no array contém clusterHighlights
					if (data.length > 0 && data[0].clusterHighlights) {
							// Verifica se o clusterHighlights contém a coleção com ID 138
							if (data[0].clusterHighlights["138"]) {
									// Oculta o elemento div.cupom
									$('section#area-a .tpl-center .right .wrapper.extras div.cupom').hide();
							}
					}
			},
			error: function(error) {
					console.error("Erro na requisição:", error); // Exibe erros no console
			}
	});


	//Leggings
	if (vtxctx.categoryName == 'Leggings') {
			$('section#descricaoespecial').show();
	}

	$('section#descricaoespecial ul.abas li').live('click', function() {
			var thisClick = $(this).attr('rel');
			$('section#descricaoespecial ul.abas li').removeClass('ativo');
			$(this).addClass('ativo');

			$('section#descricaoespecial .conteudo').removeClass('ativo');
			$('section#descricaoespecial .conteudo[rel="' + thisClick + '"]').addClass('ativo');
	}); //FIM Leggings

	/*THUMBS MOBILE*/
	function thumbsMobile() {
			$('section#area-a .left .apresentacao ul.thumbs').find('li img').each(function() {
					var thisImg = $(this).attr('src');
					var newThisImg = thisImg.replace('-73-73', '-637-955');
					$(this).attr('src', newThisImg);
			});

			if ($('section#area-a .left .apresentacao ul.thumbs li').size() > 0) {
					$('section#area-a .left .apresentacao ul.thumbs').not('.slick-initialized').slick({
							slidesToShow: 2,
							slidesToScroll: 2,
							dots: false,
							arrows: true,
							infinite: true,
							responsive: [{
									breakpoint: 940,
									settings: {
											slidesToShow: 1,
											slidesToScroll: 1
									}
							}]
					});

					setTimeout(function() {
							$('section#area-a .left .apresentacao ul.thumbs li').each(function() {
									if (window.innerWidth <= 940) {
											$(this).trigger('zoom.destroy');
									} else {
											var thisImg = $(this).find('img').attr('src').replace('-637-955', '-1000-1500');
											$(this).zoom({
													url: '' + thisImg + ''
											});
											//console.log('>> thisImg: ',thisImg);
									}
							});
					}, 500);

			}

			modeloVeste();

			$('section#area-a .left .apresentacao').show().animate({
					opacity: 1
			}, 500);
	}

	$(window).load(function() {
			thumbsMobile(); /*FIM THUMBS*/
	});

	$('section#area-a .right .categoria').html(vtxctx.departmentName);

	function modeloVeste() {
			$('section#area-a .tpl-center .left .apresentacao .modeloVeste').remove();

			if ($('section#area-a .right td.Modelo-veste').size() > 0) {
					var modeloVeste = $('section#area-a .right td.Modelo-veste').text();

					$('section#area-a .tpl-center .left .apresentacao .modeloveste').remove();

					if ($('section#area-a .tpl-center .left .apresentacao .modeloveste').size() < 1) {
							$('section#area-a .tpl-center .left .apresentacao').append('<div class="modeloveste">' + modeloVeste + '</div>');
					}
			}
	}

	function descontoPorcentagem() {
			if ($('section#area-a em.valor-de strong').length > 0) {
					var newPreco = $('section#area-a em.valor-por strong').text().split('R$ ');
					var oldPreco = $('section#area-a em.valor-de strong').text().split('R$ ');

					var novoValor = newPreco[1].replace('.', '').replace(',', '.');
					var velhoValor = oldPreco[1].replace('.', '').replace(',', '.');
					var variacao = ((velhoValor - novoValor) / velhoValor) * 100;

					if (oldPreco.indexOf("99.999,00") == -1) {
							$('section#area-a p.descricao-preco em.valor-por').after('<div class="descontoDePor"><span class="porcent">' + variacao.toFixed(0) + '%</span><strong>Off</strong></div>').css('display', 'flex');
					}
			}
	}
	descontoPorcentagem();

	function toReal(val) {
			val = val / 100;
			val = val.toFixed(2).toString().replace('.', ',');
			return val;
	}

	function tabelaTamanho() {
			if ($('table.Detalhes td.Medidas').size() > 0) {
					var thisUrlTabela = $('table.Detalhes td.Medidas').text();
					$('section#area-a .tpl-center .right .wrapper.tabelaMedidas').addClass('ativo');
					$('#newsTabelaMedidas .content .imagem').html('<img src="' + thisUrlTabela + '"/>');
			}
	}

	$('section#area-a .tpl-center .right .wrapper.tabelaMedidas').live('click', function() {
			$('div#newsTabelaMedidas').addClass('ativo');
			$("html, body").animate({
					scrollTop: 0
			}, "slow");
			return false;
	});

	$('#newsTabelaMedidas .content button.close').live('click', function() {
			$('div#newsTabelaMedidas').removeClass('ativo');
	});

	function calcPix() {
			var valorProduto = parseFloat($('section#area-a .right p.descricao-preco em.valor-por strong').text().replace('R$ ', '').replace(',', ''));
			var porcentagem = parseFloat($('div#porcentagempix').text());
			var desconto = parseFloat((valorProduto * porcentagem) / 100);
			var totalDesconto = parseFloat(valorProduto) - parseFloat(desconto);
			$('body.produto main .tpl-content section#area-a .tpl-center .right .wrapper.extras div.pix label').html('<strong>No PIX você paga R$ ' + toReal(totalDesconto) + '</strong><br/>Desconto de ' + porcentagem + '%');
	}
	calcPix();

	function ajaxPag() {
			if ($('section#area-a .right .wrapper.botao .notifyme').is(':visible')) {
					$('section#area-a .right .wrapper.preco').hide();
					$('section#area-a .right .wrapper.extras').hide();
					$('section#area-a .right .wrapper.botao a.buy-button').hide();
					$('body.produto main .tpl-content section#area-a .tpl-center .right .wrapper.botao .portal-notify-me-ref .sku-notifyme fieldset.notifyme-form input#notifymeButtonOK').attr('value', 'Enviar');
			} else {
					$('section#area-a .right .wrapper.extras').show();
					$('section#area-a .right .wrapper.preco').show();
					$('section#area-a .right .wrapper.botao a.buy-button').css('display', 'flex');
			}

			tabelaTamanho();
			var referencia = $('body.produto main .tpl-content section#area-a .tpl-center .right .wrapper.cod .skuReference').text();
			$('body.produto main .tpl-content section#area-a .tpl-center .right .wrapper.cod .skuReference').html(referencia.substr(0, 5));
	}
	ajaxPag();

	$('section#area-a .right .wrapper.sku ul li.select input[type="radio"]').on('click', function() {
			$('section#area-a .left .apresentacao').css('opacity', '0');

			if ($('section#area-a .left .apresentacao ul.thumbs').hasClass('slick-slider')) {
					$('section#area-a .left .apresentacao ul.thumbs').html('');
					$('section#area-a .left .apresentacao ul.thumbs').slick('unslick');
			}

			setTimeout(function() {
					descontoPorcentagem();
					thumbsMobile();
					calcPix();
					ajaxPag();
			}, 500);
	});

	if ($('section#area-a .right .wrapper.descricao .productDescription').html() == '') {
			$('section#area-a .right .wrapper.descricao').hide();
	}

	$('section#area-a .wrapper.sku ul.topic li.item-dimension-Cor label').each(function() {
			var thisCor = $(this).text();
			$(this).html('<img src="/arquivos/thumb-sr_' + thisCor + '.png" title="' + thisCor + '"/>');
	});

	if ($('body').hasClass('b2b')) {
			/*SKU EM GRADE*/
			window._thisBestPrice;

			for (var x = 0; x < skuJson.skus.length; x++) {
					var thisAvailable = skuJson.skus[x].available;

					if (thisAvailable == true) {
							window._thisBestPrice = skuJson.skus[x].bestPrice;

							console.log('window._thisBestPrice >> ', window._thisBestPrice);
					}
			}

			$('section#area-a .right .wrapper.grade .buyProduct .uniteValue span').html('0');
			$('section#area-a .right .wrapper.grade .buyProduct .priceUnite span').html('R$ 0,00');

			function formatReal(int) {

					var tmp = int + '';
					var neg = false;
					if (tmp.indexOf("-") == 0) {
							neg = true;
							tmp = tmp.replace("-", "");
					}

					if (tmp.length == 1) tmp = "0" + tmp

					tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
					if (tmp.length > 6)
							tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

					if (tmp.length > 9)
							tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3");

					if (tmp.length > 12)
							tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3,$4");

					if (tmp.indexOf(".") == 0) tmp = tmp.replace(".", "");
					if (tmp.indexOf(",") == 0) tmp = tmp.replace(",", "0,");

					return (neg ? '-' + tmp : tmp);
			}

			function somaInputs() {
					window.thisSoma = 0;
					$('section#area-a .right .wrapper.grade .allLines .line .sizes .item input.active.qtySelect').each(function() {
							var thisInputVal = $(this).val();
							//console.log('thisInputVal: ',thisInputVal);

							window.thisSoma = parseInt(window.thisSoma) + parseInt(thisInputVal);
							//console.log('thisSoma: ',window.thisSoma);
							$('section#area-a .right .wrapper.grade .buyProduct .uniteValue span').html(window.thisSoma);

							var priceRefresh = window._thisBestPrice * window.thisSoma;
							$('section#area-a .right .wrapper.grade .buyProduct .priceUnite span').html('R$ ' + formatReal(Math.round(priceRefresh)));
					});
			}

			$('section#area-a .right .wrapper.grade .allLines .line .sizes .item input.active').live('keyup', function() {
					var _this = $(this);

					_this.val(this.value.replace(/\D/g, ''));

					if (parseInt(_this.val()) > parseInt(_this.attr('qty'))) {
							_this.val(_this.attr('qty'));
					}

					if (_this.val() > '0') {
							_this.addClass('qtySelect');
					} else {
							_this.removeClass('qtySelect');
					}

					somaInputs();
			});

			console.log('skuJson foii >> ', skuJson);

			for (var i = 0; i < skuJson.dimensionsMap.Cor.length; i++) {
					var thisColor = skuJson.dimensionsMap.Cor[i];
					/*console.log('thisColor >> ',thisColor);
					console.log('skuJson.skus[i].values[0] >> ',skuJson.skus[i].values[0]);*/

					$('#gridBuy .allLines').prepend('<div class="line color" color="' + thisColor + '" title="' + thisColor + '"><div class="thumb"><i><img title="' + thisColor + '" alt="' + thisColor + '" src=""/></i><span>' + thisColor + '</span></div><div class="sizes"></div></div>');
			} /*FIM Cor*/

			$('#gridBuy .headGridList').prepend('<div class="thumb"></div>')

			for (var y = 0; y < skuJson.dimensionsMap.Tamanho.length; y++) {
					var thisSize = skuJson.dimensionsMap.Tamanho[y];

					$('#gridBuy .headGridList').prepend('<div class="colum size" size="' + thisSize + '"><span>' + thisSize + '</span></div>');

					$('#gridBuy .allLines .line .sizes').prepend('<div class="item" size="' + thisSize + '"></div>');
			} /*FIM SIZE*/

			// eslint-disable-next-line no-inner-declarations
			function fetchSkuInventory(thisSku) {
				return $.ajax({
					url: `/api/logistics/pvt/inventory/skus/${thisSku}`,
					type: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'X-VTEX-API-AppKey': 'vtexappkey-rdlay-EZOZQR',
						'X-VTEX-API-AppToken': 'VETPYMLYGNGPDFLUSEUDBYDVAHMPWFWXZIWCTMZUQMLMNWMFXZKUWHAOXCQCXGPBUTCEGDZJKUATBBTFWSWRNWFXHEUMRJFSHTAARNOPVNOSRZAKJRVERMDNFQHYVRVE'
					}
				});
			}
			
			for (var w = 0; w < skuJson.skus.length; w++) {
				(function(w) {
					var thisSku = skuJson.skus[w].sku;
					var thisAvailable = skuJson.skus[w].available;
					var thisDimensionsCor = skuJson.skus[w].dimensions.Cor;
					var thisDimensionsSize = skuJson.skus[w].dimensions.Tamanho;
					var thisSellerID = skuJson.skus[w].sellerId;
			
					var thisImage = skuJson.skus[w].image;
					var thisImage = thisImage.replace('380-543', '53-80');
			
					console.log('rdlay b2b ', thisSku);
			
					// Fazer a requisição para pegar a quantidade disponível da API
					fetchSkuInventory(thisSku)
						.done(function(data) {
							var thisAvailablequantity = data.balance[0].totalQuantity; // Quantidade disponível da resposta
							var thisAvailablequantityORIGIN = thisAvailablequantity;
			
							// Limite visual para quantidade
							if (thisAvailablequantity > 100) {
								thisAvailablequantity = '> 100';
							}
			
							// Atualizar o DOM com a imagem e a disponibilidade
							if (thisAvailable == false || thisAvailablequantityORIGIN === 0) {
								console.log('rdlay b2b invalido');
								console.log('rdlay b2b qty ', thisAvailablequantityORIGIN);
								console.log('rdlay b2b image ', thisImage);
								console.log('rdlay b2b color ', thisDimensionsCor);
								console.log('rdlay b2b size ', thisDimensionsSize);
								console.log('rdlay b2b ----');
			
								$('#gridBuy .allLines .line[color="' + thisDimensionsCor + '"] img').attr('src', thisImage);
								$('#gridBuy .allLines .line[color="' + thisDimensionsCor + '"] .sizes .item[size="' + thisDimensionsSize + '"]').html('<input sellerId="' + thisSellerID + '" class="disabled" title="Fora de estoque" placeholder="-" qty="' + thisAvailablequantityORIGIN + '" type="text" thisSku="' + thisSku + '" disabled/>');
							} else {
								$('#gridBuy .allLines .line[color="' + thisDimensionsCor + '"] img').attr('src', thisImage);
								$('#gridBuy .allLines .line[color="' + thisDimensionsCor + '"] .sizes .item[size="' + thisDimensionsSize + '"]').html('<div class="tooltip">Quant.<br/>estoque ' + thisAvailablequantity + '</div></span><input sellerId="' + thisSellerID + '" class="active" placeholder="0" qty="' + thisAvailablequantityORIGIN + '" type="text" thisSku="' + thisSku + '" />');
							}
						})
						.fail(function(xhr, status, error) {
							console.error('Erro ao buscar inventário:', status, error);
						});
				})(w);
			}				

			$('section#area-a .right .wrapper.grade .allLines .line .sizes .item input').live('mouseover', function() {
					$(this).focus();
			});

			$('#gridBuy .allLines .line img').live('click', function() {
					var _thisImg = $(this);
					var _thisImgColor = _thisImg.attr('title');

					$('section#area-a .wrapper.sku li.item-dimension-Cor input[value="' + _thisImgColor + '"]').click();
			}); /*muda cor ao selecionar img grade*/

			$('section#area-a .right .wrapper.grade .buyProduct .bts button.bt').live('click', function() {
					var _thisBt = $(this);
					if ($('section#area-a .right .wrapper.grade .allLines .line .sizes .item input.active.qtySelect').size() == 0) {
							//alert('Por favor, insira as quantidades na tabela!');
							$.toast({
									position: 'bottom-left',
									heading: 'Erro!',
									text: 'Por favor, insira as quantidades na tabela!',
									showHideTransition: 'fade',
									icon: 'error'
							});
					} else {
							var thisInputsSelect = [];
							$('section#area-a .right .wrapper.grade .allLines .line .sizes .item input.active.qtySelect').each(function() {
									var thisIDSku = $(this).attr('thissku');
									var thisSellerID = $(this).attr('sellerid');
									var thisQtySku = $(this).val();

									thisInputsSelect.push('&sku=' + thisIDSku + '&qty=' + thisQtySku + '&seller=' + thisSellerID + '');
							});

							var thisInputsSelect = thisInputsSelect.join('');

							if (_thisBt.hasClass('addToBag')) { //continuar comprando
									//_thisBt.find('span').html('Aguarde...');
									$.toast({
											position: 'bottom-left',
											heading: 'Aguarde...',
											text: 'Adicionando na sacola...',
											showHideTransition: 'fade',
											icon: 'info'
									});

									var thisInputsSelect = '/checkout/cart/add?' + thisInputsSelect + '&redirect=false&sc=4';

									console.log('thisInputsSelect: ', thisInputsSelect);

									$('#ajaxBusy').fadeIn();

									$.ajax({
											url: thisInputsSelect
									}).success(function() {
											setTimeout(function() {
													vtexjs.checkout.getOrderForm();
													$('#ajaxBusy').fadeOut();
													_thisBt.find('span').html('Adicionar na sacola');
													//alert('Adicionado na sacola!');

													$.toast({
															position: 'bottom-left',
															heading: 'Sucesso',
															text: 'Adicionado na sacola!',
															showHideTransition: 'fade',
															icon: 'success'
													});

													helper.fillCart();
											}, 1000);
									});

							} else { //Ir direto para o carrinho
									var thisInputsSelect = '/checkout/cart/add?' + thisInputsSelect + '&redirect=false&sc=4';
									console.log('thisInputsSelect: ', thisInputsSelect);

									$.toast({
											position: 'bottom-left',
											heading: 'Aguarde...',
											text: 'Adicionando na sacola...',
											showHideTransition: 'fade',
											icon: 'info'
									});

									$.ajax({
											url: thisInputsSelect
									}).success(function() {
											setTimeout(function() {
													vtexjs.checkout.getOrderForm();
													$('#ajaxBusy').fadeOut();

													$.toast({
															position: 'bottom-left',
															heading: 'Sucesso',
															text: 'Adicionado na sacola!',
															showHideTransition: 'fade',
															icon: 'success'
													});

													helper.fillCart();

													setTimeout(function() {
															var qtyAtual = $('a.openCart ul li.amount-items em.amount-items-em').text();
															var qtyB2B = $('div#qtyProduct').text();

															if (parseInt(qtyAtual) >= parseInt(qtyB2B)) {
																	$.toast({
																			position: 'bottom-left',
																			heading: 'Sucesso',
																			text: 'A quantidade mínima de itens ' + qtyB2B + ', a ser acumulada no carrinho, foi atingida',
																			showHideTransition: 'fade',
																			icon: 'success'
																	});

																	var thisInputsSelect = '/checkout/#/cart';
																	window.location = thisInputsSelect;
															} else {
																	$.toast({
																			position: 'bottom-left',
																			heading: 'Erro!',
																			text: 'A quantidade mínima de itens ' + qtyB2B + ', a ser acumulada no carrinho, não foi atingida',
																			showHideTransition: 'fade',
																			icon: 'error'
																	});

																	return false;
															}

															$('#ajaxBusy').fadeOut();
													}, 2000);
											}, 1000);
									});
							}
					}
			});

			$('section#area-a .right .wrapper.grade .allLines .line .thumb button').live('click', function() {
					var thisColor = $(this).attr('class');
					//console.log('thisColor: ',thisColor)

					$('section#area-a .right .wrapper.sku ul.Cor li input[data-value=' + thisColor + ']').click();
			});
			/*FIM SKU EM GRADE*/
	} else {
			$('section#area-a .right .wrapper:not(".grade") a.buy-button').live('click', function() {
					var _this = $(this).attr('href');

					if (_this == "javascript:alert('Por favor, selecione o modelo desejado.');") {
							$.toast({
									position: 'bottom-left',
									heading: 'Erro!',
									text: 'Por favor, selecione o tamanho desejado!',
									showHideTransition: 'fade',
									icon: 'error'
							});

							return false;
					} else {
							var guardaQty = '1';
							var idSku = _this.split('=')[1].split('&')[0];
							var guardaurl = '/checkout/cart/add?sku=' + idSku + '&qty=' + guardaQty + '&seller=1&redirect=false&sc=1';

							$.toast({
									position: 'bottom-left',
									heading: 'Aguarde...',
									text: 'Adicionando na sacola...',
									showHideTransition: 'fade',
									icon: 'info'
							});

							$.ajax({
									url: guardaurl
							}).success(function() {
									setTimeout(function() {
											vtexjs.checkout.getOrderForm();
											$('#ajaxBusy').fadeOut();

											$.toast({
													position: 'bottom-left',
													heading: 'Sucesso',
													text: 'Adicionado na sacola!',
													showHideTransition: 'fade',
													icon: 'success'
											});

											helper.fillCart();
									}, 1000);
							});

							return false;
					}

					return false;
			});
	}
}
