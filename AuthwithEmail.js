import { Button, StyleSheet, Text, TextInput, View, } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'

const AuthwithEmail = () => {

    const [initializing, setInitializing] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();

    // Handle user state changes

    function onAuthStateChanged(user) {
        console.log(user);
        setUser(user);
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const btnRegister = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    const logoutuser = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }
    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ height: 250, width: 350, justifyContent: "space-around", alignSelf: "center", borderRadius: 10, borderWidth: 2 }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, color: 'black' }}>Register</Text>
                    <TextInput placeholder='Enter email' onChangeText={(e) => setEmail(e)} style={{ width: '80%', alignSelf: "center", borderWidth: 2, borderColor: 'pink', paddingLeft: 10 }}></TextInput>
                    <TextInput placeholder='Enter Password' onChangeText={(e) => setPassword(e)} style={{ width: '80%', alignSelf: "center", borderWidth: 2, borderColor: 'pink', paddingLeft: 10 }}></TextInput>
                    <View style={{width:"80%",alignSelf:"center",marginBottom:5}}>
                        <Button onPress={btnRegister} title='Register now'></Button>
                    </View>
                </View>
            </View >
        )
    } else {
        return (
            <>
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: "center" }}>
                    <View style={{ height: 150, borderColor: "black", borderWidth: 2, padding: 20, borderRadius: 10, justifyContent: 'space-around' }}>
                        <Text style={{ fontSize: 17, color: 'black', textAlign: "center" }}>User is loggin</Text>
                        <Text style={{ fontSize: 17, color: 'black' }}> Login User-id :- {user.email}</Text>
                        <Button title='log out' onPress={logoutuser}></Button >
                    </View>
                </View>
            </>
        )
    }
}

export default AuthwithEmail

const styles = StyleSheet.create({})