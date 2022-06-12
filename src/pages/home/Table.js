import React, {useContext, useEffect, useRef, useState} from 'react'
import {Context} from '../../context/context'
import {Error} from '../../components/Error'
import {Details} from './Details'
import {useHistory} from '../../hooks/history.hook'
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
import IconFilter from '../../icon/Filter'
import IconClearFilter from '../../icon/ClearFilter'
import IconClearAllFilters from '../../icon/ClearAllFilters'
import IconUndo from '../../icon/Undo'
import IconRedo from '../../icon/Redo'

export const Table = () => {

    const {state, dispatch} = useContext(Context)
    const {get, loading, error} = useHttp()
    const {history, setHistory, undoHistory, redoHistory, canUndo, canRedo} = useHistory(
        JSON.stringify({filter: state.settings.filter, sort: state.settings.sort})
    )
    const [histclick, setHistclick] = useState(false)
    const [filterVal, setfilterVal] = useState(new Set())
    const [assetId, setAssetId] = useState(0)
    const [rowId, setRowId] = useState(0)
    const defaultFilterRef = useRef()
    let sumCost = 0
    let sumVolume = 0
    let sumProfit = 0
    let sumDelta = 0
    const freePlace = window.MAX_GRAPH_TICKERS - state.graph.data.length

    // история
    useEffect(() => {
        if (histclick) {
            defaultFilterRef.current.selectedIndex = 0
            const saveData = JSON.parse(history)
            if (saveData.sort.code !== undefined) {
                dispatch({
                    type: 'SORT_HISTORY',
                    payload: saveData
                })
            } else {
                dispatch({
                    type: 'SET_SETTINGS',
                    payload: {filter: saveData.filter}
                })
            }
            setHistclick(false)
        }
    }, [history])

    // пагинация
    const changePage = (offset) => {
        dispatch({
            type: 'SET_STATE',
            payload: {
                page: state.page + offset
            }
        })
    }

    // раскраска строк
    const heatmapGetColor = (minmaxArray, value, value_rank, field) => {
        // раскраска по рангу
        if (state.settings.rank === true) {
            if (value_rank > 0) {
                return `rgba(${window.MAX_GRB_R}, ${window.MAX_GRB_G}, ${window.MAX_GRB_B}, ${Math.abs(value_rank).toFixed(1)})`
            }
            if (value_rank < 0) {
                return `rgba(${window.MIN_GRB_R}, ${window.MIN_GRB_G}, ${window.MIN_GRB_B}, ${Math.abs(value_rank).toFixed(1)})`
            }
        } else {
            let transparency = 0
            if (value > 0) {
                if (minmaxArray[field][0] === minmaxArray[field][1]) return `rgba(${window.MAX_GRB_R}, ${window.MAX_GRB_G}, ${window.MAX_GRB_B}, 1)`
                transparency = (value - minmaxArray[field][0]) / (minmaxArray[field][1] - minmaxArray[field][0]) + window.MIN_COLOR
                return `rgba(${window.MAX_GRB_R}, ${window.MAX_GRB_G}, ${window.MAX_GRB_B}, ${transparency.toFixed(1)})`
            }
            if (value < 0) {
                if (minmaxArray[field][3] === minmaxArray[field][2]) return `rgba(${window.MIN_GRB_R}, ${window.MIN_GRB_G}, ${window.MIN_GRB_B}, 1)`
                transparency = (value - minmaxArray[field][3]) / (minmaxArray[field][2] - minmaxArray[field][3]) + window.MIN_COLOR
                return `rgba(${window.MIN_GRB_R}, ${window.MIN_GRB_G}, ${window.MIN_GRB_B}, ${transparency.toFixed(1)})`
            }
        }
        return `rgba(255, 255, 255, 1)`
    }

    // drop-down 'color'
    const dropdownColor = (column) => {
        return (
            <ul>
                {Array.from(filterVal).sort().map((val, index) =>
                    <li key={index}>
                        <input type='checkbox'
                               checked={state.settings.filter.find(ob => ob.column === column && ob.value === val)}
                               onClick={(event) => handlerCheckboxFilter(event, column, val, 'list')}
                        />&nbsp;<label style={{backgroundColor: val}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </li>
                )}
            </ul>
        )
    }

    // drop-down 'list'
    const dropdownList = (column) => {
        if (filterVal.size === 0) return <form>Данных нет...</form>
        return (
            <form>
                <ul>
                    {Array.from(filterVal).sort().map((val, index) =>
                        <li key={index}>
                            <input type='checkbox'
                                   checked={state.settings.filter.find(ob => ob.column === column && ob.value === val)}
                                   onClick={(event) => handlerCheckboxFilter(event, column, val, 'list')}
                            />{val}
                        </li>
                    )}
                </ul>
            </form>
        )
    }

    // drop-down 'search'
    const dropdownSearch = (column) => {
        // значение из state.settings.filter
        let value
        state.settings.filter.find(object => object.column === column ? value = object.value : null)
        return (
            <form onSubmit={(event) => handlerInputFilter(event, column, 'search')}>
                <input type='text'
                       name='val'
                       style={{width: '100px'}}
                       defaultValue={value}
                />
                &nbsp;
                <button
                    onClick={() => {
                        dispatch({
                            type: 'SET_SETTINGS',
                            payload: {
                                filter: [], upload: true, rank: false
                            }
                        })
                        setHistory(JSON.stringify({filter: [], sort: state.settings.sort}))
                    }}>&#8250;</button>
                &nbsp;
                <input type="submit" value="&#187;"/>
                &nbsp;
            </form>
        )
    }

    // drop-down 'morethan'
    const dropdownMoreThan = (column) => {
        // значение из state.settings.filter
        let value
        state.settings.filter.find(object => object.column === column ? value = object.value : null)
        return (
            <form onSubmit={(event) => handlerInputFilter(event, column, 'morethan')}>
                минимум&nbsp;
                <input type='number'
                       name='val'
                       style={{width: '60px'}}
                       defaultValue={value}
                />
                &nbsp;
                <input type="submit" value="&#187;"/>
                &nbsp;
            </form>
        )
    }

    // drop-down 'notzero'
    const dropdownNotZero = (column) => {
        return (
            <form>не ноль&nbsp;
                <input type='checkbox'
                       checked={state.settings.filter.find(ob => ob.column === column && ob.value === true)}
                       onChange={(event) => handlerCheckboxFilter(event, column, true, 'notzero')}
                />
                &nbsp;
            </form>
        )
    }

    // сортировка state.data
    const sortData = (column) => {
        // todo: тут могут быть проблемы с let dir = column.dir (он щас в reducer)
        //let dir = column.dir
        //         if (state.settings.sort.code === column.code) {
        //             dir = (state.settings.sort.dir === 'desc' ? 'asc' : 'desc')
        //         }
        dispatch({
            type: 'SORT_DATA',
            payload: column
        })
        setHistory(JSON.stringify({
            filter: state.settings.filter,
            sort: {code: column.code, dir: column.dir, type: column.sort}
        }))
    }

    // отфильтрованные данные
    const filterData = () => {
        return state.data.filter((value) => {
            return state.settings.filter.length === 0 || state.settings.filter.filter((item) => {
                if (item.type === 'list') return value[item.column] === item.value
                if (item.type === 'search') return value[item.column].toString().toLowerCase().indexOf(item.value.toLowerCase()) >= 0
                if (item.type === 'morethan') return value[item.column] > item.value
                if (item.type === 'notzero') return value[item.column] > 0
            }).length === [...new Set(state.settings.filter.map((givenLocation) => {
                return givenLocation.column
            }))].length
        })
    }

    // формирование theader
    const renderHeader = () => {
        return <tr>
            {state.columns.map((column, index) => {
                if (column.hide !== true) {
                    let hName = column.label
                    if (column.sublabel) hName = <>{column.label}<br/>{column.sublabel}</>
                    return <th key={index + column.code}>
                        <div className='container' style={{width: column.width}}>
                            <div className='label'
                                 id='sort'
                                 onClick={(event) => {
                                     if (event.target.id === 'sort') sortData(column)
                                 }}>{hName}
                            </div>
                            <div className='filter'>
                                {column.filter && <>
                                    <IconFilter
                                        width={15}
                                        style={{cursor: 'pointer'}}
                                        fill={state.settings.filter.find(ob => ob.column === column.code) ? 'red' : 'black'}
                                        onClick={() => {
                                            let _filterVal = new Set()
                                            let lastColumn = state.settings.filter.length !== 0 && state.settings.filter.slice(-1)[0].column
                                            let tempFilter = column.code === lastColumn ? state.settings.filter.filter(ob => ob.column !== lastColumn) : state.settings.filter
                                            state.data.filter((value) => {
                                                return tempFilter.length === 0 || state.settings.filter.find((child) => {
                                                    return child.column === column.code && child.value === value[column.code]
                                                }) || tempFilter.filter((item) => {
                                                    if (item.type === 'list') return value[item.column] === item.value
                                                    if (item.type === 'search') return value[item.column].toString().toLowerCase().indexOf(item.value.toLowerCase()) >= 0
                                                    if (item.type === 'morethan') return value[item.column] > item.value
                                                    if (item.type === 'notzero') return value[item.column] > 0
                                                }).length === [...new Set(tempFilter.map((givenLocation) => {
                                                    return givenLocation.column
                                                }))].length
                                            }).forEach((object) => {
                                                return _filterVal.add(object[column.code])
                                            })
                                            setfilterVal(_filterVal)
                                            dispatch({
                                                type: 'SHOW_FILTER',
                                                payload: index
                                            })
                                        }}
                                    />
                                    <br/>
                                    <IconClearFilter
                                        width={13}
                                        style={{cursor: 'pointer'}}
                                        fill={state.settings.filter.find(ob => ob.column === column.code) ? 'black' : 'gray'}
                                        onClick={() => {
                                            handlerResetRowClick(column.code)
                                        }}
                                    />
                                </>}
                                <span>{state.settings.sort.code === column.code ? state.settings.sort.dir === 'asc' ? '\u25B2' : '\u25BC' : null}</span>
                            </div>
                            {state.show[index] && <div className='drop-down'>
                                <div>{column.filter === 'list' && dropdownList(column.code)}
                                    {column.filter === 'search' && dropdownSearch(column.code)}
                                    {column.filter === 'morethan' && dropdownMoreThan(column.code)}
                                    {column.filter === 'notzero' && dropdownNotZero(column.code)}
                                    {column.filter === 'color' && dropdownColor(column.code)}
                                </div>
                            </div>}
                        </div>
                    </th>
                }
            })}
        </tr>
    }

    // формирование tbody
    const renderBody = () => {
        // массив для min/max
        const minmax = {}
        state.columns.forEach(element => {
            if (element.heatmap === true) minmax[element.code] = [Number.MAX_VALUE, 0, 0, -Number.MAX_VALUE]
        })
        // отфильтрованные данные
        let fData = filterData()
        // вычисляем min/max с учетом фильтра
        fData.map((object, index) => {
            state.columns.map((key, ind) => {
                if (key.heatmap === true) {
                    if (object[key.code] > 0) {
                        if (object[key.code] < minmax[key.code][0]) minmax[key.code][0] = object[key.code]
                        if (object[key.code] > minmax[key.code][1]) minmax[key.code][1] = object[key.code]
                    }
                    if (object[key.code] < 0) {
                        if (object[key.code] < minmax[key.code][2]) minmax[key.code][2] = object[key.code]
                        if (object[key.code] > minmax[key.code][3]) minmax[key.code][3] = object[key.code]
                    }
                }
            })
        })
        // рендер JSX с учетом фильтра
        let body = fData.map((object, index) => {
            // считаем футер
            if (object.cost) sumCost += object.cost
            if (object.volume) sumVolume += object.volume
            if (object.profit) sumProfit += object.profit
            if (object.delta) sumDelta += object.delta
            return (<>
                    <tr key={-index}
                        onDoubleClick={() => setAssetId(object.screener_assets_id)}
                        onClick={() => setRowId(object.screener_assets_id)}
                        className={rowId && rowId === object.screener_assets_id ? 'border' : ''}
                    >
                        {state.columns.map((key, ind) => {
                            // формат ячейки
                            let val = object[key.code]
                            if (key.fmt === 'fullDate') val = fullDate(object[key.code])
                            if (key.fmt === 'shortDate') val = shortDate(object[key.code])
                            if (key.fmt === 'shortestDate') val = shortestDate(object[key.code])
                            if (key.fmt === 'fmtCardinal') val = fmtCardinal(object[key.code])
                            if (key.fmt === 'fmtCurrency') val = fmtCurrency(object[key.code])
                            if (key.fmt === 'fmtColorCardinal') val = fmtColorCardinal(object[key.code])
                            if (key.fmt === 'fmtColorCurrency') val = fmtColorCurrency(object[key.code])
                            if (key.fmt === 'fmtURL') val = fmtURL(object[key.code])
                            // стили
                            let className = ''
                            let styleName = {}
                            if (key.align === 'left') className += ''
                            if (key.align === 'right') className += 'al-r'
                            if (key.align === 'center') className += 'al-c'
                            if (key.bgcolor) styleName = {
                                ...styleName,
                                backgroundColor: key.bgcolor
                            }
                            if (key.code == state.settings.sort.code) styleName = {
                                ...styleName,
                                borderRight: `1px solid black`,
                                borderLeft: `1px solid black`
                            }
                            if (key.framecolor) styleName = {
                                ...styleName,
                                borderRight: `2px solid ${key.framecolor}`,
                                borderLeft: `2px solid ${key.framecolor}`
                            }
                            // столбцы
                            if (key.code === 'color') {
                                const plus = (assetId && assetId === object.screener_assets_id) ? '–' : '+'
                                return <td key={key.code + ind}
                                           className={className}
                                           onClick={() => handlerOpenClick(object.screener_assets_id, plus)}
                                           style={{
                                               backgroundColor: object.color,
                                               ...styleName
                                           }}>
                                    &nbsp;{plus}&nbsp;</td>
                            }
                            if (key.heatmap === true && key.hide !== true) {
                                return <td key={key.code + ind}
                                           className={className}
                                           style={{
                                               backgroundColor: heatmapGetColor(minmax, object[key.code], object[key.code + '_rank'], key.code),
                                               ...styleName
                                           }}>
                                    <div title={val} style={{width: key.width}}>{val}</div>
                                </td>
                            }
                            if (key.hide !== true) {
                                return <td key={key.code + ind}
                                           className={className}
                                           style={styleName}
                                >
                                    <div title={val} style={{width: key.width}}>{val}</div>
                                </td>
                            }
                        })}
                    </tr>
                    {(assetId && assetId === object.screener_assets_id) ?
                        <Details
                            assetId={assetId}
                            hide={handlerHideDetailsClick}
                        />
                        : ''}
                </>
            )
        })
        // возвращаем урезаный массив с учетом страниц
        let pages = Math.ceil(body.length / window.PER_PAGE)
        if (state.pages !== pages) {
            dispatch({
                type: 'SET_STATE',
                payload: {
                    pages: pages,
                    page: 1
                }
            })
        }
        return body.slice((state.page - 1) * window.PER_PAGE, state.page * window.PER_PAGE)
    }

    // клик сброса фильтров
    const handlerResetClick = () => {
        defaultFilterRef.current.selectedIndex = 0
        dispatch({
            type: 'SET_SETTINGS',
            payload: {
                filter: [],
                sort: {},
                upload: true,
                rank: false
            }
        })
        setHistory(JSON.stringify({filter: [], sort: {}}))
    }

    // клик открытия/закрытия деталей по цвету
    const handlerOpenClick = (id, open) => {
        if (open === '+') setAssetId(id)
        if (open === '–') setAssetId(0)
    }

    // клик фильтра по пресету
    const handlerDefaultClick = (event) => {
        const id = event.target.value
        const findData = window.PRESETS.find(item => item.name === id)
        if (findData) {
            if (findData.sort.code !== undefined) {
                dispatch({
                    type: 'FILTER_PRESET',
                    payload: findData
                })
                setHistory(JSON.stringify({filter: findData.filter, sort: findData.sort}))
            } else {
                dispatch({
                    type: 'SET_SETTINGS',
                    payload: {
                        filter: findData.filter,
                        upload: true,
                        rank: false
                    }
                })
                setHistory(JSON.stringify({filter: findData.filter, sort: findData.sort}))
            }
        }
    }

    // клик показа/скрытия столбцов
    const handlerViewClick = (event) => {
        const id = event.target.value
        dispatch({
            type: 'VIEW_PRESET',
            payload: id
        })
    }

    // клик расчета рангов
    const handlerRankClick = () => {
        if (state.settings.rank) {
            dispatch({
                type: 'SET_SETTINGS',
                payload: {
                    rank: false,
                    upload: true
                }
            })
            return false
        }
        // выделяем поля с heatmap
        const heatmapFields = state.columns.filter(element => element.heatmap === true).map((item) => item.code)
        // отфильтрованные данные
        let fData = filterData()
        // расчет с своими сортировками
        for (let i = 0; i < heatmapFields.length; i++) {
            const field = heatmapFields[i]
            fData.sort(function (a, b) {
                if (a[field] < b[field]) return 1
                if (a[field] > b[field]) return -1
                return 0
            })
            let negrank = 0, posrank = 0
            for (let i = 0; i < fData.length; i++) {
                if (fData[i][field] > 0) {
                    fData[i][field + '_rank'] = ++posrank
                } else if (fData[i][field] < 0) {
                    fData[i][field + '_rank'] = ++negrank
                } else {
                    fData[i][field + '_rank'] = 0
                }
            }
            for (let i = 0; i < fData.length; i++) {
                if (fData[i][field] > 0) {
                    fData[i][field + '_rank'] = (posrank - fData[i][field + '_rank'] + 1) / posrank
                } else if (fData[i][field] < 0) {
                    fData[i][field + '_rank'] = -fData[i][field + '_rank'] / negrank
                }
            }
        }
        dispatch({
            type: 'SET_HITMAP',
            payload: fData
        })
    }

    // клик сброса детализации
    const handlerHideDetailsClick = () => setAssetId(0)

    // клик сброса фильтра по столбцу
    const handlerResetRowClick = (row) => {
        defaultFilterRef.current.selectedIndex = 0
        let newData = state.settings.filter.filter(item => item.column !== row)
        dispatch({
            type: 'DELETE_FILTER_ROW',
            payload: newData
        })
        setHistory(JSON.stringify({filter: newData, sort: state.settings.sort}))
    }

    // клик фильтра checkbox
    const handlerCheckboxFilter = (event, column, val, type) => {
        defaultFilterRef.current.selectedIndex = 0
        let objF = state.settings.filter
        if (event.target.checked) {
            // создаем объект для фильтра obj
            let obj = {type: type, column: column, value: val}
            // добавили объект в state.settings.filter
            if (type === 'list') {
                state.settings.filter.find(object => object.column === column) ? objF.unshift(obj) : objF.push(obj)
            }
            if (type === 'notzero') {
                objF = objF.filter(ob => ob.column !== column)
                state.settings.filter.find(object => object.column === column) ? objF.push(obj) : objF.push(obj)
            }
        } else {
            // удаляем объект из state.settings.filter
            if (type === 'list') {
                objF = objF.filter(ob => ob.column !== column || ob.value !== val)
            }
            if (type === 'notzero') {
                objF = objF.filter(ob => ob.column !== column)
            }
        }
        dispatch({
            type: 'SET_SETTINGS',
            payload: {
                filter: objF, upload: true, rank: false
            }
        })
        setHistory(JSON.stringify({filter: objF, sort: state.settings.sort}))
    }

    // клик фильтра input
    const handlerInputFilter = (event, column, type) => {
        defaultFilterRef.current.selectedIndex = 0
        event.preventDefault()
        let objF = state.settings.filter
        let value = event.target.val.value
        if (value) {
            // создаем объект для фильтра obj
            let obj = {type: type, column: column, value: value.toString()}
            // добавили объект в state.settings.filter
            objF = objF.filter(ob => ob.column !== column)
            state.settings.filter.find(object => object.column === column) ? objF.push(obj) : objF.push(obj)
        } else {
            // удаляем объект из state.settings.filter
            objF = objF.filter(ob => ob.column !== column)
        }
        dispatch({
            type: 'SET_SETTINGS',
            payload: {
                filter: objF, upload: true, rank: false
            }
        })
        setHistory(JSON.stringify({filter: objF, sort: state.settings.sort}))
    }

    if (state.data.toString() === '') return (<p>Данных для таблицы нет!</p>)
    if (state.columns === undefined) return <Error message={'Не получили настройки таблицы'}/>

    const tableHeader = renderHeader()
    const tableBody = renderBody()

    return (
        <>
            {Object.keys(state.show).length !== 0 &&
            <div className='hide' onClick={() => {
                dispatch({
                    type: 'SET_STATE',
                    payload: {show: {}}
                })
            }}/>}
            <p>
                Бал.стоимость: <b>{fmtCardinal(sumCost)}</b>,&nbsp;
                Тек.стоимость: <b>{fmtCardinal(sumVolume)}</b>,&nbsp;
                Тек.прибыль: <b>{fmtCardinal(sumProfit)}</b>,&nbsp;
                Дельта: <b>{fmtCardinal(sumDelta)}</b>,&nbsp;
                Тек.прибыль: <b>{isNaN(sumProfit / sumCost) ? 0 : ((sumProfit / sumCost) * 100).toFixed(2)}%</b>
            </p>
            {loading && <h4>Загрузка....</h4>}
            <div className='menu-table-container'>
                <div className='menu-table-item'>
                    <IconClearAllFilters width={20}
                                         fill={state.settings.filter.toString() === '' ? 'darkgray' : 'red'}
                                         style={{cursor: 'pointer'}}
                                         onClick={handlerResetClick}
                    />
                </div>
                <div className='menu-table-item'>
                    <IconUndo width={20}
                              fill={canUndo ? 'black' : 'darkgray'}
                              style={{cursor: 'pointer'}}
                              onClick={() => {
                                  if (canUndo) {
                                      undoHistory()
                                      setHistclick(true)
                                  }
                              }}
                    />
                </div>
                <div className='menu-table-item'>
                    <IconRedo width={20}
                              fill={canRedo ? 'black' : 'darkgray'}
                              style={{cursor: 'pointer'}}
                              onClick={() => {
                                  if (canRedo) {
                                      redoHistory()
                                      setHistclick(true)
                                  }
                              }}
                    />
                </div>
                <div className='menu-table-item'>
                    <select onChange={handlerDefaultClick} ref={defaultFilterRef}>
                        <option value='' key={-1}>- стандартные фильтры -</option>
                        {window.PRESETS.map((item, i) =>
                            <option value={item.name} key={i}>{item.name}</option>
                        )}
                    </select>
                </div>
                <div className='menu-table-item'>
                    <button onClick={handlerRankClick}
                    >{state.settings.rank ? 'раскрасить по значению' : 'раскрасить по рангу'}
                    </button>
                </div>
                <div className='menu-table-item'>
                    вид <select onChange={handlerViewClick} defaultValue={state.settings.view}>
                    {window.VIEWS.map((item, i) =>
                        <option value={item.code} key={i}>{item.viewname}</option>
                    )}
                </select>
                </div>
            </div>
            <table className='table-main-data'>
                <thead>{tableHeader}</thead>
                <tbody>{tableBody}</tbody>
            </table>
            <br/>
            <div>
                {state.pages === 0 ? <p>Данных для таблицы нет!</p> :
                    <div className='bottom-container'>
                           <span
                               onClick={(event) => {
                                   if (event.target.className === 'enabled') changePage(-1)
                               }}
                               className={state.page === 1 ? 'disabled' : 'enabled'}>&#9664;
                           </span> Страница&nbsp;
                        <select
                            value={state.page}
                            onChange={(event) => {
                                dispatch({
                                    type: 'SET_STATE',
                                    payload: {
                                        page: parseInt(event.target.value)
                                    }
                                })
                            }}>
                            {Array.apply(null, {length: state.pages}).map((val, ind) => {
                                return <option key={ind} value={ind + 1}>{ind + 1}</option>
                            })}
                        </select> из {state.pages}&nbsp;
                        <span
                            onClick={(event) => {
                                if (event.target.className === 'enabled') changePage(1)
                            }}
                            className={state.page === state.pages ? 'disabled' : 'enabled'}>&#9654;
                           </span>
                    </div>
                }
            </div>
        </>
    )
}