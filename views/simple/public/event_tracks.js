jQuery(document).ready(function($){

    if (typeof ga !== 'undefined') {

        // track narrow vav links click
        $('.nav-pills li a').click(function(){
            ga('send', {
                hitType: 'event',
                eventCategory: 'Category Navigation',
                eventAction: 'click',
                eventLabel: $(this).text()
            });
        });

        // track for preview button click
        $('.free_preview').click(function(){
            ga('send', {
                hitType: 'event',
                eventCategory: 'Free Theme Preview',
                eventAction: 'click',
                eventLabel: $('.template-title').text()
            });
        });

        $('.premium_preview').click(function(){
            ga('send', {
                hitType: 'event',
                eventCategory: 'Premium Theme Preview',
                eventAction: 'click',
                eventLabel: $('.template-title').text()
            });

            ga('send', 'pageview', '/place_order_ga/premium_product_click_preview');
        });


        $('.download_form_wrap .btn-download').click(function(){
            ga('send', {
                hitType: 'event',
                eventCategory: 'Free Download Popup',
                eventAction: 'click',
                eventLabel: $('.template-title').text()
            });
        });

        $('#slidebox a.close').click(function(){
            ga('send', {
                hitType: 'event',
                eventCategory: 'SlideBox promo',
                eventAction: 'close',
                eventLabel: $('.template-title').text()
            });
        });

        $('.home-theme-filter a').click(function(){
            ga('send', {
                hitType: 'event',
                eventCategory: 'Template Filter',
                eventAction: 'click',
                eventLabel: $(this).text()
            });
        });

        $('.buy_now_wrap a').click(function(){
            ga('send', {
                hitType: 'event',
                eventCategory: 'Buy Now Click',
                eventAction: 'click',
                eventLabel: $('.template-title').text() +' - '+ $(this).text()
            });
        });
    }


    // make downloads working
    $('#uemail').tooltip({'trigger':'focus', 'title': 'We will email you the download link. Please enter a valid email address.', 'placement': 'left'});
    $('#download_form').on('submit',function(e){
        e.preventDefault();
        $('#spinning_load').removeClass('hide');

        $('#email_download_button').prop('disabled', true);

        var formData = $(this).serialize();
        var ajax_url = '/wp-admin/admin-ajax.php';

        $.post(ajax_url, formData, function(response) {
            var data = $.parseJSON(response);
            if(data.status) {
                $('#remodal_initial_contents').hide();
                $('#remodal_success_contents h4').html(data.msg);
                $('#remodal_success_contents').removeClass('hide');
                $('#spinning_load').addClass('hide');

                if (typeof ga !== 'undefined') {
                    ga('send', 'pageview', '/thank-you-for-downloading');
                }


            } else {
                alert(data.msg);
                $('#spinning_load').addClass('hide');
                $('#email_download_button').prop('disabled', false);
            }
        });

    });

});