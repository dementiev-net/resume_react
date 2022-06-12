import React, {useCallback, useContext, useEffect} from 'react'
import {Context} from '../../context/context'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import {useHttp} from '../../hooks/http.hook'
import IconRemove from '../../icon/Remove'

export const Graph = () => {

    const {state, dispatch, graphRangeRef} = useContext(Context)
    const {get, loading, error} = useHttp()

    const loadData = useCallback(async () => {
        if (state.settings.graphs.length !== 0) {
            let graphArray = state.graph.data
            for (let i = 0; i < state.settings.graphs.length; i++) {
                // проверим есть ли данные в кеше
                const obj = state.graph.cache.find(item => item.assetId === state.settings.graphs[i].assetId)
                if (obj !== undefined) {
                    break
                }
                try {
                    const response = await get(`${process.env.REACT_APP_URL_GET_CHART}&ASSET=${state.settings.graphs[i].assetId}&CUR=${state.settings.currency}`)
                    graphArray.push({
                        assetId: state.settings.graphs[i].assetId,
                        code: state.settings.graphs[i].code,
                        quotes: response.quotes
                    })
                } catch (e) {
                    console.error(e)
                    return false
                }
            }
            dispatch({
                type: 'SET_GRAPHS',
                payload: graphArray
            })
        }
    }, [get])

    // первая загрузка страницы
    useEffect(() => {
        loadData()
    }, [loadData])

    // клик удаляет график
    const handlerDelete = (id) => {
        dispatch({
            type: 'DELETE_GRAPH',
            payload: id
        })
    }

    // клик удаляет все графики
    const handlerDeleteAll = () => {
        dispatch({type: 'DELETE_GRAPHS'})
    }

    if (loading) return <h4>Загрузка....</h4>
    if (!state.graph.data.length) return <h4>Данных для графика нет!</h4>

    const stockOptions = {
        chart: {
            height: '600px'
        },
        colors: window.GRAPH_COLOR,
        xAxis: {
            events: {
                setExtremes(e) {
                    graphRangeRef.current = [e.min, e.max]
                }
            },
            min: graphRangeRef.current[0],
            max: graphRangeRef.current[1]
        },
        yAxis: {
            labels: {
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        rangeSelector: {
            selected: (!graphRangeRef.current[0] && !graphRangeRef.current[1]) ? 2 : undefined,
            buttons: [{
                type: 'week',
                count: 1,
                text: '1н'
            }, {
                type: 'week',
                count: 2,
                text: '2н'
            }, {
                type: 'week',
                count: 3,
                text: '3н'
            }, {
                type: 'month',
                count: 1,
                text: '1м'
            }, {
                type: 'month',
                count: 2,
                text: '2м'
            }, {
                type: 'month',
                count: 3,
                text: '3м'
            }, {
                type: 'month',
                count: 6,
                text: '6м'
            }, {
                type: 'ytd',
                text: 'YTD'
            }, {
                type: 'year',
                count: 1,
                text: '1г'
            }, {
                type: 'all',
                text: 'Все'
            }],
        },
        navigator: {
            maskFill: 'rgba(0, 0, 0, 0.2)',
            series: {
                type: 'areaspline',
                color: '#555',
                fillColor: '#EEEEEE'
            }
        },
        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true,
                compareStart: true
            }
        },
        tooltip: {
            crosshairs: [true, false],
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true
        },
        series: state.graph.data.map((item, i) => {
            return {name: item.code, data: item.quotes, color: window.GRAPH_COLOR[i]}
        })
    }

    return (
        <div className='graph-container'>
            <div className='graph-item'>
                <IconRemove width={20}
                            fill='black'
                            style={{cursor: 'pointer'}}
                            onClick={handlerDeleteAll}
                />
                <br/><br/>
                {state.graph.data.map((item, index) =>
                    <div key={index}>
                        <div>
                            <IconRemove width={12}
                                        fill='black'
                                        style={{cursor: 'pointer'}}
                                        onClick={() => handlerDelete(item.assetId)}
                            />
                            &nbsp;&nbsp;
                            <strong style={{color: window.GRAPH_COLOR[index]}}>{item.code}</strong>
                        </div>
                    </div>
                )}
            </div>
            <div className='graph-graph'>
                <div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        constructorType={'stockChart'}
                        options={stockOptions}
                    />
                </div>
            </div>
        </div>
    )
}