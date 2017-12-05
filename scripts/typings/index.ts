namespace index {
import PlainObject = JQuery.PlainObject;
    let baseUrl = "http://172.19.62.235:8082/mockjsdata/15";
    $(document).ready(function () {
        new indexPage();

    })


    class indexPage {


        constructor() {
            this.initViews()
            this.initDate()
        }

        private initViews() {
            this.initScrollView();
            this.initDatepicker();
            this.initHeader();
        }

        private initDatepicker() {
            $.fn.datepicker.dates['cn'] = {
                days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                daysShort: ["日", "一", "二", "三", "四", "五", "六", "七"],
                daysMin: ["日", "一", "二", "三", "四", "五", "六", "七"],
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                format: "yyyy年-m月",
                titleFormat: "yyyy",
                /* Leverages same syntax as 'format' */
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
                getJogResult(e.date.getFullYear(), e.date.getMonth() + 1)
            })
        }


        private initHeader() {
            $("#head_index").click(function () {
                $("#index_page").show();
                $("#edit_news_page").hide();
                $("#head_index").removeClass("header-btn").addClass("header-btn-selected")
                $("#head_edit_news").removeClass("header-btn-selected").addClass("header-btn")
            })

            $("#head_edit_news").click(function () {
                $("#edit_news_page").show();
                $("#index_page").hide();
                $("#head_edit_news").removeClass("header-btn").addClass("header-btn-selected")
                $("#head_index").removeClass("header-btn-selected").addClass("header-btn")
            })
        }

        private initScrollView() {
            $('div.normal-text.bulletin-text').slimScroll({
                height: '114px',
            });
        }

        /** 初始化首页数据：群公告，今日简报，工作清单和工作成果*/
        private initDate() {
            /**获取规定任务今日截止*/
            this.getRcUndoneToday();
            /**获取规定任务完成数*/
            this.getRcDoneMonth();
            /**获取规定任务总剩余*/
            this.getRcUndone();
        }

        private getRcUndoneToday() {
            // TODO ajax
            getData({
                url: baseUrl+"/api/get_rc_undone_today",
                data: {},
                type: "get",
                onSuccess: function (json: any) {
                    console.info(json);
                }
            });
        }

        private getRcDoneMonth() {
            // TODO ajax
            getData({
                url: baseUrl+"/api/get_rc_done_month",
                data: {},
                type: "get",
                onSuccess: function (json: any) {
                    console.info(json);
                }
            });
        }


        private getRcUndone() {
            // TODO ajax
            getData({
                url: baseUrl+"/api/get_rc_undone",
                data: {},
                type: "get",
                onSuccess: function (json: any) {
                    console.info(json);
                }
            });
        }
    }

    function getJogResult(fullYear: number, number: number) {
        // TODO ajax
        getData({
            url: "",
            data: {},
            type: "",
            onSuccess: function (rsp: any) {

            }
        });
    }

    function getData(parameters: { url: string, data: PlainObject, type: string, onSuccess: any }) {
        let {url, data, type, onSuccess} = parameters;
        // TODO ajax

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


}