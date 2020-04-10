import axios from '../../service/api'

import { loadItems, removeItem } from '../ducks/itens'
import { loadArmazens, loadingArmazens } from '../ducks/armazens'
import {
    loadItensArmazem, loadingItensArmazem, loadingUpdateItensArmazem,
    loadingDeleteItensArmazem, loadingRegisterItensArmazem
} from '../ducks/itensArmazem'

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

export const allItensArmazem = id_armazem => {
    return dispatch => {
        dispatch(loadingItensArmazem(true))
        axios.post('/item/armazem/list', { id_armazem })
            .then(resp => {
                dispatch(loadItensArmazem(resp.data))
                dispatch(loadingItensArmazem(false))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const atualizaItemArmazem = data => {
    return dispatch => {
        dispatch(loadingUpdateItensArmazem(true))
        axios.put('/item/armazem/update', data)
            .then(() => {
                dispatch(loadingUpdateItensArmazem(false))
                dispatch(allItensArmazem(data.id_armazem))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const excluirItemArmazem = (id, id_armazem) => {
    return dispatch => {
        dispatch(loadingDeleteItensArmazem(true))
        axios.put('/item/armazem/delete', { id })
            .then(() => {
                dispatch(loadingDeleteItensArmazem(false))
                dispatch(allItensArmazem(id_armazem))
            })
            .catch(() => {
                console.log(err)
            })
    }
}

export const addItemArmazem = data => {
    return dispatch => {
        dispatch(loadingRegisterItensArmazem(true))
        axios
            .put(`/item/armazem/list/${data.id_item}`, {
                id_armazem: data.id_armazem
            })
            .then(resp => {
                if (resp.data.length > 0) {
                    axios.put('/item/armazem/update', {
                        id: resp.data[0].id,
                        id_item: resp.data[0].id_item,
                        quantidade: (+data.quantidade) + (+resp.data[0].quantidade),
                        grandeza: data.grandeza
                    })
                    .then(() => {
                        dispatch(loadingRegisterItensArmazem(false))
                        dispatch(allItensArmazem(data.id_armazem))
                    })
                } else {
                    axios
                        .post('/item/armazem/register', data)
                        .then(() => {
                            dispatch(loadingRegisterItensArmazem(false))
                            dispatch(allItensArmazem(data.id_armazem))
                        })
                        
                }
            })
            .catch(err => {
                dispatch(loadingRegisterItensArmazem(false))
                console.log(err)
            })

    }
}