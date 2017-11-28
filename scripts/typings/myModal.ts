/** modal的模板类 */
class Modal {
    private modal: HTMLElement;
    private mask: HTMLElement;

    /** modal的模板类构造函数
     * @param  {string} modalId modal的id
     * @param  {string} maskId 与modal同时出现的遮罩层的id
     */
    constructor(modalId: string, maskId: string) {
        if (modalId === "" || maskId === "") {
            return;
        }

        let targetModal = document.getElementById(modalId);
        if (targetModal !== null) {
            this.modal = targetModal;
            let btnCloseModal = $('#' + modalId + ' .close-modal');
            btnCloseModal.on('click', () => {
                this.hide();
            });
        } else {
            console.error("can not find modalId = " + modalId);
            return;
        }
        let targetMask = document.getElementById(maskId);
        if (targetMask !== null) {
            this.mask = targetMask;
        } else {
            console.error("can not find maskId = " + maskId);
            return;
        }
    }

    show() {
        this.mask.style.display = "block";
        this.modal.style.display = "block";
    }

    hide() {
        this.modal.style.display = "none";
        this.mask.style.display = "none";
    }

    /** 删除自身 */
    removeSelf() {
        if (this.modal !== undefined) {
            this.modal.remove();
        }
    }
}

namespace modal_send_sms {

    /** 短信记录的数据结构 */
    class RecordSmsData {
        /** 时间 */
        dateTime: string;
        /** 短信记录内容 */
        record: string;
        /** 短信来源:1——客户;2——投顾 */
        recordType: number;
    }

    /** 短信模板 */
    class ModelSmsData {
        /** 短信模板 */
        content: string;
        /** 模板id */
        id: number;
    }

    /** 短信模板的数据结构 */
    class ModalSendSmsData {
        listRecord: Array < RecordSmsData > ;
        listModel: Array < ModelSmsData > ;
        constructor() {}
    }

    /** 获取测试数据 */
    let getTestData = (): ModalSendSmsData => {
        let modelModalSendSms = new ModalSendSmsData();
        modelModalSendSms.listModel = [];
        let model1 = new ModelSmsData();
        model1.id = 1;
        model1.content = '恭喜发财！';
        let model2 = new ModelSmsData();
        model2.id = 2;
        model2.content = '身体健康！';
        modelModalSendSms.listModel.push(model1);
        modelModalSendSms.listModel.push(model2);
        modelModalSendSms.listRecord = [];
        let record1 = new RecordSmsData();
        record1.dateTime = "2017-11-01 14 : 34";
        record1.record = "您是否换了电话";
        record1.recordType = 1;
        let record2 = new RecordSmsData();
        record2.dateTime = "2017-11-03 13：25";
        record2.record =
            "客户表示家人在光大证券做的，要求转去支持，客户不想多个账户，要全部转走后来因为升位，没有转走，挽留客户给了0.6的费率优惠，安抚客户";
        record2.recordType = 2;
        let record3 = new RecordSmsData();
        record3.dateTime = "2017-11-04 13：25";
        record3.record = "好哇";
        record3.recordType = 1;
        modelModalSendSms.listRecord.push(record1);
        modelModalSendSms.listRecord.push(record2);
        modelModalSendSms.listRecord.push(record3);

        return modelModalSendSms;
    };

    /** 配置数据 */
    let configData = {
        /** 客户数据 */
        initData: new ModalSendSmsData(),
        /** 短信记录的html */
        htmlRecord: "",
        /** 短信模板的html */
        htmlModel: "",
        /** modal的html */
        htmlModal: "",
        /** modal的元素节点 */
        modalNode: new Modal("", ""),
        /** 短信内容输入框 */
        textarea: document.getElementById('textarea_sms_content') as HTMLInputElement
    };

    /** 初始化发送短信的modal弹出层，每个客户都不一样，搜索不同客户需要重新调用 */
    export let init = () => {
        removeModalNode();
        getInitData();
    };

