import {I18n} from '@lingui/core';
import {t} from '@lingui/macro';
import React, {Dispatch, SetStateAction} from 'react';
import {Alert, Image, View} from 'react-native';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import {MaharaFile} from '../models/models';
import styles from '../screens/AddItemScreen/AddItemScreen.style';

export const takePhoto = (
  i18n: I18n,
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
  ImagePicker.launchCamera(options, response => {
    if (response.didCancel) {
      Alert.alert(i18n._(t`No photo captured`), i18n._(t`Camera closed.`));
    } else if (response.error) {
      Alert.alert(i18n._(t`ImagePicker Error:${response.error}`));
    } else {
      setPickedFile({
        name: response.fileName,
        uri: response.uri,
        type: response.type,
        size: Number(response.fileSize)
      });
    }
  });
};

export const pickDocument = async (
  i18n: I18n,
  setPickedFile: Dispatch<SetStateAction<MaharaFile>>
) => {
  // iPhone/Android
  DocumentPicker.show(
    {
      filetype: [DocumentPickerUtil.allFiles()]
    },
    (error, res) => {
      // No file picked
      if (!res) {
        Alert.alert(i18n._(t`Invalid file`), i18n._(t`Please select a file.`), [
          {text: 'Okay', style: 'destructive'}
        ]);
        return;
      }

      // Android
      setPickedFile({
        name: res.fileName,
        uri: res.uri,
        type: res.type,
        size: Number(res.fileSize)
      });
    }
  );
};

export const renderImagePreview = (i18n: I18n, uri: string) => {
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
