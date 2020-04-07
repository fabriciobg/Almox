import axios from '../../service/api'

import { loadItems, removeItem } from '../ducks/itens'
import { loadArmazens, loadingArmazens } from '../ducks/armazens'

export const allArmazens = () => {
    return dispatch => {
        dispatch(loadingArmazens(true))
        axios.get('/armazem/list')
            .then(resp => {
                dispatch(loadArmazens(resp.data))
                dispatch(loadingArmazens(false))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const allItems = () => {
    return dispatch => {
        axios.get('/item/list')
            .then(resp => {
                dispatch(loadItems(resp.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const fetchRemoveItem = id => {
    return dispatch => {
        axios.put('/item/delete', {
            id
        })
        .then(() => {
            dispatch(removeItem(id))
        })
        .catch(err => {
            console.log(err)
        })
    }
}