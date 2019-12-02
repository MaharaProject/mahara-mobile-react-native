import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import UploadItem from '../UploadItem/UploadItem';

type Props = {
  uploadType: string;
  dataList: Array<any>
  onRemove: Function;
  navigation: any;
}

const PendingList = (props: Props) => {
  let itemId = '';
  let title = '';
  let description = '';
  let thumbnail = {};

  return (
    <FlatList
      data={props.dataList}
      renderItem={({ item }: any) => {
        //  figure out what to pass in to UploadItem
        if (props.uploadType === 'file') {
          itemId = item.id;
          title = item.maharaFormData.title;
          description = item.maharaFormData.description;
          thumbnail = { uri: (item.maharaFormData.filetoupload.uri ? item.maharaFormData.filetoupload.uri : '') }
        }
        else {
          itemId = item.id;
          title = item.journalEntry.title;
          description = item.journalEntry.body
        }

        return (
          <UploadItem
            title={title}
            description={description}
            onRemove={() => props.onRemove('0')}
            onEdit={() => props.navigation.navigate({
              routeName: 'Details',
              params: {
                itemId: itemId
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