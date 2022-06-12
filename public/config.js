window.FIELDS = [
    {code: 'screener_assets_id'	,hide: true												},
    {code: 'color'		,align: 'left'	,filter: 'color'	,sort: 'text'		,dir: 'asc'	,width: '15px'			,label: 'Цв'			},
    {code: 'code'		,align: 'left'	,filter: 'search'	,sort: 'text'		,dir: 'asc'	,width: '45px'			,label: 'code'			},
    {code: 'name'		,align: 'left'	,filter: 'search'	,sort: 'text'		,dir: 'asc'	,width: '110px'			,label: 'name'			},
    {code: 'class'		,align: 'left'	,filter: 'list'	,sort: 'text'		,dir: 'asc'	,width: '50px'			,label: 'class'			},
    {code: 'category'		,align: 'left'	,filter: 'list'	,sort: 'text'		,dir: 'asc'	,width: '90px'			,label: 'category'			},
    {code: 'LX'		,align: 'left'	,filter: 'list'	,sort: 'text'		,dir: 'asc'	,width: '28px'			,label: 'LX'			},
    {code: 'assets'		,align: 'right'	,filter: 'morethan'	,sort: 'num'		,dir: 'asc'	,width: '45px'			,label: 'assets'		,fmt: 'fmtCardinal'	},
    {code: 'quantity'		,align: 'right'	,filter: 'notzero'	,sort: 'num'		,dir: 'asc'	,width: '47px'			,label: 'Кол-во'		,fmt: 'fmtCardinal'	},
    {code: 'tbl_pfprice'		,align: 'right'	,filter: 'notzero'	,sort: 'num'		,dir: 'asc'	,width: '48px'	,bgcolor: 'BurlyWood'		,label: 'Бал.'	,sublabel: 'цена'	,fmt: 'fmtCurrency'	},
    {code: 'cost'		,align: 'right'	,filter: 'notzero'	,sort: 'num'		,dir: 'asc'	,width: '47px'			,label: 'Бал.'	,sublabel: 'стоим.'	,fmt: 'fmtCardinal'	},
    {code: 'volume'		,align: 'right'	,filter: 'notzero'	,sort: 'num'		,dir: 'asc'	,width: '47px'			,label: 'Тек.'	,sublabel: 'стоим.'	,fmt: 'fmtCardinal'	},
    {code: 'profit'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'asc'	,width: '47px'			,label: 'Тек.'	,sublabel: 'приб'	,fmt: 'fmtCardinal'	},
    {code: 'yield'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '45px'		,framecolor: 'Navy'	,label: 'Тек.'	,sublabel: 'приб %'	,fmt: 'fmtCurrency'	},
    {code: 'delta'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'asc'	,width: '47px'			,label: 'Дельта'		,fmt: 'fmtCardinal'	},
    {code: 'isin'		,align: 'right'	,filter: 'search'	,sort: 'text'		,dir: 'asc'	,width: '30px'	,bgcolor: 'SkyBlue'		,label: 'ISIN'			},
    {code: 'd1'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'd1'	,sublabel: '25/12'	,fmt: 'fmtCurrency'	},
    {code: 'd5'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'd5'	,sublabel: '21/12'	,fmt: 'fmtCurrency'	},
    {code: 'd15'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'd15'	,sublabel: '07/12'	,fmt: 'fmtCurrency'	},
    {code: 'd1m'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'd1m'	,sublabel: '27/11'	,fmt: 'fmtCurrency'	},
    {code: 'd6m'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'd6m'	,sublabel: '26/06'	,fmt: 'fmtCurrency'	},
    {code: 'd1y'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'd1y'	,sublabel: '27/12'	,fmt: 'fmtCurrency'	},
    {code: 'ytd'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'YTD'			},
    {code: 'cmnt'		,align: 'left'	,filter: 'search'	,sort: 'text'		,dir: 'asc'	,width: '40px'			,label: 'Прим.'			},
    {code: 'nd1'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'nd1'	,sublabel: '28/12'	,fmt: 'fmtCurrency'	},
    {code: 'nd7'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'nd7'	,sublabel: '18/12'	,fmt: 'fmtCurrency'	},
    {code: 'nd8'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'nd8'	,sublabel: '17/12'	,fmt: 'fmtCurrency'	},
    {code: 'nd9'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'nd9'	,sublabel: '16/12'	,fmt: 'fmtCurrency'	},
    {code: 'nd5'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'nd5'	,sublabel: '22/12'	,fmt: 'fmtCurrency'	},
    {code: 'nd10'		,align: 'right'		,sort: 'num'	,heatmap: true	,dir: 'desc'	,width: '37px'			,label: 'nd10'	,sublabel: '15/12'	,fmt: 'fmtCurrency'	},
    {code: 'src'		,align: 'left'	,filter: 'list'	,sort: 'text'		,dir: 'asc'	,width: '37px'			,label: 'Ист.'			},
];

