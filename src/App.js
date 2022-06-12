import React, {useReducer, useRef} from 'react'
import {Home} from './pages/home'
import {Context} from './context/context'
import reducer from './context/reducer'

function App() {

    const [state, dispatch] = useReducer(reducer, {
        columns: window.FIELDS, // заголовки таблицы
        data: [], // данные
        graph: {
            show: false,
            data: [], // данные
            cache: [], // кеширование данных
        },
        pages: 1,
        page: 1,
        ready: false,
        settings: {
            currency: window.DEFAULT_CURRENCY,
            filter: [],
            graphs: [],
            rank: false,
            sort: {},
            upload: false,
            view: 1
        },
        show: {}, // какое окно фильтра показывать
        status: {
            err: 0,
            message: null,
            date: null
        }
    })
    const graphRangeRef = useRef([undefined, undefined])

    return (
        <Context.Provider value={{
            state, dispatch, graphRangeRef
        }}>
            <Home/>
        </Context.Provider>
    )
}

export default App