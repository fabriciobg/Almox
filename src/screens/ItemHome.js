import React from 'react'

import { Container, Content, Card, CardItem, Title, Subtitle } from 'native-base'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from 'react-native-vector-icons'


import { Colors } from '../styles'

import Api from '../service/api'

import Header from '../components/Header'



export default ({ navigation }) => {
    return (
        <Container>
            <Header title='Item' />
            <Content padder contentContainerStyle={styles.content}>
                <TouchableOpacity onPress={() => navigation.navigate('ItemRegister')}>
                    <Card style={styles.card}>
                        <CardItem style={styles.cardItem}>
                            <MaterialCommunityIcons name="toolbox" {...Colors.titleTextColor} size={128} />
                            <Title style={styles.text}>
                                CADASTRAR
                            </Title>
                            <Subtitle>
                                ITEM
                            </Subtitle>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ItemList')}>
                    <Card style={styles.card}>
                        <CardItem style={styles.cardItem}>
                            <MaterialCommunityIcons name="format-list-bulleted" {...Colors.titleTextColor} size={128} />
                            <Title style={styles.text}>
                                LISTAR
                            </Title>
                            <Subtitle>
                                ITENS
                            </Subtitle>
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
    text: {
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