import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Portal, Dialog } from 'react-native-paper'
import { Title, Text } from 'native-base'

import { Colors } from '../styles'

export default ({ dialogVisible, closeDialog, content, id, deletar }) => {

    const [isLoading, setIsLoading] = React.useState(false)

    const deleteFromDB = async id => {
        setIsLoading(true)
        await deletar(id)
            .then(() => {
                closeDialog()
            })
            .catch(() => {
                setIsLoading(false)
            })

    }

    return (
        <Portal>
            <Dialog
                visible={dialogVisible}
                onDismiss={closeDialog}
                dismissable={false}>
                <Dialog.Title>
                    <Title style={styles.title}>ATENÇÃO</Title>
                </Dialog.Title>
                <Dialog.Content>
                    <Text style={styles.text}>{content}</Text>
                </Dialog.Content>
                <Dialog.Actions style={styles.dialogButtons}>
                    <Button
                        color={Colors.buttonCancelColor}
                        mode='outlined'
                        onPress={closeDialog}
                        disabled={isLoading}
                    >
                        CANCELAR
                </Button>
                    <Button
                        color={Colors.buttonConfirmColor}
                        mode='outlined'
                        onPress={() => deleteFromDB(id)}
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        CONTINUAR
                </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    dialogButtons: {
        justifyContent: 'space-around'
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