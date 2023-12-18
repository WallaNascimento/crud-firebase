import React, { useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { doc, setDoc, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../src/services/conexao';

export default function Register({ navigation }) {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    function createWithId() {
        setDoc(doc(db, "users", "1"), {
            name: name,
            email: email,
            password: password
        }).then(() => {
            Alert.alert("Usuário cadastrado com sucesso");
        }).catch((error) => {
            Alert.alert("Deu erro: " + error);
        });
    }

    function createAutoId(){
        addDoc(collection(db, "users"), {
            name: name,
            email: email,
            password: password
        }).then(() => {
            Alert.alert("Usuário cadastrado com sucesso");
        }).catch((error) => {
            Alert.alert("Deu erro: " + error);
        })
    }

    function updateData() {
        updateDoc(doc(db, "users", "1"), {
            name: name,
            email: email,
            password: password
        }).then(() => {
            Alert.alert("Usuário alterado com sucesso");
        }).catch((error) => {
            Alert.alert("Deu    erro: " + error);
        })
    }
        
    function deleteData() {
        deleteDoc(doc(db, "users", "1"));
    }

 return (
    <View style={styles.view}>
        <Image 
            source={require('../../images/support.png')} 
            style={styles.image} 
        />
        <Text style={styles.header}>Cadastro de usuário</Text>

        <TextInput 
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Digite seu nome..."
            placeholderTextColor="#FFF"
        />

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
            style={styles.button}
            onPress={createAutoId}
        >
            <Text style={styles.txtButton}>Cadastrar</Text>
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