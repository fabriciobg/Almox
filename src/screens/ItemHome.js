import React from 'react'

import { Container, Content, Card, CardItem, Title, Subtitle } from 'native-base'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from 'react-native-vector-icons'


import { Colors } from '../styles'

import Api from '../service/api'

import Header from '../components/Header'



export default ({ navigation }) => {

    // const [items, setItems] = React.useState([])

    // React.useEffect(() => {
    //     const buscarArmazens = async () => {
    //         await Api
    //             .get('/item/list')
    //             .then(resp => {
    //                 setItems(resp.data)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }
    //     buscarArmazens()
    //     console.log('chamando')
    // },[])

    // const [dialogVisible, setDialogVisible] = React.useState(false)

    // const openDialog = () => {
    //     setDialogVisible(true)
    // }

    // const closeDialog = () => {
    //     setDialogVisible(false)
    // }

    // const DismissKeyboard = ({ children }) => (
    //     <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
    //         { children }
    //     </TouchableWithoutFeedback>
    // )

    return (
        <Container>
            <Header title='Itens' />
            <Content padder contentContainerStyle={styles.content}>
                <TouchableOpacity onPress={() => navigation.navigate('ItemRegister')}>
                    <Card style={styles.card}>
                        <CardItem style={styles.cardItem}>
                            <MaterialCommunityIcons name="toolbox" {...Colors.titleTextColor} size={128} />
                            <Title style={styles.text}>
                                CADASTRAR
                                </Title>
                            <Subtitle>
                                ITENS
                                </Subtitle>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.card}>
                        <CardItem style={styles.cardItem}>
                            <MaterialCommunityIcons name="format-list-bulleted" {...Colors.titleTextColor} size={128} />
                            <Title style={styles.text}>
                                CONSULTAR
                                </Title>
                            <Subtitle>
                                ITENS
                                </Subtitle>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    cardItem: {
        marginVertical: 24,
        marginHorizontal: 24,
        backgroundColor: Colors.cardBackgroundColor,
        flexDirection: 'column'
    },
    text: {
        fontFamily: 'Roboto_medium',
        fontSize: 16,
        backgroundColor: Colors.cardBackgroundColor,
        ...Colors.titleTextColor
    },
    contentView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    card: {
        borderRadius: 10,
        backgroundColor: Colors.cardBackgroundColor
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    }
})