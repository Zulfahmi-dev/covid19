import React, {useState} from 'react'
import { 
    View,
    Dimensions,
    StyleSheet
} from "react-native";

import { Text } from "../../components";

import { sizes } from '../../constants/theme';

const {width, height} = Dimensions.get('window')


const FotoKtpScreen = ({navigation}) => {
    navigation.setOptions({
        title:'',
        headerRight:'Prosess Screening'
    })

    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar hidden /> */}
            <View style={styles.body}>
                <Text>Ambil Foto Identitas</Text>   
            </View>
        </SafeAreaView>
    )
}



export default FotoKtpScreen;


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
    btn:{
        marginTop:sizes.base*2,
        width:'100%',
        backgroundColor:'yellow',
        padding: sizes.base,
        justifyContent:'center',
        alignItems:'center'
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
