import React, { useState } from 'react';
import { MaharaFile, MaharaPendingFile } from '../../models/models';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Button, Image } from 'react-native';
import Card from '../Card/Card';
import uploadItemStyles from './UploadItem.style';
import styles from '../../assets/styles/variables'

type Props = {
  title: string;
  description: string;
  image: any;
  onRemove: () => {};
  onEdit: () => {};
}

const UploadItem = (props: Props) => {
  const title = (props.title ? props.title : '');
  const description = (props.description ? props.description : '');
  const displayName: string = title.length > 25 ? title.substring(0, 20) + '...' : title;
  const displayDesc: string = description.length > 20 ? description.substring(0.20) + '...' : description;

  return (
    <TouchableOpacity>
      <View style={uploadItemStyles.uploadItem}>
        <Card style={{ ...uploadItemStyles.pendingCard }}>
          <View style={uploadItemStyles.imageContainer}>
            <Image source={props.image} style={uploadItemStyles.thumbnail} />
          </View>
          <View style={uploadItemStyles.textContainer}>
            <Text>{displayName} </Text>
            <Text>{displayDesc}</Text>
          </View>
          <View style={uploadItemStyles.buttonContainer}>
            <View style={uploadItemStyles.button}>
              <Button
                title='Remove'
                onPress={props.onRemove}
                color={styles.colors.primary}
              // iOS styles
              // backgroundColor={variables.colors.primary}
              />
            </View>

            <View style={uploadItemStyles.button}>
              <Button
                title="Details"
                onPress={props.onEdit}
                color={styles.colors.secondary}
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


