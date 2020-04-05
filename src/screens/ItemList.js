import React from 'react'
import { StyleSheet } from 'react-native'

import { Container, Content, Spinner, Title } from 'native-base'
import { Searchbar } from 'react-native-paper'

import Header from '../components/Header'
import Card from '../components/ItemCard'
import axios from '../service/api'
import { Colors } from '../styles'

export default ({ route, navigation }) => {

    const [itens, setItens] = React.useState([])
    const [searchText, setSearchText] = React.useState('')
    const [itensSearch, setItensSearch] = React.useState(null)

    React.useEffect(() => {
        carregarItens()
    }, [])

    React.useEffect(() => {
        if(route.params && route.params.reload) {
            carregarItens()
        }
    }, [route])

    const carregarItens = async () => {
        await axios.get('/item/list')
            .then(resp => {
                setItens(resp.data)
                setItensSearch(resp.data)
            })
    }

    const deletarItem = async itemId => {
        return new Promise((resolve, reject) => {
            return axios.put('/item/delete', {
                id: itemId
            })
                .then(resp => {
                    carregarItens()
                    return resolve(resp)
                })
                .catch(err => {
                    return reject(err)
                })
        })
        
    }

    const goHome = () => {
        navigation.navigate('ItemHome')
    }

    const onChangeSearchText = text => {
        setSearchText(text.toUpperCase())
        setItensSearch(itens.filter(item => item.nome.includes(text.toUpperCase())))
    }

    const editItem = item => {
        navigation.navigate('ItemEdit', { item })
    }

    return (
        <Container>
            <Header title='Item' subtitle='Lista' leftAction={goHome} />
            <Searchbar
                placeholder="Buscar"
                clearAccessibilityLabel='clear'
                onChangeText={onChangeSearchText}
                value={searchText}
            />
            <Content padder contentContainerStyle={
                (!itensSearch || (itensSearch && itensSearch.length == 0)) && styles.content}
            >
                {itensSearch && itensSearch.map(item => (
                    <Card 
                        key={item.id} 
                        item={item} 
                        deletarItem={deletarItem}
                        editItem={editItem}
                    />
                ))
                }
                {!itensSearch && 
                    <Spinner color={Colors.spinnerColor} />
                }
                {itensSearch && itensSearch.length == 0 &&
                    <Title style={styles.title}>Não há itens cadastrados.</Title>
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