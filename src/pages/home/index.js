import React, {useContext, useEffect, useCallback} from 'react'
import {Context} from '../../context/context'
import {Loader} from '../../components/Loader'
import {Error} from '../../components/Error'
import {Table} from './Table'
import {Graph} from './Graph'
import {useHttp} from '../../hooks/http.hook'

export const Home = () => {

    const {state, dispatch} = useContext(Context)
    const {get, loading, error} = useHttp()

    const loadData = useCallback(async () => {
        try {
            // запрос данных
            const response = await get(`${process.env.REACT_APP_URL_GET_JSON_DATA}`)
            const data = response.data
            dispatch({
                type: 'LOAD_DATA',
                payload: {
                    data: data,
                    sort: {},
                    status: response.status
                }
            })
        } catch (e) {
            console.error(e)
            return false
        }
    }, [get])

    // первая загрузка страницы
    useEffect(() => {
        loadData()
    }, [loadData])

    if (error) return <Error message={error}/>
    if (loading || !state.ready) return <Loader/>

    return (
        <>
            {state.graph.show && <Graph/>}
            <Table/>
            <p>Загружено строк: {state.data.length} ({state.status.date})</p>
            <p><code>Сборка: {process.env.REACT_APP_VERSION} ({process.env.NODE_ENV} mode)</code></p>
        </>
    )
}
