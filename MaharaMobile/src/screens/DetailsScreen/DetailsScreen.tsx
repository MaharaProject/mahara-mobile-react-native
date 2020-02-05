import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/reducers';
import { selectUploadFileById } from '../../reducers/uploadFilesReducer';
import { selectJEntryById } from '../../reducers/uploadJEntriesReducer';

type Props = {
  navigation: any;
};

const DetailsScreen = (props: Props) => {
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
