import React, { Dispatch, SetStateAction } from 'react';
import { t } from '@lingui/macro';
import { ActionSheetIOS, Alert, Image, Platform, View } from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary // for ios?
} from 'react-native-image-picker';
import { File } from 'models/models';
import { newFile } from 'models/typeCreators';
import styles from 'screens/AddItemScreen/AddItemScreen.style';

const setSelectedImageCallback = (
  response: ImagePickerResponse,
  setPickedFile: Dispatch<SetStateAction<File>>
) => {
  if (response.assets?.length === 0) {
    Alert.alert('Error - no response found');
  }

  const asset = (response.assets || [])[0];

  if (response.didCancel) {
    Alert.alert(t`No photo captured`, t`Camera closed.`);
  } else if (response.errorCode) {
    Alert.alert(t`ImagePicker Error:${response.errorMessage}`);
  } else {
    if (!asset) {
      return;
    }
    let path = asset?.uri || '';
    if (Platform.OS === 'ios') {
      path = `˜${path.substring(path.indexOf('/Documents'))}`;
    }

    const maharaFile = newFile(path, asset.type, asset.fileName, asset.fileSize);

    setPickedFile(maharaFile);
  }
};

export const takePhoto = (setPickedFile: Dispatch<SetStateAction<File>>) => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo'
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */

  if (Platform.OS === 'ios') {
    // TODO: this will not work rn image picker > 3, use rn action sheet.
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [t`Cancel`, t`Open Photos`, t`Open Camera`],
        destructiveButtonIndex: 3,
        cancelButtonIndex: 0
      },
      (buttonIndex: number) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          launchImageLibrary(options, (response) => {
            setSelectedImageCallback(response, setPickedFile);
          });
        } else if (buttonIndex === 2) {
          launchCamera(options, (response) => {
            setSelectedImageCallback(response, setPickedFile);
          });
        }
      }
    );
  } else {
    launchCamera(options, (response) => {
      setSelectedImageCallback(response, setPickedFile);
    });
  }
};

export const pickDocument = async (onSetPickedFile: any) => {
  const DocumentPicker = (await import('react-native-document-picker')).default;
  try {
    DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles]
    }).then((res) => onSetPickedFile(newFile(res.uri, res.type, res.name, res.size)));
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      Alert.alert(t`Invalid file`, t`Please select a file.`, [
        { text: t`Okay`, style: 'destructive' }
      ]);
    } else {
      Alert.alert(JSON.stringify(err));
    }
  }
};

export const renderImagePreview = (uri: string) => (
  <View style={styles.imageWrap}>
    <Image source={{ uri }} style={styles.image} accessibilityLabel={t`image preview`} />
  </View>
);
