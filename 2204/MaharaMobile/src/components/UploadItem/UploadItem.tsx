import {
  faEdit,
  faTrashAlt,
  faBook,
  faFilm,
  faAnchor,
  faMusic,
  faImage,
  faPencilAlt,
  faMicrophoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Center, HStack } from 'native-base';
// import { withI18n } from '@lingui/react';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'native-base';
import { Icon } from 'react-native-elements';
import styles from '../../assets/styles/variables';
import { ICON_SIZE } from '../../utils/constants';
import Card from '../UI/Card/Card';
import uploadItemStyles from './UploadItem.style';
import RecordAudioSvg from '../../assets/images/RecordAudio';
import gridButtonStyles from '../UI/GridButton/GridButton.style';
import TakePhotoSvg from '../../assets/images/TakePhoto';
import PickFileSvg from '../../assets/images/PickFile';
import AddJournalEntrySvg from '../../assets/images/AddJournalEntry';

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

  const Thumbnail = () => {
    let thumbnailStyles;
    if (props.mimetype.includes('application')) {
      thumbnailStyles = gridButtonStyles.application;
    }
    if (props.mimetype.includes('audio')) {
      thumbnailStyles = gridButtonStyles.audio;
    }
    if (props.mimetype.includes('journalEntry')) {
      thumbnailStyles = gridButtonStyles.journalEntry;
    }
    // not an image
    if (!props.mimetype.includes('image')) {
      return (
        <View style={uploadItemStyles.imageContainer}>
          {/* <Text>{props.mimetype}</Text> */}
          {/* <Center> */}
          <Box style={[uploadItemStyles.icon, thumbnailStyles]}>
            {props.mimetype.includes('audio') ? <RecordAudioSvg /> : null}
            {/* {props.mimetype.includes('audio') ? <TakePhotoSvg/> : null} */}
            {props.mimetype.includes('application') ? <PickFileSvg /> : null}
            {props.mimetype.includes('journalEntry') ? (
              <AddJournalEntrySvg />
            ) : null}
          </Box>
        </View>
      );
    }
    return (
      <View
        style={[
          uploadItemStyles.imageContainer,
          { borderWidth: 4, borderColor: styles.colors.light },
        ]}>
        <Image source={props.image} style={uploadItemStyles.thumbnail} />
      </View>
    );
  };

  return (
    <View style={uploadItemStyles.uploadItem}>
      <Card style={{ ...uploadItemStyles.pendingCard }}>
        {/* {props.successfullyUploadedItem && <Text>Upload successful!</Text>} */}
        {props.showUploadError && (
          <View>
            {/* TODO: Error message displayed on item card for failure upload */}
            {/*
            There was an error uploading this file. Please try again.

            <Icon
              onPress={props.onClearError}
              name="times"
              type="font-awesome"
              color={styles.colors.dark}
            /> */}
          </View>
        )}

        <Thumbnail />
        <View style={uploadItemStyles.textContainer}>
          <Text fontSize="xs">{displayName} </Text>
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
                size={styles.font.xl}
              />
            </TouchableOpacity>
          </View>
          <View style={uploadItemStyles.button}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Edit"
              onPress={props.onEdit}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                style={uploadItemStyles.edit}
                size={styles.font.xl}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  );
};

// export default withI18n()(UploadItem);
export default UploadItem;
