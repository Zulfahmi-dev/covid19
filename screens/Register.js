import React, {useState, useEffect } from 'react'
import { 
    View, 
    ScrollView,
    Dimensions,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

import { Text, Input, Modal, Button } from "../components";

import { sizes, colors } from '../constants/theme';
import {server} from '../constants/init';

const {width, height} = Dimensions.get('window')

// const token = '1MNtMnHTUatGJKtlpqNnOGLxi6PRnnD3BtsUdiYM8IfauMHI2Z';

const Register = ({navigation}) => {
    navigation.setOptions({
        title:'Register',
        headerShown:true,
        headerTitleAlign:'center'
    })
    const [modal, setModal] = useState({visible:false, message:'', header:''})
    const [isLoading, setIsLoading] = useState(false)
    const [icons, setIcons] = useState({
        error:<AntDesign name="closecircleo" size={30} color="white"/>,
        success:<AntDesign name="checkcircleo" size={30} color="white"/>,
        picture:<AntDesign name="picture" size={30} color="white"/>,
        form:<AntDesign name="form" size={30} color="white"/>
    })

    const [data, setData] = useState({
        username: "",
        email: "",
        hp:"",
        password:"",
        konfirmasi_password:'',
        isMatch:true
    })


    const onChange = (name, value) => {
        let newData = {...data, [name]:value}
        setData(newData)
    }

    const openModal = (header, message) => {
        setModal({...modal, header, message, visible:true})
    }

    const closeModal = () => {
        setModal({...modal, visible:false})
    }

    const submitData = async () => {
        try {
            setIsLoading(true)

            let dataEmpty = Object.keys(data).filter(item => data[item]=="");

            if (dataEmpty.length>0) {
                setIsLoading(false)
                return openModal(icons.form, 'Data yang anda masukkan belum lengkap. \nSilahkan lengkapi data registrasi')
            }

            const response = await axios.post(`${server.url}/user/register`, {...data});
            if (response.data.status=='success') {
                
                setIsLoading(false)
                resetData()
                return openModal(icons.success, 'Berhasil Melakukan Registrasi')
            }

        } catch (error) {
            setIsLoading(false)
            openModal(icons.error, error)
        }
    }

    const resetData = () => {
        setData({
            username: "",
            email: "",
            hp:"",
            password:"",
            konfirmasi_password:""
        })
    }


    const checkData = () => {

        if (data.konfirmasi_password !== data.password) {
            openModal(icons.error, "Passowrd Doesn't Match!\nTry Again!!")
            return setData({...data, isMatch:false})
        }

        setData({...data, isMatch:true})
    }

    return (
            <ScrollView>
                <SafeAreaView style={styles.container}>
            
                    <View style={styles.form}>
                        <Input 
                            name="username"
                            label="Username"
                            onChange={onChange}
                            value={data.username}
                            style={styles.input}
                            inputType="numeric"
                            placeholder="Masukkan Username"
                        />
                        <Input 
                            name="email"
                            label="email"
                            onChange={onChange}
                            value={data.email}
                            style={styles.input}
                            inputType="default"
                            placeholder="Masukkan Email"
                        />
                        <Input 
                            name="hp"
                            label="hp"
                            onChange={onChange}
                            value={data.hp}
                            style={styles.input}
                            inputType="numeric"
                            placeholder="Masukkan Nomer Hp"
                        />

                        <Input 
                            name="password"
                            label="Password"
                            onChange={onChange}
                            value={data.password}
                            style={styles.input}
                            inputType="default"
                            placeholder="Masukkan Password"
                            secureTextEntry={true}
                        />

                        <Input 
                            name="konfirmasi_password"
                            label="Konfirmasi Password"
                            onChange={onChange}
                            onBlur={checkData}
                            value={data.konfirmasi_password}
                            style={styles.input}
                            inputType="default"
                            placeholder="Konfirmasi Password"
                            secureTextEntry={true}
                        />

                    </View>
                    <Button 
                        style={{width:'100%', backgroundColor:colors.blue, marginVertical:10}}
                        onPress={submitData}
                    >
                        {isLoading ? <ActivityIndicator size="small" color="white"/> :<Text font bold transform="uppercase" white>Daftar</Text>}
                    </Button>
                    <Button 
                        style={{width:'100%', backgroundColor:colors.red, marginVertical:10}}
                        onPress={() => navigation.navigate('login')}
                    >
                        <Text font bold transform="uppercase" white>Kembali</Text>
                    </Button>

                    <Modal header={modal.header}
                        visible={modal.visible}
                        onRequestClose = {closeModal}
                    >
                        <Text h3 bold style={{width:'100%', textAlign:'center'}}>{modal.message}</Text>
                        <Button style={{width:'50%', backgroundColor:colors.blue}}
                            onPress={closeModal}
                        >
                            <Text font transform="uppercase" white>ok</Text>
                        </Button>
                    </Modal>
                </SafeAreaView>
            </ScrollView>
        
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        padding:sizes.base,
        backgroundColor:colors.white,
        minHeight:height
    },
    btnTab:{
        width:'100%',
        paddingVertical:sizes.base-6,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    btnSearch:{
        backgroundColor:colors.blue,
        padding:15,
        marginLeft:5
    },
    btnInActive:{
        borderWidth:2, 
        borderColor:colors.orange
    },
    btnActive:{
        backgroundColor:colors.orange,
        borderWidth:0
    },
    card:{
        height:height/8,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    formSearch:{
        flex:0.1,
        flexDirection:'row',
        paddingVertical:15
    },
    form:{
        flex:0.5,
        width:'100%'
    },
    input:{
        width:'100%',
        borderWidth:0.5,
        borderColor:'#ccc',
        backgroundColor:'white',
        padding:10,
    },
    picker:{
        width:'100%',
        borderWidth:0.5,
        borderColor:'#ccc',
        backgroundColor:'white',
        height:50,
        marginVertical:5
    }
})

export default Register;
