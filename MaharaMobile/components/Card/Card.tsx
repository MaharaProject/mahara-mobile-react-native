import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './Card.style';

type Props = {
  icon?: string;
  title: string;
  description: string;
}

export const Card: React.FC<Props> = ({ icon, title, description }) => (
  <View style={styles.view}>
    {icon ? <Image source={{uri: icon}} style={styles.image} /> : null }
    <Text>{title}</Text>
    <Text>{description}</Text>
  </View>
);

export default Card;
