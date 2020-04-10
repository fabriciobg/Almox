import React from 'react'
import { StyleSheet } from 'react-native'
import { Header, Body, Title, Subtitle, Left, Right } from 'native-base'
import { IconButton } from 'react-native-paper'


import { Colors } from '../styles'

export default (props) => {
    return (
        <Header style={styles.header} iosBarStyle='light-content' androidStatusBarColor={Colors.headerBackgroundColor.backgroundColor} >
            {(props.leftAction || props.rightAction) &&
                <Left />
            }
            <Body>
                <Title style={styles.title}>{props.title}</Title>
                {props.subtitle && <Subtitle style={styles.subtitle}>{props.subtitle}</Subtitle>}
            </Body>
            {(props.leftAction || props.rightAction) &&
                <Right>
                    <IconButton
                        icon={props.rightIcon}
                        color={Colors.titleTextColor.color}
                        size={20}
                        onPress={props.rightAction}
                    />
                </Right>
            }
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