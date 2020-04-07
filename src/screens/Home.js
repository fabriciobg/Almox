import React from 'react'
import { Container, Content, Text} from 'native-base';

import { useSelector, useDispatch } from 'react-redux'
import { allArmazens } from '../store/fetchActions'

import Header from '../components/Header'
import Card from '../components/ArmazemOutdoor'

export default () => {

    const armazens = useSelector(state => state.armazens)
    const dispatch = useDispatch()

    
    const [searchText, setSearchText] = React.useState('')
    const [armazensSearch, setArmazensSearch] = React.useState([])

    React.useEffect(() => {
        dispatch(allArmazens())
    }, [])

    // const carregarArmazens = async () => {
    //     await axios.get('/armazem/list')
    //         .then(resp => {
    //             setArmazens(resp.data)
    //             setArmazensSearch(resp.data)
    //         })
    // }

    // const onChangeSearchText = text => {
    //     setSearchText(text.toUpperCase())
    //     setArmazensSearch(armazens.filter(armazem => armazem.nome.includes(text.toUpperCase())))
    // }

    return (
        <Container>
            <Header title='Meus armazéns'/>
            <Content padder>
                {armazens.map(armazem => (
                    <Card 
                        key={armazem.id} 
                        armazem={armazem} 
                        // deletarArmazem={deletarArmazem}
                        // editArmazem={editArmazem}
                    />
                ))}
            </Content>
        </Container>
    )
}