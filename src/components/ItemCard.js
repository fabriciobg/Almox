import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Text } from 'native-base'
import { Button } from 'react-native-paper'
import { MaterialCommunityIcons } from 'react-native-vector-icons'

import { Colors } from '../styles'
import DialogConfirmation from './DialogConfirmation'

export default ({ item, deletarItem, isLoading, editItem }) => {

    const [dialogConfirmationVisible, setDialogConfirmationVisible] = React.useState(false)

    const openConfirmationDialog = () => {
        setDialogConfirmationVisible(true)
    }

    const closeConfirmationDialog = () => {
        setDialogConfirmationVisible(false)
    }

    return (
        <Card>
            <CardItem style={styles.cardItem}>
                <View style={styles.textView}>
                    <Text style={styles.text}>{item.nome}</Text>
                </View>
                <View style={styles.cardButtonView}>
                    <Button
                        mode="outlined"
                        style={styles.buttonEdit}
                        onPress={() => editItem(item)}
                        color={Colors.editIconColor}
                    >
                        <MaterialCommunityIcons
                            name='pencil'
                            size={20}
                            color={Colors.editIconColor}
                        />
                    </Button>
                    <Button
                        mode="outlined"
                        style={styles.buttonDelete}
                        color={Colors.deleteIconColor}
                        onPress={openConfirmationDialog}
                    >
                        <MaterialCommunityIcons
                            name='delete'
                            size={20}
                            color={Colors.deleteIconColor}
                        />
                    </Button>
                </View>
                
                <DialogConfirmation 
                    dialogVisible={dialogConfirmationVisible}
                    closeDialog={closeConfirmationDialog}
                    content={`Tem certeza que deseja excluir o item ${item.nome}? Essa operação não poderá ser desfeita.`}
                    isLoading={isLoading}
                    id={item.id}
                    deletar={deletarItem}
                />
            </CardItem>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardItem: {
        flex: 1,
        justifyContent: 'space-between'
    },
    cardButtonView: {
        flexDirection: 'row'
    },
    textView: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap'
    },
    text: {
        color: Colors.textInputColor,
        fontFamily: 'Roboto_medium'
    },
    buttonEdit: {
        marginRight: 4
    },
    buttonDelete: {
        marginRight: -8
    }
})