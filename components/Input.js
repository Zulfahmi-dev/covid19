import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Text from "./Text";
import { colors } from '../constants/theme';

const Input = (props) => {

    const renderIcon = () => {
        if (!props.icon) {
            return null
        }

        return(
            <View style={styles.icon}>
                {/* {props.icon} */}
                {props.icon}
            </View>
        )
    }

    const renderLabel = () => {
        if (!props.label) {
            return null;
        }

        return(
            <View style={styles.label}>
                <Text caption>{props.label}</Text>
            </View>
        )
    }

    return (
        <>
            {renderLabel()}
            <View style={styles.input}>
                {renderIcon()}
                <TextInput
                    style={[props.style]}
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={props.inputType}
                    onChangeText = {text => props.onChange(props.name, text)}
                    paddingLeft={props.icon ? 55 : 20}
                    paddingRight={20}
                    {...props}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        flex:1,
        position:'relative',
        marginBottom:10
    },
    icon:{
        position:'absolute',
        padding:5,
        backgroundColor:colors.orange,
        top:7,
        left:10,
        zIndex:999999,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
    },
    label:{
        flex:1,
        justifyContent:'center',
        paddingVertical:5
    }
})

export default Input;
