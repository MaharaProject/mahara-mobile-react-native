import React, { useState } from 'react';
import { MaharaFile, MaharaPendingFile } from '../../models/models';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Button, Image } from 'react-native';
import Card from '../Card/Card';
import { styles } from './UploadItem.style';
import { styles as variables } from '../../assets/styles/variables'

type Props = {
  title: string;
  description: string;
  image: any;
  onRemove: () => {};
  onEdit: () => {};
}

const UploadItem = (props: Props) => {
  const [title, setTitle] = useState(props.title ? props.title : '');
  const [description, setDesc] = useState(props.description ? props.description : '');
  const displayName: string = title.length > 25 ? title.substring(0, 20) + '...' : title;
  const displayDesc: string = description.length > 20 ? description.substring(0.20) + '...' : description;

  return (
    <TouchableOpacity>
      <View style={styles.uploadItem}>
        <Card style={{ ...styles.pendingCard }}>
          <View style={styles.imageContainer}>
            <Image source={props.image} style={styles.thumbnail} />
          </View>
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
              // backgroundColor={variables.colors.primary} iOS
              />
            </View>

            <View style={styles.button}>
              <Button
                title="Details"
                onPress={props.onEdit}
                color={variables.colors.secondary}
              // backgroundColor={variables.colors.secondary} iOS
              />
            </View>
          </View>
        </Card>
      </View>
    </TouchableOpacity>
  )
}

export default UploadItem;


