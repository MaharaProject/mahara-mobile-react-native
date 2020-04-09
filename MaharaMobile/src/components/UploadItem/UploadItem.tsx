import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {withI18n} from '@lingui/react';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from '../../assets/styles/variables';
import Card from '../UI/Card/Card';
import uploadItemStyles from './UploadItem.style';

type Props = {
  title: string;
  description: string;
  mimetype: string;
  index: number;
  image: ImageSourcePropType;
  successfullyUploadedItem: boolean;
  showUploadError: boolean;
  onRemove: () => {};
  onEdit: () => {};
  onClearError: () => {};
};

const UploadItem = (props: Props) => {
  const title = props.title ? props.title : '';
  const displayName: string =
    title.length > 25 ? `${title.substring(0, 20)}...` : title;
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
            color={styles.colors.light}
            containerStyle={uploadItemStyles.icon}
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
    <View style={uploadItemStyles.uploadItem}>
      <Card style={{...uploadItemStyles.pendingCard}}>
        {props.successfullyUploadedItem && <Text>Upload successful!</Text>}
        {props.showUploadError && (
          <View>
            <Text>
              There was an error uploading this file. Please try again.
            </Text>
            <Icon
              onPress={props.onClearError}
              name="times"
              type="font-awesome"
              color={styles.colors.dark}
            />
          </View>
        )}

        <Thumbnail />
        <View style={uploadItemStyles.textContainer}>
          <Text style={uploadItemStyles.text}>{displayName} </Text>
        </View>
        <View style={uploadItemStyles.buttonContainer}>
          <View style={uploadItemStyles.button}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Remove"
              onPress={props.onRemove}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={uploadItemStyles.remove}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={uploadItemStyles.button}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Edit"
              onPress={props.onEdit}>
              <FontAwesomeIcon
                icon={faEdit}
                style={uploadItemStyles.edit}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default withI18n()(UploadItem);
