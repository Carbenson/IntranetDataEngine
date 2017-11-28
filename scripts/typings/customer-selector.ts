const customer_selector = {

    init: () => {

        modal_send_sms.init();
        // document.appendChild( document.createElement(modal_send_sms.configData.htmlModal));
        


        $('.scroll-content').slimScroll({
            height: 'auto'
        });
        $('#tab3_c1_content').slimScroll({
            height: '380px;'
        });
        $('.table-content').slimScroll({
            height: 'auto;'
        });
        $('#tab5_table_content').slimScroll({
            height: '370px;'
        });
        

    },
}