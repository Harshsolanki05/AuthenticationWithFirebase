import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';

export default AuthwithOtp = () => {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [phone, setPhone] = useState(null);
    const [code, setCode] = useState('');
    const [user, setUser] = useState('');

    function onAuthStateChanged(user) {
        if (user) {
            setUser(user);
            console.log(user);
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            //
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    useEffect(() => {

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }
    async function confirmCode() {
        try {
            await confirm.confirm(code);
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    const logoutuser = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        setUser('')
    }

    if (user) {

        return (
            <>
                <Text>Welcome , you are loggin {user.phoneNumber}</Text>
                <Button title='sign out' onPress={logoutuser}></Button>
            </>
        )
    } else {

        if (!confirm) {
            return (
                <>
                    <TextInput placeholder='Enter your number' onChangeText={(e) => setPhone(e)}></TextInput>
                    <Button title="Phone Number Sign In" onPress={() => signInWithPhoneNumber('+91' + phone)} />

                </>
            )
        }
        return (
            <>
                <View> 
                    <TextInput value={code} onChangeText={text => setCode(text)} />
                    <Button title="Confirm Code" onPress={() => confirmCode()} />
                </View>
            </>
        )
    }
}