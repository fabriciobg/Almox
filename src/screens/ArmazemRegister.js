import React from 'react'
import { Container, Content, Card, CardItem, Input, Item, Text, Label } from 'native-base'
import { StyleSheet, Keyboard } from 'react-native'
import { Button } from 'react-native-paper'

import { useDispatch } from 'react-redux'
import { allArmazens } from '../store/fetchActions'

import axios from '../service/api'

import Header from '../components/Header'
import Dialog from '../components/Dialog'
import { Colors } from '../styles'

export default ({ navigation }) => {

    const dispatch = useDispatch()

    const [nome, setNome] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [dialogSuccess, setDialogSuccess] = React.useState(false)
    const [successContent, setSuccessContent] = React.useState('')
    const [dialogError, setDialogError] = React.useState(false)
    const [errorContent, setErrorContent] = React.useState('')

    const goHome = () => {
        navigation.navigate('ArmazemHome')
    }

    const openDialogSuccess = () => {
        setDialogSuccess(true)
    }
    const closeDialogSuccess = () => {
        setDialogSuccess(false)
        setIsLoading(false)
        clear()
    }

    const openDialogError = () => {
        setDialogError(true)
    }
    const closeDialogError = () => {
        setDialogError(false)
        setIsLoading(false)
    }

    const clear = () => {
        setNome('')
    }

    const registerItem = async () => {
        Keyboard.dismiss()
        setIsLoading(true)
        if (!nome.length) {
            setErrorContent('É necessário preencher todos os campos do formulário de cadastro antes de continuar.')
            openDialogError()
            return
        }
        // Verificando se já existe o armazém na base de dados
        axios.get(`armazem/list/${nome}`)
            .then(resp => {
                if (resp.data.length) {
                    setErrorContent(`Já existe um armazém chamado ${nome.toUpperCase()} no banco de dados.`)
                    openDialogError()
                    return
                } else {
                    // Cadastrando novo armazém
                    axios
                        .post('/armazem/register', {
                            nome
                        })
                        .then(() => {
                            dispatch(allArmazens())
                            setSuccessContent(`Armazém ${nome.toUpperCase()} cadastrado com sucesso!`)
                            openDialogSuccess()
                        })
                        .catch(() => {
                            setErrorContent('Ocorreu um erro ao tentar se comunicar com o servidor! Não foi possível cadastrar o armazém, tente novamente mais tarde!')
                            openDialogError()
                        })
                }
            })
            .catch(() => {
                setErrorContent('Ocorreu um erro ao tentar se comunicar com o servidor! Não foi possível cadastrar o item, tente novamente mais tarde!')
                openDialogError()
            })
    }

    return (
        <Container>
            <Header title='Armazém' subtitle='Cadastro'/>
            <Content padder>
                <Card>
                    <CardItem header bordered >
                        <Text style={styles.cardHeaderText}>Cadastro de armazém</Text>
                    </CardItem>
                    <CardItem style={styles.cardItem}>
                        <Item floatingLabel>
                            <Label style={styles.inputLabel}>Nome do armazém</Label>
                            <Input style={styles.textInput} value={nome} onChangeText={text => setNome(text.toUpperCase())} />
                        </Item>
                    </CardItem>
                    <CardItem style={styles.cardButtons}>
                        <Button
                            mode='outlined'
                            color={Colors.buttonCancelColor}
                            onPress={goHome}
                            disabled={isLoading}
                        >
                            CANCELAR
                        </Button>
                        <Button
                            mode='outlined'
                            color={Colors.buttonConfirmColor}
                            onPress={registerItem}
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            CADASTRAR
                        </Button>
                    </CardItem>
                </Card>
                <Dialog
                    dialogVisible={dialogSuccess}
                    title='Operação finalizada'
                    content={successContent}
                    closeDialog={closeDialogSuccess}
                    buttonTitle='CONFIRMAR'
                    buttonColor={Colors.buttonConfirmColor}
                />
                <Dialog
                    dialogVisible={dialogError}
                    title='Ops!'
                    content={errorContent}
                    closeDialog={closeDialogError}
                    buttonTitle='Retornar'
                    buttonColor={Colors.buttonCancelColor}
                />
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
    cardButtons: {
        marginTop: 16,
        justifyContent: 'space-around'
    },
    inputLabel: {
        color: Colors.cardBackgroundColor
    },
    textInput: {
        color: Colors.cardBackgroundColor,
        fontFamily: 'Roboto_medium'
    }
})