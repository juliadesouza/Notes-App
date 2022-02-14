import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ProgressViewIOSComponent, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { InputName, InputDescription, SelectPriority, InputDate, InputShoppingList, UploadedPhotoAndFile, SelectColor, InputTags } from '../components/ViewComponents'
import DataHandler from '../data/DataHandler'

export default ({ navigation, route }) => {
    const { id, noteName, noteDescription, notePriority, noteDate, noteShoppingList, noteDoc, noteColor, noteTags } = route.params
    setNavigationOptions(navigation, route)

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.body}>
                <InputName name={noteName} />
                <InputDescription description={noteDescription} />
                <SelectPriority priority={notePriority} />
                <InputDate date={noteDate} />
                <InputShoppingList shoppingList={noteShoppingList} visible={true} flex={9} />
                <UploadedPhotoAndFile file={noteDoc} />
                <SelectColor color={noteColor} />
                <InputTags tags={noteTags} />
            </ScrollView>
        </View>
    )
}

const setNavigationOptions = (navigation, route) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerRight: () => {
                return (
                    <View style={styles.menubarIcons}>
                        <Icon.Button
                            name='trash-outline'
                            backgroundColor="transparent"
                            underlayColor="transparent"
                            onPress={() => showAlertDelete(route.params, navigation)}
                        />
                        <Icon.Button
                            name='pencil'
                            backgroundColor="transparent"
                            underlayColor="transparent"
                            onPress={() => navigation.navigate("NoteEdit", route.params)}
                        />
                    </View>
                )
            },
        });
    }, [navigation, route]);
}

const showAlertDelete = (note, navigation) =>
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
                        .then(response => showAlertDeletedSucessfull(note, navigation))
                }
            },
        ],
        { cancelable: false }
    );

const showAlertDeletedSucessfull = (note, navigation) =>
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
        backgroundColor: "#FFFFFF"
    },
    body: {
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
    },
    footer: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: "#0F62FE"
    },
    btnCriarNota: {
        color: 'white',
        fontSize: 25,
    },
    menubarIcons: {
        flexDirection: 'row'
    },
    noNotesIcon: {
        width: 91,
        height: 128,
        marginBottom: 16
    },
    title: {
        fontSize: 20
    },
    subtitle: {
        fontSize: 16
    },
})
