import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { styles } from './Card.style'

type Props = {
  style: Array<string>,
  children: string
}

const Card = (props: any) => {
  return (
    <View style={{ ...styles.uploadCard, ...props.style }}>{props.children}</View >
  )
}

export default Card;