window.VIEWS = [
    {
        code: 1,
        viewname: 'ВСЕ',
        fields: []
    }
    ,
    {
        code: 2,
        viewname: 'Кратко',
        fields: [
            {code:'class',hide: true},
            {code:'category',hide: true},
            {code:'LX',hide: true},
            {code:'assets',hide: true},
            {code:'er',hide: true},
            {code:'nd1',hide: true},
            {code:'nd2',hide: true},
            {code:'nd3',hide: true},
            {code:'nd4',hide: true},
            {code:'nd5',hide: true},
            {code:'nd6',hide: true},
            {code:'nd7',hide: true},
            {code:'nd8',hide: true},
            {code:'nd9',hide: true},
            {code:'nd10',hide: true}
        ]
    }
    ,
    {
        code: 3,
        viewname: 'Как было',
        fields: [
            {code:'nd6',hide: true},
            {code:'nd7',hide: true},
            {code:'nd8',hide: true},
            {code:'nd9',hide: true},
            {code:'nd10',hide: true},
            {code: 'pfdiv',hide: true},
            {code: 'pfdtdiv',hide: true},
            {code: 'pfstop_loss',hide: true},
            {code: 'pfdt_stop_loss',hide: true},
            {code: 'price_stop_loss',hide: true},
            {code: 'delta_div',hide: true},
            {code: 'delta_div_profit',hide: true},
            {code: 'yield_y_delta_div',hide: true}
        ]
    }
    ,
    {
        code: 4,
        viewname: '10 дней',
        fields: [
            {code:'class',hide: true},
            {code:'category',hide: true},
            {code:'LX',hide: true},
            {code:'assets',hide: true},
            {code:'er',hide: true},
            {code:'div_Y',hide: true}
        ]
    }
];

