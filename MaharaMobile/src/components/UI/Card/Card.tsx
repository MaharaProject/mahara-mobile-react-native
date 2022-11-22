import React from 'react';
import { View } from 'react-native';
import styles from './Card.style';

type Props = {
  children: React.ReactNode;
  style: object;
};

function Card(props: Props) {
  return <View style={{ ...styles.uploadCard, ...props.style }}>{props.children}</View>;
}

export default Card;
