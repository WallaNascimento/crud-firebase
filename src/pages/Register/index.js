import React, { useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getDocs, collection, deleteDoc, doc ,addDoc} from 'firebase/firestore';

import { createUserWithEmailAndPassword} from 'firebase/auth';

import { auth } from '../../services/conexao';
import { db } from '../../services/conexao';
export default function Register({ navigation }) {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // async faz a função executar em segundo plano
    async function createUser(){
        //await faz o corpo da função ser executada em primeiro plano
        await createUserWithEmailAndPassword(auth,email,password)
        //tryCach de promise
        .then( value => { return value.user.uid } )
        .catch(error => alert(error))
    }

    async function createAutoId(){
        const id = await createUser();
        await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            password: password
        }).then(() => {
           alert("Usuário cadastrado com sucesso como ID: "+id);
           navigation.navigate('Home')
        }).catch((error) => {
            alert("Deu erro: " + error);
        })
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
            onPress={() => createAutoId()}
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