window.DETAIL_FIELDS = [[
    {code: 'screener_assets_id'	,hide: true				}],[
    {code: 'dt_buy'		,label: 'Дата покупки'	,align: 'right'	,fmt: 'shortDate'	},
    {code: 'firstadate'		,label: 'Дата первой покупки'	,align: 'right'	,fmt: 'shortDate'	},
    {code: 'quantity'		,label: 'Количество бумаг'	,align: 'right'	,fmt: 'fmtCardinal'	},
    {code: 'cost'		,label: 'Балансовая стоимость'	,align: 'right'	,fmt: 'fmtCurrency'	},
    {code: 'pfprice'		,label: 'Цена покупки'	,align: 'right'	,fmt: 'fmtCurrency'	},
    {code: 'pfcurrency'		,label: 'Валюта покупки'	,align: 'right'		},
    {code: 'price_cur'		,label: 'Текущая котировка'	,align: 'right'	,fmt: 'fmtCurrency'	},
    {code: 'dtprice'		,label: 'Дата котировки'	,align: 'right'	,fmt: 'shortDate'	},
    {code: 'quote_cur'		,label: 'Валюта котировки'	,align: 'right'		},
    {code: 'volume'		,label: 'Текущая стоимость'	,align: 'right'	,fmt: 'fmtCurrency'	},
    {code: 'profit'		,label: 'Незафиксированная прибыль'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'yield'		,label: 'Незафиксированная прибыль %'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'yield_y'		,label: 'Незафиксированная прибыль % годовых'	,align: 'right'	,fmt: 'fmtColorCurrency'	}],[
    {code: 'vgdailyvolume'		,label: 'Дневной оборот'	,align: 'right'	,fmt: 'fmtCurrency'	},
    {code: 'er'		,label: 'Комиссия'	,align: 'right'		},
    {code: 'div_act'		,label: 'div_act'	,align: 'right'		},
    {code: 'div_Y'		,label: 'div_Y'	,align: 'right'		},
    {code: 'frec'		,label: 'Частота выплат'	,align: 'right'		},
    {code: 'div'		,label: 'div'	,align: 'right'		},
    {code: 'divdate'		,label: 'divdate'	,align: 'right'		},
    {code: 'standarddeviation'		,label: 'standarddeviation'	,align: 'right'		},
    {code: 'inverse'		,label: 'inverse'	,align: 'right'		},
    {code: 'currencyhedged'		,label: 'currencyhedged'	,align: 'right'		}],[
    {code: 'code'		,label: 'code'	,align: 'left'		},
    {code: 'name'		,label: 'name'	,align: 'left'		},
    {code: 'isin'		,label: 'isin'	,align: 'left'		},
    {code: 'class'		,label: 'class'	,align: 'left'		},
    {code: 'category'		,label: 'category'	,align: 'left'		},
    {code: 'LX'		,label: 'LX'	,align: 'right'		},
    {code: 'Y_W'		,label: 'Y_W'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'Y_4W'		,label: 'Y_4W'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'ytd'		,label: 'ytd'	,align: 'right'		},
    {code: 'Y_1Y'		,label: 'Y_1Y'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'Y_3Y'		,label: 'Y_3Y'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'Y_5Y'		,label: 'Y_5Y'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'F_1W'		,label: 'F_1W'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'F_4W'		,label: 'F_4W'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'F_1Y'		,label: 'F_1Y'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'F_3Y'		,label: 'F_3Y'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'F_5Y'		,label: 'F_5Y'	,align: 'right'	,fmt: 'fmtColorCurrency'	}],[
    {code: 'p_e'		,label: 'p_e'	,align: 'right'		},
    {code: 'beta'		,label: 'beta'	,align: 'right'		},
    {code: 'SUM'		,label: 'SUM'	,align: 'right'		},
    {code: 'liquidity'		,label: 'liquidity'	,align: 'right'		},
    {code: 'expenses'		,label: 'expenses'	,align: 'right'		},
    {code: 'performance'		,label: 'performance'	,align: 'right'		},
    {code: 'etfdbpro'		,label: 'etfdbpro'	,align: 'right'		},
    {code: 'concentration'		,label: 'concentration'	,align: 'right'		}],[
    {code: 'issuer'		,label: 'issuer'	,align: 'left'		},
    {code: 'inception'		,label: 'inception'	,align: 'right'		},
    {code: 'ofholdings'		,label: 'ofholdings'	,align: 'right'		},
    {code: 'intop10'		,label: 'intop10'	,align: 'right'		},
    {code: 'intop15'		,label: 'intop15'	,align: 'right'		},
    {code: 'intop50'		,label: 'intop50'	,align: 'right'		},
    {code: 'taxform'		,label: 'taxform'	,align: 'right'		}],[
    {code: 'lowerbollinger'		,label: 'lowerbollinger'	,align: 'right'		},
    {code: 'upperbollinger'		,label: 'upperbollinger'	,align: 'right'		},
    {code: 'support1'		,label: 'support1'	,align: 'right'		},
    {code: 'resistance1'		,label: 'resistance1'	,align: 'right'		},
    {code: 'rsi'		,label: 'rsi'	,align: 'right'		},
    {code: 'esgscore'		,label: 'esgscore'	,align: 'right'		},
    {code: 'sustainableimpactsolutions'		,label: 'sustainableimpactsolutions'	,align: 'right'		},
    {code: 'stcapgains'		,label: 'stcapgains'	,align: 'right'		},
    {code: 'ltcapgains'		,label: 'ltcapgains'	,align: 'right'		}],[
    {code: 'RES'		,label: 'RES'	,align: 'right'		},
    {code: 'dayvolatility5'		,label: 'dayvolatility5'	,align: 'right'		},
    {code: 'dayvolatility20'		,label: 'dayvolatility20'	,align: 'right'		},
    {code: 'dayvolatility50'		,label: 'dayvolatility50'	,align: 'right'		},
    {code: 'dayvolatility200'		,label: 'dayvolatility200'	,align: 'right'		},
    {code: 'esgscorepeerpercentile'		,label: 'esgscorepeerpercentile'	,align: 'right'		},
    {code: 'esgscoreglobalpercentile'		,label: 'esgscoreglobalpercentile'	,align: 'right'		},
    {code: 'carbonintensity'		,label: 'carbonintensity'	,align: 'right'		},
    {code: 'esgexclusioncriteria'		,label: 'esgexclusioncriteria'	,align: 'right'		},
    {code: 'cmnt'		,label: 'cmnt'	,align: 'right'		},
    {code: 'color'		,label: 'color'	,align: 'right'		},
    {code: 'url'		,label: 'ссылка'	,align: 'right'	,fmt: 'fmtURL'	},
    {code: 'src'		,label: 'Источник'	,align: 'left'		}],[
    {code: 'pfdiv'		,label: 'Выплаченные див.'	,align: 'right'	,fmt: 'fmtCurrency'	},
    {code: 'pfdtdiv'		,label: 'Дата последнего див.'	,align: 'right'	,fmt: 'shortDate'	},
    {code: 'pfstop_loss'		,label: 'Цена стоплосс'	,align: 'right'	,fmt: 'fmtCurrency'	},
    {code: 'pfdt_stop_loss'		,label: 'Дата стоплосс'	,align: 'right'	,fmt: 'shortDate'	},
    {code: 'price_stop_loss'		,label: 'Стоплосс  %'	,align: 'right'	,fmt: 'fmtCurrency'	},
    {code: 'delta_div'		,label: 'Дельта+див'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'delta_div_profit'		,label: 'Дельта+див+тек. приб'	,align: 'right'	,fmt: 'fmtColorCurrency'	},
    {code: 'yield_y_delta_div'		,label: 'Годовая походнгость полн'	,align: 'right'	,fmt: 'fmtColorCurrency'	}]
];

