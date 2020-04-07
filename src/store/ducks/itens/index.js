import { createAction, createReducer } from '@reduxjs/toolkit'

const INITIAL_STATE = null

export const addItem = createAction('ADD_ITEM')
export const removeItem = createAction('REMOVE_ITEM')
export const loadItems = createAction('LOAD_ITEMS')

export default createReducer(INITIAL_STATE, {
    [addItem.type]: (state, action) => [ ...state, action.payload],
    [removeItem.type]: (state, action) => state.filter(item => item.id != action.payload),
    [loadItems.type]: (state, action) => [ ...action.payload ],
})