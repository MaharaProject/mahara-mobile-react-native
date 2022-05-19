import {withI18n} from '@lingui/react';
import React from 'react';
import {View} from 'react-native';
import generic from '../../assets/styles/generic';
import SelectMediaType from '../../components/SelectMediaType/SelectMediaType';
import {UploadItemType} from '../../models/models';

type Props = {
  navigation: any;
};

const SelectMediaScreen = (props: Props) => {
  const selectMediaType = (type: UploadItemType) => {
    props.navigation.navigate('AddItem', {
      itemType: type
    });
  };

  return (
    <View style={generic.wrap}>
      <SelectMediaType selectMediaType={selectMediaType} />
    </View>
  );
};

export default withI18n()(SelectMediaScreen);
