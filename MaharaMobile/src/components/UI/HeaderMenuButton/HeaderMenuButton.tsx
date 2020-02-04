import React from 'react';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native';
import styles from '../../../assets/styles/variables';
import LogoSvg from '../../../assets/images/Logo';

type Props = {
  navData: any;
};

const HeaderMenuButton = (props: Props) => (
  <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title="Menu"
      ButtonElement={
        <View>
          <FontAwesome5.Button
            name="bars"
            backgroundColor={styles.colors.primary}
            color={styles.colors.light}
            onPress={() => {
              props.navData.navigation.toggleDrawer();
            }}
          />
          <LogoSvg />
        </View>
      }
    />
  </HeaderButtons>
);

export default HeaderMenuButton;
