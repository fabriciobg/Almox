import React from 'react'
import { StyleSheet } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { atualizaItemArmazem, excluirItemArmazem } from '../store/fetchActions'

import { Card, CardItem, Text, View, Item, Label, Input, Picker, Icon } from 'native-base'
import { Button } from 'react-native-paper'
import { MaterialCommunityIcons } from 'react-native-vector-icons'

import { Colors } from '../styles'

export default ({ item }) => {

    const loadingUpdate = useSelector(state => state.itensArmazem.loadingUpdate)
    const loadingDelete = useSelector(state => state.itensArmazem.loadingDelete)
    const dispatch = useDispatch()

    const [nome, setNome] = React.useState('')
    const [quantidade, setQuantidade] = React.useState('')
    const [editQuantidade, setEditQuantidade] = React.useState('')
    const [grandeza, setGrandeza] = React.useState('')
    const [editGrandeza, setEditGrandeza] = React.useState('')
    const [edit, setEdit] = React.useState(false)

    React.useEffect(() => {
        setNome(item.nome)
        setQuantidade(item.quantidade)
        setEditQuantidade(item.quantidade.toString())
        setGrandeza(item.grandeza)
        setEditGrandeza(item.grandeza)
    }, [])

    React.useEffect(() => {
        if (!loadingUpdate) {
            setEdit(false)
        }
    }, [loadingUpdate])

    const toggleEdit = () => {
        setEdit(!edit)
    }

    const quantidadeTextChange = text => {
        setEditQuantidade(text.replace(',', ".").replace(/[^0-9.]/g, ''))
    }

    const onPickerChangeValue = value => {
        setEditGrandeza(value)
    }

    const editarItem = () => {
        dispatch(atualizaItemArmazem({
            'id': item.id,
            'id_armazem': item.id_armazem,
            'id_item': item.id_item,
            'quantidade': editQuantidade,
            'grandeza': editGrandeza
        }))
    }

    const excluirItem = () => {
        dispatch(excluirItemArmazem(item.id, item.id_armazem))
    }

    return (
        <Card>
            <CardItem>
                <View style={styles.textView}>
                    <Text style={styles.nameText}>
                        {nome}
                    </Text>
                    <Text style={styles.quantityText}>
                        {quantidade} {grandeza}
                    </Text>
                </View>
                <View style={styles.cardButtonView}>
                    <Button
                        style={styles.buttonEdit}
                        onPress={toggleEdit}
                        color={Colors.editIconColor}
                    >
                        <MaterialCommunityIcons
                            name={edit ? 'menu-up' : 'menu-down'}
                            size={25}
                            color={Colors.editIconColor}
                        />
                    </Button>
                </View>
            </CardItem>
            {edit &&
                <Card>
                    <CardItem>
                        <Item floatingLabel style={styles.item}>
                            <Label style={styles.inputLabel}>Quantidade</Label>
                            <Input
                                style={styles.textInput}
                                value={editQuantidade}
                                onChangeText={quantidadeTextChange}
                            />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Text style={styles.inputLabel}>Grandeza: </Text>
                        <Picker note
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Selecione..."
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            style={{ width: 120 }}
                            selectedValue={editGrandeza}
                            onValueChange={onPickerChangeValue}
                            headerBackButtonText='Voltar'
                        >
                            <Picker.Item label="Grama" value="grama(s)" />
                            <Picker.Item label="Litros" value="litro(s)" />
                            <Picker.Item label="Quilograma" value="kg" />
                            <Picker.Item label="Tonelada" value="Ton" />
                            <Picker.Item label="Unidade" value="un" />
                        </Picker>
                    </CardItem>
                    <CardItem style={styles.cardItemButton}>
                        <Button
                            color={Colors.buttonDeleteColor}
                            mode='outlined'
                            onPress={excluirItem}
                            disabled={loadingUpdate || loadingDelete}
                            loading={loadingDelete}
                        >
                            EXCLUIR
                        </Button>
                        <Button
                            color={Colors.buttonCancelColor}
                            mode='outlined'
                            onPress={toggleEdit}
                            disabled={loadingUpdate || loadingDelete}
                        >
                            CANCELAR
                        </Button>
                        <Button
                            color={Colors.buttonConfirmColor}
                            mode='outlined'
                            onPress={editarItem}
                            disabled={loadingUpdate || loadingDelete}
                            loading={loadingUpdate}
                        >
                            EDITAR
                        </Button>
                    </CardItem>
                </Card>
            }
        </Card>
    )
}

const styles = StyleSheet.create({
    nameText: {
        color: Colors.textInputColor,
        fontFamily: 'Roboto_medium',
        textAlign: 'justify',
        marginRight: 16
    },
    quantityText: {
        color: Colors.textInputColor,
        textAlign: 'justify',
        fontWeight: "200"
    },
    textView: {
        flex: 1,
        flexWrap: 'wrap'
    },
    cardButtonView: {
        flexDirection: 'row'
    },
    buttonEdit: {
        marginRight: -4
    },
    inputLabel: {
        color: Colors.textInputColor
    },
    textInput: {
        color: Colors.textInputColor,
        fontFamily: 'Roboto_medium'
    },
    item: {
        marginTop: 16
    },
    cardItemButton: {
        justifyContent: 'space-around'
    }
})