import {useReducer, useCallback} from 'react'

const initialState = {
    past: [], // обновляемый массив значений
    present: null, // текущее значение
    future: [] // будущие значения
}

const reducer = (history, action) => {
    const {past, present, future} = history
    switch (action.type) {
        case 'UNDO':
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        case 'REDO':
            const next = future[0]
            const newFuture = future.slice(1)
            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        case 'SET':
            const {newPresent} = action
            if (newPresent === present) {
                return history
            }
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        case 'RESET':
            const {initialPresent} = action
            return {
                ...initialState,
                present: initialPresent
            }
    }
}

export const useHistory = initialPresent => {

    const [history, dispatch] = useReducer(reducer, {
        ...initialState,
        present: initialPresent
    })

    const canUndo = history.past.length !== 0
    const canRedo = history.future.length !== 0

    const undoHistory = useCallback(() => {
        if (canUndo) {
            dispatch({type: 'UNDO'})
        }
    }, [canUndo, dispatch])

    const redoHistory = useCallback(() => {
        if (canRedo) {
            dispatch({type: 'REDO'})
        }
    }, [canRedo, dispatch])

    const setHistory = useCallback(newPresent => dispatch({type: 'SET', newPresent}), [dispatch])

    const clearHistory = useCallback(() => dispatch({type: 'RESET', initialPresent}), [dispatch])

    return {history: history.present, setHistory, undoHistory, redoHistory, clearHistory, canUndo, canRedo}
}