import React, {useCallback, useContext, useEffect, useState, useRef} from 'react'
import {Context} from '../../context/context'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import {useHttp} from '../../hooks/http.hook'
import {
    fullDate,
    shortDate,
    shortestDate,
    fmtCardinal,
    fmtCurrency,
    fmtColorCardinal,
    fmtColorCurrency,
    fmtURL
} from '../../helpers/format'
import IconHide from '../../icon/Hide'
import IconGraph from '../../icon/Graph'

export const Details = (props) => {

    const {state, dispatch, graphRangeRef} = useContext(Context)
    const {get, post, loading, saving, error} = useHttp()
    const [details, setDetails] = useState({})
    const buttonRef = useRef()
    const pfpriceRef = useRef()
    const deltaRef = useRef()
    const quantityRef = useRef()
    const messageCalcRef = useRef()
    const messageAddRef = useRef()
    const dateRef = useRef()
    const fdateRef = useRef()
    const pfdtdivRef = useRef()
    const pfdtslRef = useRef()
    const btnClick = {
        button: 1
    }
    const loadData = useCallback(async () => {
        try {
            const response = await get(`${process.env.REACT_APP_URL_GET_JSON_DET}`)
            setDetails(response)
        } catch (e) {
            console.error(e)
            return false
        }
    }, [get])

    // первая загрузка страницы
    useEffect(() => {
        loadData()
    }, [loadData])

    // клик сохранения
    const handlerSubmit = async (event) => {
        event.preventDefault()
        buttonRef.current.disabled = true
    }

    // клик добавлния в график
    const handlerAdd = async () => {
        if (state.graph.data.length >= window.MAX_GRAPH_TICKERS) {
            messageAddRef.current.innerHTML = 'Превышено количество тикеров!'
            setTimeout(clear, 2000)
            return false
        }
        if (state.graph.data.find(item => item.assetId === props.assetId) !== undefined) {
            messageAddRef.current.innerHTML = 'Этот тикер уже добавлен!'
            setTimeout(clear, 2000)
            return false
        }
        // проверим есть ли данные в кеше
        const obj = state.graph.cache.find(item => item.assetId === props.assetId)
        if (obj !== undefined) {
            messageAddRef.current.innerHTML = 'Добавлено...'
            setTimeout(clear, 2000)
            dispatch({
                type: 'SET_GRAPH_CACHE',
                payload: {obj}
            })
            return false
        }
        // добавляем из JSON
        try {
            const response = await get(`${process.env.REACT_APP_URL_GET_CHART}&ASSET=${props.assetId}&CUR=${state.settings.currency}`, false)
            dispatch({
                type: 'SET_GRAPH_JSON',
                payload: {response, details, id: props.assetId}
            })
        } catch (e) {
            console.error(e)
            return false
        }
        messageAddRef.current.innerHTML = 'Добавлено...'
        setTimeout(clear, 2000)
    }

    // клик средневзвешеная цена
    const handlerSubmitPrice = (event) => {
        event.preventDefault()
        const quantity = parseInt(details.data.quantity)
        const pfprice = parseFloat(details.data.pfprice)
        const delta = parseFloat(details.data.delta)

        const price_q = parseFloat(event.target.price_q.value.replace(/[,]+/g, '.'))
        const deal_q = parseInt(event.target.deal_q.value)

        let newQuantity
        let newPfprice
        let newDelta

        if (!deal_q || !price_q) {
            messageCalcRef.current.innerHTML = 'Данных нет!'
            setTimeout(clear, 2000)
            return false
        }
        if (deal_q < 0) {
            messageCalcRef.current.innerHTML = 'Отрицательное количество...'
            setTimeout(clear, 2000)
            return false
        }
        if (price_q < 0) {
            messageCalcRef.current.innerHTML = 'Отрицательная цена...'
            setTimeout(clear, 2000)
            return false
        }
        if (btnClick.button === 1) {
            newQuantity = quantity + deal_q
            newPfprice = Math.round(((quantity * pfprice + deal_q * price_q) / (quantity + deal_q)) * 10000) / 10000
            pfpriceRef.current.value = newPfprice
        }
        if (btnClick.button === 2) {
            newQuantity = quantity - deal_q
            newDelta = Math.round((delta + (price_q - pfprice) * deal_q) * 100) / 100
            if (newQuantity === 0) {
                newPfprice = 0
                pfpriceRef.current.value = newPfprice
            }
            deltaRef.current.value = newDelta
        }
        quantityRef.current.value = newQuantity
        buttonRef.current.disabled = false
        messageCalcRef.current.innerHTML = 'Рассчитано...'
        setTimeout(clear, 2000)
    }

    // сбросить сообщения
    const clear = () => {
        if (messageCalcRef.current !== null) messageCalcRef.current.innerHTML = ''
        if (messageAddRef.current !== null) messageAddRef.current.innerHTML = ''
    }

    // сообщение
    const message = (text) => {
        return <tr>
            <td colSpan={100}><h4>{text}</h4></td>
        </tr>
    }

    if (!props.assetId) return null
    if (error) return message(`Ошибка: ${error}`)
    if (loading || !details.data) return message(`Загрузка....`)
    if (window.DETAIL_FIELDS === undefined) message(`Ошибка: Не получили настройки таблицы`)

    // отметка на графике цены
    let plotLines = []
    let plotSeries = [{
        data: details.quotes,
        type: 'line',
        name: details.data.name,
        enableMouseTracking: true
    }]
    // линия и точка цены покупки
    if (parseInt(details.data.quantity) > 0 && details.data.pfprice_cur) {
        plotLines = [{
            color: '#32CD32',
            width: 2,
            value: details.data.pfprice_cur
        }]
        if (parseInt(details.data.quantity) > 0 && details.data.dt_buy) {
            plotSeries.push({
                data: [[Date.parse(details.data.dt_buy), details.data.pfprice_cur]],
                type: 'scatter',
                enableMouseTracking: false
            })
        }
    }
    // линия первой цены
    if (parseInt(details.data.pffirstprice) > 0) {
        plotLines.push({
            color: '#32CD32',
            width: 2,
            dashStyle: 'dash',
            value: details.data.pffirstprice
        })
    }
    // линия стоплосса
    if (parseInt(details.data.pfstop_loss_cur) > 0) {
        plotLines.push({
            color: '#F08080',
            width: 2,
            value: details.data.pfstop_loss_cur
        })
    }

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
        yAxis: [{
            height: '75%',
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: details.data.code
            },
            plotLines: plotLines
        }],
        rangeSelector: {
            selected: (!graphRangeRef.current[0] && !graphRangeRef.current[1]) ? 2 : undefined,
            buttons: [{
                type: 'week',
                count: 1,
                text: '1н',
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
        tooltip: {
            crosshairs: [true, false]
        },
        plotOptions: {
            series: {
                showInNavigator: true
            },
            scatter: {
                cursor: 'pointer',
                marker: {
                    fillColor: '#32CD32',
                    radius: 10
                },
                tooltip: {
                    enabled: false
                }
            }
        },
        series: plotSeries
    }

    return (
        <tr className='details'>
            <td colSpan={100}>
                <br/>
                <div className='details-container'>
                    <div className="details-item">
                        <form onSubmit={handlerSubmit}>
                            <table className='details-form-table'>
                                <tr className='dftr'>
                                    <td className='dftd'>
                                        <IconHide width={20}
                                                  fill={'black'}
                                                  style={{paddingLeft: '10px', cursor: 'pointer'}}
                                                  onClick={props.hide}
                                        />
                                        <span ref={messageAddRef}/>
                                    </td>
                                    <td className='dftd' style={{textAlign: 'right', verticalAlign: 'middle'}}>Цвет</td>
                                    <td className='dftd'>
                                        <input type='color'
                                               name='COLOR'
                                               defaultValue={details.data.color}
                                               list='colorList'
                                               onChange={() => buttonRef.current.disabled = false}
                                        />
                                        <datalist id='colorList'>
                                            {window.COLORS.map((item, index) =>
                                                <option key={index} value={item}/>
                                            )}
                                        </datalist>
                                    </td>
                                </tr>
                                <tr className='dftr'>
                                    <td className='dftd'>Количество</td>
                                    <td className='dftd'>
                                        <input type='number'
                                               name='Q'
                                               style={{width: '60px'}}
                                               defaultValue={details.data.quantity}
                                               onChange={() => buttonRef.current.disabled = false}
                                               ref={quantityRef}
                                        />
                                    </td>
                                    <td className='dftd'>Стоплосс</td>
                                </tr>
                                <tr className='dftr'>
                                    <td className='dftd'>Цена</td>
                                    <td className='dftd'>
                                        <input type='text'
                                               name='P'
                                               style={{width: '100px'}}
                                               defaultValue={details.data.pfprice}
                                               onChange={() => buttonRef.current.disabled = false}
                                               ref={pfpriceRef}
                                        />
                                    </td>
                                    <td className='dftd'>
                                        <input type='text'
                                               name='STOP'
                                               style={{width: '100px'}}
                                               defaultValue={details.data.pfstop_loss_cur}
                                               onChange={() => buttonRef.current.disabled = false}
                                        />
                                    </td>
                                </tr>
                                <tr className='dftr'>
                                    <td className='dftd'>Дата</td>
                                    <td className='dftd'>
                                        <input type='date'
                                               name='DATE'
                                               style={{width: '130px'}}
                                               defaultValue={details.data.dt_buy}
                                               onChange={() => buttonRef.current.disabled = false}
                                               ref={dateRef}
                                        />
                                        <br/>
                                        <a href='#' onClick={() => {
                                            dateRef.current.value = null
                                            buttonRef.current.disabled = false
                                        }}>сбросить</a>
                                    </td>
                                    <td className='dftd'>
                                        <input type='date'
                                               name='DTSTOP'
                                               style={{width: '130px'}}
                                               defaultValue={details.data.pfdt_stop_loss}
                                               onChange={() => buttonRef.current.disabled = false}
                                               ref={pfdtslRef}
                                        />
                                        <br/>
                                        <a href='#' onClick={() => {
                                            pfdtslRef.current.value = null
                                            buttonRef.current.disabled = false
                                        }}>сбросить</a>
                                    </td>
                                </tr>
                                <tr className='dftr'>
                                    <td className='dftd'>Валюта</td>
                                    <td className='dftd'>
                                        <select name='CUR'
                                                defaultValue={details.data.pfcurrency}
                                                onChange={() => buttonRef.current.disabled = false}
                                        >
                                            {window.CURRENCY.map((item, i) =>
                                                <option value={item.code} key={i}>{item.name}</option>
                                            )}
                                        </select>
                                    </td>
                                    <td className='dftd'>&nbsp;</td>
                                </tr>
                                <tr className='dftr'>
                                    <td className='dftd' colSpan={3}>Примечание<br/>
                                        <textarea name='NOTE'
                                                  style={{width: '100%', height: '60px'}}
                                                  defaultValue={details.data.cmnt}
                                                  onChange={() => buttonRef.current.disabled = false}
                                        />
                                    </td>
                                </tr>
                                <tr className='dftr'>
                                    <td className='dftd' colSpan={3}>Первая покупка:</td>
                                </tr>
                                <tr className='dftr'>
                                    <td className='dftd'>Цена<br/>
                                        <input type='text'
                                               name='FPRICE'
                                               style={{width: '100px'}}
                                               defaultValue={details.data.pffirstprice}
                                               onChange={() => buttonRef.current.disabled = false}
                                        />
                                    </td>
                                    <td className='dftd'>Дата<br/>
                                        <input type='date'
                                               name='F'
                                               style={{width: '130px'}}
                                               defaultValue={details.data.firstdate}
                                               onChange={() => buttonRef.current.disabled = false}
                                               ref={fdateRef}
                                        />
                                        <br/>
                                        <a href='#' onClick={() => {
                                            fdateRef.current.value = null
                                            buttonRef.current.disabled = false
                                        }}>сбросить</a>
                                    </td>
                                    <td className='dftd'>Оценка<br/>
                                        <input type='text'
                                               name='M'
                                               style={{width: '100px'}}
                                               defaultValue={details.data.mprice}
                                               onChange={() => buttonRef.current.disabled = false}
                                        />
                                    </td>
                                </tr>
                                <tr className='dftr'>
                                    <td className='dftd'>Дельта<br/>
                                        <input type='text'
                                               name='D'
                                               style={{width: '100px'}}
                                               defaultValue={details.data.delta}
                                               onChange={() => buttonRef.current.disabled = false}
                                               ref={deltaRef}
                                        />
                                    </td>
                                    <td className='dftd'>Дивиденды<br/>
                                        <input type='text'
                                               name='DIV'
                                               style={{width: '100px'}}
                                               defaultValue={details.data.pfdiv_cur}
                                               onChange={() => buttonRef.current.disabled = false}
                                        />
                                    </td>
                                    <td className='dftd'>Див. Дата<br/>
                                        <input type='date'
                                               name='DTDIV'
                                               style={{width: '130px'}}
                                               defaultValue={details.data.pfdtdiv}
                                               onChange={() => buttonRef.current.disabled = false}
                                               ref={pfdtdivRef}
                                        />
                                        <br/>
                                        <a href='#' onClick={() => {
                                            pfdtdivRef.current.value = null
                                            buttonRef.current.disabled = false
                                        }}>сбросить</a>
                                    </td>
                                </tr>
                                <tr className='dftr'>
                                    <td className='dftd'>&nbsp;</td>
                                    <td className='dftd' colSpan={2}>
                                        <p>
                                            <br/>
                                            <input type='submit'
                                                   value='Сохранить'
                                                   className='btn-save'
                                                   disabled={true}
                                                   ref={buttonRef}
                                            /> {saving && <span>&nbsp;Сохранение....</span>}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </form>
                        <br/>
                        <form onSubmit={handlerSubmitPrice}>
                            <table className='details-form-table' style={{width: '100%'}}>
                                <tr className='dftr'>
                                    <td className='dftd' rowSpan={2} style={{width: '110px'}}>Сделка:</td>
                                    <td className='dftd' style={{width: '135px'}}>Количество<br/>
                                        <input type='number'
                                               name='deal_q'
                                               style={{width: '60px'}}
                                        />
                                        <br/>
                                        <br/>
                                        <button onClick={() => (btnClick.button = 1)}
                                                type="submit"
                                        >Buy
                                        </button>
                                    </td>
                                    <td className='dftd'>Цена<br/>
                                        <input type='text'
                                               name='price_q'
                                               style={{width: '100px'}}
                                        />
                                        <br/>
                                        <br/>
                                        <button onClick={() => (btnClick.button = 2)}
                                                type="submit"
                                        >Sell
                                        </button>
                                    </td>
                                </tr>
                                <tr className='dftr'>
                                    <td colSpan={2} className='dftd'>
                                        <span ref={messageCalcRef}/>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="details-item">
                        <div style={{width: '1000px', paddingBottom: '20px'}}>
                            <HighchartsReact
                                highcharts={Highcharts}
                                constructorType={'stockChart'}
                                options={stockOptions}
                            />
                        </div>
                    </div>
                </div>
                <br/>
                <div className='details-container'>
                    {window.DETAIL_FIELDS.map((val, index) => {
                        return (
                            <div key={index}
                                 className='details-item'
                            >
                                <table className='table-detail-data'>
                                    <tbody>
                                    {window.DETAIL_FIELDS[index].map((key, i) => {
                                        // формат ячейки
                                        let val = details.data[key.code]
                                        if (key.fmt === 'fullDate') val = fullDate(details.data[key.code])
                                        if (key.fmt === 'shortDate') val = shortDate(details.data[key.code])
                                        if (key.fmt === 'shortestDate') val = shortestDate(details.data[key.code])
                                        if (key.fmt === 'fmtCardinal') val = fmtCardinal(details.data[key.code])
                                        if (key.fmt === 'fmtCurrency') val = fmtCurrency(details.data[key.code])
                                        if (key.fmt === 'fmtColorCardinal') val = fmtColorCardinal(details.data[key.code])
                                        if (key.fmt === 'fmtColorCurrency') val = fmtColorCurrency(details.data[key.code])
                                        if (key.fmt === 'fmtURL') val = fmtURL(details.data[key.code])
                                        return (
                                            <tr key={i}>
                                                <td><b>{key.label}</b></td>
                                                <td key={key.code + i}
                                                    style={{textAlign: key.align}}
                                                >{val}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>)
                    })}
                </div>
            </td>
        </tr>
    )
}