import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Portal, Dialog } from 'react-native-paper'
import { Title, Item, Label, Input } from 'native-base'

import { useSelector, useDispatch } from 'react-redux'
import { loadingCheckItensArmazem } from '../store/ducks/itensArmazem'

import { Colors } from '../styles'

export default ({ dialogVisible, closeDialog, item, uncheckItem }) => {

    const dispatch = useDispatch()
    const loading = useSelector(state => state.itensArmazem.loadingCheck)

    const [quantidade, setQuantidade] = React.useState()

    React.useEffect(() => {
        if(Object.keys(item).length) {
            setQuantidade(item.quantidade.toString())
        }
    }, [item])

    const confirmButtonPressed = () => {
            dispatch(loadingCheckItensArmazem(true))
            uncheckItem(quantidade)
    }

    const quantidadeTextChange = text => {
        let textClean = text.replace(',', ".").replace(/[^0-9.]/g, '')
        if (item && item.quantidade && +textClean > +item.quantidade) {
            setQuantidade(item.quantidade.toString())
        }
        else {
            setQuantidade(textClean)
        }
    }

    return (
        <Portal>
            <Dialog
                visible={dialogVisible}
                onDismiss={closeDialog}
                dismissable={false}>
                <Dialog.Title>
                    <Title style={styles.title}>{item.nome} - Quantidade ({item.grandeza}) a remover:</Title>
                </Dialog.Title>
                <Dialog.Content>
                    <Item floatingLabel>
                        <Label>Quantidade</Label>
                        <Input
                            style={styles.textInput}
                            value={quantidade}
                            onChangeText={quantidadeTextChange}
                        />
                    </Item>
                </Dialog.Content>
                <Dialog.Actions style={styles.dialogButtons}>
                    <Button
                        color={Colors.buttonCancelColor}
                        mode='outlined'
                        onPress={() => closeDialog()}
                        disabled={loading}
                    >
                        CANCELAR
                </Button>
                    <Button
                        color={Colors.buttonConfirmColor}
                        mode='outlined'
                        onPress={() => confirmButtonPressed()}
                        disabled={loading}
                        loading={loading}
                    >
                        CONFIRMAR
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
    },
    textInput: {
        color: Colors.textInputColor,
        fontFamily: 'Roboto_medium'
    },
})