    /** 获取客户数据 */
    let getInitData = () => {
        let url = "https://api.aichallenger.com:9080/tcapp/hq/zx.do?code=000001.1";
        $.ajax({
            type: "get",
            url: url,
            dataType: "jsonp",
            contentType: "application/json",
            success: function (rsp) {
                let initData = getTestData();
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

    /** 添加modal的html节点 */
    let addModalNode = () => {
        createModalHtml();
        document.body.insertAdjacentHTML("beforeend", configData.htmlModal);
        configData.textarea = document.getElementById('textarea_sms_content') as HTMLInputElement;
        configData.initData.listRecord.forEach(record => {
            AddRecordHtml(record);
        });
        configData.initData.listModel.forEach(model => {
            AddModelHtml(model);
        });
        modal_create_sms_model.init(configData.initData.listModel.length);
        let modal = new Modal("modal_send_sms", "mask1");
        configData.modalNode = modal;
    };

    /** 删除modal的html节点 */
    let removeModalNode = () => {
        configData.modalNode.removeSelf();
    };

    /** 绑定事件 */
    let bindEvent = () => {
        $("#sms_record").slimScroll({
            height: "215px;",
            start: "bottom"
        });
        let btnSendSms = document.getElementById("btn_send_sms");
        if (btnSendSms !== null) {
            btnSendSms.onclick = () => {
                configData.textarea.value = '';
                btnConfirmSendSms.addClass('disabled');
                configData.modalNode.show();
                let smsRecordContainer = document.getElementById('sms_record');
                if (smsRecordContainer !== null && smsRecordContainer.children.length > 0) {
                    smsRecordContainer.children[smsRecordContainer.children.length - 1].scrollIntoView();
                }
            };
        }

        let btnConfirmSendSms = $('#btn_confirm_send_sms');
        btnConfirmSendSms.on('click', () => {
            let value = configData.textarea.value.trim();
            if (value.length > 0 && value.length <= 63) {
                // TODO 提交发送
            } else {
                return;
            }
        })

        let leftWordCountSmsContent = $('#left_word_count_sms_content')[0];

        configData.textarea.oninput = () => {
            let value = configData.textarea.value.trim();
            if (value.length > 0 && value.length <= 63) {
                btnConfirmSendSms.removeClass('disabled');
            } else {
                btnConfirmSendSms.addClass('disabled');
            }
            leftWordCountSmsContent.innerText = (63 - value.length).toString();
        }
    };

    /** 创建短信记录的html */
    let createRecordHtml = (record: RecordSmsData): string => {
        let html = '';
        if (record.recordType === 1) {
            html = [
                '<div class="record-1">',
                "    <p>" + record.dateTime + "</p>",
                "    <div>" + record.record + "</div>",
                "</div>"
            ].join("");
        } else if (record.recordType === 2) {
            html = [
                '<div class="record-2">',
                "    <p>" + record.dateTime + "</p>",
                "    <div>" + record.record + "</div>",
                "</div>"
            ].join("");
        }
        return html;
    };

    /** 创建短信模板的html */
    let createModelHtml = (model: ModelSmsData): string => {
        let html = [
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

    /** 创建整个modal的html */
    let createModalHtml = () => {
        let html = [
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

    /** 添加短信记录的html */
    export let AddRecordHtml = (record: RecordSmsData) => {
        let container = document.getElementById('sms_record');
        if (container !== null) {
            let html = createRecordHtml(record);
            container.insertAdjacentHTML('beforeend', html);
        }
    }

    /** 添加短信模板的html */
    export let AddModelHtml = (model: ModelSmsData) => {
        let container = document.getElementById('model_container_sms');
        if (container !== null) {
            let html = createModelHtml(model);
            container.insertAdjacentHTML('beforeend', html);
            let rowModel = $(container).find('#sms_model_' + model.id);
            rowModel.find('.icon-close').on('click', () => {
                // TODO 提交删除
                postRemoveModel(model, rowModel);
            });
        }
    }

    /** 添加配置数据的短信模板数据 */
    export let AddModelData = (model: ModelSmsData) => {
        configData.initData.listModel.push(model);
    }

    /** 删除短信模板 */
    let postRemoveModel = (model: ModelSmsData, rowModel: JQuery<HTMLElement>) => {
        // TODO ajax
        // let url = '';
        // $.ajax({
        //     type: "POST",
        //     url: url,
        //     data: JSON.stringify(model),
        //     dataType: "json",
        //     contentType: "application/json; charset=utf-8",
        //     success: function (rsp) {
        //         for(let i = 0; i < configData.initData.listModel.length; i++) {
        //             if(configData.initData.listModel[i].id === model.id) {
        //                 configData.initData.listModel.splice(i, 1);
        //                 modal_create_sms_model.addExistModelCount(-1);
        //                 break;
        //             }
        //         }
        //         rowModel.remove();
        //     },
        //     error: function (xmlHttpRequest, textStatus, errorThrown) {
        //         console.info(xmlHttpRequest.status);
        //         console.info(xmlHttpRequest.readyState);
        //         console.info(textStatus);
        //         console.info(errorThrown);
        //     }
        // });

        
        for(let i = 0; i < configData.initData.listModel.length; i++) {
            if(configData.initData.listModel[i].id === model.id) {
                configData.initData.listModel.splice(i, 1);
                modal_create_sms_model.addExistModelCount(-1);
                break;
            }
        }
        rowModel.remove();
    }


}

namespace modal_create_sms_model {

    /** 配置数据 */
    let configData = {
        /** modal的html */
        htmlModal: '',
        /** modal alert的html */
        htmlModalAlert: '',
        /** modal的元素节点 */
        modalNode: new Modal('', ''),
        /** modal alert的元素节点 */
        modalAlertNode: new Modal('', ''),
        /** 已存在的短信模板数量 */
        existModelCount: 0,
        /** 创建短信模板的输入框 */
        textarea: document.getElementById('textarea_sms_model') as HTMLInputElement
    }

    /** 初始化创建短信模板的弹出层 */
    export let init = (existModelCount: number ) => {
        addExistModelCount(existModelCount);
        removeModalNode();
        addModalNode();
        bindEvent();
    }

    /** 累加短信模板的数量值 */
    export let addExistModelCount = (count: number) => {
        configData.existModelCount = configData.existModelCount + count;
    }

    /** 添加modal的html节点 */
    let addModalNode = () => {
        createModalHtml();
        document.body.insertAdjacentHTML("beforeend", configData.htmlModal);
        let modal = new Modal("modal_create_sms_model", "mask2");
        configData.modalNode = modal;
        configData.textarea = document.getElementById('textarea_sms_model') as HTMLInputElement;

        createModalAlert();
        document.body.insertAdjacentHTML("beforeend", configData.htmlModalAlert);
        let alert = new Modal('modal_alert1', 'mask2');
        configData.modalAlertNode = alert;
    };

    /** 删除modal的html节点 */
    let removeModalNode = () => {
        configData.modalNode.removeSelf();
        configData.modalAlertNode.removeSelf();
    };

    /** 绑定事件 */
    let bindEvent = () => {

        let btnCreateSmsModel = $('#btn_create_sms_model');
        btnCreateSmsModel.on('click', () => {
            if (configData.existModelCount < 5) {
                configData.textarea.value = '';
                btnSaveCreateSmsModel.addClass('disabled');
                configData.modalNode.show();
            } else {
                configData.modalAlertNode.show();
            }
        })

        let btnSaveCreateSmsModel = $('#btn_save_create_sms_model');
        btnSaveCreateSmsModel.on('click', () => {
            let value = configData.textarea.value.trim();
            if (checkWordCount(value)) {
                // TODO 提交创建
                postSmsModel(value);
            } else {
                return;
            }
        })

        let leftWordCountSmsModel = $('#left_word_count_sms_model')[0];

        configData.textarea.oninput = () => {
            let value = configData.textarea.value.trim();
            if (checkWordCount(value)) {
                btnSaveCreateSmsModel.removeClass('disabled');
            } else {
                btnSaveCreateSmsModel.addClass('disabled');
            }
            leftWordCountSmsModel.innerText = (63 - value.length).toString();
        }
    };

    /** 创建弹出层的html */
    let createModalHtml = () => {
        let html = [
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

    /** 创建弹出层提示的html */
    let createModalAlert = () => {
        let html = [
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
    }

    /** 检查字数 */
    let checkWordCount = (value: string): boolean => {
        if (value.length > 0 && value.length <= 63) {
            return true;
        } else {
            return false;
        }
    }

    /** 提交短信模板 */
    let postSmsModel = (model: string) => {
        // TODO ajax
        // let url = '';
        // $.ajax({
        //     type: "POST",
        //     url: url,
        //     data: JSON.stringify(model),
        //     dataType: "json",
        //     contentType: "application/json; charset=utf-8",
        //     success: function (rsp) {
        //         configData.listExistModel.push(model);
        //         modal_send_sms.AddModelHtml(model);
        //         configData.modalNode.hide();
        //     },
        //     error: function (xmlHttpRequest, textStatus, errorThrown) {
        //         console.info(xmlHttpRequest.status);
        //         console.info(xmlHttpRequest.readyState);
        //         console.info(textStatus);
        //         console.info(errorThrown);
        //     }
        // });

        configData.existModelCount = configData.existModelCount + 1;
        var modelData = {content: model, id: new Date().getTime()};
        modal_send_sms.AddModelData(modelData);
        modal_send_sms.AddModelHtml(modelData);
        configData.modalNode.hide();
    }
}