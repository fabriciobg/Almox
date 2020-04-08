import { configureStore } from '@reduxjs/toolkit'

import rootItems from './ducks/itens'
import rootArmazens from './ducks/armazens'
import rootItensArmazem from './ducks/itensArmazem'

export default configureStore({
    reducer: {
        items: rootItems,
        armazens: rootArmazens,
        itensArmazem: rootItensArmazem
    }
})