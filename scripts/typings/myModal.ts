namespace MyModals {

    /** modal的模板类 */
    class Modal {
        private modal: HTMLElement;
        private mask: HTMLElement;

        /** modal的模板类构造函数
         * @param  {string} modalId modal的id
         * @param  {string} maskId 与modal同时出现的遮罩层的id
         */
        constructor(modalId: string, maskId: string) {
            if (modalId === '' || maskId === '') {
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
                console.error('can not find modalId = ' + modalId);
                return;
            }
            let targetMask = document.getElementById(maskId);
            if (targetMask !== null) {
                this.mask = targetMask;
            } else {
                console.error('can not find maskId = ' + maskId);
                return;
            }
        }

        show() {
            this.mask.style.display = 'block';
            this.modal.style.display = 'block';
        }

        hide() {
            this.modal.style.display = 'none';
            this.mask.style.display = 'none';
        }

        /** 删除自身 */
        removeSelf() {
            if (this.modal !== undefined) {
                this.modal.remove();
            }
        }
    }

    /** 发送短信的弹出层 */
    export namespace modal_send_sms {

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
        export class ModelSmsData {
            /** 短信模板 */
            content: string;
            /** 模板id */
            id: number;
        }

        /** 短信模板的数据结构 */
        class ModalSendSmsData {
            /** 短信记录列表 */
            listRecord: Array < RecordSmsData > ;
            /** 短信模板列表 */
            listModel: Array < ModelSmsData > ;
            constructor() {
                this.listRecord = [];
                this.listModel = [];
            }
        }

        /** 获取测试数据
         * @returns ModalSendSmsData 测试数据
         */
        let getTestData = (): ModalSendSmsData => {
            let testModalSendSmsData = new ModalSendSmsData();

            let model1 = new ModelSmsData();
            model1.id = 1;
            model1.content = '恭喜发财！';
            let model2 = new ModelSmsData();
            model2.id = 2;
            model2.content = '身体健康！';
            testModalSendSmsData.listModel.push(model1);
            testModalSendSmsData.listModel.push(model2);

            let record1 = new RecordSmsData();
            record1.dateTime = '2017-11-01 14 : 34';
            record1.record = '您是否换了电话';
            record1.recordType = 1;
            let record2 = new RecordSmsData();
            record2.dateTime = '2017-11-03 13：25';
            record2.record =
                '客户表示家人在光大证券做的，要求转去支持，客户不想多个账户，要全部转走后来因为升位，没有转走，挽留客户给了0.6的费率优惠，安抚客户';
            record2.recordType = 2;
            let record3 = new RecordSmsData();
            record3.dateTime = '2017-11-04 13：25';
            record3.record = '好哇';
            record3.recordType = 1;
            testModalSendSmsData.listRecord.push(record1);
            testModalSendSmsData.listRecord.push(record2);
            testModalSendSmsData.listRecord.push(record3);

            return testModalSendSmsData;
        };

        /** 配置数据 */
        let configData = {
            /** 客户数据 */
            initData: new ModalSendSmsData(),
            /** modal的html */
            htmlModal: '',
            /** modal的元素节点 */
            modalNode: new Modal('', ''),
            /** 短信内容输入框 */
            textarea: document.getElementById('textarea_sms_content') as HTMLInputElement,
            /** 发送短信按钮 */
            btnConfirmSendSms: $('#btn_confirm_send_sms'),
            /** 剩余字数提示 */
            spanLeftWordCount: $('#left_word_count_sms_content')[0],
            /** 短信记录容器 */
            divContainerSmsRecord: $('#sms_record')[0],
            /** 短信模板容器 */
            divContainerSmsModel: $('#model_container_sms')[0],
        };

        /** 初始化发送短信的modal弹出层，每个客户都不一样，搜索不同客户需要重新调用 */
        export let init = () => {
            removeModalNode();
            getInitData();
        };

        /** 获取客户数据 */
        let getInitData = () => {
            // let url = '';
            // $.ajax({
            //     type: 'get',
            //     url: url,
            //     dataType: 'jsonp',
            //     contentType: 'application/json',
            //     success: function (rsp) {
            //         let initData = getTestData();
            //         configData.initData = initData;
            //         addModalNode();
            //         bindEvent();
            //     },
            //     error: function (xmlHttpRequest, textStatus, errorThrown) {
            //         console.info(xmlHttpRequest.status);
            //         console.info(xmlHttpRequest.readyState);
            //         console.info(textStatus);
            //         console.info(errorThrown);
            //     }
            // });

            let initData = getTestData();
            configData.initData = initData;
            addModalNode();
            bindEvent();
        };

        /** 添加modal的html节点 */
        let addModalNode = () => {
            createModalHtml();
            document.body.insertAdjacentHTML('beforeend', configData.htmlModal);
            configData.divContainerSmsRecord = $('#sms_record')[0];
            $(configData.divContainerSmsRecord).slimScroll({
                height: '215px;',
                start: 'bottom'
            });
            configData.textarea = document.getElementById('textarea_sms_content') as HTMLInputElement;
            configData.divContainerSmsModel = $('#model_container_sms')[0];

            addRecordHtml(configData.initData.listRecord);
            addModelHtml(configData.initData.listModel);
            modal_create_sms_model.init(configData.initData.listModel.length);
            let modal = new Modal('modal_send_sms', 'mask1');
            configData.modalNode = modal;
        };

        /** 删除modal的html节点 */
        let removeModalNode = () => {
            configData.modalNode.removeSelf();
        };

        /** 事件绑定 */
        let bindEvent = () => {
            let btnSendSms = document.getElementById('btn_send_sms');
            if (btnSendSms !== null) {
                btnSendSms.onclick = () => {
                    configData.textarea.value = '';
                    checkWordCount();
                    configData.modalNode.show();
                    scrollRecordToEnd();
                };
            }

            configData.btnConfirmSendSms = $('#btn_confirm_send_sms');
            configData.btnConfirmSendSms.on('click', () => {
                let value = configData.textarea.value.trim();
                if (value.length > 0 && value.length <= 63) {
                    let record = new RecordSmsData();
                    record.record = value;
                    record.recordType = 2;
                    record.dateTime = new Date().toLocaleString();
                    postSendSms(record);
                } else {
                    return;
                }
            })

            configData.spanLeftWordCount = $('#left_word_count_sms_content')[0];

            configData.textarea.oninput = () => {
                checkWordCount();
            }
        };

        /** 短信记录滚动到最下面 */
        let scrollRecordToEnd = () => {
            configData.divContainerSmsRecord.scrollHeight
            $(configData.divContainerSmsRecord).slimScroll({
                scrollTo: configData.divContainerSmsRecord.scrollHeight + 'px'
            });
        }

        /** 检查字数 */
        let checkWordCount = () => {
            let value = configData.textarea.value.trim();
            if (value.length > 0 && value.length <= 63) {
                configData.btnConfirmSendSms.removeClass('disabled');
            } else {
                configData.btnConfirmSendSms.addClass('disabled');
            }
            configData.spanLeftWordCount.innerText = (63 - value.length).toString();
        }

        /** 创建短信记录的html
         * @param  {RecordSmsData|Array<RecordSmsData>} record 短信记录数据
         * @returns string 单条短信记录的html
         */
        let createRecordHtml = (record: RecordSmsData | Array < RecordSmsData > ): string => {
            if (record instanceof RecordSmsData) {
                let html = '';
                if (record.recordType === 1) {
                    html = [
                        '<div class="record-1">',
                        '    <p>' + record.dateTime + '</p>',
                        '    <div>' + record.record + '</div>',
                        '</div>'
                    ].join('');
                } else if (record.recordType === 2) {
                    html = [
                        '<div class="record-2">',
                        '    <p>' + record.dateTime + '</p>',
                        '    <div>' + record.record + '</div>',
                        '</div>'
                    ].join('');
                }
                return html;
            } else {
                let html = '';
                record.forEach(r => {
                    html += createRecordHtml(r);
                });
                return html;
            }

        };

        /** 创建短信模板的html
         * @param  {ModelSmsData|Array<ModelSmsData>} model 短信模板数据
         * @returns string 单条短信模板的html
         */
        let createModelHtml = (model: ModelSmsData | Array < ModelSmsData > ): string => {
            if (model instanceof ModelSmsData) {
                let html = [
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
            } else {
                let html = '';
                model.forEach(m => {
                    html += createModelHtml(m);
                });
                return html;
            }

        };

        /** 创建整个modal的html */
        let createModalHtml = () => {
            let html = [
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

        /** 添加短信记录的html
         * @param  {RecordSmsData|Array<RecordSmsData>} record 短信记录数据
         */
        export let addRecordHtml = (record: RecordSmsData | Array < RecordSmsData > ) => {
            let html = createRecordHtml(record);
            configData.divContainerSmsRecord.insertAdjacentHTML('beforeend', html);
        }

        /** 添加短信模板的html
         * @param  {ModelSmsData|Array<ModelSmsData>} model 短信模板数据
         */
        export let addModelHtml = (model: ModelSmsData | Array < ModelSmsData > ) => {
            let html = createModelHtml(model);
            configData.divContainerSmsModel.insertAdjacentHTML('beforeend', html);
            if (model instanceof ModelSmsData) {
                bindModelEvent(model);
            } else {
                model.forEach(m => {
                    bindModelEvent(m);
                });
            }
        }

        /** 为短信模板绑定事件
         * @param  {ModelSmsData} model 短信模板数据
         */
        let bindModelEvent = (model: ModelSmsData) => {
            let rowModel = $(configData.divContainerSmsModel).find('#sms_model_' + model.id)[0];
            let modelContent = $(rowModel).find('.model-sms');
            modelContent.data('data', model);
            modelContent.on('click', () => {
                let data: ModelSmsData = modelContent.data('data');
                configData.textarea.value = data.content;
                checkWordCount();
            });
            $(rowModel).find('.icon-close').on('click', () => {
                postRemoveModel(model, rowModel);
            });
        }

        /** 添加配置数据的短信模板数据
         * @param  {ModelSmsData} model 短信模板数据
         */
        export let addModelData = (model: ModelSmsData) => {
            configData.initData.listModel.push(model);
        }

        /** 删除短信模板
         * @param  {ModelSmsData} model 要删除的短信模板数据
         * @param  {HTMLElement} rowModel 要删除的短信模板的html元素节点
         */
        let postRemoveModel = (model: ModelSmsData, rowModel: HTMLElement) => {
            // TODO ajax
            // let url = '';
            // $.ajax({
            //     type: 'POST',
            //     url: url,
            //     data: JSON.stringify(model),
            //     dataType: 'json',
            //     contentType: 'application/json; charset=utf-8',
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


            for (let i = 0; i < configData.initData.listModel.length; i++) {
                if (configData.initData.listModel[i].id === model.id) {
                    configData.initData.listModel.splice(i, 1);
                    modal_create_sms_model.addExistModelCount(-1);
                    break;
                }
            }
            rowModel.remove();
        }


        /** 发送短信
         * @param  {RecordSmsData} record 发送的短信记录数据
         */
        let postSendSms = (record: RecordSmsData) => {
            // TODO ajax
            // let url = '';
            // $.ajax({
            //     type: 'POST',
            //     url: url,
            //     data: JSON.stringify(record),
            //     dataType: 'json',
            //     contentType: 'application/json; charset=utf-8',
            //     success: function (rsp) {
            //     },
            //     error: function (xmlHttpRequest, textStatus, errorThrown) {
            //         console.info(xmlHttpRequest.status);
            //         console.info(xmlHttpRequest.readyState);
            //         console.info(textStatus);
            //         console.info(errorThrown);
            //     }
            // });

            addRecordHtml(record);
            scrollRecordToEnd();
            configData.textarea.value = '';
            checkWordCount();
        }

    }

    /** 创建短信模板的弹出层 */
    export namespace modal_create_sms_model {

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
            textarea: document.getElementById('textarea_sms_model') as HTMLInputElement,
            /** 保存创建短信模板按钮 */
            btnSaveCreateSmsModel: $('#btn_save_create_sms_model'),
            /** 剩余字数提示 */
            spanLeftWordCount: $('#left_word_count_sms_model')[0]
        }


        /**  初始化创建短信模板的弹出层
         * @param  {number} existModelCount 已存在的短信模板数量
         */
        export let init = (existModelCount: number) => {
            addExistModelCount(existModelCount);
            removeModalNode();
            addModalNode();
            bindEvent();
        }


        /** 累加短信模板的数量值
         * @param  {number} count 增加的短信模板数量
         */
        export let addExistModelCount = (count: number) => {
            configData.existModelCount = configData.existModelCount + count;
        }

        /** 添加modal的html节点 */
        let addModalNode = () => {
            createModalHtml();
            document.body.insertAdjacentHTML('beforeend', configData.htmlModal);
            let modal = new Modal('modal_create_sms_model', 'mask2');
            configData.modalNode = modal;
            configData.textarea = document.getElementById('textarea_sms_model') as HTMLInputElement;

            createModalAlert();
            document.body.insertAdjacentHTML('beforeend', configData.htmlModalAlert);
            let alert = new Modal('modal_alert1', 'mask2');
            configData.modalAlertNode = alert;
        };

        /** 删除modal的html节点 */
        let removeModalNode = () => {
            configData.modalNode.removeSelf();
            configData.modalAlertNode.removeSelf();
        };

        /** 事件绑定 */
        let bindEvent = () => {

            let btnCreateSmsModel = $('#btn_create_sms_model');
            btnCreateSmsModel.on('click', () => {
                if (configData.existModelCount < 5) {
                    configData.textarea.value = '';
                    checkWordCount();
                    configData.modalNode.show();
                } else {
                    configData.modalAlertNode.show();
                }
            })

            configData.btnSaveCreateSmsModel = $('#btn_save_create_sms_model');
            configData.btnSaveCreateSmsModel.on('click', () => {
                let value = configData.textarea.value.trim();
                if (value.length > 0 && value.length <= 63) {
                    postSaveModel(value);
                } else {
                    return;
                }
            })

            configData.spanLeftWordCount = $('#left_word_count_sms_model')[0];

            configData.textarea.oninput = () => {
                checkWordCount();
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
            ].join('');
            configData.htmlModalAlert = html;
        }

        /** 检查字数 */
        let checkWordCount = () => {
            let value = configData.textarea.value.trim();
            if (value.length > 0 && value.length <= 63) {
                configData.btnSaveCreateSmsModel.removeClass('disabled');
            } else {
                configData.btnSaveCreateSmsModel.addClass('disabled');
            }
            configData.spanLeftWordCount.innerText = (63 - value.length).toString();
        }


        /** 提交短信模板
         * @param  {string} model 短信模板内容
         */
        let postSaveModel = (model: string) => {
            // TODO ajax
            // let url = '';
            // $.ajax({
            //     type: 'POST',
            //     url: url,
            //     data: JSON.stringify(model),
            //     dataType: 'json',
            //     contentType: 'application/json; charset=utf-8',
            //     success: function (rsp) {
            //     },
            //     error: function (xmlHttpRequest, textStatus, errorThrown) {
            //         console.info(xmlHttpRequest.status);
            //         console.info(xmlHttpRequest.readyState);
            //         console.info(textStatus);
            //         console.info(errorThrown);
            //     }
            // });

            configData.existModelCount = configData.existModelCount + 1;
            let modelData = new modal_send_sms.ModelSmsData();
            modelData.id = new Date().getTime();
            modelData.content = model;
            modal_send_sms.addModelData(modelData);
            modal_send_sms.addModelHtml(modelData);
            configData.modalNode.hide();
        }
    }

    /** 创建备注模板的弹出层 */
    export namespace modal_create_remark_model {
        /** 配置数据 */
        let configData = {
            /** 弹出层的元素节点 */
            modalNode: new Modal('', ''),
            /** 弹出提示出的元素节点 */
            modalAlertNode: new Modal('', ''),
            /** 创建备注模板的输入框 */
            textarea: document.getElementById('textarea_sms_model') as HTMLInputElement,
            /** 保存创建备注模板的按钮 */
            btnSaveCreateRemarkModel: $('#btn_save_create_remark_model'),
            /** 剩余字数提示 */
            spanLeftWordCount: $('#left_word_count_remark_model')[0],
            /** 已有的备注模板数量 */
            existModelCount: 0
        };

        /** 初始化创建备注模板的弹出层
         * @param  {number} existModelCount 已存在的备注模板数量
         */
        export let init = (existModelCount: number) => {
            addExistModelCount(existModelCount);
            removeModalNode();
            addModalNode();
            bindEvent();
        }

        /** 累加短信模板的数量值
         * @param  {number} count 要增加的备注模板数量
         */
        export let addExistModelCount = (count: number) => {
            configData.existModelCount = configData.existModelCount + count;
        }

        /** 删除modal的html节点 */
        let removeModalNode = () => {
            configData.modalNode.removeSelf();
            configData.modalAlertNode.removeSelf();
        };

        /** 添加modal的html节点 */
        let addModalNode = () => {
            let htmlModal = createModalHtml();
            document.body.insertAdjacentHTML('beforeend', htmlModal);
            let modal = new Modal('modal_create_remark_model', 'mask1');
            configData.modalNode = modal;
            configData.textarea = document.getElementById('textarea_remark_model') as HTMLInputElement;

            let htmlAlert = createModalAlertHtml();
            document.body.insertAdjacentHTML('beforeend', htmlAlert);
            let alert = new Modal('modal_alert2', 'mask1');
            configData.modalAlertNode = alert;
        };

        /** 事件绑定 */
        let bindEvent = () => {
            let btnCreateRemarkModel = $('#btn_create_remark_model');
            btnCreateRemarkModel.on('click', () => {
                if (configData.existModelCount < 5) {
                    configData.textarea.value = '';
                    checkWordCount();
                    configData.modalNode.show();
                } else {
                    configData.modalAlertNode.show();
                }
            })

            configData.btnSaveCreateRemarkModel = $('#btn_save_create_remark_model');
            configData.btnSaveCreateRemarkModel.on('click', () => {
                let value = configData.textarea.value.trim();
                if (value.length > 0 && value.length <= 30) {
                    postSaveModel(value);
                } else {
                    return;
                }
            })

            configData.spanLeftWordCount = $('#left_word_count_remark_model')[0];

            configData.textarea.oninput = () => {
                checkWordCount();
            }
        }

        /** 创建弹出层的html */
        let createModalHtml = (): string => {
            let html = [
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
        }

        /** 创建弹出层提示的html */
        let createModalAlertHtml = (): string => {
            let html = [
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
        }

        /** 检查字数 */
        let checkWordCount = () => {
            let value = configData.textarea.value.trim();
            if (value.length > 0 && value.length <= 30) {
                configData.btnSaveCreateRemarkModel.removeClass('disabled');
            } else {
                configData.btnSaveCreateRemarkModel.addClass('disabled');
            }
            configData.spanLeftWordCount.innerText = (30 - value.length).toString();
        }

        /** 提交备注模板
         * @param  {string} model 备注模板内容
         */
        let postSaveModel = (model: string) => {
            // TODO ajax
            // let url = '';
            // $.ajax({
            //     type: 'POST',
            //     url: url,
            //     data: JSON.stringify(model),
            //     dataType: 'json',
            //     contentType: 'application/json; charset=utf-8',
            //     success: function (rsp) {
            //     },
            //     error: function (xmlHttpRequest, textStatus, errorThrown) {
            //         console.info(xmlHttpRequest.status);
            //         console.info(xmlHttpRequest.readyState);
            //         console.info(textStatus);
            //         console.info(errorThrown);
            //     }
            // });

            configData.existModelCount = configData.existModelCount + 1;
            let modelData = new customer_selector.TabRemark.ModelRemarkData();
            modelData.id = new Date().getTime();
            modelData.remark = model;
            customer_selector.TabRemark.addModelData(modelData);
            customer_selector.TabRemark.addModelHtml(modelData);
            configData.modalNode.hide();
        }
    }

    /** 创建模拟配置方案记录的弹出层 */
    export namespace modal_create_suggest_record {
        /** 配置数据 */
        let configData = {
            /** 弹出层的元素节点 */
            modalNode: new Modal('', ''),
            /** 创建模拟配置方案记录的输入框 */
            inputStockCode: document.getElementById('input_suggest_stockcode') as HTMLInputElement,
        }

        /** 初始化 */
        export let init = () => {
            removeModalNode();
            addModalNode();
            bindEvent();
        }

        /** 删除modal的html节点 */
        let removeModalNode = () => {
            configData.modalNode.removeSelf();
        };


        /** 添加modal的html节点 */
        let addModalNode = () => {
            let htmlModal = createModalHtml();
            document.body.insertAdjacentHTML('beforeend', htmlModal);
            let modal = new Modal('modal_create_suggest_record', 'mask1');
            configData.modalNode = modal;
            configData.inputStockCode = document.getElementById('input_suggest_stockcode') as HTMLInputElement;

        };

        /** 事件绑定 */
        let bindEvent = () => {
            let btnCreateRemarkModel = $('#btn_create_suggest_record');
            btnCreateRemarkModel.on('click', () => {
                configData.modalNode.show();
            })

        }

        /** 创建弹出层的html */
        let createModalHtml = (): string => {
            let html = [
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
                '                <button id="btn_confirm_open_position" type="button" class="btn disabled" style="margin-right: 10px;">确定</button>',
                '            </div>',
                '            <div class="col-50">',
                '                <button id="btn_cancel_open_position" type="button" class="btn close-modal" style="margin-left: 10px;">取消</button>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</div>'
            ].join("");
            return html;
        }
    }
}