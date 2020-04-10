import React from 'react'
import { StyleSheet } from 'react-native'

import { Container, Content, Card, CardItem, Text, Item, Label, Input, Picker, Icon } from 'native-base'
import { Button } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux'
import { allItems, addItemArmazem } from '../store/fetchActions'

import Header from '../components/Header'
import { Colors } from '../styles'

export default ({ route, navigation }) => {

    const dispatch = useDispatch()
    const itens = useSelector(state => state.items.all)
    const loadingRegister = useSelector(state => state.itensArmazem.loadingRegister)

    const [armazem, setArmazem] = React.useState({})
    const [item, setItem] = React.useState('')
    const [quantidade, setQuantidade] = React.useState('')
    const [grandeza, setGrandeza] = React.useState('')

    React.useEffect(() => {
        setArmazem(route.params.armazem)
        dispatch(allItems())
    }, [])

    React.useEffect(() => {
        if(!loadingRegister && item && quantidade && grandeza) {
            goBack()
        }
    }, [loadingRegister])

    const quantidadeTextChange = text => {
        setQuantidade(text.replace(',', ".").replace(/[^0-9.]/g, ''))
    }

    const onPickerItemValueChanged = value => {
        setItem(value)
    }

    const onPickerGrandezaValueChanged = value => {
        setGrandeza(value)
    }

    const goBack = () => {
        navigation.navigate('ItemArmazemManage')
    }

    const addItem = () => {
        dispatch(addItemArmazem({
            id_armazem: armazem.id, 
            id_item: item, 
            quantidade, 
            grandeza
        }))
    }

    return (
        <Container>
            <Header title={armazem.nome} subtitle='Adicionar item' />
            <Content padder>
                <Card>
                    <CardItem header bordered>
                        <Text style={styles.cardHeaderText}>Adiconar item ao armazém</Text>
                    </CardItem>
                    <CardItem style={styles.cardItem}>
                        <Text style={styles.inputLabel}>Item:</Text>
                        <Picker note
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Selecione..."
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={item}
                            onValueChange={onPickerItemValueChanged}
                            headerBackButtonText='Voltar'
                        >
                            {itens.map(item => (
                                <Picker.Item key={item.id} label={item.nome} value={item.id} />
                            ))}
                        </Picker>
                    </CardItem>
                    <CardItem>
                        <Item floatingLabel>
                            <Label style={styles.inputLabel}>Quantidade</Label>
                            <Input
                                style={styles.textInput}
                                value={quantidade}
                                onChangeText={quantidadeTextChange}
                            />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Text style={styles.inputLabel}>Grandeza:</Text>
                        <Picker note
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Selecione..."
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={grandeza}
                            onValueChange={onPickerGrandezaValueChanged}
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
                            color={Colors.buttonCancelColor}
                            mode='outlined'
                            onPress={goBack}
                            disabled={loadingRegister}
                        >
                            VOLTAR
                        </Button>
                        <Button
                            color={Colors.buttonConfirmColor}
                            mode='outlined'
                            onPress={addItem}
                            disabled={loadingRegister || !item || !quantidade || !grandeza}
                            loading={loadingRegister}
                        >
                            REGISTRAR
                        </Button>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    cardHeaderText: {
        color: Colors.headerBackgroundColor.backgroundColor
    },
    cardItem: {
        paddingTop: 16
    },
    inputLabel: {
        color: Colors.textInputColor
    },
    textInput: {
        color: Colors.textInputColor,
        fontFamily: 'Roboto_medium'
    },
    cardItemButton: {
        justifyContent: 'space-around'
    }
})