window.CURRENCY = [
    {code: 'RUB', name: 'Рубль'},
    {code: 'USD', name: 'Доллар'},
    {code: 'GBP', name: 'Фунт'},
    {code: 'EUR', name: 'Евро'}
];

window.DEFAULT_CURRENCY = 'USD';

window.MIN_GRB_R = 255;
window.MIN_GRB_G = 110;
window.MIN_GRB_B = 60;
window.MAX_GRB_R = 120;
window.MAX_GRB_G = 220;
window.MAX_GRB_B = 120;
window.MIN_COLOR = 0.1;

window.PER_PAGE = 200;


window.MAX_GRAPH_TICKERS = 20;
window.GRAPH_COLOR = ['DarkOrange','Navy','DeepSkyBlue','Gray','Green','Lime','Purple','Maroon','SaddleBrown','Teal','SlateBlue','Red','DeepPink','Olive','SteelBlue','Blue','Indigo','DarkSlateBlue','SandyBrown','Black'];
/*
'#FF0000', '#FF8000', '#FF00FF', '#00FF00', '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FFFF00'];
*/
window.COLORS = [
    '#ffffff',
    '#ffff00',
    '#ff00ff',
    '#ff0000',
    '#fd9334',
    '#d598a0',
    '#b9c5c7',
    '#800000',
    '#7cbdc9',
    '#5d61a2',
    '#00ffff',
    '#00ff00',
    '#008000',
    '#0000ff',
    '#000000'
];
/*
'#b9c5c7', '#a08c7d', '#b3504b', '#7cbdc9', '#d0d0b8', '#afbaa3', '#5d61a2', '#93cdd1', '#a7d0b8', '#dcdcd7', '#d598a0', '#ebc686'
*/
window.PRESETS = [
    {
        "name": "помеченные",
        "filter":
            [
                {"type":"list","column":"color","value":"#ffff00"},
                {"type":"list","column":"color","value":"#ff00ff"},
                {"type":"list","column":"color","value":"#ff0000"},
                {"type":"list","column":"color","value":"#fd9334"},
                {"type":"list","column":"color","value":"#d598a0"},
                {"type":"list","column":"color","value":"#b9c5c7"},
                {"type":"list","column":"color","value":"#800000"},
                {"type":"list","column":"color","value":"#7cbdc9"},
                {"type":"list","column":"color","value":"#5d61a2"},
                {"type":"list","column":"color","value":"#00ffff"},
                {"type":"list","column":"color","value":"#00ff00"},
                {"type":"list","column":"color","value":"#008000"},
                {"type":"list","column":"color","value":"#0000ff"},
                {"type":"list","column":"color","value":"#000000"}
            ]
        ,
        "sort":{"code":"cmnt","dir":"asc","type":"text"}
    },
    {
        "name": "портфель USD",
        "filter":[
            {"type":"notzero","column":"quantity","value":true},
            {"type":"list","column":"pfcurrency","value":"USD"}
        ],
        "sort":{"code":"cmnt","dir":"asc","type":"text"}
    },
    {
        "name": "портфель EUR",
        "filter":[
            {"type":"notzero","column":"quantity","value":true},
            {"type":"list","column":"pfcurrency","value":"EUR"}
        ],
        "sort":{"code":"cmnt","dir":"asc","type":"text"}
    },
    {
        "name": "портфель GBP",
        "filter":[
            {"type":"notzero","column":"quantity","value":true},
            {"type":"list","column":"pfcurrency","value":"GBP"}
        ],
        "sort":{"code":"cmnt","dir":"asc","type":"text"}
    },
    {
        "name": "портфель RUB",
        "filter":[
            {"type":"notzero","column":"quantity","value":true},
            {"type":"list","column":"pfcurrency","value":"RUB"}
        ],
        "sort":{"code":"cmnt","dir":"asc","type":"text"}
    },
    {
        "name": "портфель ВСЁ",
        "filter":[{"type":"notzero","column":"quantity","value":true}],
        "sort":{"code":"cmnt","dir":"asc","type":"text"}
    },
    {
        "name": "лучшие за месяц",
        "filter":[{"type":"list","column":"LX","value":"false"},{"type":"morethan","column":"assets","value":"100"}],
        "sort":{"code":"d1m","dir":"desc","type":"num"}

    }

];

