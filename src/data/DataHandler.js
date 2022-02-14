import AsyncStorage from '@react-native-async-storage/async-storage'

const storeNote = async (newNote) => {
    try {
        let savedNotes = []
        const jsonSavedNotes = await AsyncStorage.getItem('notes')

        if (jsonSavedNotes != null) {
            savedNotes = JSON.parse(jsonSavedNotes)
        }
        savedNotes.push(newNote)

        await AsyncStorage.setItem('notes', JSON.stringify(savedNotes))
    } catch (e) {
        console.warn(`Erro ao criar nota: ${e}`)
    }
}

const getNotes = async () => {
    try {
        return AsyncStorage.getItem('notes')
            .then(response => {
                if (response)
                    return Promise.resolve(JSON.parse(response));
                else
                    return Promise.resolve([])
            })
    } catch (e) {
        console.warn(`Erro ao obter notas: ${e}`)
    }
}

const deleteNote = async (id) => {
    try {
        let savedNotes = await getNotes()
        const i = await savedNotes.findIndex(note => note.id === id)
        savedNotes.splice(i, 1)
        await AsyncStorage.setItem('notes', JSON.stringify(savedNotes))
    } catch (e) {
        console.warn(`Erro ao deletar nota: ${e}`)
    }
}

const updateNote = async (newNote, id) => {
    try {
        let savedNotes = await getNotes()
        const i = await savedNotes.findIndex(note => note.id === id)
        savedNotes[i] = newNote
        await AsyncStorage.setItem('notes', JSON.stringify(savedNotes))
    } catch (e) {
        console.warn(`Erro ao atualizar nota: ${e}`)
    }
}



module.exports = {
    storeNote,
    getNotes,
    deleteNote,
    updateNote
}
