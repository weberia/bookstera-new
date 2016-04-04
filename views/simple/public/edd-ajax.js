function edd_load_gateway(e){jQuery(".edd-cart-ajax").show(),jQuery("#edd_purchase_form_wrap").html('<img src="'+edd_scripts.ajax_loader+'"/>');var d=edd_scripts.ajaxurl;d+=d.indexOf("?")>0?"&":"?",d=d+"payment-mode="+e,jQuery.post(d,{action:"edd_load_gateway",edd_payment_mode:e},function(e){jQuery("#edd_purchase_form_wrap").html(e),jQuery(".edd-no-js").hide()})}var edd_scripts;jQuery(document).ready(function(e){e(".edd-no-js").hide(),e("a.edd-add-to-cart").addClass("edd-has-js"),e("body").on("click.eddRemoveFromCart",".edd-remove-from-cart",function(d){var t=e(this),a=t.data("cart-item"),i=t.data("action"),r=t.data("download-id"),o={action:i,cart_item:a};return e.ajax({type:"POST",data:o,dataType:"json",url:edd_scripts.ajaxurl,xhrFields:{withCredentials:!0},success:function(d){if(d.removed){if(parseInt(edd_scripts.position_in_cart,10)===parseInt(a,10))return window.location=window.location,!1;e(".edd-cart").find("[data-cart-item='"+a+"']").parent().remove();var t=0;e(".edd-cart").find("[data-cart-item]").each(function(){e(this).attr("data-cart-item",t),t+=1}),e("[id^=edd_purchase_"+r+"]").length&&(e("[id^=edd_purchase_"+r+"] .edd_go_to_checkout").hide(),e("[id^=edd_purchase_"+r+"] a.edd-add-to-cart").show().removeAttr("data-edd-loading"),"1"==edd_scripts.quantities_enabled&&e("[id^=edd_purchase_"+r+"] .edd_download_quantity_wrapper").show()),e("span.edd-cart-quantity").text(d.cart_quantity),e("body").trigger("edd_quantity_updated",[d.cart_quantity]),edd_scripts.taxes_enabled&&(e(".cart_item.edd_subtotal span").html(d.subtotal),e(".cart_item.edd_cart_tax span").html(d.tax)),e(".cart_item.edd_total span").html(d.total),0==d.cart_quantity&&(e(".cart_item.edd_subtotal,.edd-cart-number-of-items,.cart_item.edd_checkout,.cart_item.edd_cart_tax,.cart_item.edd_total").hide(),e(".edd-cart").append('<li class="cart_item empty">'+edd_scripts.empty_cart_message+"</li>")),e("body").trigger("edd_cart_item_removed",[d])}}}).fail(function(e){window.console&&window.console.log&&console.log(e)}).done(function(e){}),!1}),e("body").on("click.eddAddToCart",".edd-add-to-cart",function(d){d.preventDefault();var t=e(this),a=t.closest("form");t.prop("disabled",!0);var i=t.find(".edd-loading"),r=t.closest("div"),o=i.width(),c=i.height();t.attr("data-edd-loading",""),i.css({"margin-left":o/-2,"margin-top":c/-2});var a=t.parents("form").last(),n=t.data("download-id"),s=t.data("variable-price"),_=t.data("price-mode"),l=[],u=!0;if("yes"==s)if(a.find(".edd_price_option_"+n).is("input:hidden"))l[0]=e(".edd_price_option_"+n,a).val(),a.find(".edd-submit").data("price")&&a.find(".edd-submit").data("price")>0&&(u=!1);else{if(!a.find(".edd_price_option_"+n+":checked",a).length)return t.removeAttr("data-edd-loading"),void alert(edd_scripts.select_option);a.find(".edd_price_option_"+n+":checked",a).each(function(d){if(l[d]=e(this).val(),!0===u){var t=e(this).data("price");t&&t>0&&(u=!1)}})}else l[0]=n,t.data("price")&&t.data("price")>0&&(u=!1);if(u&&a.find(".edd_action_input").val("add_to_cart"),"straight_to_gateway"==a.find(".edd_action_input").val())return a.submit(),!0;var p=t.data("action"),m={action:p,download_id:n,price_ids:l,post_data:e(a).serialize()};return e.ajax({type:"POST",data:m,dataType:"json",url:edd_scripts.ajaxurl,xhrFields:{withCredentials:!0},success:function(d){if("1"==edd_scripts.redirect_to_checkout&&"1"==a.find("#edd_redirect_to_checkout").val())window.location=edd_scripts.checkout_page;else{"1"===edd_scripts.taxes_enabled&&(e(".cart_item.edd_subtotal").show(),e(".cart_item.edd_cart_tax").show()),e(".cart_item.edd_total").show(),e(".cart_item.edd_checkout").show(),e(".cart_item.empty").length?(e(d.cart_item).insertBefore(".edd-cart-meta:first"),e(".cart_item.empty").hide()):e(d.cart_item).insertBefore(".edd-cart-meta:first"),"1"===edd_scripts.taxes_enabled&&(e(".edd-cart-meta.edd_subtotal span").html(d.subtotal),e(".edd-cart-meta.edd_cart_tax span").html(d.tax)),e(".edd-cart-meta.edd_total span").html(d.total);e(".edd-cart-item-title",d.cart_item).length;if(e("span.edd-cart-quantity").each(function(){e(this).text(d.cart_quantity),e("body").trigger("edd_quantity_updated",[d.cart_quantity])}),"none"==e(".edd-cart-number-of-items").css("display")&&e(".edd-cart-number-of-items").show("slow"),("no"==s||"multi"!=_)&&(e("a.edd-add-to-cart",r).toggle(),e(".edd_go_to_checkout",r).css("display","inline-block")),"multi"==_&&t.removeAttr("data-edd-loading"),e(".edd_download_purchase_form").length&&("no"==s||!a.find(".edd_price_option_"+n).is("input:hidden"))){var i=e('.edd_download_purchase_form *[data-download-id="'+n+'"]').parents("form");e("a.edd-add-to-cart",i).hide(),"multi"!=_&&i.find(".edd_download_quantity_wrapper").slideUp(),e(".edd_go_to_checkout",i).show().removeAttr("data-edd-loading")}"incart"!=d&&(e(".edd-cart-added-alert",r).fadeIn(),setTimeout(function(){e(".edd-cart-added-alert",r).fadeOut()},3e3)),t.prop("disabled",!1),e("body").trigger("edd_cart_item_added",[d])}}}).fail(function(e){window.console&&window.console.log&&console.log(e)}).done(function(e){}),!1}),e("#edd_checkout_form_wrap").on("click",".edd_checkout_register_login",function(){var d=e(this),t={action:d.data("action")};return e(".edd-cart-ajax").show(),e.post(edd_scripts.ajaxurl,t,function(d){e("#edd_checkout_login_register").html(edd_scripts.loading),e("#edd_checkout_login_register").html(d),e(".edd-cart-ajax").hide()}),!1}),e(document).on("click","#edd_purchase_form #edd_login_fields input[type=submit]",function(d){d.preventDefault();var t=e(this).val();e(this).val(edd_global_vars.purchase_loading),e(this).after('<span class="edd-cart-ajax"><i class="edd-icon-spinner edd-icon-spin"></i></span>');var a={action:"edd_process_checkout_login",edd_ajax:1,edd_user_login:e("#edd_login_fields #edd_user_login").val(),edd_user_pass:e("#edd_login_fields #edd_user_pass").val()};e.post(edd_global_vars.ajaxurl,a,function(d){"success"==e.trim(d)?(e(".edd_errors").remove(),window.location=edd_scripts.checkout_page):(e("#edd_login_fields input[type=submit]").val(t),e(".edd-cart-ajax").remove(),e(".edd_errors").remove(),e("#edd-user-login-submit").before(d))})}),e("select#edd-gateway, input.edd-gateway").change(function(d){var t=e("#edd-gateway option:selected, input.edd-gateway:checked").val();return"0"==t?!1:(edd_load_gateway(t),!1)}),"1"==edd_scripts.is_checkout&&e("select#edd-gateway, input.edd-gateway").length&&setTimeout(function(){edd_load_gateway(edd_scripts.default_gateway)},200),e(document).on("click","#edd_purchase_form #edd_purchase_submit input[type=submit]",function(d){var t=document.getElementById("edd_purchase_form");if("function"!=typeof t.checkValidity||!1!==t.checkValidity()){d.preventDefault();var a=e(this).val();e(this).val(edd_global_vars.purchase_loading),e(this).after('<span class="edd-cart-ajax"><i class="edd-icon-spinner edd-icon-spin"></i></span>'),e.post(edd_global_vars.ajaxurl,e("#edd_purchase_form").serialize()+"&action=edd_process_checkout&edd_ajax=true",function(d){"success"==e.trim(d)?(e(".edd_errors").remove(),e(".edd-error").hide(),e(t).submit()):(e("#edd-purchase-button").val(a),e(".edd-cart-ajax").remove(),e(".edd_errors").remove(),e(".edd-error").hide(),e("#edd_purchase_submit").before(d))})}})});