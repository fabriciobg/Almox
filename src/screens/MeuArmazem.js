import React from 'react'
import { Container, Content, Card, CardItem, Title, Subtitle } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { loadCheckItensArmazem } from '../store/ducks/itensArmazem'

import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { Colors } from '../styles'

import Header from '../components/Header'

export default ({ route, navigation }) => {

    const dispatch = useDispatch()
    const check = useSelector(state => state.itensArmazem.check)

    const [armazem, setArmazem] = React.useState({})

    React.useEffect(() => {
        setArmazem(route.params.armazem)
    }, [])

    const goToManage = () => {
        navigation.navigate('ItemArmazemManage', { armazem })
    }

    const goToCheck = () => {
        navigation.navigate('ItemArmazemCheck', { armazem })
    }

    return (
        <Container>
            <Header title={armazem.nome} />
            <Content padder contentContainerStyle={styles.content}>
                <TouchableOpacity onPress={goToManage}>
                    <Card style={styles.card}>
                        <CardItem style={styles.cardItem}>
                            <MaterialCommunityIcons name="treasure-chest" {...Colors.titleTextColor} size={128} />
                            <Title style={styles.title}>
                                GERENCIAR
                            </Title>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToCheck}>
                    <Card style={styles.card}>
                        <CardItem style={styles.cardItem}>
                            <MaterialCommunityIcons name="checkbox-marked-circle-outline" {...Colors.titleTextColor} size={128} />
                            <Title style={styles.title}>
                                CONFERIR
                            </Title>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    cardItem: {
        marginVertical: 24,
        marginHorizontal: 24,
        backgroundColor: Colors.cardBackgroundColor,
        flexDirection: 'column'
    },
    title: {
        fontFamily: 'Roboto_medium',
        fontSize: 16,
        backgroundColor: Colors.cardBackgroundColor,
        ...Colors.titleTextColor
    },
    contentView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    card: {
        borderRadius: 10,
        backgroundColor: Colors.cardBackgroundColor
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    }
})