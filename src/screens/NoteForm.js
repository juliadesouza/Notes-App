import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { InputName, InputDescription, SelectPriority, InputDate, InputShoppingList, UploadPhotoAndFile, SelectColor, InputTags } from '../components/FormComponents'
import DataHandler from '../data/DataHandler'

export default ({ navigation, route }) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("Urgente")
    const [date, setDate] = useState("")
    const [color, setColor] = useState("#F8F8F8")
    const [item, setItem] = useState("") // a single item in shopping list
    const [numItems, setNumItems] = useState(1) // number of items in shopping list
    const [itemList, setItemList] = useState([]) // shopping list containing all items
    const [file, setFile] = useState("")
    const [tag, setTag] = useState("") // a single tag
    const [tagList, setTagList] = useState([]) // a list of all tags added

    useEffect(() => {
        return navigation.addListener('focus', () => {
            setName("")
            setDescription("")
            setPriority("Urgente")
            setDate("")
            setColor("#F8F8F8")
            setItem("")
            setNumItems(1)
            setItemList([])
            setFile("")
            setTag("")
            setTagList([])
        })
    }, [])

    setNavigationOptions(navigation, route)

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.body}>
                <InputName name={name} setName={setName} />
                <InputDescription description={description} setDescription={setDescription} />
                <SelectPriority priority={priority} setPriority={setPriority} />
                <InputDate date={date} setDate={setDate} />
                <InputShoppingList item={item} setItem={setItem} numItems={numItems} setNumItems={setNumItems} itemList={itemList} setItemList={setItemList} />
                <UploadPhotoAndFile file={file} setFile={setFile} />
                <SelectColor color={color} setColor={setColor} />
                <InputTags tag={tag} setTag={setTag} tagList={tagList} setTagList={setTagList} />

            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={async () => {
                    createNote(name, description, priority, date, itemList, file, color, tagList, navigation)
                }}>
                    <Text style={styles.btnCreateNote}>Criar nota</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const setNavigationOptions = (navigation, route) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Criar nota",
            headerBackVisible: false,
            headerRight: () => {
                return (
                    <View style={styles.menubarIcons}>
                        <Icon.Button
                            name='close-outline'
                            backgroundColor="transparent"
                            underlayColor="transparent"
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                )
            }
        });
    });
}

const createNote = (name, description, priority, date, itemList, file, color, tagList, navigation) => {
    if (name.trim() != "") {
        const note = {
            id: new Date().getTime(),
            noteName: name,
            noteDescription: description,
            notePriority: priority,
            noteDate: date,
            noteShoppingList: itemList,
            noteDoc: file,
            noteColor: color,
            noteTags: tagList
        }
        DataHandler.storeNote(note)
            .then(response => showAlertCreateSuccessful(note, navigation))
    } else {
        console.warn("O campo NOME ?? obrigat??rio.")
    }
}

const showAlertCreateSuccessful = (note, navigation) =>
    Alert.alert(
        "",
        "Nota criada com sucesso!",
        [
            {
                text: "VER NOTA",
                onPress: () => navigation.navigate("NoteView", note),
                style: "defaul",
            },
            {
                text: "CRIAR OUTRA",
                onPress: () => {
                    navigation.goBack()
                    navigation.push("NoteForm")
                }
                ,
                style: "defaul",
            },
        ],
    );



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFEFEF"
    },
    body: {
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
    },
    footer: {
        backgroundColor: '#0F62FE',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48
    },
    btnCreateNote: {
        color: 'white',
        fontSize: 16
    }
})
