"use strict";
var Modal = (function () {
    function Modal(modalId, maskId) {
        var _this = this;
        if (modalId === "" || maskId === "") {
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
            console.error("can not find modalId = " + modalId);
            return;
        }
        var targetMask = document.getElementById(maskId);
        if (targetMask !== null) {
            this.mask = targetMask;
        }
        else {
            console.error("can not find maskId = " + maskId);
            return;
        }
    }
    Modal.prototype.show = function () {
        this.mask.style.display = "block";
        this.modal.style.display = "block";
    };
    Modal.prototype.hide = function () {
        this.modal.style.display = "none";
        this.mask.style.display = "none";
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
    var ModalSendSmsData = (function () {
        function ModalSendSmsData() {
        }
        return ModalSendSmsData;
    }());
    var getTestData = function () {
        var modelModalSendSms = new ModalSendSmsData();
        modelModalSendSms.listModel = [];
        var model1 = new ModelSmsData();
        model1.id = 1;
        model1.content = '恭喜发财！';
        var model2 = new ModelSmsData();
        model2.id = 2;
        model2.content = '身体健康！';
        modelModalSendSms.listModel.push(model1);
        modelModalSendSms.listModel.push(model2);
        modelModalSendSms.listRecord = [];
        var record1 = new RecordSmsData();
        record1.dateTime = "2017-11-01 14 : 34";
        record1.record = "您是否换了电话";
        record1.recordType = 1;
        var record2 = new RecordSmsData();
        record2.dateTime = "2017-11-03 13：25";
        record2.record =
            "客户表示家人在光大证券做的，要求转去支持，客户不想多个账户，要全部转走后来因为升位，没有转走，挽留客户给了0.6的费率优惠，安抚客户";
        record2.recordType = 2;
        var record3 = new RecordSmsData();
        record3.dateTime = "2017-11-04 13：25";
        record3.record = "好哇";
        record3.recordType = 1;
        modelModalSendSms.listRecord.push(record1);
        modelModalSendSms.listRecord.push(record2);
        modelModalSendSms.listRecord.push(record3);
        return modelModalSendSms;
    };
    var configData = {
        initData: new ModalSendSmsData(),
        htmlRecord: "",
        htmlModel: "",
        htmlModal: "",
        modalNode: new Modal("", ""),
        textarea: document.getElementById('textarea_sms_content')
    };
    modal_send_sms.init = function () {
        removeModalNode();
        getInitData();
    };
    var getInitData = function () {
        var url = "https://api.aichallenger.com:9080/tcapp/hq/zx.do?code=000001.1";
        $.ajax({
            type: "get",
            url: url,
            dataType: "jsonp",
            contentType: "application/json",
            success: function (rsp) {
                var initData = getTestData();
                configData.initData = initData;
                addModalNode();
                bindEvent();
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.info(xmlHttpRequest.status);
                console.info(xmlHttpRequest.readyState);
                console.info(textStatus);
                console.info(errorThrown);
            }
        });
    };
    var addModalNode = function () {
        createModalHtml();
        document.body.insertAdjacentHTML("beforeend", configData.htmlModal);
        configData.textarea = document.getElementById('textarea_sms_content');
        configData.initData.listRecord.forEach(function (record) {
            modal_send_sms.AddRecordHtml(record);
        });
        configData.initData.listModel.forEach(function (model) {
            modal_send_sms.AddModelHtml(model);
        });
        modal_create_sms_model.init(configData.initData.listModel.length);
        var modal = new Modal("modal_send_sms", "mask1");
        configData.modalNode = modal;
    };
    var removeModalNode = function () {
        configData.modalNode.removeSelf();
    };
    var bindEvent = function () {
        $("#sms_record").slimScroll({
            height: "215px;",
            start: "bottom"
        });
        var btnSendSms = document.getElementById("btn_send_sms");
        if (btnSendSms !== null) {
            btnSendSms.onclick = function () {
                configData.textarea.value = '';
                btnConfirmSendSms.addClass('disabled');
                configData.modalNode.show();
                var smsRecordContainer = document.getElementById('sms_record');
                if (smsRecordContainer !== null && smsRecordContainer.children.length > 0) {
                    smsRecordContainer.children[smsRecordContainer.children.length - 1].scrollIntoView();
                }
            };
        }
        var btnConfirmSendSms = $('#btn_confirm_send_sms');
        btnConfirmSendSms.on('click', function () {
            var value = configData.textarea.value.trim();
            if (value.length > 0 && value.length <= 63) {
            }
            else {
                return;
            }
        });
        var leftWordCountSmsContent = $('#left_word_count_sms_content')[0];
        configData.textarea.oninput = function () {
            var value = configData.textarea.value.trim();
            if (value.length > 0 && value.length <= 63) {
                btnConfirmSendSms.removeClass('disabled');
            }
            else {
                btnConfirmSendSms.addClass('disabled');
            }
            leftWordCountSmsContent.innerText = (63 - value.length).toString();
        };
    };
    var createRecordHtml = function (record) {
        var html = '';
        if (record.recordType === 1) {
            html = [
                '<div class="record-1">',
                "    <p>" + record.dateTime + "</p>",
                "    <div>" + record.record + "</div>",
                "</div>"
            ].join("");
        }
        else if (record.recordType === 2) {
            html = [
                '<div class="record-2">',
                "    <p>" + record.dateTime + "</p>",
                "    <div>" + record.record + "</div>",
                "</div>"
            ].join("");
        }
        return html;
    };
    var createModelHtml = function (model) {
        var html = [
            '<div id="sms_model_' + model.id + '" class="row">',
            '    <div class="model-sms">',
            "        " + model.content,
            '        <div class="hover-show">',
            '            <div class="triangle"></div>',
            "            " + model.content,
            "        </div>",
            "    </div>",
            '    <i class="icon-close"></i>',
            "</div>"
        ].join("");
        return html;
    };
    var createModalHtml = function () {
        var html = [
            '<div id="modal_send_sms">',
            '    <div class="content">',
            '        <p class="p-header">发送短信</p>',
            '        <div id="sms_record">',
            "        </div>",
            '        <textarea id="textarea_sms_content" class="font-size-16" placeholder="请输入短信内容......"></textarea>',
            '        <span class="input-footer">剩余字数：',
            '            <span id="left_word_count_sms_content" class="text-number">63</span>',
            "        </span>",
            '        <div class="row modal-tool-bar">',
            '            <div class="col-50" style="text-align:right">',
            '                <button id="btn_confirm_send_sms" type="button" class="btn disabled" style="margin-right: 10px;">发送</button>',
            "            </div>",
            '            <div class="col-50 tool-bar">',
            '                <button id="btn_cancel_send_sms" type="button" class="btn close-modal" style="margin-left: 10px;">取消</button>',
            "                <p>（点此添加短信模板）",
            '                    <i id="btn_create_sms_model" class="icon-plus"></i>',
            "                </p>",
            "            </div>",
            "        </div>",
            '        <div id="model_container_sms">',
            "        </div>",
            "    </div>",
            "</div>"
        ].join("");
        configData.htmlModal = html;
    };
    modal_send_sms.AddRecordHtml = function (record) {
        var container = document.getElementById('sms_record');
        if (container !== null) {
            var html = createRecordHtml(record);
            container.insertAdjacentHTML('beforeend', html);
        }
    };
    modal_send_sms.AddModelHtml = function (model) {
        var container = document.getElementById('model_container_sms');
        if (container !== null) {
            var html = createModelHtml(model);
            container.insertAdjacentHTML('beforeend', html);
            var rowModel_1 = $(container).find('#sms_model_' + model.id);
            rowModel_1.find('.icon-close').on('click', function () {
                postRemoveModel(model, rowModel_1);
            });
        }
    };
    modal_send_sms.AddModelData = function (model) {
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
})(modal_send_sms || (modal_send_sms = {}));
var modal_create_sms_model;
(function (modal_create_sms_model) {
    var configData = {
        htmlModal: '',
        htmlModalAlert: '',
        modalNode: new Modal('', ''),
        modalAlertNode: new Modal('', ''),
        existModelCount: 0,
        textarea: document.getElementById('textarea_sms_model')
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
        document.body.insertAdjacentHTML("beforeend", configData.htmlModal);
        var modal = new Modal("modal_create_sms_model", "mask2");
        configData.modalNode = modal;
        configData.textarea = document.getElementById('textarea_sms_model');
        createModalAlert();
        document.body.insertAdjacentHTML("beforeend", configData.htmlModalAlert);
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
                btnSaveCreateSmsModel.addClass('disabled');
                configData.modalNode.show();
            }
            else {
                configData.modalAlertNode.show();
            }
        });
        var btnSaveCreateSmsModel = $('#btn_save_create_sms_model');
        btnSaveCreateSmsModel.on('click', function () {
            var value = configData.textarea.value.trim();
            if (checkWordCount(value)) {
                postSmsModel(value);
            }
            else {
                return;
            }
        });
        var leftWordCountSmsModel = $('#left_word_count_sms_model')[0];
        configData.textarea.oninput = function () {
            var value = configData.textarea.value.trim();
            if (checkWordCount(value)) {
                btnSaveCreateSmsModel.removeClass('disabled');
            }
            else {
                btnSaveCreateSmsModel.addClass('disabled');
            }
            leftWordCountSmsModel.innerText = (63 - value.length).toString();
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
        ].join("");
        configData.htmlModalAlert = html;
    };
    var checkWordCount = function (value) {
        if (value.length > 0 && value.length <= 63) {
            return true;
        }
        else {
            return false;
        }
    };
    var postSmsModel = function (model) {
        configData.existModelCount = configData.existModelCount + 1;
        var modelData = { content: model, id: new Date().getTime() };
        modal_send_sms.AddModelData(modelData);
        modal_send_sms.AddModelHtml(modelData);
        configData.modalNode.hide();
    };
})(modal_create_sms_model || (modal_create_sms_model = {}));
//# sourceMappingURL=myModal.js.map