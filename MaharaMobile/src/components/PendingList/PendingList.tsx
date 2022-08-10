import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { DisplayItems, PendingJEntry, PendingMFile } from '../../models/models';
import { isPendingJEntry, isPendingMFile } from '../../utils/helperFunctions';
import UploadItem from '../UploadItem/UploadItem';
import styles from '../../assets/styles/variables';

type Props = {
  dataList: DisplayItems;
  onRemove: (id: string) => void;
  onEdit: (item: PendingJEntry | PendingMFile) => void;
  successfullyUploadedItemsIds: Array<string>;
  uploadErrorItems: Array<string>;
  onClearError: (id: string) => void;
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
  let showUploadError = false;

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
          description = pendingFile.maharaFormData.description;
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

        if (props.uploadErrorItems.indexOf(itemId) !== -1) {
          showUploadError = true;
        } else {
          showUploadError = false;
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
            showUploadError={showUploadError}
            onClearError={() => props.onClearError(itemId)}
            index={index}
          />
        );
      }}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
}

export default PendingList;
