import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import UploadItem from '../UploadItem/UploadItem';

type Props = {
  dataList: Array<any>
  onRemove: Function;
  navigation: any;
}

const PendingList = (props: Props) => {
  let title = '';
  let description = '';
  let thumbnail = {};

  return (
    <FlatList
      data={props.dataList}
      renderItem={({ item }: any) => {
        let itemId = item.id;
        let mimetype = '';
        //  figure out what to pass in to UploadItem
        if (item.maharaFormData !== undefined) {
          title = item.maharaFormData.title;
          description = item.maharaFormData.description;
          mimetype = item.mimetype;
          thumbnail = { uri: (item.maharaFormData.filetoupload.uri ? item.maharaFormData.filetoupload.uri : '') }
        }
        else if (item.journalEntry !== undefined) {
          title = item.journalEntry.title;
          description = item.journalEntry.body;
          mimetype = 'journalEntry';
        }

        return (
          <UploadItem
            title={title}
            description={description}
            mimetype={mimetype}
            onRemove={() => props.onRemove(itemId)}
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
