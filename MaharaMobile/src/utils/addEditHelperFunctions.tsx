import {t} from '@lingui/macro';
import React, {Dispatch, SetStateAction} from 'react';
import {Alert, Image, Platform, View} from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import i18n from '../i18n';
import {
  File,
  ReactNativeImagePickerAsset,
  ReactNativeImagePickerResponse
} from '../models/models';
import {newFile} from '../models/typeCreators';
import styles from '../screens/AddItemScreen/AddItemScreen.style';

const setPickedFileCallback = (
  response: unknown,
  setPickedFile: Dispatch<SetStateAction<File>>
) => {
  const asset = response as ReactNativeImagePickerAsset;
  const resp = response as ReactNativeImagePickerResponse;
  if (resp.didCancel) {
    Alert.alert(i18n._(t`No photo captured`), i18n._(t`Camera closed.`));
  } else if (resp.errorCode) {
    Alert.alert(i18n._(t`ImagePicker Error:${resp.errorMessage}`));
  } else {
    let path = asset.uri;
    if (Platform.OS === 'ios') {
      path = `˜${path.substring(path.indexOf('/Documents'))}`;
    }

    const maharaFile = newFile(
      asset.uri,
      asset.type,
      asset.fileName,
      asset.fileSize
    );
    setPickedFile(maharaFile);
  }
};

export const takePhoto = (setPickedFile: Dispatch<SetStateAction<File>>) => {
  const options = {
    title: i18n._(t`Select image`),
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */

  Platform.OS === 'ios'
    ? // TODO: this will not work rn image picker > 3, use rn action sheet.
      console.warn(
        'Fix this up as new react-native-image-picker dont have it anymmore, use action sheet'
      )
    : // setPickedFileCallback(response, setPickedFile);
      launchCamera(options, response => {
        setPickedFileCallback(response, setPickedFile);
      });
};

export const pickDocument = onSetPickedFile => {
  const DocumentPicker = require('react-native-document-picker').default; // eslint-disable-line global-require
  try {
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles]
    }).then(res =>
      onSetPickedFile(newFile(res.uri, res.type, res.name, res.size))
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

export const onCancelAlert = goBack => {
  Alert.alert(
    i18n._(t`Are you sure?`),
    i18n._(
      t`It looks like you have been editing something. If you leave before saving, your changes will be lost.`
    ),
    [
      {
        text: i18n._(t`Cancel`),
        onPress: () => {
          // do nothing
        }
      },
      {
        text: i18n._(t`Okay`),
        onPress: () => goBack()
      }
    ],
    {cancelable: true}
  );
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
