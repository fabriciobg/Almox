import React from 'react'
import { StyleSheet } from 'react-native'

import { useDispatch } from 'react-redux'
import { allArmazens } from '../store/fetchActions'

import { Container, Content, Spinner, Title } from 'native-base'
import { Searchbar } from 'react-native-paper'

import Header from '../components/Header'
import Card from '../components/ArmazemCard'
import axios from '../service/api'
import { Colors } from '../styles'

export default ({ route, navigation }) => {

    const dispatch = useDispatch()

    const [armazens, setArmazens] = React.useState([])
    const [searchText, setSearchText] = React.useState('')
    const [armazensSearch, setArmazensSearch] = React.useState(null)

    React.useEffect(() => {
        carregarArmazens()
    }, [])

    React.useEffect(() => {
        if(route.params && route.params.reload) {
            carregarArmazens()
        }
    }, [route])

    const carregarArmazens = async () => {
        await axios.get('/armazem/list')
            .then(resp => {
                setArmazens(resp.data)
                setArmazensSearch(resp.data)
            })
    }

    const deletarArmazem = async armazemId => {
        return new Promise((resolve, reject) => {
            return axios.put('/armazem/delete', {
                id: armazemId
            })
                .then(resp => {
                    carregarArmazens()
                    dispatch(allArmazens())
                    return resolve(resp)
                })
                .catch(err => {
                    return reject(err)
                })
        })
        
    }

    const goHome = () => {
        navigation.navigate('ArmazemHome')
    }

    const onChangeSearchText = text => {
        setSearchText(text.toUpperCase())
        setArmazensSearch(armazens.filter(armazem => armazem.nome.includes(text.toUpperCase())))
    }

    const editArmazem = armazem => {
        navigation.navigate('ArmazemEdit', { armazem })
    }

    return(
        <Container>
            <Header title='Armazém' subtitle='Lista' leftAction={goHome} />
            <Searchbar
                placeholder="Buscar"
                clearAccessibilityLabel='clear'
                onChangeText={onChangeSearchText}
                value={searchText}
            />
            <Content padder contentContainerStyle={
                (!armazensSearch || (armazensSearch && armazensSearch.length == 0)) && styles.content}
            >
                {armazensSearch && armazensSearch.map(armazem => (
                    <Card 
                        key={armazem.id} 
                        armazem={armazem} 
                        deletarArmazem={deletarArmazem}
                        editArmazem={editArmazem}
                    />
                ))
                }
                {!armazensSearch && 
                    <Spinner color={Colors.spinnerColor} />
                }
                {armazensSearch && armazensSearch.length == 0 &&
                    <Title style={styles.title}>Não há armazéns cadastrados.</Title>
                }
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Colors.cardBackgroundColor,
        fontFamily: 'Roboto_medium'
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    }
})