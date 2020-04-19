import React, {useState, useReducer, useContext} from 'react'
import { 
    View, 
    Image, 
    ImageBackground, SafeAreaView, StyleSheet, Dimensions, StatusBar, TextInput,
    TouchableOpacity

} from "react-native";
import { Text, Button } from "../components";
import { sizes, colors } from '../constants/theme';
import { UserContext } from "../context/UserContext";

const {width, height} = Dimensions.get('window')
const Intro = ({navigation}) => {
    navigation.setOptions({
        headerShown:false
    })

    const {login} = useContext(UserContext);

    // console.log(login)

    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar hidden /> */}
            <ImageBackground source={require("../assets/images/doctor2.jpg")} style={styles.backgroundContainer}>
                <View style={styles.body}>
                    <View style={styles.content}>
                        <Text h1 light white>Sabtu</Text>
                        <Text h1 light white>17 April 2020</Text>
                    </View>

                    <View style={styles.content}>
                        <Text h2 light white>Selamat pagi</Text>
                    </View>

                    <View style={styles.content}>
                        <Text h1 bold white>{login.username}</Text>
                    </View>


                    <View style={styles.content}>
                        <Text h1 light white>Selamat Bertugas</Text>
                        <Text h1 light white>Selalu Jaga Kesehatan</Text>
                    </View>
                    
                    <Button 
                        style={styles.btnStyle}
                        onPress={()=>navigation.navigate('dashboard')}
                    >
                        <Text h3 bold white transform="uppercase">Login</Text>
                    </Button>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    backgroundContainer:{
        flex:1,
        width:width
    },
    body:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        paddingVertical:height/8,
        paddingHorizontal: sizes.base*3,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    btnStyle:{
        marginTop:sizes.base*2,
        width:'100%',
        borderRadius:25,
        backgroundColor:colors.orange
    }, 
    textBtn:{
        fontSize:14,
        fontWeight:'bold',
        textTransform:'uppercase'
    },
    round:{
        borderRadius:25
    },
    content:{
        flex:0.5,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10
    },
})

export default Intro;
