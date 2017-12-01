$(document).ready(function () {


    indexPage.init();

})

var indexPage= new function () {
    this.init = function () {


        $('div.normal-text.bulletin-text').slimScroll({
            height: '114px'
        });


        // $.datepicker.dates['cn'] = {
        //     days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        //     daysShort: ["日", "一", "二", "三", "四", "五", "六", "七"],
        //     daysMin: ["日", "一", "二", "三", "四", "五", "六", "七"],
        //     months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        //     monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        //     today: "今天",
        //     clear: "清除",
        //     format: "yyyy.mm.dd",
        //     titleFormat: "yyyy年 m月",
        //     /* Leverages same syntax as 'format' */
        //     weekStart: 0
        // };


        $.fn.datepicker.dates['cn'] = {
            days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysShort: ["日", "一", "二", "三", "四", "五", "六", "七"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "七"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            format: "yyyy年-m月",
            titleFormat: "yyyy",
            /* Leverages same syntax as 'format' */
            weekStart: 0
        };


        $('.input-group.date').datepicker({
            language: 'cn',
            orientation: "bottom left",
            autoclose: true,
            startView: 1,
            minViewMode: 1,
            maxViewMode:2,
            forceParse: false,
        });

    }

}