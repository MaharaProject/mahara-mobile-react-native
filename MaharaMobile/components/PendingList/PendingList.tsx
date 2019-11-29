import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import UploadItem from '../UploadItem/UploadItem';

type Props = {
  uploadType: string;
  dataList: Array<any>
  selectedFiles: Array<any>
  onRemove: () => {};
  navigation: any;
  title: string;
  thumbnail: string;
}

const PendingList = (props: Props) => {
  let title = props.title ? props.title : '';
  let thumbnail = props.thumbnail ? props.thumbnail : {};

  return (
    <FlatList
      data={props.dataList}
      extraData={props.selectedFiles}
      renderItem={({ item }) => {
        const uploadItem: any = item;

        //  figure out what to pass in to UploadItem
        if (props.uploadType === 'file') {
          title = uploadItem.formData.title;
          thumbnail = { uri: (uploadItem.maharaFormData.filetoupload.uri ? uploadItem.maharaFormData.filetoupload.uri : '') }
        }
        else {
          // Journal Entries
          title = uploadItem.journalEntry.title;
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