import {i18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import React, {useEffect, useState} from 'react';
import {Alert, Text, View, ActivityIndicator, StatusBar} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import {connect, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {removeUploadFile, removeUploadJEntry} from '../../actions/actions';
import {
  DisplayItems,
  MaharaPendingFile,
  PendingJournalEntry,
  UploadResponse
} from '../../models/models';
import {selectUrl, selectUserName} from '../../reducers/loginInfoReducer';
import {RootState} from '../../reducers/rootReducer';
import {
  selectAllUploadFiles,
  selectAllUploadFilesIds
} from '../../reducers/uploadFilesReducer';
import {
  selectAllJEntries,
  selectAllJEntriesIds
} from '../../reducers/uploadJEntriesReducer';
import {GUEST_USERNAME} from '../../utils/constants';
import {
  isPendingJournalEntry,
  uploadItemToMahara,
  usePreviousProps
} from '../../utils/helperFunctions';

// components
import PendingList from '../../components/PendingList/PendingList';
import MediumButton from '../../components/UI/MediumButton/MediumButton';

// Styles
import pendingScreenStyles from './PendingScreen.style';
import textStyles from '../../assets/styles/text';
import messages from '../../assets/styles/messages';
import variables from '../../assets/styles/variables';

// Images
import UploadSVG from '../../assets/images/upload';

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
  const numUploadFiles = props.uploadFiles.length;
  const numUploadJEntries = props.uploadJEntries.length;
  const numUploadItems = numUploadFiles + numUploadJEntries;
  const prevUploadCount = usePreviousProps(numUploadItems) || 0;

  const [uploadedItemsIds, setUploadedItemsIds] = useState<string[]>([]);
  const [uploadErrorItemsIds, setUploadErrorItemsIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('Error message');
  const [loading, setLoading] = useState(false);

  const url = useSelector((state: RootState) => selectUrl(state));

  const renderSuccessMessage = () => {
    showMessage({
      message: <Trans>Added to upload queue successfully!</Trans>,
      icon: {
        icon: 'auto',
        position: 'left'
      },
      type: 'success',
      titleStyle: messages.errorMessage,
      backgroundColor: variables.colors.successbg,
      color: variables.colors.success
    });
  };

  useEffect(() => {
    if (prevUploadCount < numUploadItems && numUploadItems !== 0) {
      renderSuccessMessage();
    }
  }, [numUploadItems]);

  /**
   * When 'Delete' is pressed, filter out the item with the given id and update the UploadList.
   */
  const onRemove = (itemId: string) => {
    Alert.alert(
      i18n._(t`Are you sure?`),
      i18n._(t`The deletion of this information or file cannot be undone`),
      [
        {
          text: i18n._(t`Cancel`),
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: i18n._(t`Delete`),
          onPress: () => {
            props.dispatch(removeUploadFile(itemId));
            props.dispatch(removeUploadJEntry(itemId));
          }
        }
      ],
      {cancelable: false}
    );
  };

  const onEdit = (item: MaharaPendingFile | PendingJournalEntry) => {
    const type = isPendingJournalEntry(item) ? 'journal entry' : item.type;
    props.navigation.navigate({
      routeName: 'EditItem',
      params: {itemToEdit: item, formType: type}
    });
  };

  const clearUploadError = (id: string) => {
    const newState = uploadErrorItemsIds.filter(item => item !== id);
    setUploadErrorItemsIds(newState);
  };

  const onUploadError = (id: string) => {
    setUploadErrorItemsIds([...uploadErrorItemsIds, id]);

    showMessage({
      message: i18n._(t`${errorMessage}`),
      icon: {
        icon: 'auto',
        position: 'left'
      },
      type: 'warning',
      titleStyle: messages.errorMessage,
      backgroundColor: variables.colors.warnbg,
      color: variables.colors.warn
    });
  };

  /**
   * Renders a PendingList
   * @param dataList array of files and journal entries
   */
  const renderPendingList = (dataList: DisplayItems) => {
    return (
      <PendingList
        dataList={dataList}
        onRemove={onRemove}
        onEdit={onEdit}
        navigation={props.navigation}
        successfullyUploadedItemsIds={uploadedItemsIds}
        uploadErrorItems={uploadErrorItemsIds}
        onClearError={clearUploadError}
      />
    );
  };

  const pendingDisplay = () => {
    let list: DisplayItems = [];

    if (props.uploadFilesIds?.length > 0) list = list.concat(props.uploadFiles);
    if (props.uploadJEntriesIds?.length > 0) {
      list = list.concat(props.uploadJEntries);
    }

    if (numUploadItems > 0) {
      return <View>{renderPendingList(list)}</View>;
    }
    return (
      <View style={pendingScreenStyles.noPending}>
        <UploadSVG />
        <Text style={pendingScreenStyles.noPendingText}>
          <Trans>Your upload queue is empty</Trans>
        </Text>
      </View>
    );
  };

  const flashSuccessMessage = (text: string) => {
    showMessage({
      message: i18n._(t`${text}`),
      // TODO: safe translation <Trans>Files have been uploaded to your Mahara successfully!</Trans>
      icon: 'success',
      titleStyle: messages.errorMessage,
      backgroundColor: variables.colors.successbg,
      color: variables.colors.success
    });
  };

  const onSuccessfulUpload = (id: string) => {
    // change class to show upload success
    setUploadedItemsIds([...uploadedItemsIds, id]);
    // then, card disappears
    // and remove id from successfullyUploadedItems to clear memory
    setTimeout(() => {
      props.dispatch(removeUploadFile(id));
      props.dispatch(removeUploadJEntry(id));

      const newState = uploadedItemsIds.filter(item => item !== id);
      setUploadedItemsIds(newState);
    }, 1000);

    flashSuccessMessage(
      'Files have been uploaded to your Mahara successfully!'
    );
  };

  const onUploadClick = () => {
    setLoading(true);
    props.uploadFiles.forEach(async file => {
      clearUploadError(file.id);
      props
        .dispatch(uploadItemToMahara(file.url, file.maharaFormData))
        .then((result: UploadResponse) => {
          setLoading(false);
          // an error either returns result = undefined, or result = { error: true }
          if (result === undefined || result === null || result.error) {
            setErrorMessage(result.error_message);
            onUploadError(file.id);
          } else onSuccessfulUpload(file.id);
        });
    });

    props.uploadJEntries.forEach(async journalEntry => {
      clearUploadError(journalEntry.id);
      props
        .dispatch(
          uploadItemToMahara(journalEntry.url, journalEntry.journalEntry)
        )
        .then((result: UploadResponse) => {
          setLoading(false);
          if (result === undefined || result === null || result.error) {
            setErrorMessage(result.error_message);
            onUploadError(journalEntry.id);
          } else onSuccessfulUpload(journalEntry.id);
        });
    });
  };

  return (
    <View style={pendingScreenStyles.app}>
      <View style={pendingScreenStyles.listContainer}>{pendingDisplay()}</View>
      {loading && (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      )}
      {numUploadItems > 0 ? (
        <View style={pendingScreenStyles.buttonContainer}>
          {props.userName !== GUEST_USERNAME ? (
            <View>
              <Text style={[pendingScreenStyles.urlText, textStyles.center]}>
                {`Your site: ${url}`}
              </Text>
              <MediumButton
                title={t`Upload to your site`}
                onPress={onUploadClick}
                icon="faCloudUploadAlt"
              />
            </View>
          ) : (
            <MediumButton
              title={t`Please login`}
              accessibilityHint={t`To upload pending items`}
              onPress={() => props.navigation.navigate('Auth')}
            />
          )}
        </View>
      ) : null}

      <FlashMessage position="top" />
    </View>
  );
};

PendingScreen.navigationOptions = () => ({
  headerStyle: {
    backgroundColor: variables.colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  headerTintColor: variables.colors.light
});

const mapStateToProps = (state: RootState) => ({
  uploadFiles: selectAllUploadFiles(state),
  uploadFilesIds: selectAllUploadFilesIds(state),
  uploadJEntries: selectAllJEntries(state),
  uploadJEntriesIds: selectAllJEntriesIds(state),
  userName: selectUserName(state)
});

export default connect(mapStateToProps)(PendingScreen);
