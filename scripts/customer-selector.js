"use strict";
var formatDate = function (date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
    }
    return fmt;
};
var customer_selector;
(function (customer_selector) {
    customer_selector.init = function () {
        MyModals.modal_send_sms.init();
        customer_selector.TabRemark.init();
        customer_selector.TabSuggestion.init();
        $('.scroll-content').slimScroll({
            height: 'auto'
        });
        $('.table-content').slimScroll({
            height: 'auto;'
        });
    };
    var TabRemark;
    (function (TabRemark) {
        var TabRemarkData = (function () {
            function TabRemarkData() {
                this.listRemarkModel = [];
                this.listRemarkRecord = [];
            }
            return TabRemarkData;
        }());
        var ModelRemarkData = (function () {
            function ModelRemarkData() {
            }
            return ModelRemarkData;
        }());
        TabRemark.ModelRemarkData = ModelRemarkData;
        var RecordRemarkData = (function () {
            function RecordRemarkData() {
            }
            return RecordRemarkData;
        }());
        TabRemark.RecordRemarkData = RecordRemarkData;
        var getTestData = function () {
            var testTabRemarkData = new TabRemarkData();
            var remark1 = new ModelRemarkData();
            remark1.id = 1;
            remark1.remark = '大吉大利！';
            var remark2 = new ModelRemarkData();
            remark2.id = 2;
            remark2.remark = '电话无人接听';
            var remark3 = new ModelRemarkData();
            remark3.id = 3;
            remark3.remark = '大吉大利！';
            var remark4 = new ModelRemarkData();
            remark4.id = 4;
            remark4.remark = '电话无人接听';
            var remark5 = new ModelRemarkData();
            remark5.id = 5;
            remark5.remark = '大吉大利！';
            testTabRemarkData.listRemarkModel.push(remark1);
            testTabRemarkData.listRemarkModel.push(remark2);
            testTabRemarkData.listRemarkModel.push(remark3);
            testTabRemarkData.listRemarkModel.push(remark4);
            testTabRemarkData.listRemarkModel.push(remark5);
            var record1 = new RecordRemarkData();
            record1.author = '吴彦祖';
            record1.dateTime = '2017-11-10';
            record1.content = '客户比我还帅。';
            var record2 = new RecordRemarkData();
            record2.author = '刘德华';
            record2.dateTime = '2017-11-19';
            record2.content = '客户比我还帅。';
            var record3 = new RecordRemarkData();
            record3.author = '欧阳震华';
            record3.dateTime = '2017-11-27';
            record3.content = '客户比我还帅。客户比我还帅。客户比我还帅。客户比我还帅。客户比我还帅。客户比我还帅。客户比我还帅。';
            var record4 = new RecordRemarkData();
            record4.author = '吴彦祖';
            record4.dateTime = '2017-11-28';
            record4.content = '客户比我还帅。';
            var record5 = new RecordRemarkData();
            record5.author = '吴彦祖';
            record5.dateTime = '2017-11-29';
            record5.content = '客户比我还帅。';
            testTabRemarkData.listRemarkRecord.push(record1);
            testTabRemarkData.listRemarkRecord.push(record2);
            testTabRemarkData.listRemarkRecord.push(record3);
            testTabRemarkData.listRemarkRecord.push(record4);
            testTabRemarkData.listRemarkRecord.push(record5);
            return testTabRemarkData;
        };
        var configData = {
            divContainerRemarkModel: $('#model_container_remark')[0],
            divContainerRemarkRecord: $('#remark_record')[0],
            listRemarkModel: [],
            listRemarkRecord: [],
            textarea: document.getElementById('textarea_remark_content'),
            btnSendRemark: $('#btn_send_remark')[0]
        };
        TabRemark.init = function () {
            configData.divContainerRemarkModel = $('#model_container_remark')[0];
            configData.textarea = document.getElementById('textarea_remark_content');
            configData.btnSendRemark = $('#btn_send_remark')[0];
            clearModelHtml();
            clearRecordHtml();
            getRemarkModel();
            getRemarkRecord();
            bindEvent();
        };
        var getRemarkModel = function () {
            var testData = getTestData();
            configData.listRemarkModel = testData.listRemarkModel;
            MyModals.modal_create_remark_model.init(configData.listRemarkModel.length);
            TabRemark.addModelHtml(configData.listRemarkModel);
        };
        var getRemarkRecord = function () {
            var testData = getTestData();
            configData.listRemarkRecord = testData.listRemarkRecord;
            TabRemark.addRecordHtml(configData.listRemarkRecord);
        };
        var bindEvent = function () {
            $(configData.divContainerRemarkRecord).slimScroll({
                height: '380px;',
                start: 'top'
            });
            $(configData.btnSendRemark).on('click', function () {
                var value = configData.textarea.value.trim();
                if (value.length > 0) {
                    var record = new RecordRemarkData();
                    record.author = '刘德华';
                    record.content = value;
                    record.dateTime = new Date().toLocaleString();
                    postSendRemark(record);
                }
            });
        };
        var clearModelHtml = function () {
            configData.divContainerRemarkModel.innerHTML = '';
        };
        var clearRecordHtml = function () {
            configData.divContainerRemarkRecord.innerHTML = '';
        };
        TabRemark.addModelData = function (model) {
            configData.listRemarkModel.push(model);
        };
        TabRemark.addRecordData = function (record) {
            configData.listRemarkRecord.push(record);
        };
        TabRemark.addModelHtml = function (model) {
            var html = createModelHtml(model);
            configData.divContainerRemarkModel.insertAdjacentHTML('beforeend', html);
            if (model instanceof ModelRemarkData) {
                bindModelEvent(model);
            }
            else {
                model.forEach(function (m) {
                    bindModelEvent(m);
                });
            }
        };
        var bindModelEvent = function (model) {
            var rowModel = $(configData.divContainerRemarkModel).find('#remark_model_' + model.id)[0];
            var modelContent = $(rowModel).find('.model-remark');
            modelContent.data('data', model);
            modelContent.on('click', function () {
                var data = modelContent.data('data');
                configData.textarea.value = data.remark;
            });
            $(rowModel).find('.icon-close').on('click', function () {
                postRemoveModel(model, rowModel);
            });
        };
        TabRemark.addRecordHtml = function (record) {
            var html = createRecordHtml(record);
            configData.divContainerRemarkRecord.insertAdjacentHTML('afterbegin', html);
        };
        var createModelHtml = function (model) {
            if (model instanceof ModelRemarkData) {
                var html = [
                    '<div id="remark_model_' + model.id + '" class="row">',
                    '    <div class="model-remark">',
                    '        ' + model.remark,
                    '        <div class="hover-show">',
                    '            <div class="triangle"></div>',
                    '            ' + model.remark,
                    '        </div>',
                    '    </div>',
                    '    <i class="icon-close"></i>',
                    '</div>'
                ].join("");
                return html;
            }
            else {
                var html_1 = '';
                model.forEach(function (m) {
                    html_1 += createModelHtml(m);
                });
                return html_1;
            }
        };
        var createRecordHtml = function (record) {
            if (record instanceof RecordRemarkData) {
                var html = [
                    '<div class="remark-record">',
                    '    <div class="remark-author">',
                    '        <p class="p-value font-size-16">' + record.author + '</p>',
                    '    </div>',
                    '    <div class="remark-content">',
                    '        <div class="record-1">',
                    '            <p>' + record.dateTime + '</p>',
                    '            <div>' + record.content + '</div>',
                    '        </div>',
                    '    </div>',
                    '</div>'
                ].join("");
                return html;
            }
            else {
                var html_2 = '';
                record.forEach(function (r) {
                    html_2 += createRecordHtml(r);
                });
                return html_2;
            }
        };
        var postRemoveModel = function (model, rowModel) {
            for (var i = 0; i < configData.listRemarkModel.length; i++) {
                if (configData.listRemarkModel[i].id === model.id) {
                    configData.listRemarkModel.splice(i, 1);
                    MyModals.modal_create_remark_model.addExistModelCount(-1);
                    break;
                }
            }
            rowModel.remove();
        };
        var postSendRemark = function (record) {
            TabRemark.addRecordHtml(record);
            $(configData.divContainerRemarkRecord).slimScroll({
                scrollTo: '0px'
            });
            configData.textarea.value = '';
        };
    })(TabRemark = customer_selector.TabRemark || (customer_selector.TabRemark = {}));
    var TabSuggestion;
    (function (TabSuggestion) {
        var TabSuggestionData = (function () {
            function TabSuggestionData() {
                this.listSuggestRecord = [];
            }
            return TabSuggestionData;
        }());
        var SuggestRecordData = (function () {
            function SuggestRecordData() {
            }
            return SuggestRecordData;
        }());
        TabSuggestion.SuggestRecordData = SuggestRecordData;
        var getTestData = function () {
            var testTabSuggestionData = new TabSuggestionData();
            var record1 = new SuggestRecordData();
            record1.stockCode = '000333';
            record1.stockName = '美的集团';
            record1.listStockLabel = [];
            record1.dateTimeOpen = '20171130';
            record1.priceOpen = 51.81;
            record1.dateTimeClose = null;
            record1.priceClose = null;
            record1.profit = 10;
            record1.profitHighest = 20;
            var record2 = new SuggestRecordData();
            record2.stockCode = '000651';
            record2.stockName = '格力电器';
            record2.listStockLabel = [];
            record2.dateTimeOpen = '20171129';
            record2.priceOpen = 44.28;
            record2.dateTimeClose = '20171130';
            record2.priceClose = 42.45;
            record2.profit = -10;
            record2.profitHighest = 2;
            var record3 = new SuggestRecordData();
            record3.stockCode = '000333';
            record3.stockName = '美的集团';
            record3.listStockLabel = [];
            record3.dateTimeOpen = '20171128';
            record3.priceOpen = 51.81;
            record3.dateTimeClose = null;
            record3.priceClose = null;
            record3.profit = 10;
            record3.profitHighest = 20;
            var record4 = new SuggestRecordData();
            record4.stockCode = '000651';
            record4.stockName = '格力电器';
            record4.listStockLabel = [];
            record4.dateTimeOpen = '20171127';
            record4.priceOpen = 44.28;
            record4.dateTimeClose = '20171130';
            record4.priceClose = 42.45;
            record4.profit = -10;
            record4.profitHighest = 2;
            var record5 = new SuggestRecordData();
            record5.stockCode = '000333';
            record5.stockName = '美的集团';
            record5.listStockLabel = [];
            record5.dateTimeOpen = '20171126';
            record5.priceOpen = 51.81;
            record5.dateTimeClose = null;
            record5.priceClose = null;
            record5.profit = 10;
            record5.profitHighest = 20;
            var record6 = new SuggestRecordData();
            record6.stockCode = '000651';
            record6.stockName = '格力电器';
            record6.listStockLabel = [];
            record6.dateTimeOpen = '20171125';
            record6.priceOpen = 44.28;
            record6.dateTimeClose = '20171130';
            record6.priceClose = 42.45;
            record6.profit = -10;
            record6.profitHighest = 2;
            testTabSuggestionData.listSuggestRecord.push(record1);
            testTabSuggestionData.listSuggestRecord.push(record2);
            testTabSuggestionData.listSuggestRecord.push(record3);
            testTabSuggestionData.listSuggestRecord.push(record4);
            testTabSuggestionData.listSuggestRecord.push(record5);
            testTabSuggestionData.listSuggestRecord.push(record6);
            return testTabSuggestionData;
        };
        var configData = {
            divContainerSuggestRecord: $('#suggest_record')[0],
            listSuggestRecord: [],
        };
        TabSuggestion.init = function () {
            MyModals.modal_create_suggest_record.init();
            configData.divContainerSuggestRecord = $('#suggest_record')[0];
            clearRecordHtml();
            getSuggestRecord();
            bindEvent();
        };
        var getSuggestRecord = function () {
            var testData = getTestData();
            configData.listSuggestRecord = testData.listSuggestRecord;
            TabSuggestion.addRecordHtml(configData.listSuggestRecord);
        };
        var bindEvent = function () {
            $(configData.divContainerSuggestRecord).slimScroll({
                height: '370px;',
                start: 'top'
            });
        };
        TabSuggestion.addRecordData = function (record) {
            configData.listSuggestRecord.push(record);
        };
        var clearRecordHtml = function () {
            configData.divContainerSuggestRecord.innerHTML = '';
        };
        TabSuggestion.addRecordHtml = function (record) {
            var html = createRecordHtml(record);
            configData.divContainerSuggestRecord.insertAdjacentHTML('afterbegin', html);
        };
        var createRecordHtml = function (record) {
            if (record instanceof SuggestRecordData) {
                var dateTimeClose = record.dateTimeClose === null || record.dateTimeClose === undefined ? '' : record.dateTimeClose;
                var priceClose = record.priceClose === null || record.priceClose === undefined ? '' : record.priceClose;
                var colorProfit = record.profit >= 0 ? 'red' : 'green';
                var colorProfitHighest = record.profitHighest >= 0 ? 'red' : 'green';
                var html = [
                    '<div id="suggest_record_' + record.id + '" class="row table-row">',
                    '    <div class="table-cell">',
                    '        <p>' + record.stockName + '</p>',
                    '        <p class="stock-code">',
                    '            <span>' + record.stockCode + '</span>',
                    '        </p>',
                    '    </div>',
                    '    <div class="table-cell">',
                    '        <p class="text-number">' + record.dateTimeOpen + '</p>',
                    '    </div>',
                    '    <div class="table-cell">',
                    '        <p class="text-number">' + record.priceOpen + '</p>',
                    '    </div>',
                    '    <div class="table-cell">',
                    '        <p class="text-number">' + dateTimeClose + '</p>',
                    '    </div>',
                    '    <div class="table-cell">',
                    '        <p class="text-number">' + priceClose + '</p>',
                    '    </div>',
                    '    <div class="table-cell">',
                    '        <p class="text-number profit-' + colorProfit + '">' + record.profit + '%</p>',
                    '        <p class="text-number profit-' + colorProfitHighest + '">' + record.profitHighest + '%</p>',
                    '    </div>',
                    '    <div class="table-cell">',
                    '        <p class="btn-clear-position">平仓</p>',
                    '    </div>',
                    '</div>'
                ].join("");
                return html;
            }
            else {
                var html_3 = '';
                record.forEach(function (r) {
                    html_3 += createRecordHtml(r);
                });
                return html_3;
            }
        };
        TabSuggestion.scrollRecordToTop = function () {
            $(configData.divContainerSuggestRecord).slimScroll({
                scrollTo: '0px'
            });
        };
    })(TabSuggestion = customer_selector.TabSuggestion || (customer_selector.TabSuggestion = {}));
})(customer_selector || (customer_selector = {}));
//# sourceMappingURL=customer-selector.js.map