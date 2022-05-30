// import {t} from '@lingui/macro';
import React, { Dispatch, SetStateAction } from 'react';
import { ActionSheetIOS, Alert, Image, Platform, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary, // for ios?
} from 'react-native-image-picker';
// import i18n from '../i18n';
import {
  File,
  ReactNativeImagePickerAsset,
  ReactNativeImagePickerResponse,
} from '../models/models';
import { newFile } from '../models/typeCreators';
import styles from '../screens/AddItemScreen/AddItemScreen.style';

const setSelectedImageCallback = (
  response: ReactNativeImagePickerResponse,
  setPickedFile: Dispatch<SetStateAction<File>>
) => {
  const resp = response;

  if (response.assets?.length === 0) {
    Alert.alert('Error - no response found');
  }

  let asset = response.assets[0] as ReactNativeImagePickerAsset;

  if (resp.didCancel) {
    // Alert.alert(i18n._(t`No photo captured`), i18n._(t`Camera closed.`));
    Alert.alert('No photo captured. Camera closed');
  } else if (resp.errorCode) {
    // Alert.alert(i18n._(t`ImagePicker Error:${resp.errorMessage}`));
    Alert.alert('Error');
  } else {
    if (!asset) {
      return
    }
    let path = asset != null ? asset.uri : '';
    console.log('happy');
    if (Platform.OS === 'ios') {
      path = `˜${path.substring(path.indexOf('/Documents'))}`;
    }

    const maharaFile = newFile(
      path,
      asset.type,
      asset.fileName,
      asset.fileSize
    );

    console.log(maharaFile);
    setPickedFile(maharaFile);
  }
};

export const takePhoto = (setPickedFile: Dispatch<SetStateAction<File>>) => {
  const options: ImageLibraryOptions = {
    // title: i18n._(t`Select image`),
    mediaType: 'photo',
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */

  Platform.OS === 'ios'
    ? // TODO: this will not work rn image picker > 3, use rn action sheet.
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Open Photos', 'Open Camera'],
          destructiveButtonIndex: 3,
          cancelButtonIndex: 0,
        },
        (buttonIndex: number) => {
          if (buttonIndex === 0) {
            // cancel action
          } else if (buttonIndex === 1) {
            launchImageLibrary(options, (response: ImagePickerResponse) => {
              setSelectedImageCallback(response, setPickedFile);
            });
          } else if (buttonIndex === 2) {
            launchCamera(options, (response: ImagePickerResponse) => {
              setSelectedImageCallback(response, setPickedFile);
            });
          }
        }
      )
    : // setSelectedImageCallback(response, setPickedFile);
      launchCamera(options, (response: ImagePickerResponse) => {
        setSelectedImageCallback(response, setPickedFile);
      });
};

export const pickDocument = (onSetPickedFile: any) => {
  const DocumentPicker = require('react-native-document-picker').default; // eslint-disable-line global-require
  try {
    DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    }).then((res) =>
      onSetPickedFile(newFile(res.uri, res.type, res.name, res.size))
    );
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // Alert.alert(i18n._(t`Invalid file`), i18n._(t`Please select a file.`), [
      //   { text: 'Okay', style: 'destructive' },
      //   ,
      // ]);
      Alert.alert('Invalid file');
    } else {
      Alert.alert(JSON.stringify(err));
    }
  }
};

export const onCancelAlert = (goBack) => {
  Alert.alert(
    // i18n._(t`Are you sure?`),
    // i18n._(
    //   t`It looks like you have been editing something. If you leave before saving, your changes will be lost.`
    // ),
    'Are you sure?',
    'It looks like you have been editing something. if you leave before saving ,your changes will',
    [
      {
        // text: i18n._(t`Cancel`),
        text: 'Cancel',
        onPress: () => {
          // do nothing
        },
      },
      {
        // text: i18n._(t`Okay`),
        text: 'Okay',
        onPress: () => goBack(),
      },
    ],
    { cancelable: true }
  );
};

export const renderImagePreview = (uri: string) => {
  return (
    <View style={styles.imageWrap}>
      <Image
        source={{ uri }}
        style={styles.image}
        // accessibilityLabel={i18n._(t`image preview`)}
      />
    </View>
  );
};
