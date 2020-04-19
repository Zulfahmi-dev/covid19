import React from 'react'
import { StyleSheet, View, SafeAreaView, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import FotoKtpScreen from "./FotoKtpScreen";
import ScreeningProcess from "./ScreeningProcess";

import {sizes, colors} from '../../constants/theme';
import { Text } from "../../components";

const {width, height} = Dimensions.get('window')

const HomeScreen = ({navigation}) => {
    navigation.setOptions({
        headerShown:false
    })
    
    return (
        <View style={{flex:1}}>
            <ImageBackground source={require('../../assets/images/peta_covid19.jpg')} style={styles.peta}/>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('screeningProcess')}>
                    <Text h1 bold style={{color:colors.yellow}}>Screening</Text>
                </TouchableOpacity>

                <Text h2 light white >Lakukan Screening Sekarang</Text>

            </View>
        </View>
    )
}


const HomeStack = createStackNavigator();

const Home = (props) => {
    
    return(
        <HomeStack.Navigator screenOptions={{
            headerTitleStyle:{
                alignSelf:'flex-end'
            },
            headerTitleContainerStyle:{
                flex:0.5,
                width:'75%',
            }
        }}>
            <HomeStack.Screen name='home' component={HomeScreen} />
            <HomeStack.Screen name='screeningProcess' component={ScreeningProcess} />
            <HomeStack.Screen name='fotoKtp' component={FotoKtpScreen} />
        </HomeStack.Navigator>
    )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        paddingTop:height/8
    },
    peta:{
        flex:0.6
    },
    btnContainer:{
        flex:0.4,
        backgroundColor:'#0059b3',
        justifyContent:'center',
        alignItems:'center'
    },
    btn:{
        width:200,
        height:200,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:10,
        borderColor:'white',
        borderRadius:100,
        marginVertical:10
    }
})
