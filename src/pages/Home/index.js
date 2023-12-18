import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { getDocs, collection, deleteDoc, doc, getDoc,updateDoc } from 'firebase/firestore';
import { db,auth } from '../../services/conexao'
import { signInWithEmailAndPassword,updateEmail, updatePassword } from 'firebase/auth';
    
export default function Home({navigation}) {
    const [ data, setData ] = useState([]);

    //salva o estado que vai sendo sincronizado com o sistema externo, buscando os usuários
    useEffect(() => {
        //getdocs busca os dados que são orrganizados em documentos no fb
        getDocs(collection(db, 'users')).then(
            //docSnap contem as chaves de acesso de documentos numa colection
            (docSnap) => {
                const users = [];
                //para todos os documentos
                docSnap.forEach((doc) => {
                    users.push({ 
                        ...doc.data(), 
                        id: doc.id
                    })
                })
                setData(users);
            });
    }, []);
    
    function deleteData(id) {
        deleteDoc(doc(db, "users", id)).then(() => {
            alert('Usuário deletado com sucesso!')
           
          });
    
    }

    function atualizarCredenciais( novoEmail, novaSenha){
        //currentUser é o usuário logado
        updateEmail(auth.currentUser, novoEmail).then(() => {
            alert('email atualizado')
            //return 'sucesso';
          }).catch((error) => {
            
            alert(error)
            return 'error';
          });

        updatePassword(auth.currentUser, novaSenha).then(() => {
            alert('senha atualizada')
            return 'sucesso';
          }).catch((error) => {
            alert(error)
            return 'error';
          }); 
            return 'sucesso';
        }

    function update(id,name,email,pass){
        updateDoc(doc(db, "users", id), {
            name: name,
            email: email,
            password: pass
        }).then(() => {
           alert("Usuário alterado com sucesso");
           return 'sucesso';
        }).catch((error) => {
            alert("Deu    erro: " + error);
            return 'error';
        })
    }

    function updateData(id){
        getDoc(doc(db, 'users',id)).then(
            (snap) => {
                let name = prompt(' digite seu nome ',snap.data().name)
                let email =  prompt(' digite seu email ',snap.data().email)
                let pass = prompt(' digite sua senha ',snap.data().password)
                var credenciais =  atualizarCredenciais(email,pass)

                if (credenciais == 'sucesso'){
                    update(id,name,email,pass)
                }
                
            }
        
            ).catch( error => { alert(error)})   
        }

 return (
    <View style={styles.view}>
        <View style={styles.head}>
            <Text style={styles.header}>Lista de usuários</Text>    
        </View>
         {// route.params.nome? 
         
         //<Text> Bem vindo route.params.name </Text>
         //: <Text>  </Text> 
         
         }   
        <FlatList
            data={data}
            renderItem={
                ({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.data}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.email}>{item.email}</Text>
                        </View>
                        
                        <View style={styles.itemButtons}>
                            <TouchableOpacity 
                                onPress={() => updateData(item.id)}
                            >
                                <Text style={styles.txtAddUser}>Atualizar</Text>

                                <FontAwesome5 name="pencil-alt" size={24} color="black" />
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                onPress={() => deleteData(item.id)}
                            >
                                <Text style={styles.txtAddUser}>Deletar</Text>

                                <AntDesign name="delete" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}
            ListEmptyComponent={() => (
                <Text style={{textAlign: 'center', color: '#fff'}}>
                    Nenhum usuário cadastrado!
                </Text>
            )}
        />

        <TouchableOpacity style={styles.addUser} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.txtAddUser}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addUser} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.txtAddUser}>login</Text>
        </TouchableOpacity>
        
    </View>
  );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 25,
        backgroundColor: '#000',
        width: '100%',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 25
    },
    header:{
        color: '#FFF',
        fontSize: 32,
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
    item: {
        height: 100,
        backgroundColor: '#FFF',
        elevation: 1,
        marginVertical: 5,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    data: {
        flex: 3,
    },
    itemButtons: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent:'space-between',
        flex: 1,
    },
    id: {
        fontSize: 14,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    email: { 
        color: '#000',
        fontSize: 16,
    },
    addUser: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        elevation: 10,
        backgroundColor: '#19abfd',
        borderRadius: 50,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtAddUser: {
        fontSize: 32,
        color: '#FFF'
    }
})