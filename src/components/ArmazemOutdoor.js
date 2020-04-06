import React from 'react'

import { TouchableOpacity, StyleSheet } from 'react-native'
import { Card, CardItem, Title } from 'native-base'

import { Colors } from '../styles'


export default ({ armazem }) => {
    return (
        <TouchableOpacity>
            <Card style={styles.card}>
                <CardItem style={styles.cardItem}>
                    <Title style={styles.title}>{armazem.nome}</Title>
                </CardItem>
            </Card>
        </TouchableOpacity>
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
    card: {
        borderRadius: 10,
        backgroundColor: Colors.cardBackgroundColor
    },
})