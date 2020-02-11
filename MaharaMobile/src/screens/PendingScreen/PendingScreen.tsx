import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { t } from '@lingui/macro';
import { i18n } from '@lingui/core';

import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { Dispatch } from 'redux';
import pendingScreenStyles from './PendingScreen.style';
import { MaharaPendingFile, PendingJournalEntry } from '../../models/models';
import PendingList from '../../components/PendingList/PendingList';
import { uploadItemToMahara, isPendingJournalEntry, usePreviousProps} from '../../utils/helperFunctions';
import { RootState } from '../../reducers/rootReducer';
import { selectAllUploadFiles, selectAllUploadFilesIds } from '../../reducers/uploadFilesReducer';
import { selectAllJEntriesIds, selectAllJEntries } from '../../reducers/uploadJEntriesReducer';
import HeaderMenuButton from '../../components/UI/HeaderMenuButton/HeaderMenuButton';
import styles from '../../assets/styles/variables';
import { selectUserName } from '../../reducers/loginInfoReducer';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
import { removeUploadFile, removeUploadJEntry } from '../../actions/actions';

type Props = {
  uploadFiles: Array<MaharaPendingFile>;
  uploadJEntries: Array<PendingJournalEntry>;
  uploadFilesIds: Array<string>;
  uploadJEntriesIds: Array<string>;
  dispatch: Dispatch;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  userName: string;
};

const PendingScreen = (props: Props) => {
  const uploadItemsCount = props.uploadFiles.length + props.uploadJEntries.length;
  const prevUploadCount = usePreviousProps(uploadItemsCount) || 0;
  const [successfullyUploadedItems, setSuccessfullyUploadedItems] = useState<string[]>([]);
  const [uploadErrorItems, setUploadErrorItems] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (prevUploadCount < uploadItemsCount && uploadItemsCount !== 0) {
      setShowSuccessMessage(true);
    }
  }, [uploadItemsCount]);

  /**
   * When 'Remove' is pressed, filter out the item with the given id and update the UploadList.
   */
  const onRemove = (itemId: string) => {
    props.dispatch(removeUploadFile(itemId));
    props.dispatch(removeUploadJEntry(itemId));
  };

  const onEdit = (item: MaharaPendingFile | PendingJournalEntry) => {
    const type = isPendingJournalEntry(item) ? 'journal entry' : item.type;
    props.navigation.navigate({ routeName: 'AddItem', params: { itemToEdit: item, formType: type } });
  };

  const clearUploadError = (id: string) => {
    const newState = uploadErrorItems.filter(item => item !== id);
    setUploadErrorItems(newState);
  };

  const onUploadError = (id: string) => {
    setUploadErrorItems([...uploadErrorItems, id]);
  };

  /**
   * Renders a PendingList
   * @param dataList array of files and journal entries
   */
  const renderPendingList = (dataList: Array<any>) => {
    return (
      <PendingList
        dataList={dataList}
        onRemove={onRemove}
        onEdit={onEdit}
        navigation={props.navigation}
        successfullyUploadedItems={successfullyUploadedItems}
        uploadErrorItems={uploadErrorItems}
        onClearError={clearUploadError}
      />
    );
  }

  const pendingDisplay = () => {
    let list: Array<any> = [];

    if (props.uploadFilesIds?.length > 0) list = list.concat(props.uploadFiles);
    if (props.uploadJEntriesIds?.length > 0) list = list.concat(props.uploadJEntries);

    if (uploadItemsCount > 0) {
      return <View>{renderPendingList(list)}</View>;
    }
    return <Text>No pending uploads</Text>;
  };

  const onSuccessfulUpload = (id: string) => {
    // change class to show upload success
    setSuccessfullyUploadedItems([...successfullyUploadedItems, id]);
    // then, card disappears
    // and remove id from successfullyUploadedItems to clear memory
    setTimeout(() => {
      props.dispatch(removeUploadFile(id));
      props.dispatch(removeUploadJEntry(id));

      const newState = successfullyUploadedItems.filter(item => item !== id);
      setSuccessfullyUploadedItems(newState);
    }, 1000);
  };

  const onUploadClick = () => {
    props.uploadFiles.forEach(file => {
      clearUploadError(file.id);
      props.dispatch(uploadItemToMahara(file.url, file.maharaFormData))
        .then((result: any) => {
          // an error either returns result = undefined, or result = { error: true }
          if (result === undefined || result.error) {
            onUploadError(file.id);
          } else onSuccessfulUpload(file.id);
        });
    });

    props.uploadJEntries.forEach(journalEntry => {
      clearUploadError(journalEntry.id);
      props.dispatch(uploadItemToMahara(journalEntry.url, journalEntry.journalEntry))
        .then((result: any) => {
          if (result === undefined || result.error) {
            onUploadError(journalEntry.id);
          } else onSuccessfulUpload(journalEntry.id);
        });
    });
  };

  return (
    <View style={pendingScreenStyles.app}>
      {showSuccessMessage && (
        <View>
          <Text>Upload added to Pending List!</Text>
          <Icon
            onPress={() => setShowSuccessMessage(false)}
            accessibilityLabel={i18n._(t`Close success message`)}
            name="times"
            type="font-awesome"
            color={styles.colors.dark}
          />
        </View>
      )}
      <View style={pendingScreenStyles.listContainer}>{pendingDisplay()}</View>
      <View style={pendingScreenStyles.buttonContainer}>
        {props.userName !== 'guest' ? (
          <MediumButton title={t`Upload to your Mahara`} onPress={onUploadClick} />
        ) : (
          <MediumButton
            title={t`Please login`}
            accessibilityHint={t`To upload pending items`}
            onPress={() => props.navigation.navigate('Auth')}
          />
        )}
      </View>
    </View>
  );
};

PendingScreen.navigationOptions = (navData: any) => ({
  headerStyle: {
    backgroundColor: styles.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  headerTintColor: styles.colors.light,
  headerLeft: <HeaderMenuButton navData={navData} />,
  headerTitle: 'Pending items'
});

const mapStateToProps = (state: RootState) => ({
  uploadFiles: selectAllUploadFiles(state),
  uploadFilesIds: selectAllUploadFilesIds(state),
  uploadJEntries: selectAllJEntries(state),
  uploadJEntriesIds: selectAllJEntriesIds(state),
  userName: selectUserName(state)
});

export default connect(mapStateToProps)(PendingScreen);
