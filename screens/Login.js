import React, {useState, useContext} from 'react'
import { 
    View, 
    ImageBackground, SafeAreaView, StyleSheet, Dimensions, 
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { AntDesign } from "@expo/vector-icons";
import {Input, Button, Text} from '../components';
import {sizes, colors} from '../constants/theme';
import {server} from '../constants/init';

const {width, height} = Dimensions.get('window')

const Login = ({navigation}) => {
    navigation.setOptions({
        headerShown:false
    })

    const {dispatch} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [dataLogin, setDataLogin] = useState({
        hp:'',
        password:''
    })

    const onChange = (name, value) => {
        setDataLogin({...dataLogin, [name]:value})
    }

    const submitLogin = async () => {
        try {
            setIsLoading(true)
            let dataEmpty = Object.keys(dataLogin).filter(item => dataLogin[item]=="");

            if (dataEmpty.length>0) {
                setIsLoading(false)
                return alert('Data tidak boleh kosong')
            }
            const {data} = await axios.post(`${server.url}/user/login`, {...dataLogin});
        
            if (data.status == 'failed') {
                return alert('Username / Password Salah, Coba Lagi!!')
            }

            setIsLoading(false)
            dispatch({type:"User_Login", login:data.data[0]})
            navigation.navigate('intro')
            
        } catch (error) {
            setIsLoading(false)
            alert(error)
        }
    }

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                {/* <StatusBar hidden /> */}
                <ImageBackground source={require("../assets/images/doctor.jpg")} style={styles.backgroundContainer}>
                    <View style={styles.body}>
                        <Text style={styles.title}>Covid19</Text>
                        <View style={styles.form}>
                            <Input 
                                name="hp"
                                onChange={onChange}
                                value={dataLogin.hp}
                                style={[styles.input, styles.round]}
                                inputType="default"
                                placeholder="Masukkan Nomer hp"
                                icon={<AntDesign name="mobile1" size={25} color="white"/>}
                            />
                            <Input 
                                name="password"
                                onChange={onChange}
                                value={dataLogin.password}
                                style={[styles.input, styles.round]}
                                inputType="default"
                                placeholder="Masukkan Password"
                                secureTextEntry={true}
                                icon={<AntDesign name="lock1" size={25} color="white"/>}
                            />
                            
                            <TouchableOpacity
                                onPress={()=>navigation.navigate('register')}
                            >
                                <Text style={styles.forgotPassword}>Buat Akun?</Text>
                            </TouchableOpacity>
                        </View>
                            
                        <Button 
                            style={styles.btnStyle}
                            onPress={submitLogin}
                        >
                            {isLoading ? <ActivityIndicator size={30} color="white"/> : <Text h3 bold white transform="uppercase">Login</Text>}
                        </Button>
                    </View>
                </ImageBackground>
            </SafeAreaView>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        minHeight:height,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    backgroundContainer:{
        flex:1,
        width:width
    },
    title:{
        fontSize:width/6,
        color:'white'
    },
    body:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:height/5,
        paddingHorizontal: sizes.base*3,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    form:{
        flex:0.1,
        width:'100%',
        marginVertical:5,
    },
    input:{
        width:'100%',
        borderWidth:0.5,
        borderColor:'#ccc',
        backgroundColor:'white',
        padding:10
    },
    round:{
        borderRadius:25
    },
    btnStyle:{
        width:'100%',
        borderRadius:25,
        backgroundColor:colors.orange
    },
    forgotPassword:{
        textAlign:'right',
        color:'white'
    }
})

export default Login;
