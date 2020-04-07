import { createAction, createReducer } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    loading: true,
    all: [],
    filter: []
}

export const loadArmazens = createAction('LOAD_ARMAZENS')
export const loadingArmazens = createAction('LOADING_ARMAZENS')
export const filterArmazens = createAction('FILTER_ARMAZENS')

export default createReducer(INITIAL_STATE, {
    [loadArmazens.type]: (state, action) => ({ ...state, all: [...action.payload], filter: [...action.payload] }),
    [loadingArmazens.type]: (state, action) => ({ ...state, loading: action.payload }),
    [filterArmazens.type]: (state, action) => ({ ...state, filter: state.all.filter(armazem => armazem.nome.includes(action.payload.toUpperCase())) }),

})