import { createAction, createReducer } from '@reduxjs/toolkit'

const INITIAL_STATE = []

export const loadArmazens = createAction('LOAD_ARMAZENS')

export default createReducer(INITIAL_STATE, {
    [loadArmazens.type]: (state, action) => [ ...action.payload ]
})