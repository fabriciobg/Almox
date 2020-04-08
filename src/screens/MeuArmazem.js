import React from 'react'
import { StyleSheet } from 'react-native'

import { Container, Content, Text, Spinner } from 'native-base'
import { Searchbar } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux'
import { allItensArmazem } from '../store/fetchActions'
import { filterItensArmazem } from '../store/ducks/itensArmazem'

import Header from '../components/Header'
import Card from '../components/ItemArmazemCard'
import { Colors } from '../styles'

export default ({ route, navigation }) => {

    const itensArmazem = useSelector(state => state.itensArmazem.filter)
    const isLoading = useSelector(state => state.itensArmazem.loading)
    const dispatch = useDispatch()

    const [armazem, setArmazem] = React.useState('')
    const [searchText, setSearchText] = React.useState('')

    React.useEffect(() => {
        setArmazem(route.params.armazem)
        dispatch(allItensArmazem(route.params.armazem.id))
    }, [])

    const onChangeSearchText = text => {
        setSearchText(text.toUpperCase())
        dispatch(filterItensArmazem(text.toUpperCase()))
    }

    return (
        <Container>
            <Header title={armazem.nome} />
            <Searchbar
                placeholder="Buscar"
                clearAccessibilityLabel='clear'
                onChangeText={onChangeSearchText}
                value={searchText}
            />
            <Content padder contentContainerStyle={
                (isLoading || (!isLoading && itensArmazem.length === 0)) && styles.content
            }>
                {!isLoading && itensArmazem.length > 0 && itensArmazem.map(item => (
                    <Card 
                        item={item}
                        key={item.id}
                    />
                ))}
                {!isLoading && itensArmazem.length === 0 && searchText.length === 0 &&
                    <Text style={styles.title}>Ainda não há itens cadastrados nesse armazém!</Text>
                }
                {!isLoading && itensArmazem.length === 0 && searchText.length > 0 &&
                    <Text style={styles.title}>
                        Item
                        <Text style={styles.highlight}> {searchText} </Text>
                        não encontrado nesse armazém!
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