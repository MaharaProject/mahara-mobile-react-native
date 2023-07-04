import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styles from 'assets/styles/variables';
import UploadItem from 'components/UploadItem/UploadItem';
import { DisplayItems, PendingJEntry, PendingMFile } from 'models/models';
import { isPendingJEntry, isPendingMFile } from 'utils/helperFunctions';

type Props = {
  dataList: DisplayItems;
  onRemove: (id: string) => void;
  onEdit: (item: PendingJEntry | PendingMFile) => void;
  successfullyUploadedItemsIds: Array<string>;
};

const listStyles = StyleSheet.create({
  flatList: {
    padding: styles.padding.xs,
    paddingLeft: styles.padding.md,
    paddingRight: styles.padding.md,
    paddingTop: styles.padding.md
    // flex: 1,
  }
});

function PendingList(props: Props) {
  let title = '';
  let description = '';
  let thumbnail = {};
  let isSuccessfullyUploadedItem = false;

  return (
    <FlatList
      style={listStyles.flatList}
      data={props.dataList}
      renderItem={({ item, index }) => {
        const itemId = item.id;
        let mimetype = '';
        //  figure out what to pass in to UploadItem
        if (isPendingMFile(item)) {
          const pendingFile: PendingMFile = item;
          title = pendingFile.maharaFormData.name;
          description = pendingFile.maharaFormData.caption;
          mimetype = pendingFile.mimetype;
          thumbnail = {
            uri: pendingFile.maharaFormData.filetoupload.uri
              ? pendingFile.maharaFormData.filetoupload.uri
              : ''
          };
        } else if (isPendingJEntry(item)) {
          const pendingJEntry: PendingJEntry = item;
          title = pendingJEntry.journalEntry.title;
          description = pendingJEntry.journalEntry.body;
          mimetype = 'journalEntry';
        }

        if (props.successfullyUploadedItemsIds.indexOf(itemId) !== -1) {
          isSuccessfullyUploadedItem = true;
        }

        return (
          <UploadItem
            title={title}
            description={description}
            mimetype={mimetype}
            onRemove={() => props.onRemove(itemId)}
            onEdit={() => props.onEdit(item)}
            image={thumbnail}
            successfullyUploadedItem={isSuccessfullyUploadedItem}
            index={index}
          />
        );
      }}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
}

export default PendingList;
