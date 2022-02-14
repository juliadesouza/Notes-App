import React, { useRef, useState } from 'react'
import { Text, TextInput, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/Ionicons'
import DocumentPicker from 'react-native-document-picker';

const InputName = ({ name, setName }) => {
    return (
        <View style={styles.component}>
            <Text style={styles.label}>Nome da nota (obrigatório)</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Insira"
                style={styles.inputText}
            />
        </View>
    )
}

const InputDescription = ({ description, setDescription }) => {
    return (
        <View style={styles.component}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.label}>Descrição</Text>
                <Text style={styles.label}>{description.length}/240</Text>
            </View>
            <TextInput
                multiline
                value={description}
                onChangeText={setDescription}
                placeholder="Insira"
                maxLength={240}
                style={[styles.inputText, styles.description]}
            />
        </View>
    )
}

const SelectPriority = ({ priority, setPriority }) => {
    return (
        <View style={styles.component}>
            <Text style={styles.label}>Prioridade</Text>
            <View style={styles.inputText}>
                <Picker
                    style={styles.inputText}
                    selectedValue={priority}
                    onValueChange={setPriority}
                >
                    <Picker.Item label='Urgente' value='Urgente' />
                    <Picker.Item label='Alta' value='Alta' />
                    <Picker.Item label='Média' value='Média' />
                    <Picker.Item label='Baixa' value='Baixa' />
                </Picker>
            </View>
        </View>
    )
}

const InputDate = ({ date, setDate }) => {
    return (
        <View style={styles.component}>
            <Text style={styles.label}>Data</Text>
            <View style={styles.inputTextWithIcon}>
                <TextInput
                    value={date}
                    onChangeText={setDate}
                    placeholder="mm/dd/yyyy"
                    style={[styles.inputText, { flex: 9 }]}
                />
                <Icon name="calendar-sharp" size={20} color="black" style={{ flex: 1, marginStart: 8 }} />
            </View>
        </View>
    )
}

/* 
    UseRef: manter uma variavel mutavel
    useRef pode ser usado para guardar essa referência, que pode ser acessada em 
    outro momento para mudar o estado desse componente sem precisar renderizar 
    novamente.
*/ 
const InputShoppingList = ({ item, setItem, numItems, setNumItems, itemList, setItemList }) => {
    const refItems = useRef([item]) 

    const setItemValue = (i, itemUpdated) => {
        const items = refItems.current
        items[i] = itemUpdated
        setItem(itemUpdated)
        setItemList(items)
    }

    const addItem = () => {
        refItems.current.push('')
        setNumItems(numItems + 1)
    }

    if (itemList.length > 0) {
        for (let i = 0; i < itemList.length; i++) {
            const items = refItems.current
            items[i] = itemList[i]
        }
    }

    const inputItemList = []
    for (let i = 0; i < numItems; i++) {
        inputItemList.push(
            <View key={i} style={[styles.inputTextWithIcon]}>
                <Icon name="square-outline" size={20} color="black" style={{ flex: 1 }} />
                <TextInput
                    style={{ flex: 9, height: 20, padding: 2 }}
                    onChangeText={itemUpdated => (
                        setItemValue(i, itemUpdated))}
                    value={refItems.current[i]}
                    placeholder="Novo item"
                    placeholderTextColor="#161616"
                />
            </View>
        )
    }

    return (
        <View style={styles.component}>
            <Pressable onPress={addItem}>
                {inputItemList}
                <Text style={styles.btnAddItem}>Adicionar item</Text>
            </Pressable>
        </View>
    )
}

const UploadPhotoAndFile = ({ file, setFile }) => {
    const selectFile = async () => {
        try {
            const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
            })
            setFile(pickerResult)
        } catch (e) {
            handleError(e)
        }
    }

    return (
        <View style={styles.component}>
            <Text style={styles.label}>Adicionar foto ou arquivo</Text>
            <TouchableOpacity onPress={selectFile}>
                <Text style={styles.btnAdicionarDocs}>Adicione aqui</Text>
            </TouchableOpacity>
            <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{file.name ? file.name : ""}</Text>
        </View>
    )
}

const handleError = (err) => {
    if (DocumentPicker.isCancel(err)) {
        console.warn('Cancelado')
    } else if (isInProgress(err)) {
        console.warn('Multiplas abas estao abertas, apenas a ultima sera considerada.')
    } else {
        throw err
    }
}


const SelectColor = ({ color, setColor }) => {
    return (
        <View style={styles.component}>
            <Text style={styles.label}>Cor</Text>
            <View style={[styles.inputText, { backgroundColor: color }]}>
                <Picker
                    style={{ backgroundColor: color }}
                    selectedValue={color}
                    onValueChange={(itemValue) =>
                        setColor(itemValue)
                    }
                >
                    <Picker.Item label='Básico' value='#F8F8F8' style={{ color: "black", backgroundColor: "#F8F8F8" }} />
                    <Picker.Item label='Rosa' value='#FFF3F3' style={{ color: "black", backgroundColor: "#FFF3F3" }} />
                    <Picker.Item label='Azul' value='#EAF1FF' style={{ color: "black", backgroundColor: "#EAF1FF" }} />
                    <Picker.Item label='Verde-água' value='#E4FFEF' style={{ color: "black", backgroundColor: "#E4FFEF" }} />
                </Picker>
            </View>
        </View>
    )
}


const InputTags = ({ tag, setTag, tagList, setTagList }) => {
    const showAddedTags = () => {
        return tagList.map((currentTag, index) => (
            <View style={[styles.tag]} key={index}>
                <Text>{currentTag}</Text>
            </View>
        ))
    }

    const validateTag = (newTag) => {
        if (newTag.includes(';') && newTag != "") {
            setTagList((list) => {
                const str = newTag.slice(0, -1)
                return list.concat(str)
            })
            setTag("")
        } else {
            setTag(newTag)
        }
    }

    return (
        <View style={styles.component}>
            <Text style={styles.label}>Adicionar Tags</Text>
            <View style={styles.tagContainer}>
                <View style={styles.tagsTyped}>
                    {showAddedTags()}
                </View>
                <TextInput
                    value={tag}
                    onChangeText={validateTag}
                    placeholder="Insira"
                    style={[styles.inputText, { flex: 1 }]}
                />
            </View>
        </View>
    )
}

export { InputName, InputDescription, SelectPriority, InputDate, InputShoppingList, UploadPhotoAndFile, SelectColor, InputTags }

const styles = StyleSheet.create({

    component: {
        marginBottom: 30
    },
    label: {
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 0.16,
        color: '#161616',
        marginBottom: 6
    },
    inputText: {
        fontSize: 14,
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#8D8D8D',
        borderBottomWidth: 1,
        paddingStart: 16,
    },
    inputTextWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    description: {
        height: 150,
        textAlignVertical: 'top'
    },
    btnAddItem: {
        marginTop: 10,
        color: '#0F62FE',
        alignSelf: "flex-start"
    },
    btnAdicionarDocs: {
        color: "#161616",
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#161616",
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    tagsTyped: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
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
    listItem: {

    }

})