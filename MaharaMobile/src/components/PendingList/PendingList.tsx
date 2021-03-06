import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {DisplayItems, PendingJEntry, PendingMFile} from '../../models/models';
import {isPendingJEntry, isPendingMFile} from '../../utils/helperFunctions';
import UploadItem from '../UploadItem/UploadItem';

type Props = {
  dataList: DisplayItems;
  onRemove: Function;
  onEdit: Function;
  successfullyUploadedItemsIds: Array<string>;
  uploadErrorItems: Array<string>;
  onClearError: Function;
};

const PendingList = (props: Props) => {
  let title = '';
  let description = '';
  let thumbnail = {};
  let isSuccessfullyUploadedItem = false;
  let showUploadError = false;

  return (
    <FlatList
      data={props.dataList}
      renderItem={({item, index}) => {
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
        props.uploadErrorItems.indexOf(itemId) !== -1
          ? (showUploadError = true)
          : (showUploadError = false);

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
    />
  );
};

export default PendingList;
