import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/reducers';
import {
  selectAllJEntries,
  selectJEntryById,
} from '../../reducers/uploadJEntriesReducer';
import {
  selectAllUploadFiles,
  selectUploadFileById,
} from '../../reducers/uploadFilesReducer';

type Props = {
  navigation: any;
};

const DetailsScreen = (props: Props) => {
  const uploadFiles = useSelector((state: RootState) => selectAllUploadFiles(state));
  const uploadJEntries = useSelector((state: RootState) => selectAllJEntries(state));
  const itemId = props.navigation.getParam('itemId');
  const matchingFile = useSelector((state: RootState) => selectUploadFileById(state, { id: itemId }));
  const matchingJournalEntry = useSelector((state: RootState) => selectJEntryById(state, { id: itemId }));

  if (matchingFile) {
    return <Text>{matchingFile.maharaFormData.title}</Text>;
  }
  if (matchingJournalEntry) {
    return <Text>{matchingJournalEntry.journalEntry.title}</Text>;
  }

  return <View />;
};

export default DetailsScreen;
