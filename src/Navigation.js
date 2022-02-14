import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NoteList from './screens/NoteList'
import NoteForm from './screens/NoteForm'
import NoteView from './screens/NoteView'
import NoteEdit from './screens/NoteEdit'


const Stack = createNativeStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='NoteList' screenOptions={screenOptions}>
                <Stack.Screen name='NoteList' component={NoteList} />
                <Stack.Screen name='NoteForm' component={NoteForm} />
                <Stack.Screen name='NoteView' component={NoteView} />
                <Stack.Screen name='NoteEdit' component={NoteEdit} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const screenOptions = {
    headerMode: 'screen',
    headerStyle: {
        backgroundColor: '#0F62FE',
        height: '160',
        padding: 600
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
        fontWeight: '300',
        padding: '100'
    },
}