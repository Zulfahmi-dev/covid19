import React from 'react';
import { View, TextInput, StyleSheet, Picker } from 'react-native';
import Text from "./Text";

const Select = (props) => {

    const renderIcon = () => {
        if (!props.icon) {
            return null
        }

        return(
            <View style={styles.icon}>
                {/* {props.icon} */}
                <Text>Test</Text>
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
    const item = props.data.map((item, index) => {
        return <Picker.Item label={item.label} value={item.value} key={index}/>
    });
    // const item =null;

    return (
        <View style={{flex:1, marginBottom:10}}>
            {renderLabel()}
            <View style={[props.style, styles.input]}>
                <Picker
                    selectedValue={props.selectedValue}
                    style={{height:'100%', width: '100%'}}
                    onValueChange={(itemValue, itemIndex) => props.onChange(props.name,itemValue)}
                >
                    <Picker.Item label={'Pilih '+props.label} value='' />
                    {item}
                </Picker>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        flex:1,
        position:'relative',
    },
    icon:{
        position:'absolute',
        top:0,
        right:10
    },
    label:{
        flex:1,
        justifyContent:'center',
        paddingVertical:5
    }
})

export default Select;
