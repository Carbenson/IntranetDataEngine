$(document).ready(function () {


    indexPage.init();

})

var indexPage= new function () {
    this.init = function () {


        $('div.normal-text.bulletin-text').slimScroll({
            height: '114px'
        });
    }

}