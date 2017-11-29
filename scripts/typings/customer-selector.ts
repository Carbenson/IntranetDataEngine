namespace customer_selector {

    export let init = () => {

        MyModals.modal_send_sms.init();
        customer_selector.TabRemark.init();


        // document.appendChild( document.createElement(modal_send_sms.configData.htmlModal));

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

    /** Tab页面 备注页面 */
    export namespace TabRemark {

        /** 备注页面数据结构 */
        class TabRemarkData {
            /** 备注模板列表 */
            listRemarkModel: Array < ModelRemarkData > ;
            /** 备注记录列表 */
            listRemarkRecord: Array < RecordRemarkData > ;

            constructor() {
                this.listRemarkModel = [];
                this.listRemarkRecord = [];
            }
        }

        /** 备注模板数据结构 */
        class ModelRemarkData {
            /** 备注模板id */
            id: number;
            /** 备注模板 */
            remark: string;
        }

        /** 备注记录数据结构 */
        class RecordRemarkData {
            /** 备注记录内容 */
            content: string;
            /** 备注记录时间 */
            dateTime: string;
            /** 备注记录作者 */
            author: string;
        }

        /** 获取测试数据 */
        let getTestData = (): TabRemarkData => {
            let testTabRemarkData = new TabRemarkData();

            let remark1 = new ModelRemarkData();
            remark1.id = 1;
            remark1.remark = '大吉大利！';
            let remark2 = new ModelRemarkData();
            remark2.id = 2;
            remark2.remark = '电话无人接听';
            let remark3 = new ModelRemarkData();
            remark3.id = 3;
            remark3.remark = '大吉大利！';
            let remark4 = new ModelRemarkData();
            remark4.id = 4;
            remark4.remark = '电话无人接听';
            let remark5 = new ModelRemarkData();
            remark5.id = 5;
            remark5.remark = '大吉大利！';

            testTabRemarkData.listRemarkModel.push(remark1);
            testTabRemarkData.listRemarkModel.push(remark2);
            testTabRemarkData.listRemarkModel.push(remark3);
            testTabRemarkData.listRemarkModel.push(remark4);
            testTabRemarkData.listRemarkModel.push(remark5);

            let record1 = new RecordRemarkData();
            record1.author = '吴彦祖';
            record1.dateTime = '2017-11-10';
            record1.content = '客户比我还帅。';
            let record2 = new RecordRemarkData();
            record2.author = '刘德华';
            record2.dateTime = '2017-11-19';
            record2.content = '客户比我还帅。';
            let record3 = new RecordRemarkData();
            record3.author = '欧阳震华';
            record3.dateTime = '2017-11-27';
            record3.content = '客户比我还帅。客户比我还帅。客户比我还帅。客户比我还帅。客户比我还帅。客户比我还帅。客户比我还帅。';
            let record4 = new RecordRemarkData();
            record4.author = '吴彦祖';
            record4.dateTime = '2017-11-28';
            record4.content = '客户比我还帅。';
            let record5 = new RecordRemarkData();
            record5.author = '吴彦祖';
            record5.dateTime = '2017-11-29';
            record5.content = '客户比我还帅。';
            testTabRemarkData.listRemarkRecord.push(record1);
            testTabRemarkData.listRemarkRecord.push(record2);
            testTabRemarkData.listRemarkRecord.push(record3);
            testTabRemarkData.listRemarkRecord.push(record4);
            testTabRemarkData.listRemarkRecord.push(record5);

            return testTabRemarkData;
        }

        /** 配置数据 */
        let configData = {
            /** 备注模板的容器html元素节点 */
            divContainerRemarkModel: $('#model_container_remark')[0],
            /** 备注记录的容器html元素节点 */
            divContainerRemarkRecord: $('#remark_record')[0],
            /** 备注模板数据链表 */
            listRemarkModel: [] as Array < ModelRemarkData > ,
            /** 备注记录数据链表 */
            listRemarkRecord: [] as Array < RecordRemarkData > ,
            /** 备注内容输入框 */
            textarea: document.getElementById('textarea_remark_content') as HTMLInputElement,
            /** 提交备注的按钮 */
            btnSendRemark: $('#btn_send_remark')[0]
        };

        /** 初始化Tab页面的备注页面 */
        export let init = () => {
            configData.divContainerRemarkModel = $('#model_container_remark')[0];
            configData.textarea = document.getElementById('textarea_remark_content') as HTMLInputElement;
            configData.btnSendRemark = $('#btn_send_remark')[0];

            clearModelHtml();
            clearRecordHtml();

            getRemarkModel();
            getRemarkRecord();

            bindEvent();
        }

        /** 获取备注模板数据 */
        let getRemarkModel = () => {
            // TODO ajax
            // let url = '';
            // $.ajax({
            //     type: "get",
            //     url: url,
            //     dataType: "jsonp",
            //     contentType: "application/json",
            //     success: function (rsp) {
            //         let testData = getTestData();
            //         configData.listRemarkModel = testData.listRemarkModel;
            //         MyModals.modal_create_remark_model.init(configData.listRemarkModel.length);
            //         configData.listRemarkModel.forEach(model => {
            //             addModelHtml(model);
            //         });
            //     },
            //     error: function (xmlHttpRequest, textStatus, errorThrown) {
            //         console.info(xmlHttpRequest.status);
            //         console.info(xmlHttpRequest.readyState);
            //         console.info(textStatus);
            //         console.info(errorThrown);
            //     }
            // });
            let testData = getTestData();
            configData.listRemarkModel = testData.listRemarkModel;
            MyModals.modal_create_remark_model.init(configData.listRemarkModel.length);
            configData.listRemarkModel.forEach(model => {
                addModelHtml(model);
            });
        }

        /** 获取备注记录数据 */
        let getRemarkRecord = () => {
            // TODO ajax
            // let url = '';
            // $.ajax({
            //     type: "get",
            //     url: url,
            //     dataType: "jsonp",
            //     contentType: "application/json",
            //     success: function (rsp) {
            //         let testData = getTestData();
            //         configData.listRemarkRecord = testData.listRemarkRecord;
            //         configData.listRemarkRecord.forEach(record => {
            //             addRecordHtml(record);
            //         });
            //     },
            //     error: function (xmlHttpRequest, textStatus, errorThrown) {
            //         console.info(xmlHttpRequest.status);
            //         console.info(xmlHttpRequest.readyState);
            //         console.info(textStatus);
            //         console.info(errorThrown);
            //     }
            // });

            let testData = getTestData();
            configData.listRemarkRecord = testData.listRemarkRecord;
            configData.listRemarkRecord.forEach(record => {
                addRecordHtml(record);
            });
        }

        /** 事件绑定 */
        let bindEvent = () => {

            $(configData.divContainerRemarkRecord).slimScroll({
                height: '380px;',
                start: 'top'
            });

            $(configData.btnSendRemark).on('click', () => {
                let value = configData.textarea.value.trim();
                let record = new RecordRemarkData();
                record.author = '刘德华';
                record.content = value;
                record.dateTime = new Date().toLocaleString();
                postSendRemark(record);
            });
        }

        /** 清空备注模板容器内的所有备注模板html节点 */
        let clearModelHtml = () => {
            configData.divContainerRemarkModel.innerHTML = '';
        }

        /** 清空备注记录容器内的所有备注记录html节点 */
        let clearRecordHtml = () => {
            configData.divContainerRemarkRecord.innerHTML = '';
        }

        /** 添加配置数据的备注模板数据
         * @param  {ModelRemarkData} model
         */
        export let addModelData = (model: ModelRemarkData) => {
            configData.listRemarkModel.push(model);
        }

        /** 添加配置数据的备注记录数据
         * @param  {RecordRemarkData} record
         */
        export let addRecordData = (record: RecordRemarkData) => {
            configData.listRemarkRecord.push(record);
        }

        /** 向备注模板容器内添加一个备注模板html节点
         * @param  {ModelRemarkData} model 备注模板的数据
         */
        export let addModelHtml = (model: ModelRemarkData) => {
            let html = createModelHtml(model);
            configData.divContainerRemarkModel.insertAdjacentHTML('beforeend', html);
            let rowModel = $(configData.divContainerRemarkModel).find('#remark_model_' + model.id)[0];
            let modelContent = $(rowModel).find('.model-remark');
            modelContent.data('data', model);
            modelContent.on('click', () => {
                let data: ModelRemarkData = modelContent.data('data');
                configData.textarea.value = data.remark;
            });
            $(rowModel).find('.icon-close').on('click', () => {
                postRemoveModel(model, rowModel);
            });
        }

        /** 向备注记录容器内添加一个备注记录html节点
         * @param  {RecordRemarkData} record 备注记录的数据
         */
        export let addRecordHtml = (record: RecordRemarkData) => {
            let html = createRecordHtml(record);
            configData.divContainerRemarkRecord.insertAdjacentHTML('afterbegin', html);
        }

        /** 创建备注模板的html
         * @param  {ModelRemarkData} model 备注模板的数据
         * @returns string 备注模板的html
         */
        let createModelHtml = (model: ModelRemarkData): string => {
            let html = [
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

        /** 创建备注记录的html
         * @param  {RecordRemarkData} record 备注记录的数据
         * @returns string 备注记录的html
         */
        let createRecordHtml = (record: RecordRemarkData): string => {
            let html = [
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

        /** 删除备注模板
         * @param  {ModelRemarkData} model 要删除的备注模板数据
         * @param  {HTMLElement} rowModel 要删除的备注模板的html元素节点
         */
        let postRemoveModel = (model: ModelRemarkData, rowModel: HTMLElement) => {
            // TODO ajax
            // let url = '';
            // $.ajax({
            //     type: 'POST',
            //     url: url,
            //     data: JSON.stringify(model),
            //     dataType: 'json',
            //     contentType: 'application/json; charset=utf-8',
            //     success: function (rsp) {
            //         for (let i = 0; i < configData.listRemarkModel.length; i++) {
            //             if (configData.listRemarkModel[i].id === model.id) {
            //                 configData.listRemarkModel.splice(i, 1);
            //                 MyModals.modal_create_remark_model.addExistModelCount(-1);
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
            for (let i = 0; i < configData.listRemarkModel.length; i++) {
                if (configData.listRemarkModel[i].id === model.id) {
                    configData.listRemarkModel.splice(i, 1);
                    MyModals.modal_create_remark_model.addExistModelCount(-1);
                    break;
                }
            }
            rowModel.remove();
        }

        /** 提交备注信息
         * @param  {RecordRemarkData} record
         */
        let postSendRemark = (record: RecordRemarkData) => {
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
            $(configData.divContainerRemarkRecord).slimScroll({
                scrollTo: '0px'
            });
            configData.textarea.value = '';
        }
    }
}