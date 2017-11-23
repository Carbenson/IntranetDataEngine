"use strict";
var KeyValuePair = /** @class */ (function () {
    function KeyValuePair() {
    }
    return KeyValuePair;
}());
var LineChartData = /** @class */ (function () {
    function LineChartData() {
        this.listData = new Array();
    }
    return LineChartData;
}());
var drawLineChart_Profit = function (containerId, data) {
    var options = {
        "xAxis": [{
                "type": "category",
                "categories": data.listDate,
                "index": 0,
                "isX": true,
                "labels": {
                    "style": {
                        "color": "#6E819B",
                        "fontSize": "12px"
                    }
                },
                "tickInterval": (data.listData[0].value.length - data.listData[0].value.length % 4) / 4,
                "tickLength": 0
            }],
        "series": [{
                "data": data.listData[0].value,
                "_colorIndex": 0,
                "_symbolIndex": 0
            },
            {
                "data": data.listData[1].value,
                "_colorIndex": 1,
                "_symbolIndex": 1
            },
        ],
        "yAxis": {
            "title": {
                "text": ""
            },
            "index": 0,
            "gridLineDashStyle": "Solid",
            "gridLineColor": "#C6CFD6",
            "labels": {
                "format": '{value}%',
                "style": {
                    "color": "#6E819B",
                    "fontSize": "12px"
                }
            }
        },
        "chart": {
            "style": {
                "fontFamily": "HelveticaNeue"
            },
            "type": "spline",
            "backgroundColor": 'rgba(0,0,0,0)'
        },
        "title": {
            "text": "",
            "x": -20
        },
        "subtitle": {
            "text": "",
            "x": -20
        },
        "tooltip": {
            "enabled": false
        },
        "legend": {
            "enabled": false
        },
        "plotOptions": {
            "series": {
                "enableMouseTracking": false,
                "animation": false,
                "marker": {
                    "enabled": false,
                    "states": {
                        "hover": {
                            "enabled": false
                        }
                    }
                },
                "lineWidth": 1
            }
        },
        "colors": [
            "#FF841B",
            "#00A5FF"
        ],
        "credits": {
            "enabled": false
        },
        "exporting": {
            "buttons": {
                "contextButton": {
                    "enabled": false
                }
            }
        }
    };
    var chart = new Highcharts.Chart(containerId, options);
};
var drawLineChart_Assets = function (containerId, data) {
    var options = {
        "xAxis": [{
                "type": "category",
                "categories": data.listDate,
                "index": 0,
                "isX": true,
                "labels": {
                    "style": {
                        "color": "#6E819B",
                        "fontSize": "12px"
                    }
                },
                "tickInterval": (data.listData[0].value.length - data.listData[0].value.length % 4) / 4,
                "tickLength": 0
            }],
        "series": [{
                "data": data.listData[0].value,
                "_colorIndex": 0,
                "_symbolIndex": 0
            }
        ],
        "yAxis": {
            "title": {
                "text": ""
            },
            "index": 0,
            "gridLineDashStyle": "Solid",
            "gridLineColor": "#C6CFD6",
            "labels": {
                "format": '{value}',
                "style": {
                    "color": "#6E819B",
                    "fontSize": "12px"
                }
            }
        },
        "chart": {
            "style": {
                "fontFamily": "HelveticaNeue"
            },
            "type": "spline",
            "backgroundColor": 'rgba(0,0,0,0)'
        },
        "title": {
            "text": "",
            "x": -20
        },
        "subtitle": {
            "text": "",
            "x": -20
        },
        "tooltip": {
            "enabled": false
        },
        "legend": {
            "enabled": false
        },
        "plotOptions": {
            "series": {
                "enableMouseTracking": false,
                "animation": false,
                "marker": {
                    "enabled": false,
                    "states": {
                        "hover": {
                            "enabled": false
                        }
                    }
                },
                "lineWidth": 1
            }
        },
        "colors": [
            "#FF841B",
            "#00A5FF"
        ],
        "credits": {
            "enabled": false
        },
        "exporting": {
            "buttons": {
                "contextButton": {
                    "enabled": false
                }
            }
        }
    };
    var chart = new Highcharts.Chart(containerId, options);
};
var renderLineChart = function () {
    var listDate = ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06', '01-07', '01-08', '01-09', '01-10',
        '01-11', '01-12', '01-13', '01-14', '01-15', '01-16', '01-17', '01-18', '01-19', '01-20'];
    var kv1 = new KeyValuePair();
    var kv2 = new KeyValuePair();
    kv1.key = '111';
    kv2.key = '222';
    kv1.value = [0, 3, 2, 4, 7, 6, 4, 5, 9, 15, 14, 13, 12, 14, 17, 16, 14, 15, 19, 15];
    kv2.value = [0, 2, 4, 3, 6, 3, 2, 3, 4, 6, 10, 12, 14, 13, 16, 13, 12, 13, 14, 16];
    var lineChartData = new LineChartData();
    lineChartData.listDate = listDate;
    lineChartData.listData.push(kv1);
    lineChartData.listData.push(kv2);
    drawLineChart_Profit('line_chart_tab411', lineChartData);
    drawLineChart_Assets('line_chart_tab412', lineChartData);
    drawLineChart_Profit('line_chart_tab511', lineChartData);
    drawLineChart_Assets('line_chart_tab512', lineChartData);
};
renderLineChart();
//# sourceMappingURL=drawHighCharts.js.map