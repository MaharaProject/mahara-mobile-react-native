import * as React from 'react';
import { Animated, TouchableOpacity } from 'react-native';

const Tab = ({ focusAnim, title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Animated.View
      style={{
        padding: 10,
        borderRadius: 10,
        backgroundColor: focusAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['transparent', 'tomato']
        })
      }}>
      <Animated.Text
        style={{
          color: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['#444', '#fff']
          })
        }}>
        {title}
      </Animated.Text>
    </Animated.View>
  </TouchableOpacity>
);

export default Tab;
