import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import DataHandler from '../data/DataHandler'
import MasonryList from '@react-native-seoul/masonry-list'
import { InputShoppingList } from '../components/ViewComponents'

export default ({ navigation, route }) => {

    setNavigationOptions(navigation)

    const [notes, setNotes] = useState([])

    useEffect(() => {
        return navigation.addListener('focus', () => {
            DataHandler.getNotes().then((value) => setNotes(value))
        })
    }, [route])

    const showDefaultMessage = () => {
        return (
            <View>
                <Image
                    style={styles.noNotesIcon}
                    source={require('../assets/noNotesIcon.png')}
                />
                <Text style={styles.title}>Não tem nenhuma nota aqui</Text>
                <Text style={styles.subtitle}>Crie notas e você poderá vê-las aqui.</Text>
            </View>
        )
    }

    const showNotes = (notes, renderItem) => {
        return (
            <MasonryList
                keyPrefix={(item) => item.id}
                data={notes}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={(item) => item.id}
            />
        )
    }

    const renderItem = ({ item }) => {
        const { noteName, noteDescription, noteShoppingList, noteColor } = item
        return (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate("NoteView", item)}>
                <View style={[styles.noteCard, { backgroundColor: noteColor }]}>
                    <Text style={styles.noteTitle}>{noteName}</Text>
                    {noteDescription != "" || noteDescription.length > 0 ? <Text style={styles.noteDescription}>{noteDescription}</Text> : null}
                    {noteShoppingList.length > 0 ? <InputShoppingList shoppingList={noteShoppingList} visible={false} flex={4} /> : null}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {notes.length < 1 ? showDefaultMessage() : showNotes(notes, renderItem)}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate("NoteForm")}>
                    <Text style={styles.btnCreate}>+</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const setNavigationOptions = (navigation) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Notas",
            headerRight: () => {
                return (
                    <View style={styles.menubarIcons}>
                        <Icon.Button
                            name='search'
                            backgroundColor="transparent"
                            underlayColor="transparent"
                        />
                        <Icon.Button
                            name='add'
                            backgroundColor="transparent"
                            underlayColor="transparent"
                            onPress={() => navigation.navigate("NoteForm")}
                        />
                    </View>
                )
            }
        });
    });
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    body: {
        flex: 1,
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
    btnCreate: {
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
    noteCard: {
        padding: 10,
        justifyContent: 'space-between',
        margin: 5
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.16,
        color: '#161616'
    },
    noteDescription: {
        fontSize: 12,
        fontWeight: '400',
        letterSpacing: 0.16,
        color: '#161616'
    },
})