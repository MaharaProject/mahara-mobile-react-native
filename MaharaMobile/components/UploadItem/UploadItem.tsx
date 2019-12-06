import React, { useState } from 'react';
import { MaharaFile, MaharaPendingFile } from '../../models/models';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Button, Image } from 'react-native';
import Card from '../Card/Card';
import { styles } from './UploadItem.style';
import { styles as variables } from '../../assets/styles/variables'
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements'


type Props = {
  title: string;
  description: string;
  mimetype: string;
  image: any;
  onRemove: () => {};
  onEdit: () => {};
}


const UploadItem = (props: Props) => {
  const title = (props.title ? props.title : '');
  const description = (props.description ? props.description : '');
  const displayName: string = title.length > 25 ? title.substring(0, 20) + '...' : title;
  const displayDesc: string = description.length > 20 ? description.substring(0.20) + '...' : description;
  const mimetypes = ['application', 'audio', 'text', 'video']; // images ignored as they have own thumbnail

  const getMimetypeIcon = (mimetype: string) => {
    let match = '';
    mimetypes.forEach((type: string) => {
      if (mimetype.includes(type)) {
        match = type;
        return;
      }
    });

    switch (match) {
      case 'application':
        return 'file'
      case 'audio':
        return 'music'
      case 'text':
        return 'anchor'
      case 'video':
        return 'film'
      default:
        return 'question'
    }
  }


  const Thumbnail = () => {

    // not an image
    if (!props.mimetype.includes('image')) {
      return (
        <View style={styles.imageContainer}>
          <Icon name={getMimetypeIcon(props.mimetype)}
            type='font-awesome'
            color={variables.colors.tertiary}
            raised
            reverse
          />
        </View>)
    }
    else return (
      <View style={styles.imageContainer}>
        <Image source={props.image} style={styles.thumbnail} />
      </View>
    )
  }

  return (
    <TouchableOpacity>
      <View style={styles.uploadItem}>
        <Card style={{ ...styles.pendingCard }}>
          <Thumbnail />
          <View style={styles.textContainer}>
            <Text>{displayName} </Text>
            <Text>{displayDesc}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title='Remove'
                onPress={props.onRemove}
                color={variables.colors.primary}
              // iOS styles
              // backgroundColor={variables.colors.primary}
              />
            </View>

            <View style={styles.button}>
              <Button
                title="Details"
                onPress={props.onEdit}
                color={variables.colors.secondary}
              // iOS styles
              // backgroundColor={variables.colors.secondary}
              />
            </View>
          </View>
        </Card>
      </View>
    </TouchableOpacity>
  )
}

export default UploadItem;


