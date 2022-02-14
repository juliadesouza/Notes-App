import React, { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { InputName, InputDescription, SelectPriority, InputDate, InputShoppingList, UploadPhotoAndFile, SelectColor, InputTags } from '../components/FormComponents'
import Icon from 'react-native-vector-icons/Ionicons'
import DataHandler from '../data/DataHandler'

export default ({ navigation, route }) => {
    const { id, noteName, noteDescription, notePriority, noteDate, noteShoppingList, noteDoc, noteColor, noteTags } = route.params

    const [name, setName] = useState(noteName)
    const [description, setDescription] = useState(noteDescription)
    const [priority, setPriority] = useState(notePriority)
    const [date, setDate] = useState(noteDate)
    const [color, setColor] = useState(noteColor)
    const [tag, setTag] = useState('')
    const [tagList, setTagList] = useState(noteTags)
    const [item, setItem] = useState('')
    const [numItems, setNumItems] = useState(noteShoppingList.length == 0 ? 1 : noteShoppingList.length)
    const [itemList, setItemList] = useState(noteShoppingList)
    const [file, setFile] = useState(noteDoc);

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
                    update(id, name, description, priority, date, itemList, file, color, tagList, navigation)
                }}>
                    <Text style={styles.btnSave}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const setNavigationOptions = (navigation, route) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Editar nota",
            headerBackVisible: false,
            headerRight: () => {
                return (
                    <View style={styles.menubarIcons}>
                        <Icon.Button
                            name='trash-outline'
                            backgroundColor="transparent"
                            underlayColor="transparent"
                            onPress={() => showAlertConfirmDelete(route.params, navigation)}
                        />
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

const update = (id, name, description, priority, date, itemList, file, color, tagList, navigation) => {
    if (name.trim() != "") {
        const note = {
            id: id,
            noteName: name,
            noteDescription: description,
            notePriority: priority,
            noteDate: date,
            noteShoppingList: itemList,
            noteDoc: file,
            noteColor: color,
            noteTags: tagList
        }
        DataHandler.updateNote(note, id)
            .then(response => showAlertUpdateSuccessful(note, navigation))
    } else {
        console.warn("O campo NOME é obrigatório.")
    }
}

const showAlertUpdateSuccessful = (note, navigation) =>
    Alert.alert(
        "",
        "Nota atualizada com sucesso!",
        [
            {
                text: "VER NOTA",
                onPress: () => navigation.navigate("NoteView", note),
                style: "defaul",
            },
            {
                text: "OK",
                onPress: () => navigation.navigate("NoteList"),
                style: "defaul",
            },
        ],
    );


const showAlertConfirmDelete = (note, navigation) =>
    Alert.alert(
        "",
        "Tem certeza que deseja excluir esta nota? Essa ação não poderá ser desfeita.",
        [
            {
                text: "CANCELAR",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "EXCLUIR",
                onPress: () => {
                    DataHandler.deleteNote(note.id)
                        .then(response => showAlertDeleteSuccessfull(note, navigation))
                }
            },
        ],
        { cancelable: false }
    );

const showAlertDeleteSuccessfull = (note, navigation) =>
    Alert.alert(
        "",
        "Nota excluída com sucesso",
        [
            {
                text: "OK",
                onPress: () => navigation.navigate("NoteList", { id: note.id }),
                style: "dafault",
            },
        ],
        { cancelable: false }
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
    btnSave: {
        color: 'white',
        fontSize: 16
    },
    menubarIcons: {
        flexDirection: 'row'
    },
})
