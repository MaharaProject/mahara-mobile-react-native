import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import UploadItem from '../UploadItem/UploadItem';
import { MaharaPendingFile } from '../../models/models';
import { Text } from 'react-native';

type Props = {
  uploadType: string;
  dataList: Array<any>
  selectedFiles: Array<any>
  onRemove: () => {};
  navigation: any;
}

const PendingList = (props: Props) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState({ uri: '' });

  return (
    <FlatList
      data={props.dataList}
      extraData={props.selectedFiles}
      renderItem={({ item }) => {
        const uploadItem: any = item;

        //  figure out what to pass in to UploadItem
        const uploadType = props.uploadType ? props.uploadType : '';

        if (uploadType === 'file') {
          setTitle(uploadItem.formData.title);
          setThumbnail({ uri: (uploadItem.maharaFormData.filetoupload.uri ? uploadItem.maharaFormData.filetoupload.uri : '') })
        }
        else {
          // Journal Entries
          setTitle(uploadItem.journalEntry.title);
        }


        return (
          <UploadItem
            itemId={uploadItem.id}
            title={title}
            onRemove={() => props.onRemove(uploadItem.id)}
            onEdit={() => props.navigation.navigate({
              routeName: 'FileDetails',
              params: {
                itemId: uploadItem.id
              },
            })}
            image={thumbnail}
          />
        )
      }
      }
    />
  )
}

export default PendingList;