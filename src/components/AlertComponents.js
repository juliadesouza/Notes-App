import React, { useState, useEffect, useCallback } from 'react'
import { Alert } from 'react-native'

const AlertCreateSuccessful = ({ note, navigation }) =>
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

const AlertConfirmDelete = ({ note, navigation }) =>
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

const AlertDeleteSucessfull = ({ note, navigation }) =>
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

export { AlertCreateSuccessful, AlertConfirmDelete, AlertDeleteSucessfull }