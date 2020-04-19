import React from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native';
import { sizes, color, colors } from "../constants/theme";

const ModalComponent = (props) => {
    return (
        <Modal
            visible={props.visible}
            animationType={'slide'}
            onRequestClose={() => props.onRequestClose()}
            transparent={true}
        >
            <View style={styles.modalContainer}>

                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        {props.header}
                    </View>
                    <View style={styles.modalBody}>
                        {props.children}
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default ModalComponent

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        paddingHorizontal:sizes.base
    },
    modalContent:{
        flex:0.4,
        width:'100%',
        flexDirection:'column',
        backgroundColor:'white',
        borderRadius:15
    },
    modalHeader:{
        flex:0.2,
        padding: 10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.orange,
        borderTopLeftRadius:15,
        borderTopRightRadius:15
    },
    modalBody:{
        flex:0.8,
        padding: 10,
        justifyContent:'space-around',
        alignItems:'center'
    },

})
