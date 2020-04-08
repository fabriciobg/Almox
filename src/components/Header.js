import React from 'react'
import { StyleSheet } from 'react-native'
import { Header, Body, Title, Subtitle } from 'native-base'


import { Colors } from '../styles'

export default (props) => {
    return (
        <Header style={styles.header} iosBarStyle='light-content' >
            <Body>
                <Title style={styles.title}>{props.title}</Title>
                {props.subtitle && <Subtitle style={styles.subtitle}>{props.subtitle}</Subtitle>}
            </Body>
        </Header>
    )
}

const styles = StyleSheet.create({
    header: {
        ...Colors.headerBackgroundColor
    },
    title: {
        ...Colors.titleTextColor,
    },
    subtitle: {
        ...Colors.subtitleTextColor
    }
})