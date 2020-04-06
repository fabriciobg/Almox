import React from 'react'
import { Container, Content, Text} from 'native-base';

import Header from '../components/Header'
import Card from '../components/ArmazemOutdoor'

import axios from '../service/api'

export default () => {

    const [armazens, setArmazens] = React.useState([])
    const [searchText, setSearchText] = React.useState('')
    const [armazensSearch, setArmazensSearch] = React.useState([])

    React.useEffect(() => {
        carregarArmazens()
    }, [])

    const carregarArmazens = async () => {
        await axios.get('/armazem/list')
            .then(resp => {
                setArmazens(resp.data)
                setArmazensSearch(resp.data)
            })
    }

    const onChangeSearchText = text => {
        setSearchText(text.toUpperCase())
        setArmazensSearch(armazens.filter(armazem => armazem.nome.includes(text.toUpperCase())))
    }

    return (
        <Container>
            <Header title='Meus armazéns'/>
            <Content padder>
                {armazensSearch.map(armazem => (
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