import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { sizes } from "../constants/theme";

const Button = (props) => {
    return (
        <TouchableOpacity
            style={[styles.btn, props.style]}
            onPress={props.onPress}
        >
            {props.children}
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btn:{
        padding: sizes.base,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:sizes.radius
    },
})
