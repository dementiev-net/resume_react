export default function (state, action) {

    const payload = action.payload
    let graphArray = state.graph.data
    let newData

    switch (action.type) {
        case 'LOAD_DATA':
            newData = payload.data
            if (payload.sort.code !== undefined) {
                newData.sort((a, b) => {
                    if (a[payload.sort.code] === b[payload.sort.code]) return 0
                    if (a[payload.sort.code] === '') return 1
                    if (b[payload.sort.code] === '') return -1
                    if (a[payload.sort.code] < b[payload.sort.code]) return payload.sort.dir === 'desc' ? 1 : -1
                    if (a[payload.sort.code] > b[payload.sort.code]) return payload.sort.dir === 'desc' ? -1 : 1
                    return 0
                })
            }
            return {
                ...state,
                data: newData,
                pages: Math.ceil(newData.length / window.PER_PAGE),
                status: payload.status,
                ready: true
            }
        case 'SET_STATE':
            return {
                ...state, ...payload
            }
        case 'SET_SETTINGS':
            return {
                ...state,
                settings: {...state.settings, ...payload}
            }
        case 'SET_GRAPHS':
            return {
                ...state,
                graph: {
                    ...state.graph,
                    show: true,
                    cache: payload,
                    data: payload
                }
            }
        case 'SET_GRAPHS_ALL':
            return {
                ...state,
                graph: {
                    ...state.graph,
                    show: true,
                    cache: payload,
                    data: payload
                },
                settings: {
                    ...state.settings,
                    graphs: payload.map((item => {
                        return {assetId: item.assetId, code: item.code}
                    })),
                    upload: true
                }
            }
        case 'SET_GRAPH_JSON':
            graphArray.push({
                assetId: payload.id,
                code: payload.details.data.code,
                quotes: payload.response.quotes
            })
            return {
                ...state,
                graph: {
                    ...state.graph,
                    show: true,
                    cache: graphArray,
                    data: graphArray
                },
                settings: {
                    ...state.settings,
                    graphs: graphArray.map((item => {
                        return {assetId: item.assetId, code: item.code}
                    })),
                    upload: true
                }
            }
        case 'SET_GRAPH_CACHE':
            graphArray.push(payload.obj)
            return {
                ...state,
                graph: {
                    ...state.graph,
                    show: true,
                    data: graphArray
                },
                settings: {
                    ...state.settings,
                    graphs: graphArray.map((item => {
                        return {assetId: item.assetId, code: item.code}
                    })),
                    upload: true
                }
            }
        case 'DELETE_GRAPH':
            newData = state.graph.data.filter(item => item.assetId !== payload)
            return {
                ...state,
                graph: {
                    ...state.graph,
                    data: newData
                },
                settings: {
                    ...state.settings,
                    graphs: newData.map((item => {
                        return {assetId: item.assetId, code: item.code}
                    })),
                    upload: true
                }
            }
        case 'DELETE_FILTER_ROW':
            return {
                ...state,
                settings: {...state.settings, filter: payload},
                show: {},
                upload: true
            }
        case 'DELETE_GRAPHS':
            return {
                ...state,
                graph: {
                    ...state.graph,
                    data: []
                },
                settings: {
                    ...state.settings,
                    graphs: [],
                    upload: true
                }
            }
        case 'SHOW_GRAPH':
            return {
                ...state,
                graph: {
                    ...state.graph,
                    show: !state.graph.show
                }
            }
        case 'SHOW_FILTER':
            return {
                ...state,
                show: state.show[payload] ? {} : {[payload]: true}
            }
        case 'SORT_DATA':
            let dir = payload.dir
            return {
                ...state,
                data: state.data.sort((a, b) => {
                    if (a[payload.code] === b[payload.code]) return 0
                    if (a[payload.code] === '') return 1
                    if (b[payload.code] === '') return -1
                    if (state.settings.sort.code === payload.code) {
                        dir = (state.settings.sort.dir === 'desc' ? 'asc' : 'desc')
                    }
                    if (a[payload.code] < b[payload.code]) return dir === 'desc' ? 1 : -1
                    if (a[payload.code] > b[payload.code]) return dir === 'desc' ? -1 : 1
                    return 0
                }),
                settings: {
                    ...state.settings,
                    sort: {code: payload.code, dir: dir, type: payload.sort},
                    upload: true
                }
            }
        case 'SORT_HISTORY':
            return {
                ...state,
                data: state.data.sort((a, b) => {
                    if (a[payload.sort.code] === b[payload.sort.code]) return 0
                    if (a[payload.sort.code] === '') return 1
                    if (b[payload.sort.code] === '') return -1
                    if (a[payload.sort.code] < b[payload.sort.code]) return payload.sort.dir === 'desc' ? 1 : -1
                    if (a[payload.sort.code] > b[payload.sort.code]) return payload.sort.dir === 'desc' ? -1 : 1
                    return 0
                }),
                settings: {
                    ...state.settings,
                    filter: payload.filter,
                    sort: payload.sort
                }
            }
        case 'SET_HITMAP':
            return {
                ...state,
                data: state.data.map(sitem => {
                    const findData = payload.find(fitem => sitem.screener_assets_id === fitem.screener_assets_id)
                    if (findData !== undefined) {
                        return findData
                    }
                    return sitem
                }),
                settings: {
                    ...state.settings,
                    upload: false,
                    rank: true
                }
            }
        case 'FILTER_PRESET':
            return {
                ...state,
                data: state.data.sort((a, b) => {
                    if (a[payload.sort.code] === b[payload.sort.code]) return 0
                    if (a[payload.sort.code] === '') return 1
                    if (b[payload.sort.code] === '') return -1
                    if (a[payload.sort.code] < b[payload.sort.code]) return payload.sort.dir === 'desc' ? 1 : -1
                    if (a[payload.sort.code] > b[payload.sort.code]) return payload.sort.dir === 'desc' ? -1 : 1
                    return 0
                }),
                settings: {
                    ...state.settings,
                    filter: payload.filter,
                    sort: payload.sort,
                    upload: true,
                    rank: false
                }
            }
        case 'VIEW_PRESET':
            newData = window.FIELDS
            const presetObj = window.VIEWS.find(item => item.code == payload)
            if (presetObj !== undefined) {
                return {
                    ...state,
                    columns: newData.map((item => {
                        for (let i = 0; i < presetObj.fields.length; i++) {
                            if (item.code === presetObj.fields[i].code) {
                                return {...item, ...presetObj.fields[i]}
                            }
                        }
                        return {...item}
                    })),
                    settings: {
                        ...state.settings,
                        view: payload,
                        upload: true
                    }
                }
            }
        default:
            return state
    }
}