import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import { colors, sizes } from '../constants/theme';

const Card = (props) => {  
  const { color, style, children} = props;
  const cardStyles = [
    styles.card,
    style,
    {backgroundColor: 'black'}
  ];

  return (
    <View style={cardStyles} {...props}>
      {children}
    </View>
  )
}

export default Card;

const styles = StyleSheet.create({
  card: {
    borderWidth:0.5,
    borderColor:'#ccc',
    borderRadius: sizes.radius,
    padding: sizes.base + 4,
    marginBottom: sizes.base,
    elevation:5
  },
})
