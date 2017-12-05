"use strict";
var index;
(function (index) {
    var baseUrl = "http://172.19.62.235:8082/mockjsdata/15";
    $(document).ready(function () {
        new indexPage();
    });
    var indexPage = (function () {
        function indexPage() {
            this.initViews();
            this.initDate();
        }
        indexPage.prototype.initViews = function () {
            this.initScrollView();
            this.initDatepicker();
            this.initHeader();
        };
        indexPage.prototype.initDatepicker = function () {
            $.fn.datepicker.dates['cn'] = {
                days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                daysShort: ["日", "一", "二", "三", "四", "五", "六", "七"],
                daysMin: ["日", "一", "二", "三", "四", "五", "六", "七"],
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                format: "yyyy年-m月",
                titleFormat: "yyyy",
                weekStart: 0,
            };
            $('.input-group.date').datepicker({
                language: 'cn',
                orientation: "left bottom",
                autoclose: true,
                startView: 1,
                minViewMode: 1,
                maxViewMode: 2,
                forceParse: false,
            });
            $('.input-group.date').datepicker('setDate', new Date());
            $('.input-group.date').datepicker().on('changeMonth', function (e) {
                getJogResult(e.date.getFullYear(), e.date.getMonth() + 1);
            });
        };
        indexPage.prototype.initHeader = function () {
            $("#head_index").click(function () {
                $("#index_page").show();
                $("#edit_news_page").hide();
                $("#head_index").removeClass("header-btn").addClass("header-btn-selected");
                $("#head_edit_news").removeClass("header-btn-selected").addClass("header-btn");
            });
            $("#head_edit_news").click(function () {
                $("#edit_news_page").show();
                $("#index_page").hide();
                $("#head_edit_news").removeClass("header-btn").addClass("header-btn-selected");
                $("#head_index").removeClass("header-btn-selected").addClass("header-btn");
            });
        };
        indexPage.prototype.initScrollView = function () {
            $('div.normal-text.bulletin-text').slimScroll({
                height: '114px',
            });
        };
        indexPage.prototype.initDate = function () {
            this.getRcUndoneToday();
            this.getRcDoneMonth();
            this.getRcUndone();
        };
        indexPage.prototype.getRcUndoneToday = function () {
            getData({
                url: baseUrl + "/api/get_rc_undone_today",
                data: {},
                type: "get",
                onSuccess: function (json) {
                    console.info(json);
                }
            });
        };
        indexPage.prototype.getRcDoneMonth = function () {
            getData({
                url: baseUrl + "/api/get_rc_done_month",
                data: {},
                type: "get",
                onSuccess: function (json) {
                    console.info(json);
                }
            });
        };
        indexPage.prototype.getRcUndone = function () {
            getData({
                url: baseUrl + "/api/get_rc_undone",
                data: {},
                type: "get",
                onSuccess: function (json) {
                    console.info(json);
                }
            });
        };
        return indexPage;
    }());
    function getJogResult(fullYear, number) {
        getData({
            url: "",
            data: {},
            type: "",
            onSuccess: function (rsp) {
            }
        });
    }
    function getData(parameters) {
        var url = parameters.url, data = parameters.data, type = parameters.type, onSuccess = parameters.onSuccess;
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: onSuccess,
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.info(xmlHttpRequest.status);
                console.info(xmlHttpRequest.readyState);
                console.info(textStatus);
                console.info(errorThrown);
            }
        });
    }
})(index || (index = {}));
//# sourceMappingURL=index.js.map