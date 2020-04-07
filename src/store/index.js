import { configureStore } from '@reduxjs/toolkit'

import rootItems from './ducks/itens'
import rootArmazens from './ducks/armazens'

export default configureStore({
    reducer: {
        items: rootItems,
        armazens: rootArmazens
    }
})