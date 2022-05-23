// import {t, Trans} from '@lingui/macro';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
// Images
import UploadSVG from '../../assets/images/upload';
import messages from '../../assets/styles/messages';
import textStyles from '../../assets/styles/text';
import styles from '../../assets/styles/variables';
import flashMessage from '../../components/FlashMessage/FlashMessage';
// components
import PendingList from '../../components/PendingList/PendingList';
import MediumButton from '../../components/UI/MediumButton/MediumButton';
// import i18n from '../../i18n';
import {
  DisplayItems,
  PendingJEntry,
  PendingMFile,
  UploadItemType,
  UploadResponse,
} from '../../models/models';
import {
  saveTaggedItemsToAsync,
  updateItemTags as updateItemTagsIds,
} from '../../store/actions/actions';
import { addToken } from '../../store/actions/loginInfo';
import { removeUploadFile } from '../../store/actions/uploadFiles';
import { removeUploadJEntry } from '../../store/actions/uploadJEntries';
import {
  selectUrl,
  selectUserName,
} from '../../store/reducers/loginInfoReducer';
import { RootState } from '../../store/reducers/rootReducer';
import {
  selectAllUploadFiles,
  selectAllUploadFilesIds,
} from '../../store/reducers/uploadFilesReducer';
import {
  selectAllJEntries,
  selectAllJEntriesIds,
} from '../../store/reducers/uploadJEntriesReducer';
import { GUEST_USERNAME } from '../../utils/constants';
import { uploadItemToMahara } from '../../utils/helperFunctions';
// Styles
import pendingScreenStyles from './PendingScreen.style';

type Props = {
  uploadFiles: Array<PendingMFile>;
  uploadJEntries: Array<PendingJEntry>;
  uploadFilesIds: Array<string>;
  uploadJEntriesIds: Array<string>;
  dispatch: Dispatch;
  navigation: any;
  userName: string;
  route: { params: { added: boolean } };
};

const PendingScreen = (props: Props) => {
  const numUploadFiles = props.uploadFiles.length;
  const numUploadJEntries = props.uploadJEntries.length;
  const numUploadItems = numUploadFiles + numUploadJEntries;

  const [uploadedItemsIds, setUploadedItemsIds] = useState<string[]>([]);
  const [uploadErrorItemsIds, setUploadErrorItemsIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('Error message');
  const [loading, setLoading] = useState(false);

  const url = useSelector((state: RootState) => selectUrl(state));

  useEffect(() => {
    if (props.route.params?.added === true) {
      // flashMessage(t`Added to upload queue successfully!`, 'success');
      flashMessage('Added to upload queue successfully!', 'success');
    }
  }, [props.route.params?.added]);

  /**
   * When 'Delete' is pressed, filter out the item with the given id and update the UploadList.
   */
  const onRemove = (itemId: string) => {
    Alert.alert(
      // i18n._(t`Are you sure?`),
      // i18n._(t`The deletion of this information or file cannot be undone`),
      'Are you sure?',
      'The deletion of this information or file cannot be undone',
      [
        {
          // text: i18n._(t`Cancel`),
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          // text: i18n._(t`Delete`),
          text: 'Delete',
          onPress: () => {
            props.dispatch(removeUploadFile(itemId));
            props.dispatch(removeUploadJEntry(itemId));
            // TODO: update related tags
            props.dispatch(updateItemTagsIds(itemId, []));
            props.dispatch(saveTaggedItemsToAsync());
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onEdit = (item: PendingMFile | PendingJEntry) => {
    const type: UploadItemType = item.type ?? 'J_ENTRY';
    props.navigation.navigate('EditItem', { itemToEdit: item, itemType: type });
  };

  const clearUploadError = (id: string) => {
    const newState = uploadErrorItemsIds.filter((item) => item !== id);
    setUploadErrorItemsIds(newState);
  };

  const onUploadError = (id: string) => {
    setUploadErrorItemsIds([...uploadErrorItemsIds, id]);

    showMessage({
      // message: i18n._(t`${errorMessage}`),
      message: { errorMessage },
      icon: {
        icon: 'auto',
        position: 'left',
      },
      type: 'warning',
      titleStyle: messages.errorMessage,
      backgroundColor: styles.colors.warnbg,
      color: styles.colors.warn,
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
        successfullyUploadedItemsIds={uploadedItemsIds}
        uploadErrorItems={uploadErrorItemsIds}
        onClearError={clearUploadError}
      />
    );
  };

  const pendingDisplay = () => {
    let list: DisplayItems = [];

    if (props.uploadFilesIds?.length > 0) {
      list = list.concat(props.uploadFiles);
    }
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
          {/* <Trans>Your upload queue is empty</Trans> */}
          Your upload queue is empty
        </Text>
      </View>
    );
  };

  const onSuccessfulUpload = (id: string) => {
    // change class to show upload success
    setUploadedItemsIds([...uploadedItemsIds, id]);
    // then, card disappears
    // and remove id from successfullyUploadedItems to clear memory
    setTimeout(() => {
      props.dispatch(removeUploadFile(id));
      props.dispatch(removeUploadJEntry(id));

      const newState = uploadedItemsIds.filter((item) => item !== id);
      setUploadedItemsIds(newState);
    }, 1000);

    // flashMessage(
    //   t`Files have been uploaded to your Mahara successfully!`,
    //   'success'
    // );
    flashMessage(
      'Files have been uploaded to your Mahara successfully!',
      'success'
    );
  };

  const onUploadClick = () => {
    setLoading(true);
    props.uploadFiles.forEach(async (file) => {
      clearUploadError(file.id);
      props
        .dispatch(uploadItemToMahara(file.url, file.maharaFormData))
        .then((result: UploadResponse) => {
          setLoading(false);
          // an error either returns result = undefined, or result = { error: true }
          if (result === undefined || result === null || result.error) {
            setErrorMessage(result.error_message);
            onUploadError(file.id);
          } else {
            onSuccessfulUpload(file.id);
          }
        });
    });

    props.uploadJEntries.forEach(async (journalEntry) => {
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
          } else {
            onSuccessfulUpload(journalEntry.id);
          }
        });
    });
  };

  const goToSiteCheck = () => {
    props.dispatch(addToken(''));
  };

  return (
    <View style={pendingScreenStyles.app}>
      <View style={pendingScreenStyles.listContainer}>{pendingDisplay()}</View>
      {loading && (
        <View>
          <ActivityIndicator color={styles.colors.navBarGreen} />
        </View>
      )}
      {numUploadItems > 0 ? (
        <View style={pendingScreenStyles.buttonContainer}>
          {props.userName !== GUEST_USERNAME ? (
            <View>
              <Text style={[pendingScreenStyles.urlText, textStyles.center]}>
                {/* <Trans>Your site: {url}</Trans> */}
                Your site: {url}
              </Text>
              <MediumButton
                // text={t`Upload to your site`}
                text="Upload to your site"
                onPress={onUploadClick}
                icon="cloud-upload"
              />
            </View>
          ) : (
            <MediumButton
              // text={t`Please login`}
              text="Please login"
              // accessibilityHint={t`To upload pending items`}
              icon="log-in-outline"
              onPress={goToSiteCheck}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  uploadFiles: selectAllUploadFiles(state),
  uploadFilesIds: selectAllUploadFilesIds(state),
  uploadJEntries: selectAllJEntries(state),
  uploadJEntriesIds: selectAllJEntriesIds(state),
  userName: selectUserName(state),
});

export default connect(mapStateToProps)(PendingScreen);
