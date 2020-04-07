import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Spinner, Text } from 'native-base';
import { Searchbar } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux'
import { allArmazens } from '../store/fetchActions'
import { filterArmazens } from '../store/ducks/armazens'

import { Colors } from '../styles'

import Header from '../components/Header'
import Card from '../components/ArmazemOutdoor'

export default () => {

    const armazens = useSelector(state => state.armazens.filter)
    const isLoading = useSelector(state => state.armazens.loading)
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

    const onChangeSearchText = text => {
        setSearchText(text.toUpperCase())
        dispatch(filterArmazens(text.toUpperCase()))
    }

    return (
        <Container>
            <Header title='Meus armazéns' />
            <Searchbar
                placeholder="Buscar"
                clearAccessibilityLabel='clear'
                onChangeText={onChangeSearchText}
                value={searchText}
            />
            <Content padder contentContainerStyle={
                (isLoading || (!isLoading && armazens.length === 0)) && styles.content
            }>
                {!isLoading && armazens.length > 0 && armazens.map(armazem => (
                    <Card
                        key={armazem.id}
                        armazem={armazem}
                    />
                ))}
                {!isLoading && armazens.length === 0 && searchText.length === 0 &&
                    <>
                        <Text style={styles.title}>Não há armazens cadastrados!</Text>
                        <Text style={styles.title}>
                            Navegue até a aba
                            <Text style={styles.highlight}> Armazéns </Text>
                            e cadastre um novo armazém.
                        </Text>
                    </>
                }
                {!isLoading && armazens.length === 0 && searchText.length > 0 &&
                    <Text style={styles.title}>
                        Armazém
                        <Text style={styles.highlight}> {searchText} </Text>
                        não encontrado!
                    </Text>
                }
                {isLoading && <Spinner color={Colors.spinnerColor} />}
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Colors.cardBackgroundColor,
        fontFamily: 'Roboto',
        textAlign: 'center'
    },
    highlight: {
        fontFamily: 'Roboto_medium',
        color: Colors.highlight
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    }
})