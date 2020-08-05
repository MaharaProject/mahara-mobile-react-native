import {t} from '@lingui/macro';
import React, {Dispatch, SetStateAction} from 'react';
import {Alert, Image, Platform, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import i18n from '../i18n';
import {MaharaFile} from '../models/models';
import {newMaharaFile} from '../models/typeCreators';
import styles from '../screens/AddItemScreen/AddItemScreen.style';

export const takePhoto = (
  setPickedFile: Dispatch<SetStateAction<MaharaFile>>
) => {
  const options = {
    title: i18n._(t`Select image`),
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      Alert.alert(i18n._(t`No photo captured`), i18n._(t`Camera closed.`));
    } else if (response.error) {
      Alert.alert(i18n._(t`ImagePicker Error:${response.error}`));
    } else {
      let path = response.uri;
      if (Platform.OS === 'ios') {
        path = `˜${path.substring(path.indexOf('/Documents'))}`;
      }

      if (!response.fileName) {
        response.fileName = path.split('/').pop();
      }

      const maharaFile = newMaharaFile(
        response.uri,
        response.type,
        response.fileName,
        response.fileSize
      );

      setPickedFile(maharaFile);
    }
  });
};

export const pickDocument = onSetPickedFile => {
  try {
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles]
    }).then(res =>
      onSetPickedFile(newMaharaFile(res.uri, res.type, res.name, res.size))
    );
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      Alert.alert(i18n._(t`Invalid file`), i18n._(t`Please select a file.`), [
        {text: 'Okay', style: 'destructive'}
      ]);
    } else {
      Alert.alert(JSON.stringify(err));
    }
  }
};

export const renderImagePreview = (uri: string) => {
  return (
    <View style={styles.imageWrap}>
      <Image
        source={{uri}}
        style={styles.image}
        accessibilityLabel={i18n._(t`image preview`)}
      />
    </View>
  );
};
