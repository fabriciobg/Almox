import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Header, Body, Title, Subtitle, Left, Right } from 'native-base'

import { MaterialCommunityIcons } from 'react-native-vector-icons';

import { Colors } from '../styles'

export default (props) => {
    return (
        <Header style={styles.header} iosBarStyle='light-content' >
            { props.leftAction && 
                <Left>
                    <TouchableOpacity onPress={props.leftAction}> 
                        <MaterialCommunityIcons 
                            name='chevron-left' 
                            size={48} 
                            {...Colors.titleTextColor} 
                        />
                    </TouchableOpacity>
                </Left>
            }
            <Body>
                <Title style={styles.title}>{props.title}</Title>
                {props.subtitle && <Subtitle style={styles.subtitle}>{props.subtitle}</Subtitle>}
            </Body>
            {props.leftAction && <Right />}
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