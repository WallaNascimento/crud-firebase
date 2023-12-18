import React, { useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Login() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

 return (
    <View style={styles.view}>
        <Image 
            source={require('../../images/404.png')} 
            style={styles.image} 
        />
        <Text style={styles.header}>Login</Text>

        <TextInput 
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Digite seu email..."
            placeholderTextColor="#FFF"
        />
        
        <TextInput 
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Digite seu password..."
            placeholderTextColor="#FFF"
        />

        <TouchableOpacity
            onPress={false}
            style={styles.button}
        >
            <Text style={styles.txtButton}>Entrar</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: '#000',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 15,
    },
    header: {
        fontSize: 34,
        color: '#FFF',
        fontWeight: 'bold'
    },
    input: {
        width: '90%',
        height: 50,
        
        padding: 15,
        marginVertical: 10,
        
        borderColor: '#111',
        borderWidth: 1,
        borderRadius: 10,
        
        backgroundColor: '#222',
        color: '#FFF',
        fontSize: 20
    },
    button: {
        backgroundColor: '#19abfd',
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10
    },
    txtButton: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
})