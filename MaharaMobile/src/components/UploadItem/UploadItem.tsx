import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Button, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';

import Card from '../UI/Card/Card';
import uploadItemStyles from './UploadItem.style';
import styles from '../../assets/styles/variables';

type Props = {
  title: string;
  description: string;
  mimetype: string;
  index: number;
  image: any;
  successfullyUploadedItem: boolean;
  showUploadError: boolean;
  onRemove: () => {};
  onEdit: () => {};
  onClearError: () => {};
};

const UploadItem = (props: Props) => {
  const title = props.title ? props.title : '';
  const description = props.description ? props.description : '';
  const displayName: string = title.length > 25 ? title.substring(0, 20) + '...' : title;
  const displayDesc: string = description.length > 20 ? description.substring(0.20) + '...' : description;
  const mimetypes = ['application', 'audio', 'text', 'video', 'journalEntry']; // images ignored as they have own thumbnail

  const getMimetypeIcon = (mimetype: string) => {
    let match = '';
    mimetypes.forEach((type: string) => {
      if (mimetype.includes(type)) {
        match = type;
      }
    });

    switch (match) {
      case 'application':
        return 'file';
      case 'audio':
        return 'music';
      case 'text':
        return 'anchor';
      case 'video':
        return 'film';
      case 'journalEntry':
        return 'book';
      default:
        return 'question';
    }
  };

  const Thumbnail = () => {
    // not an image
    if (!props.mimetype.includes('image')) {
      return (
        <View style={uploadItemStyles.imageContainer}>
          <Icon
            name={getMimetypeIcon(props.mimetype)}
            size={30}
            type="font-awesome"
            color={styles.colors.primary}
            raised
            reverse
            reverseColor={styles.colors.secondary}
          />
        </View>
      );
    }
    return (
      <View
        style={[
          uploadItemStyles.imageContainer,
          {borderWidth: 4, borderColor: styles.colors.light}
        ]}>
        <Image source={props.image} style={uploadItemStyles.thumbnail} />
      </View>
    );
  };

  return (
    <TouchableOpacity accessibilityLabel={`${props.index + 1}: ${displayName}`}>
      <View style={uploadItemStyles.uploadItem}>
        <Card style={{...uploadItemStyles.pendingCard}}>
          {props.successfullyUploadedItem && <Text>Upload successful!</Text>}
          {props.showUploadError && (
            <View>
              <Text>There was an error uploading this file. Please try again.</Text>
              <Icon
                onPress={props.onClearError}
                accessibilityLabel={i18n._(t`Close error message`)}
                name="times"
                type="font-awesome"
                color={styles.colors.dark}
              />
            </View>
          )}
          <Thumbnail />
          <View style={uploadItemStyles.textContainer}>
            <Text>{displayName} </Text>
            <Text>{displayDesc}</Text>
          </View>
          <View style={uploadItemStyles.buttonContainer}>
            <View style={uploadItemStyles.button}>
              <Button
                title="Remove"
                onPress={props.onRemove}
                color={styles.colors.primary}
                // iOS styles
                // backgroundColor={styles.colors.primary}
              />
            </View>

            <View style={uploadItemStyles.button}>
              <Button
                title="Edit"
                onPress={props.onEdit}
                color={styles.colors.secondary}
                // iOS styles
                // backgroundColor={styles.colors.secondary}
              />
            </View>
          </View>
        </Card>
      </View>
    </TouchableOpacity>
  );
};

export default withI18n()(UploadItem);
