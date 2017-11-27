class KeyValuePair < TK, TV > {
    key: TK;
    value: TV;
}

class LineChartData {
    listDate: Array < string > ;
    listData: Array < KeyValuePair < string, Array < number >> > ;

    constructor() {
        this.listData = new Array < KeyValuePair < string, Array < number >> > ();
    }
}

const drawLineChart_Profit = (containerId: string, data: LineChartData) => {
    let options = {
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
            "tickInterval":  (data.listData[0].value.length - data.listData[0].value.length%4)/4,
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
    }

    let chart = new Highcharts.Chart(containerId, options);
}

const drawLineChart_Assets = (containerId: string, data: LineChartData) => {
    let options = {
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
            "tickInterval":  (data.listData[0].value.length - data.listData[0].value.length%4)/4,
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
    }

    let chart = new Highcharts.Chart(containerId, options);
}
let renderLineChart = () => {
    let listDate = ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06', '01-07', '01-08', '01-09', '01-10',
                    '01-11', '01-12', '01-13', '01-14', '01-15', '01-16', '01-17', '01-18', '01-19', '01-20',
                    '01-21', '01-22', '01-23', '01-24', '01-25', '01-26', '01-27', '01-28', '01-29', '01-30',
                    '02-01', '02-02', '02-03', '02-04', '02-05', '02-06', '02-07', '02-08', '02-09', '02-10',
                    '02-11', '02-12', '02-13', '02-14', '02-15', '02-16', '02-17', '02-18', '02-19', '02-20',

                    '02-21', '02-22', '02-23', '02-24', '02-25', '02-26', '02-27', '02-28', '02-29', '02-30',
                    '03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07', '03-08', '03-09', '03-10',
                    '03-11', '03-12', '03-13', '03-14', '03-15', '03-16', '03-17', '03-18', '03-19', '03-20',
                    '03-21', '03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28', '03-29', '03-30',
                    '04-01', '04-02', '04-03', '04-04', '04-05', '04-06', '04-07', '04-08', '04-09', '04-10'];
    let kv1 = new KeyValuePair < string, Array < number >> ();
    let kv2 = new KeyValuePair < string, Array < number >> ();
    kv1.key = '111';
    kv2.key = '222';
    kv1.value = [0, 3, 2, 4, 7, 6, 4, 5, 9, 15, 14, 13, 12, 14, 17, 16, 14, 15, 19, 15,
        0, 3, 2, 4, 7, 6, 4, 5, 9, 15, 14, 13, 12, 14, 17, 16, 14, 15, 19, 15,
        0, 3, 2, 4, 7, 6, 4, 5, 9, 15, 14, 13, 12, 14, 17, 16, 14, 15, 19, 15,
        0, 3, 2, 4, 7, 6, 4, 5, 9, 15, 14, 13, 12, 14, 17, 16, 14, 15, 19, 15,
        0, 3, 2, 4, 7, 6, 4, 5, 9, 15, 14, 13, 12, 14, 17, 16, 14, 15, 19, 15];
    kv2.value = [0, 2, 4, 3, 6, 3, 2, 3, 4, 6, 10, 12, 14, 13, 16, 13, 12, 13, 14, 16,
        0, 2, 4, 3, 6, 3, 2, 3, 4, 6, 10, 12, 14, 13, 16, 13, 12, 13, 14, 16,
        0, 2, 4, 3, 6, 3, 2, 3, 4, 6, 10, 12, 14, 13, 16, 13, 12, 13, 14, 16,
        0, 2, 4, 3, 6, 3, 2, 3, 4, 6, 10, 12, 14, 13, 16, 13, 12, 13, 14, 16,
        0, 2, 4, 3, 6, 3, 2, 3, 4, 6, 10, 12, 14, 13, 16, 13, 12, 13, 14, 16];
    let lineChartData = new LineChartData();
    lineChartData.listDate = listDate;
    lineChartData.listData.push(kv1);
    lineChartData.listData.push(kv2);
    
    
    drawLineChart_Profit('line_chart_tab411', lineChartData);
    drawLineChart_Assets('line_chart_tab412', lineChartData);

    drawLineChart_Profit('line_chart_tab511', lineChartData);
    drawLineChart_Assets('line_chart_tab512', lineChartData);
}

renderLineChart();