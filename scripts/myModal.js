"use strict";
var MyModals;
(function (MyModals) {
    var Modal = (function () {
        function Modal(modalId, maskId) {
            var _this = this;
            if (modalId === '' || maskId === '') {
                return;
            }
            var targetModal = document.getElementById(modalId);
            if (targetModal !== null) {
                this.modal = targetModal;
                var btnCloseModal = $('#' + modalId + ' .close-modal');
                btnCloseModal.on('click', function () {
                    _this.hide();
                });
            }
            else {
                console.error('can not find modalId = ' + modalId);
                return;
            }
            var targetMask = document.getElementById(maskId);
            if (targetMask !== null) {
                this.mask = targetMask;
            }
            else {
                console.error('can not find maskId = ' + maskId);
                return;
            }
        }
        Modal.prototype.show = function () {
            this.mask.style.display = 'block';
            this.modal.style.display = 'block';
        };
        Modal.prototype.hide = function () {
            this.modal.style.display = 'none';
            this.mask.style.display = 'none';
        };
        Modal.prototype.removeSelf = function () {
            if (this.modal !== undefined) {
                this.modal.remove();
            }
        };
        return Modal;
    }());
    var modal_send_sms;
    (function (modal_send_sms) {
        var RecordSmsData = (function () {
            function RecordSmsData() {
            }
            return RecordSmsData;
        }());
        var ModelSmsData = (function () {
            function ModelSmsData() {
            }
            return ModelSmsData;
        }());
        modal_send_sms.ModelSmsData = ModelSmsData;
        var ModalSendSmsData = (function () {
            function ModalSendSmsData() {
                this.listRecord = [];
                this.listModel = [];
            }
            return ModalSendSmsData;
        }());
        var getTestData = function () {
            var testModalSendSmsData = new ModalSendSmsData();
            var model1 = new ModelSmsData();
            model1.id = 1;
            model1.content = '恭喜发财！';
            var model2 = new ModelSmsData();
            model2.id = 2;
            model2.content = '身体健康！';
            testModalSendSmsData.listModel.push(model1);
            testModalSendSmsData.listModel.push(model2);
            var record1 = new RecordSmsData();
            record1.dateTime = '2017-11-01 14 : 34';
            record1.record = '您是否换了电话';
            record1.recordType = 1;
            var record2 = new RecordSmsData();
            record2.dateTime = '2017-11-03 13：25';
            record2.record =
                '客户表示家人在光大证券做的，要求转去支持，客户不想多个账户，要全部转走后来因为升位，没有转走，挽留客户给了0.6的费率优惠，安抚客户';
            record2.recordType = 2;
            var record3 = new RecordSmsData();
            record3.dateTime = '2017-11-04 13：25';
            record3.record = '好哇';
            record3.recordType = 1;
            testModalSendSmsData.listRecord.push(record1);
            testModalSendSmsData.listRecord.push(record2);
            testModalSendSmsData.listRecord.push(record3);
            return testModalSendSmsData;
        };
        var configData = {
            initData: new ModalSendSmsData(),
            htmlModal: '',
            modalNode: new Modal('', ''),
            textarea: document.getElementById('textarea_sms_content'),
            btnConfirmSendSms: $('#btn_confirm_send_sms'),
            spanLeftWordCount: $('#left_word_count_sms_content')[0],
            divContainerSmsRecord: $('#sms_record')[0],
            divContainerSmsModel: $('#model_container_sms')[0],
        };
        modal_send_sms.init = function () {
            removeModalNode();
            getInitData();
        };
        var getInitData = function () {
            var initData = getTestData();
            configData.initData = initData;
            addModalNode();
            bindEvent();
        };
        var addModalNode = function () {
            createModalHtml();
            document.body.insertAdjacentHTML('beforeend', configData.htmlModal);
            configData.divContainerSmsRecord = $('#sms_record')[0];
            $(configData.divContainerSmsRecord).slimScroll({
                height: '215px;',
                start: 'bottom'
            });
            configData.textarea = document.getElementById('textarea_sms_content');
            configData.divContainerSmsModel = $('#model_container_sms')[0];
            modal_send_sms.addRecordHtml(configData.initData.listRecord);
            modal_send_sms.addModelHtml(configData.initData.listModel);
            modal_create_sms_model.init(configData.initData.listModel.length);
            var modal = new Modal('modal_send_sms', 'mask1');
            configData.modalNode = modal;
        };
        var removeModalNode = function () {
            configData.modalNode.removeSelf();
        };
        var bindEvent = function () {
            var btnSendSms = document.getElementById('btn_send_sms');
            if (btnSendSms !== null) {
                btnSendSms.onclick = function () {
                    configData.textarea.value = '';
                    checkWordCount();
                    configData.modalNode.show();
                    scrollRecordToEnd();
                };
            }
            configData.btnConfirmSendSms = $('#btn_confirm_send_sms');
            configData.btnConfirmSendSms.on('click', function () {
                var value = configData.textarea.value.trim();
                if (value.length > 0 && value.length <= 63) {
                    var record = new RecordSmsData();
                    record.record = value;
                    record.recordType = 2;
                    record.dateTime = new Date().toLocaleString();
                    postSendSms(record);
                }
                else {
                    return;
                }
            });
            configData.spanLeftWordCount = $('#left_word_count_sms_content')[0];
            configData.textarea.oninput = function () {
                checkWordCount();
            };
        };
        var scrollRecordToEnd = function () {
            configData.divContainerSmsRecord.scrollHeight;
            $(configData.divContainerSmsRecord).slimScroll({
                scrollTo: configData.divContainerSmsRecord.scrollHeight + 'px'
            });
        };
        var checkWordCount = function () {
            var value = configData.textarea.value.trim();
            if (value.length > 0 && value.length <= 63) {
                configData.btnConfirmSendSms.removeClass('disabled');
            }
            else {
                configData.btnConfirmSendSms.addClass('disabled');
            }
            configData.spanLeftWordCount.innerText = (63 - value.length).toString();
        };
        var createRecordHtml = function (record) {
            if (record instanceof RecordSmsData) {
                var html = '';
                if (record.recordType === 1) {
                    html = [
                        '<div class="record-1">',
                        '    <p>' + record.dateTime + '</p>',
                        '    <div>' + record.record + '</div>',
                        '</div>'
                    ].join('');
                }
                else if (record.recordType === 2) {
                    html = [
                        '<div class="record-2">',
                        '    <p>' + record.dateTime + '</p>',
                        '    <div>' + record.record + '</div>',
                        '</div>'
                    ].join('');
                }
                return html;
            }
            else {
                var html_1 = '';
                record.forEach(function (r) {
                    html_1 += createRecordHtml(r);
                });
                return html_1;
            }
        };
        var createModelHtml = function (model) {
            if (model instanceof ModelSmsData) {
                var html = [
                    '<div id="sms_model_' + model.id + '" class="row">',
                    '    <div class="model-sms">',
                    '        ' + model.content,
                    '        <div class="hover-show">',
                    '            <div class="triangle"></div>',
                    '            ' + model.content,
                    '        </div>',
                    '    </div>',
                    '    <i class="icon-close"></i>',
                    '</div>'
                ].join('');
                return html;
            }
            else {
                var html_2 = '';
                model.forEach(function (m) {
                    html_2 += createModelHtml(m);
                });
                return html_2;
            }
        };
        var createModalHtml = function () {
            var html = [
                '<div id="modal_send_sms">',
                '    <div class="content">',
                '        <p class="p-header">发送短信</p>',
                '        <div id="sms_record">',
                '        </div>',
                '        <textarea id="textarea_sms_content" class="font-size-16" placeholder="请输入短信内容......"></textarea>',
                '        <span class="input-footer">剩余字数：',
                '            <span id="left_word_count_sms_content" class="text-number">63</span>',
                '        </span>',
                '        <div class="row modal-tool-bar">',
                '            <div class="col-50" style="text-align:right">',
                '                <button id="btn_confirm_send_sms" type="button" class="btn disabled" style="margin-right: 10px;">发送</button>',
                '            </div>',
                '            <div class="col-50 tool-bar">',
                '                <button id="btn_cancel_send_sms" type="button" class="btn close-modal" style="margin-left: 10px;">取消</button>',
                '                <p>（点此添加短信模板）',
                '                    <i id="btn_create_sms_model" class="icon-plus"></i>',
                '                </p>',
                '            </div>',
                '        </div>',
                '        <div id="model_container_sms">',
                '        </div>',
                '    </div>',
                '</div>'
            ].join('');
            configData.htmlModal = html;
        };
        modal_send_sms.addRecordHtml = function (record) {
            var html = createRecordHtml(record);
            configData.divContainerSmsRecord.insertAdjacentHTML('beforeend', html);
        };
        modal_send_sms.addModelHtml = function (model) {
            var html = createModelHtml(model);
            configData.divContainerSmsModel.insertAdjacentHTML('beforeend', html);
            if (model instanceof ModelSmsData) {
                bindModelEvent(model);
            }
            else {
                model.forEach(function (m) {
                    bindModelEvent(m);
                });
            }
        };
        var bindModelEvent = function (model) {
            var rowModel = $(configData.divContainerSmsModel).find('#sms_model_' + model.id)[0];
            var modelContent = $(rowModel).find('.model-sms');
            modelContent.data('data', model);
            modelContent.on('click', function () {
                var data = modelContent.data('data');
                configData.textarea.value = data.content;
                checkWordCount();
            });
            $(rowModel).find('.icon-close').on('click', function () {
                postRemoveModel(model, rowModel);
            });
        };
        modal_send_sms.addModelData = function (model) {
            configData.initData.listModel.push(model);
        };
        var postRemoveModel = function (model, rowModel) {
            for (var i = 0; i < configData.initData.listModel.length; i++) {
                if (configData.initData.listModel[i].id === model.id) {
                    configData.initData.listModel.splice(i, 1);
                    modal_create_sms_model.addExistModelCount(-1);
                    break;
                }
            }
            rowModel.remove();
        };
        var postSendSms = function (record) {
            modal_send_sms.addRecordHtml(record);
            scrollRecordToEnd();
            configData.textarea.value = '';
            checkWordCount();
        };
    })(modal_send_sms = MyModals.modal_send_sms || (MyModals.modal_send_sms = {}));
    var modal_create_sms_model;
    (function (modal_create_sms_model) {
        var configData = {
            htmlModal: '',
            htmlModalAlert: '',
            modalNode: new Modal('', ''),
            modalAlertNode: new Modal('', ''),
            existModelCount: 0,
            textarea: document.getElementById('textarea_sms_model'),
            btnSaveCreateSmsModel: $('#btn_save_create_sms_model'),
            spanLeftWordCount: $('#left_word_count_sms_model')[0]
        };
        modal_create_sms_model.init = function (existModelCount) {
            modal_create_sms_model.addExistModelCount(existModelCount);
            removeModalNode();
            addModalNode();
            bindEvent();
        };
        modal_create_sms_model.addExistModelCount = function (count) {
            configData.existModelCount = configData.existModelCount + count;
        };
        var addModalNode = function () {
            createModalHtml();
            document.body.insertAdjacentHTML('beforeend', configData.htmlModal);
            var modal = new Modal('modal_create_sms_model', 'mask2');
            configData.modalNode = modal;
            configData.textarea = document.getElementById('textarea_sms_model');
            createModalAlert();
            document.body.insertAdjacentHTML('beforeend', configData.htmlModalAlert);
            var alert = new Modal('modal_alert1', 'mask2');
            configData.modalAlertNode = alert;
        };
        var removeModalNode = function () {
            configData.modalNode.removeSelf();
            configData.modalAlertNode.removeSelf();
        };
        var bindEvent = function () {
            var btnCreateSmsModel = $('#btn_create_sms_model');
            btnCreateSmsModel.on('click', function () {
                if (configData.existModelCount < 5) {
                    configData.textarea.value = '';
                    checkWordCount();
                    configData.modalNode.show();
                }
                else {
                    configData.modalAlertNode.show();
                }
            });
            configData.btnSaveCreateSmsModel = $('#btn_save_create_sms_model');
            configData.btnSaveCreateSmsModel.on('click', function () {
                var value = configData.textarea.value.trim();
                if (value.length > 0 && value.length <= 63) {
                    postSaveModel(value);
                }
                else {
                    return;
                }
            });
            configData.spanLeftWordCount = $('#left_word_count_sms_model')[0];
            configData.textarea.oninput = function () {
                checkWordCount();
            };
        };
        var createModalHtml = function () {
            var html = [
                '<div id="modal_create_sms_model">',
                '    <div class="content">',
                '        <p class="p-header">编辑短信模板</p>',
                '        <textarea id="textarea_sms_model" class="font-size-16" placeholder="请输入短信模板内容......"></textarea>',
                '        <span class="input-footer">剩余字数：',
                '            <span id="left_word_count_sms_model" class="text-number">63</span>',
                '        </span>',
                '        <div class="row modal-tool-bar">',
                '            <div class="col-50" style="text-align:right">',
                '                <button id="btn_save_create_sms_model" type="button" class="btn disabled" style="margin-right: 10px;">保存</button>',
                '            </div>',
                '            <div class="col-50">',
                '                <button id="btn_cancel_create_sms_model" type="button" class="btn close-modal" style="margin-left: 10px;">取消</button>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</div>'
            ].join('');
            configData.htmlModal = html;
        };
        var createModalAlert = function () {
            var html = [
                '<div id="modal_alert1">',
                '    <div class="content">',
                '        <p class="p-header">短信模板已满</p>',
                '        <div class="modal-alert-info">短信模板最多允许编辑5条，如需增加，请删除不用的模板</div>',
                '        <div class="row modal-tool-bar">',
                '            <div class="col-100" style="text-align:center">',
                '                <button id="btn_dismiss_modal_alert1" type="button" class="btn btn-confirm close-modal">确定</button>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</div>'
            ].join('');
            configData.htmlModalAlert = html;
        };
        var checkWordCount = function () {
            var value = configData.textarea.value.trim();
            if (value.length > 0 && value.length <= 63) {
                configData.btnSaveCreateSmsModel.removeClass('disabled');
            }
            else {
                configData.btnSaveCreateSmsModel.addClass('disabled');
            }
            configData.spanLeftWordCount.innerText = (63 - value.length).toString();
        };
        var postSaveModel = function (model) {
            configData.existModelCount = configData.existModelCount + 1;
            var modelData = new modal_send_sms.ModelSmsData();
            modelData.id = new Date().getTime();
            modelData.content = model;
            modal_send_sms.addModelData(modelData);
            modal_send_sms.addModelHtml(modelData);
            configData.modalNode.hide();
        };
    })(modal_create_sms_model = MyModals.modal_create_sms_model || (MyModals.modal_create_sms_model = {}));
    var modal_create_remark_model;
    (function (modal_create_remark_model) {
        var configData = {
            modalNode: new Modal('', ''),
            modalAlertNode: new Modal('', ''),
            textarea: document.getElementById('textarea_sms_model'),
            btnSaveCreateRemarkModel: $('#btn_save_create_remark_model'),
            spanLeftWordCount: $('#left_word_count_remark_model')[0],
            existModelCount: 0
        };
        modal_create_remark_model.init = function (existModelCount) {
            modal_create_remark_model.addExistModelCount(existModelCount);
            removeModalNode();
            addModalNode();
            bindEvent();
        };
        modal_create_remark_model.addExistModelCount = function (count) {
            configData.existModelCount = configData.existModelCount + count;
        };
        var removeModalNode = function () {
            configData.modalNode.removeSelf();
            configData.modalAlertNode.removeSelf();
        };
        var addModalNode = function () {
            var htmlModal = createModalHtml();
            document.body.insertAdjacentHTML('beforeend', htmlModal);
            var modal = new Modal('modal_create_remark_model', 'mask1');
            configData.modalNode = modal;
            configData.textarea = document.getElementById('textarea_remark_model');
            var htmlAlert = createModalAlertHtml();
            document.body.insertAdjacentHTML('beforeend', htmlAlert);
            var alert = new Modal('modal_alert2', 'mask1');
            configData.modalAlertNode = alert;
        };
        var bindEvent = function () {
            var btnCreateRemarkModel = $('#btn_create_remark_model');
            btnCreateRemarkModel.on('click', function () {
                if (configData.existModelCount < 5) {
                    configData.textarea.value = '';
                    checkWordCount();
                    configData.modalNode.show();
                }
                else {
                    configData.modalAlertNode.show();
                }
            });
            configData.btnSaveCreateRemarkModel = $('#btn_save_create_remark_model');
            configData.btnSaveCreateRemarkModel.on('click', function () {
                var value = configData.textarea.value.trim();
                if (value.length > 0 && value.length <= 30) {
                    postSaveModel(value);
                }
                else {
                    return;
                }
            });
            configData.spanLeftWordCount = $('#left_word_count_remark_model')[0];
            configData.textarea.oninput = function () {
                checkWordCount();
            };
        };
        var createModalHtml = function () {
            var html = [
                '<div id="modal_create_remark_model">',
                '    <div class="content">',
                '        <p class="p-header">编辑备注模板</p>',
                '        <textarea id="textarea_remark_model" class="font-size-16" placeholder="请输入备注模板内容......"></textarea>',
                '        <span class="input-footer">剩余字数：',
                '            <span id="left_word_count_remark_model" class="text-number">30</span>',
                '        </span>',
                '        <div class="row modal-tool-bar">',
                '            <div class="col-50" style="text-align:right">',
                '                <button id="btn_save_create_remark_model" type="button" class="btn disabled" style="margin-right: 10px;">保存</button>',
                '            </div>',
                '            <div class="col-50">',
                '                <button id="btn_cancel_create_remark_model" type="button" class="btn close-modal" style="margin-left: 10px;">取消</button>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</div>'
            ].join('');
            return html;
        };
        var createModalAlertHtml = function () {
            var html = [
                '<div id="modal_alert2">',
                '    <div class="content">',
                '        <p class="p-header">备注模板已满</p>',
                '        <div class="modal-alert-info">备注模板最多允许编辑5条，如需增加，请删除不用的模板</div>',
                '        <div class="row modal-tool-bar">',
                '            <div class="col-100" style="text-align:center">',
                '                <button id="btn_dismiss_modal_alert2" type="button" class="btn btn-confirm close-modal">确定</button>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</div>'
            ].join('');
            return html;
        };
        var checkWordCount = function () {
            var value = configData.textarea.value.trim();
            if (value.length > 0 && value.length <= 30) {
                configData.btnSaveCreateRemarkModel.removeClass('disabled');
            }
            else {
                configData.btnSaveCreateRemarkModel.addClass('disabled');
            }
            configData.spanLeftWordCount.innerText = (30 - value.length).toString();
        };
        var postSaveModel = function (model) {
            configData.existModelCount = configData.existModelCount + 1;
            var modelData = new customer_selector.TabRemark.ModelRemarkData();
            modelData.id = new Date().getTime();
            modelData.remark = model;
            customer_selector.TabRemark.addModelData(modelData);
            customer_selector.TabRemark.addModelHtml(modelData);
            configData.modalNode.hide();
        };
    })(modal_create_remark_model = MyModals.modal_create_remark_model || (MyModals.modal_create_remark_model = {}));
    var modal_create_suggest_record;
    (function (modal_create_suggest_record) {
        var configData = {
            modalNode: new Modal('', ''),
            inputStockCode: document.getElementById('input_suggest_stockcode'),
            btnSaveCreateSuggestRecord: $('#btn_save_create_suggest_record')[0]
        };
        modal_create_suggest_record.init = function () {
            removeModalNode();
            addModalNode();
            bindEvent();
        };
        var removeModalNode = function () {
            configData.modalNode.removeSelf();
        };
        var addModalNode = function () {
            var htmlModal = createModalHtml();
            document.body.insertAdjacentHTML('beforeend', htmlModal);
            var modal = new Modal('modal_create_suggest_record', 'mask1');
            configData.modalNode = modal;
            configData.inputStockCode = document.getElementById('input_suggest_stockcode');
            configData.btnSaveCreateSuggestRecord = $('#btn_save_create_suggest_record')[0];
        };
        var bindEvent = function () {
            var btnCreateRemarkModel = $('#btn_create_suggest_record');
            btnCreateRemarkModel.on('click', function () {
                configData.inputStockCode.value = '';
                checkWordCount();
                configData.modalNode.show();
            });
            configData.inputStockCode.oninput = function () {
                checkWordCount();
            };
            $(configData.btnSaveCreateSuggestRecord).on('click', function () {
                var value = configData.inputStockCode.value.trim();
                if (value.length > 0) {
                    var record = new customer_selector.TabSuggestion.SuggestRecordData();
                    record.stockCode = value;
                    postSaveCreateSuggestRecord(record);
                }
                else {
                    return;
                }
            });
        };
        var createModalHtml = function () {
            var html = [
                '<div id="modal_create_suggest_record">',
                '    <div class="content">',
                '        <p class="p-header">记录推荐品种</p>',
                '        <div style="width:100%;border-bottom:1px solid #B3BBCF;margin-top:20px;"></div>',
                '        <p class="p-value font-size-14">记录时间：',
                '            <span class="text-number">2017-10-17</span>',
                '        </p>',
                '        <p class="p-value font-size-14">建仓价格：以收盘价建仓</p>',
                '        <p class="p-value font-size-14">品种代码：',
                '            <input id="input_suggest_stockcode" >',
                '        </p>',
                '        <div class="row modal-tool-bar">',
                '            <div class="col-50" style="text-align:right">',
                '                <button id="btn_save_create_suggest_record" type="button" class="btn disabled" style="margin-right: 10px;">确定</button>',
                '            </div>',
                '            <div class="col-50">',
                '                <button id="btn_cancel_open_position" type="button" class="btn close-modal" style="margin-left: 10px;">取消</button>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</div>'
            ].join("");
            return html;
        };
        var checkWordCount = function () {
            var value = configData.inputStockCode.value.trim();
            if (value.length > 0) {
                $(configData.btnSaveCreateSuggestRecord).removeClass('disabled');
            }
            else {
                $(configData.btnSaveCreateSuggestRecord).addClass('disabled');
            }
        };
        var postSaveCreateSuggestRecord = function (record) {
            var date = new Date();
            record.id = date.getTime();
            record.stockName = '测试股票';
            record.dateTimeOpen = formatDate(date, 'yyyyMMdd');
            record.priceOpen = 100;
            record.profit = 3;
            record.profitHighest = 5;
            customer_selector.TabSuggestion.addRecordData(record);
            customer_selector.TabSuggestion.addRecordHtml(record);
            configData.modalNode.hide();
            customer_selector.TabSuggestion.scrollRecordToTop();
        };
    })(modal_create_suggest_record = MyModals.modal_create_suggest_record || (MyModals.modal_create_suggest_record = {}));
})(MyModals || (MyModals = {}));
//# sourceMappingURL=myModal.js.map