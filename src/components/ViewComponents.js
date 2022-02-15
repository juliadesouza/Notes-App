import React, { useRef, useState } from 'react'
import { Text, TextInput, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/Ionicons'

const ViewName = ({ name }) => {
    return (
        <View style={styles.component}>
            <Text style={styles.label}>NOME</Text>
            <Text style={styles.nameContent}>{name}</Text>
        </View>
    )
}

const ViewDescription = ({ description }) => {
    return (
        <View style={styles.component}>
            <Text style={styles.label}>DESCRIÇÃO</Text>
            <Text style={styles.descriptionContent}>{description.length > 0 ? description : "Sem descrição"}</Text>
        </View>
    )
}

const ViewPriority = ({ priority }) => {
    return (
        <View style={styles.component}>
            <Text style={styles.label}>PRIORIDADE</Text>
            <View style={styles.textBox}>
                <Picker
                    selectedValue={priority}
                >
                    <Picker.Item label={priority} value={priority} />
                </Picker>
            </View>
        </View>
    )
}

const ViewDate = ({ date }) => {
    return (
        <View style={styles.component}>
            <Text style={styles.label}>DATA</Text>
            <View style={styles.viewWithIcon}>
                <Text style={[styles.textBox, { flex: 9, height: 50, textAlignVertical: 'center' }]}>{date.length > 0 ? date : "00/00/0000"}</Text>
                <Icon name="calendar-sharp" size={20} color="black" style={{ flex: 1, marginStart: 8 }} />
            </View>
        </View>
    )
}

// Esse input é utilizado tanto pela NoteList, para exibir a lista de compras no card de cada note, 
// quantos pela ListView, para exibir todos os dados da note clicada. Como nao sao exatamente iguais as 
// exibico
const ViewShoppingList = ({ shoppingList, visible, flex }) => {
    return (
        <View style={visible ? styles.component : null}>
            {visible ? <Text style={styles.label}>LISTA DE COMPRAS</Text> : null}
            {
                visible && shoppingList.length === 0 ? <Text style={{ flex: flex, color: '#191919' }}>Lista vazia</Text> :
                    shoppingList.map((item, i) => {
                        return (
                            <View key={i} style={[styles.viewWithIcon]}>
                                <Icon name="square-outline" size={20} color="black" style={{ flex: 1 }} />
                                <Text style={{ flex: flex, color: '#191919' }}>{item}</Text>
                            </View>
                        )
                    })
            }
        </View>
    )
}

const ViewPhotoAndFile = ({ file }) => {
    return (
        <View style={styles.component}>
            <Text style={styles.label}>ARQUIVO/IMAGEM</Text>
            <Text style={{ color: '#191919', fontSize: 14, marginTop: 5 }}>{file.name ? file.name : "Nenhum(a) arquivo/imagem anexada"} </Text>
        </View>
    )
}

const ViewColor = ({ color }) => {
    let colorName

    if (color === "#FFF3F3") colorName = 'Rosa'
    else if (color === "#EAF1FF") colorName = 'Azul'
    else if (color === "#E4FFEF") colorName = 'Verde-água'
    else colorName = 'Básico'

    return (
        <View style={styles.component}>
            <Text style={styles.label}>COR</Text>
            <View style={[styles.inputText, { backgroundColor: color }]}>
                <Picker
                    style={{ backgroundColor: color }}
                    selectedValue={color}
                >
                    <Picker.Item label={colorName} value={color} style={{ color: "black", backgroundColor: color }} />
                </Picker>
            </View>
        </View>
    )
}


const ViewTags = ({ tags }) => {

    return (
        <View style={styles.component}>
            <Text style={styles.label}>ADICIONAR TAGS</Text>
            <View style={styles.tagsBox}>
                {
                    tags.map((currentTag, index) => (
                        <View style={[styles.tag]} key={index}>
                            <Text style={{ color: '#191919' }}>{currentTag}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export { ViewName, ViewDescription, ViewPriority, ViewDate, ViewShoppingList, ViewPhotoAndFile, ViewColor, ViewTags }

const styles = StyleSheet.create({
    component: {
        marginBottom: 30,
    },
    label: {
        fontSize: 12,
        lineHeight: 18,
        letterSpacing: 0.16,
        color: '#8D8D8D',
        marginBottom: 6
    },
    nameContent: {
        fontSize: 22,
        letterSpacing: 0.16,
        color: '#161616',
    },
    descriptionContent: {
        fontSize: 16,
        letterSpacing: 0.16,
        color: '#161616',
    },
    textBox: {
        fontSize: 14,
        backgroundColor: '#F4F4F4',
        borderBottomColor: '#8D8D8D',
        borderBottomWidth: 1,
        paddingStart: 16,
        color: '#161616'
    },
    viewWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagsBox: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        borderBottomColor: '#8D8D8D',
        borderBottomWidth: 1,
        height: 50,
    },
    tag: {
        backgroundColor: "#E0E0E0",
        marginTop: 10,
        marginLeft: 5,
        padding: 5,
        borderRadius: 12,
        color: "#161616",
        alignSelf: "flex-start"
    },

})