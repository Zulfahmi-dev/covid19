import * as React from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Reminder, Screening, Profile } from './tabs';
import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window')

const Tab = createBottomTabNavigator();

const Dashboard = ({navigation}) => {
    navigation.setOptions({
        headerShown:false
    })

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {

                    switch (route.name) {
                        case 'Home':
                            return <AntDesign name="home" size={30} color={color}/>;
                            break;
                        case 'Reminder':
                            return <Entypo name="stopwatch" size={30} color={color}/>;
                            break;
                        case 'Screening':
                            return <Entypo name="text-document" size={30} color={color}/>;
                            break;
                        case 'Profile':
                            return <SimpleLineIcons name="user" size={30} color={color}/>;
                            break;
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                style:{
                    height:height/10,
                    paddingBottom:5
                }
            }}
        >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Reminder" component={Reminder} />
        <Tab.Screen name="Screening" component={Screening} />
        <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default Dashboard;