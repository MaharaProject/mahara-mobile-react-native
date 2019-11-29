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
      renderItem={({ item }: any) => {
        //  figure out what to pass in to UploadItem
        if (props.uploadType === 'file') {
          title = item.formData.title;
          thumbnail = { uri: (item.maharaFormData.filetoupload.uri ? item.maharaFormData.filetoupload.uri : '') }
        }
        else {
          title = item.journalEntry.title;
        }


        return (
          <UploadItem
            itemId={item.id}
            title={title}
            onRemove={() => props.onRemove()}
            onEdit={() => props.navigation.navigate({
              routeName: 'FileDetails',
              params: {
                itemId: item.id
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