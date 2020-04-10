import { createAction, createReducer } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    loading: false,
    loadingRegister: false,
    loadingUpdate: false,
    loadingDelete: false,
    loadingCheck: false,
    checked: {},
    unchecked: {},
    all: [],
    filter: []
}

export const loadItensArmazem = createAction('LOAD_ITENS_ARMAZEM')
export const loadingItensArmazem = createAction('LOADING_ITENS_ARMAZEM')
export const loadingRegisterItensArmazem = createAction('LOADING_REGISTER_ITENS_ARMAZEM')
export const loadingUpdateItensArmazem = createAction('LOADING_UPDATE_ITENS_ARMAZEM')
export const loadingDeleteItensArmazem = createAction('LOADING_DELETE_ITENS_ARMAZEM')
export const loadingCheckItensArmazem = createAction('LOADING_CHECK_ITENS_ARMAZEM')
export const filterItensArmazem = createAction('FILTER_ITENS_ARMAZENS')
export const resetItensArmazem = createAction('RESET_ITENS_ARMAZEM')
export const setCheckedItensArmazem = createAction('SET_CHECKED_ITENS_ARMAZEM')
export const setUncheckedItensArmazem = createAction('SET_UNCHECKED_ITENS_ARMAZEM')

export default createReducer(INITIAL_STATE, {
    [loadItensArmazem.type]: (state, action) => ({ ...state, all: [...action.payload], filter: [...action.payload] }),
    [loadingItensArmazem.type]: (state, action) => ({ ...state, loading: action.payload }),
    [loadingRegisterItensArmazem.type]: (state, action) => ({ ...state, loadingRegister: action.payload }),
    [loadingUpdateItensArmazem.type]: (state, action) => ({ ...state, loadingUpdate: action.payload }),
    [loadingDeleteItensArmazem.type]: (state, action) => ({ ...state, loadingDelete: action.payload }),
    [loadingCheckItensArmazem.type]: (state, action) => ({ ...state, loadingCheck: action.payload }),
    [filterItensArmazem.type]: (state, action) => ({ ...state, filter: state.all.filter(item => item.nome.includes(action.payload.toUpperCase())) }),
    [resetItensArmazem.type]: (state, action) => ({ ...state, all: [], filter: [] }),
    [setCheckedItensArmazem.type]: (state, action) => ({...state, checked: action.payload}),
    [setUncheckedItensArmazem.type]: (state, action) => ({...state, unchecked: action.payload}),
})