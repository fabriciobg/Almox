import { createAction, createReducer } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    loading: false,
    all: [],
    filter: []
}

export const loadItensArmazem = createAction('LOAD_ITENS_ARMAZEM')
export const loadingItensArmazem = createAction('LOADING_ITENS_ARMAZEM')
export const filterItensArmazem = createAction('FILTER_ITENS_ARMAZENS')
export const resetItensArmazem = createAction('RESET_ITENS_ARMAZEM')

export default createReducer(INITIAL_STATE, {
    [loadItensArmazem.type]: (state, action) => ({ ...state, all: [...action.payload], filter: [...action.payload] }),
    [loadingItensArmazem.type]: (state, action) => ({ ...state, loading: action.payload }),
    [filterItensArmazem.type]: (state, action) => ({ ...state, filter: state.all.filter(item => item.nome.includes(action.payload.toUpperCase())) }),
    [resetItensArmazem.type]: (state, action) => ({ ...state, all: [], filter: [] }),
})