import React from 'react';
import { View } from 'react-native';
import styles from './Card.style';

const Card = (props: any) => (
  <View style={{...styles.uploadCard, ...props.style}}>{props.children}</View>
);

export default Card;
