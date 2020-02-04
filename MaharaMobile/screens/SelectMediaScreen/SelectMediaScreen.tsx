import React from 'react';
import { View, ScrollView } from 'react-native';
import generic from '../../assets/styles/generic';
import SelectMediaType from '../../components/SelectMediaType/SelectMediaType';
import HeaderMenuButton from '../../components/UI/HeaderMenuButton/HeaderMenuButton';
import { cardStyles } from '../../components/UI/Card/Card.style';
import styles from '../../assets/styles/variables';


type Props = {
  navigation: any;
}

const SelectMediaScreen = (props: Props) => {
  const selectMediaType = (type: string) => {
    props.navigation.navigate({routeName: 'AddItem', params: { formType: type }});
  };

  return (
    <ScrollView>
      <View style={generic.wrap}>
        <SelectMediaType selectMediaType={selectMediaType} />
      </View>
    </ScrollView>
  );
}

SelectMediaScreen.navigationOptions = (navData: any) => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  headerTintColor: styles.colors.light,
  headerLeft: <HeaderMenuButton navData={navData} />,
  headerTitle: 'Add Item'
});

export default SelectMediaScreen;
