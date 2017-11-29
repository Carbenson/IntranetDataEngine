"use strict";
var customer_selector;
(function (customer_selector) {
    customer_selector.init = function () {
        MyModals.modal_send_sms.init();
        customer_selector.TabRemark.init();
        $('.scroll-content').slimScroll({
            height: 'auto'
        });
        $('.table-content').slimScroll({
            height: 'auto;'
        });
        $('#tab5_table_content').slimScroll({
            height: '370px;'
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
        var RecordRemarkData = (function () {
            function RecordRemarkData() {
            }
            return RecordRemarkData;
        }());
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
            configData.listRemarkModel.forEach(function (model) {
                TabRemark.addModelHtml(model);
            });
        };
        var getRemarkRecord = function () {
            var testData = getTestData();
            configData.listRemarkRecord = testData.listRemarkRecord;
            configData.listRemarkRecord.forEach(function (record) {
                TabRemark.addRecordHtml(record);
            });
        };
        var bindEvent = function () {
            $(configData.divContainerRemarkRecord).slimScroll({
                height: '380px;',
                start: 'top'
            });
            $(configData.btnSendRemark).on('click', function () {
                var value = configData.textarea.value.trim();
                var record = new RecordRemarkData();
                record.author = '刘德华';
                record.content = value;
                record.dateTime = new Date().toLocaleString();
                postSendRemark(record);
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
        };
        var createRecordHtml = function (record) {
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
})(customer_selector || (customer_selector = {}));
//# sourceMappingURL=customer-selector.js.map