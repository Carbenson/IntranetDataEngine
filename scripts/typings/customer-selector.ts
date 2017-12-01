namespace customer_selector {

    export let init = () => {

        MyModals.modal_send_sms.init();
        customer_selector.TabRemark.init();
        customer_selector.TabSuggestion.init();


        // document.appendChild( document.createElement(modal_send_sms.configData.htmlModal));

        $('.scroll-content').slimScroll({
            height: 'auto'
        });
        $('.table-content').slimScroll({
            height: 'auto;'
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
        export class ModelRemarkData {
            /** 备注模板id */
            id: number;
            /** 备注模板 */
            remark: string;
        }

        /** 备注记录数据结构 */
        export class RecordRemarkData {
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
            addModelHtml(configData.listRemarkModel);
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
            addRecordHtml(configData.listRemarkRecord);
        }

        /** 事件绑定 */
        let bindEvent = () => {

            $(configData.divContainerRemarkRecord).slimScroll({
                height: '380px;',
                start: 'top'
            });

            $(configData.btnSendRemark).on('click', () => {
                let value = configData.textarea.value.trim();
                if(value.length > 0) {
                    let record = new RecordRemarkData();
                    record.author = '刘德华';
                    record.content = value;
                    record.dateTime = new Date().toLocaleString();
                    postSendRemark(record);
                }
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

        /** 向备注模板容器内添加备注模板html节点
         * @param  {ModelRemarkData|Array<ModelRemarkData>} model 备注模板的数据
         */
        export let addModelHtml = (model: ModelRemarkData | Array < ModelRemarkData > ) => {
            let html = createModelHtml(model);
            configData.divContainerRemarkModel.insertAdjacentHTML('beforeend', html);
            if (model instanceof ModelRemarkData) {
                bindModelEvent(model);
            } else {
                model.forEach(m => {
                    bindModelEvent(m);
                });
            }
        }

        /** 为备注模板绑定事件
         * @param  {ModelRemarkData} model 备注模板的数据
         */
        let bindModelEvent = (model: ModelRemarkData) => {
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

        /** 向备注记录容器内添加备注记录html节点
         * @param  {RecordRemarkData|Array<RecordRemarkData>} record 备注记录的数据
         */
        export let addRecordHtml = (record: RecordRemarkData | Array < RecordRemarkData > ) => {
            let html = createRecordHtml(record);
            configData.divContainerRemarkRecord.insertAdjacentHTML('afterbegin', html);
        }

        /** 创建备注模板的html
         * @param  {ModelRemarkData|Array<ModelRemarkData>} model 备注模板的数据
         * @returns string 备注模板的html
         */
        let createModelHtml = (model: ModelRemarkData | Array < ModelRemarkData > ): string => {
            if (model instanceof ModelRemarkData) {
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
            } else {
                let html = '';
                model.forEach(m => {
                    html += createModelHtml(m);
                });
                return html;
            }

        }

        /** 创建备注记录的html
         * @param  {RecordRemarkData|Array<RecordRemarkData>} record 备注记录的数据
         * @returns string 备注记录的html
         */
        let createRecordHtml = (record: RecordRemarkData | Array < RecordRemarkData > ): string => {
            if (record instanceof RecordRemarkData) {
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
            } else {
                let html = '';
                record.forEach(r => {
                    html += createRecordHtml(r);
                });
                return html;
            }

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

    /** Tab页面 建议方案页面 */
    export namespace TabSuggestion {
        /** 建议方案页面数据结构 */
        class TabSuggestionData {
            /** 模拟配置方案数据链表 */
            listSuggestRecord: Array < SuggestRecordData > ;

            constructor() {
                this.listSuggestRecord = [];
            }
        }

        /** 模拟配置方案记录数据结构 */
        class SuggestRecordData {
            /** 模拟配置方案记录id */
            id: number;
            /** 股票代码 */
            stockCode: string;
            /** 股票名称 */
            stockName: string;
            /** 股票标签 */
            listStockLabel: Array < string > ;
            /** 开仓时间 */
            dateTimeOpen: string;
            /** 平仓时间 */
            dateTimeClose: string | null;
            /** 开仓价格 */
            priceOpen: number;
            /** 平仓价格 */
            priceClose: number | null;
            /** 收益 */
            profit: number;

            profitHighest: number;
        }

        /** 获取测试数据 */
        let getTestData = (): TabSuggestionData => {
            let testTabSuggestionData = new TabSuggestionData();

            let record1 = new SuggestRecordData();
            record1.stockCode = '000333';
            record1.stockName = '美的集团';
            record1.listStockLabel = [];
            record1.dateTimeOpen = '20171130';
            record1.priceOpen = 51.81;
            record1.dateTimeClose = null;
            record1.priceClose = null;
            record1.profit = 10;
            record1.profitHighest = 20;
            let record2 = new SuggestRecordData();
            record2.stockCode = '000651';
            record2.stockName = '格力电器';
            record2.listStockLabel = [];
            record2.dateTimeOpen = '20171129';
            record2.priceOpen = 44.28;
            record2.dateTimeClose = '20171130';
            record2.priceClose = 42.45;
            record2.profit = -10;
            record2.profitHighest = 2;
            let record3 = new SuggestRecordData();
            record3.stockCode = '000333';
            record3.stockName = '美的集团';
            record3.listStockLabel = [];
            record3.dateTimeOpen = '20171128';
            record3.priceOpen = 51.81;
            record3.dateTimeClose = null;
            record3.priceClose = null;
            record3.profit = 10;
            record3.profitHighest = 20;
            let record4 = new SuggestRecordData();
            record4.stockCode = '000651';
            record4.stockName = '格力电器';
            record4.listStockLabel = [];
            record4.dateTimeOpen = '20171127';
            record4.priceOpen = 44.28;
            record4.dateTimeClose = '20171130';
            record4.priceClose = 42.45;
            record4.profit = -10;
            record4.profitHighest = 2;
            let record5 = new SuggestRecordData();
            record5.stockCode = '000333';
            record5.stockName = '美的集团';
            record5.listStockLabel = [];
            record5.dateTimeOpen = '20171126';
            record5.priceOpen = 51.81;
            record5.dateTimeClose = null;
            record5.priceClose = null;
            record5.profit = 10;
            record5.profitHighest = 20;
            let record6 = new SuggestRecordData();
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
        }

        /** 配置数据 */
        let configData = {
            /** 模拟配置方案记录的容器 */
            divContainerSuggestRecord: $('#suggest_record')[0],
            /** 模拟配置方案记录的数据链表 */
            listSuggestRecord: [] as Array<SuggestRecordData>,
        }

        /** 初始化Tab页面的建议方案页面 */
        export let init = () => {
            MyModals.modal_create_suggest_record.init();

            configData.divContainerSuggestRecord = $('#suggest_record')[0];
            
            clearRecordHtml();

            getSuggestRecord();

            bindEvent();
        }

        /** 获取模拟配置方案记录数据 */
        let getSuggestRecord = () => {
            // TODO ajax
            // let url = '';
            // $.ajax({
            //     type: "get",
            //     url: url,
            //     dataType: "jsonp",
            //     contentType: "application/json",
            //     success: function (rsp) {
            //     },
            //     error: function (xmlHttpRequest, textStatus, errorThrown) {
            //         console.info(xmlHttpRequest.status);
            //         console.info(xmlHttpRequest.readyState);
            //         console.info(textStatus);
            //         console.info(errorThrown);
            //     }
            // });
            let testData = getTestData();
            configData.listSuggestRecord = testData.listSuggestRecord;
            addRecordHtml(configData.listSuggestRecord);
        }

        /** 事件绑定 */
        let bindEvent = () => {
            $(configData.divContainerSuggestRecord).slimScroll({
                height: '370px;',
                start: 'top'
            });

        }

        /** 清空模拟配置方案记录的所有记录html节点 */
        let clearRecordHtml = () => {
            configData.divContainerSuggestRecord.innerHTML = '';
        }

        /** 向模拟配置方案记录容器内添加记录html节点
         * @param  {SuggestRecordData|Array<SuggestRecordData>} record 模拟配置方案记录数据
         */
        let addRecordHtml = (record: SuggestRecordData | Array < SuggestRecordData > ) => {
            let html = createRecordHtml(record);
            configData.divContainerSuggestRecord.insertAdjacentHTML('afterbegin', html);
        }

        /** 创建模拟配置方案记录的html
         * @param  {SuggestRecordData|Array<SuggestRecordData>} record 模拟配置方案记录数据
         * @returns string 模拟配置方案记录的html
         */
        let createRecordHtml = (record: SuggestRecordData | Array < SuggestRecordData > ): string => {
            if (record instanceof SuggestRecordData) {
                let dateTimeClose = record.dateTimeClose === null ? '' : record.dateTimeClose;
                let priceClose = record.priceClose === null ? '' : record.priceClose;
                let colorProfit = record.profit >= 0 ? 'red' : 'green';
                let colorProfitHighest = record.profitHighest >= 0 ? 'red' : 'green';
                let html = [
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
            } else {
                let html = '';
                record.forEach(r => {
                    html += createRecordHtml(r);
                });
                return html;

            }
        }

    }
}