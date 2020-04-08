import React from 'react'

import { Card, CardItem, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'

export default ({ item }) => {
    return (
        <Card>
            <CardItem>
                <View>
                    <Text style={styles.nameText}>
                        {item.nome}
                    </Text>
                    <Text style={styles.quantityText}>
                        {item.quantidade} {item.grandeza}
                    </Text>
                </View>
            </CardItem>
        </Card>
    )
}

const styles = StyleSheet.create({
    nameText: {
        fontFamily: 'Roboto_medium',
    },
    quantityText: {
        fontFamily: 'Roboto'
    }
})