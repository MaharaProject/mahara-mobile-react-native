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
import DocumentPicker from '@react-native-documents/picker';

const setSelectedImageCallback = (
    response: ImagePickerResponse,
    setPickedFile: Dispatch<SetStateAction<File>>
) => {
    if (response.assets?.length === 0) {
        Alert.alert('Error - no response found');
    }

    const asset = (response.assets || [])[0];
    console.log(asset);

    if (response.didCancel) {
        Alert.alert(t`No photo captured`, t`Camera closed.`);
    } else if (response.errorCode) {
        Alert.alert(t`ImagePicker Error:${response.errorMessage}`);
    } else {
        if (!asset.uri) {
            return;
        }
        const path = asset?.uri || '';
        // if (Platform.OS === 'ios') {
        //   path = `˜${path.substring(path.indexOf('/Documents'))}`;
        // }

        // const maharaFile = newFile(path, asset.type, asset.fileName, asset.fileSize);
        const maharaFile = newFile(path, asset.type, `Photo_${Date.now()}.jpg`, asset.fileSize);

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
     try {
    let result = await DocumentPicker.pick({
      mode: 'open',
      allowMultiSelection: false,
    });

    // The new API returns a result object with a 'files' array
    if (result.files && result.files.length > 0) {
      const file = result.files[0];
      onSetPickedFile(newFile(file.uri, file.mimeType, file.name, file.size));
    }
  } catch (err: any) {
    // Check if user cancelled
    if (err.code === 'DOCUMENT_PICKER_CANCELED') {
      Alert.alert(`Invalid file`, `Please select a file.`, [
        { text: `Okay`, style: 'destructive' }
      ]);
    } else {
      console.error('Document picker error:', err);
      Alert.alert('Error', `Failed to pick document: ${err.message || 'Unknown error'}`);
    }
  }
};

export const renderImagePreview = (uri: string) => (
    <View style={styles.imageWrap}>
        <Image source={{ uri }} style={styles.image} accessibilityLabel={t`image preview`} />
    </View>
);
