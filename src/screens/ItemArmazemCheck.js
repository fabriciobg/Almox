import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Container, Content, Card, CardItem, Text, Spinner, Title } from 'native-base'
import { Button } from 'react-native-paper'
import { MaterialCommunityIcons } from 'react-native-vector-icons'

import { useDispatch, useSelector } from 'react-redux'
import {
    loadingCheckItensArmazem, setCheckedItensArmazem,
    setUncheckedItensArmazem
} from '../store/ducks/itensArmazem'

import { allItensArmazem } from '../store/fetchActions'

import Header from '../components/Header'
import { Colors } from '../styles'
import DialogCheck from '../components/DialogCheck'
import DialogUncheck from '../components/DialogUncheck'

export default ({ route }) => {

    const dispatch = useDispatch()
    const itens = useSelector(state => state.itensArmazem.all)
    const checked = useSelector(state => state.itensArmazem.checked)
    const unchecked = useSelector(state => state.itensArmazem.unchecked)
    const isLoading = useSelector(state => state.itensArmazem.loadingCheck)

    const armazem = route.params.armazem

    const [dialogCheckVisible, setDialogCheckVisible] = React.useState(false)
    const [dialogUncheckVisible, setDialogUncheckVisible] = React.useState(false)
    const [itemCheckSelected, setItemCheckSelected] = React.useState({})
    const [itemUncheckSelected, setItemUncheckSelected] = React.useState({})

    React.useEffect(() => {
        dispatch(loadingCheckItensArmazem(true))
        dispatch(allItensArmazem(route.params.armazem.id))
    }, [])

    React.useEffect(() => {
        if (!unchecked[armazem.id] || unchecked[armazem.id].length === 0 ||
            !checked[armazem.id] || checked[armazem.id].length === 0) {

            let preChecked = { ...checked }
            let preUnchecked = { ...unchecked }

            preChecked[armazem.id] = itens.map(item => ({
                ...item,
                quantidade: 0
            }))
            preUnchecked[armazem.id] = itens

            dispatch(setCheckedItensArmazem(preChecked))
            dispatch(setUncheckedItensArmazem(preUnchecked))
        }
        dispatch(loadingCheckItensArmazem(false))
    }, [itens])

    React.useEffect(() => {
        if (Object.keys(itemCheckSelected).length) {
            setDialogCheckVisible(true)
        }
    }, [itemCheckSelected])

    React.useEffect(() => {
        if (Object.keys(itemUncheckSelected).length) {
            setDialogUncheckVisible(true)
        }
    }, [itemUncheckSelected])

    const openDialogCheck = item => {
        setItemCheckSelected(item)
    }

    const closeDialogCheck = () => {
        setItemCheckSelected({})
        setDialogCheckVisible(false)
    }

    const openDialogUncheck = item => {
        setItemUncheckSelected(item)
    }

    const closeDialogUncheck = () => {
        setItemCheckSelected({})
        setDialogUncheckVisible(false)
    }

    const checkItem = itemQuantidade => {
        let preChecked = { ...checked }
        let preUnchecked = { ...unchecked }

        preChecked[armazem.id] = checked[armazem.id].map(item => {
            if (item.id === itemCheckSelected.id) {
                return ({
                    ...item,
                    quantidade: +item.quantidade + +itemQuantidade
                })
            } else {
                return item
            }
        })

        preUnchecked[armazem.id] = unchecked[armazem.id].map(item => {
            if (item.id === itemCheckSelected.id) {
                return ({
                    ...item,
                    quantidade: +item.quantidade - +itemQuantidade
                })
            } else {
                return item
            }
        })


        dispatch(setCheckedItensArmazem(preChecked))
        dispatch(setUncheckedItensArmazem(preUnchecked))
        dispatch(loadingCheckItensArmazem(false))
        closeDialogCheck()
    }

    const uncheckItem = itemQuantidade => {
        let preChecked = { ...checked }
        let preUnchecked = { ...unchecked }

        preChecked[armazem.id] = checked[armazem.id].map(item => {
            if (item.id === itemUncheckSelected.id) {
                return ({
                    ...item,
                    quantidade: +item.quantidade - +itemQuantidade
                })
            } else {
                return item
            }
        })

        preUnchecked[armazem.id] = unchecked[armazem.id].map(item => {
            if (item.id === itemUncheckSelected.id) {
                return ({
                    ...item,
                    quantidade: +item.quantidade + +itemQuantidade
                })
            } else {
                return item
            }
        })


        dispatch(setCheckedItensArmazem(preChecked))
        dispatch(setUncheckedItensArmazem(preUnchecked))
        dispatch(loadingCheckItensArmazem(false))
        closeDialogUncheck()
    }

    const reset = () => {
        let preChecked = { ...checked }
        let preUnchecked = { ...unchecked }

        preChecked[armazem.id] = itens.map(item => ({
            ...item,
            quantidade: 0
        }))
        preUnchecked[armazem.id] = itens

        dispatch(setCheckedItensArmazem(preChecked))
        dispatch(setUncheckedItensArmazem(preUnchecked))
    }

    return (
        <Container>
            <Header title={armazem.nome} subtitle='Checagem' rightAction={reset} rightIcon='refresh'/>
            <Content padder contentContainerStyle={
                (isLoading || (!isLoading && checked.length === 0 && unchecked.length === 0)) && styles.content
            }>
                {!isLoading && unchecked[armazem.id] && unchecked[armazem.id].length != 0 && checked[armazem.id] && checked[armazem.id].length != 0 &&
                    <>
                        <Card >
                            <CardItem header bordered >
                                <Text style={styles.cardHeaderText}>ITENS PENDENTES</Text>
                            </CardItem>
                            {unchecked[armazem.id] && unchecked[armazem.id].map(item => {
                                if (item.quantidade > 0) {
                                    return (
                                        <CardItem key={item.id}>
                                            <View style={styles.textView}>
                                                <Text style={styles.nameText}>
                                                    {item.nome}
                                                </Text>
                                                <Text style={styles.quantityText}>
                                                    {item.quantidade} {item.grandeza}
                                                </Text>
                                            </View>
                                            <View style={styles.cardButtonView}>
                                                <Button
                                                    style={styles.buttonEdit}
                                                    onPress={() => openDialogCheck(item)}
                                                    color={Colors.editIconColor}
                                                >
                                                    <MaterialCommunityIcons
                                                        name='check'
                                                        size={25}
                                                        color={Colors.editIconColor}
                                                    />
                                                </Button>
                                            </View>
                                        </CardItem>
                                    )
                                }
                            })}
                        </Card>
                        <Card>
                            <CardItem header bordered >
                                <Text style={styles.cardHeaderText}>ITENS AVALIADOS</Text>
                            </CardItem>
                            {checked[armazem.id] && checked[armazem.id].map(item => {
                                if (item.quantidade > 0) {
                                    return (
                                        <CardItem key={item.id}>
                                            <View style={styles.textView}>
                                                <Text style={styles.nameText}>
                                                    {item.nome}
                                                </Text>
                                                <Text style={styles.quantityText}>
                                                    {item.quantidade} {item.grandeza}
                                                </Text>
                                            </View>
                                            <View style={styles.cardButtonView}>
                                                <Button
                                                    style={styles.buttonEdit}
                                                    onPress={() => openDialogUncheck(item)}
                                                    color={Colors.editIconColor}
                                                >
                                                    <MaterialCommunityIcons
                                                        name='close'
                                                        size={25}
                                                        color={Colors.editIconColor}
                                                    />
                                                </Button>
                                            </View>
                                        </CardItem>
                                    )
                                }
                            })}
                        </Card>
                    </>
                }
                {/* {!isLoading && itensArmazem.length === 0 && searchText.length === 0 &&
                    <Text style={styles.title}>Ainda não há itens cadastrados nesse armazém!</Text>
                } */}
                {/* {!isLoading && itensArmazem.length === 0 && searchText.length > 0 &&
                    <Text style={styles.title}>
                        Item
                        <Text style={styles.highlight}> {searchText} </Text>
                        não encontrado nesse armazém!
                    </Text>
                } */}
                {isLoading && <Spinner color={Colors.spinnerColor} />}
                <DialogCheck
                    dialogVisible={dialogCheckVisible}
                    closeDialog={closeDialogCheck}
                    item={itemCheckSelected}
                    checkItem={checkItem}
                />
                <DialogUncheck
                    dialogVisible={dialogUncheckVisible}
                    closeDialog={closeDialogUncheck}
                    item={itemUncheckSelected}
                    uncheckItem={uncheckItem}
                />
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Colors.cardBackgroundColor,
        fontFamily: 'Roboto',
        textAlign: 'center'
    },
    highlight: {
        fontFamily: 'Roboto_medium',
        color: Colors.highlight
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    cardHeaderText: {
        color: Colors.headerBackgroundColor.backgroundColor
    },
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
})