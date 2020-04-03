import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Portal, Dialog } from 'react-native-paper'
import { Title, Text } from 'native-base'

import { Colors } from '../styles'

export default (props) => (
    <Portal>
        <Dialog
            visible={props.dialogVisible}
            onDismiss={props.closeDialog}
            dismissable={false}>
            <Dialog.Title>
                <Title style={styles.title}>{props.title}</Title>
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.text}>{props.content}</Text>
            </Dialog.Content>
            <Dialog.Actions style={styles.dialogButtons}>
                <Button 
                    color={props.buttonColor} 
                    mode='outlined' 
                    onPress={props.closeDialog}
                >
                    {props.buttonTitle}
                </Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
)

const styles = StyleSheet.create({
    dialogButtons: {
        justifyContent: 'flex-end'
    },
    title: {
        color: Colors.dialogTitleColor,
        justifyContent: 'flex-start'
    },
    text: {
        color: Colors.dialogContentTextColor,
        textAlign: 'justify'
    }
})