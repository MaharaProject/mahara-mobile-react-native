import React, { useState } from 'react';
// Images
import { faCloudUploadAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
  useToast
} from '@gluestack-ui/themed-native-base';
import { Trans, t } from '@lingui/macro';
import { ActivityIndicator, Alert as ReactNativeAlert, View } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import UploadSVG from 'assets/images/upload';
import generic from 'assets/styles/generic';
import textStyles from 'assets/styles/text';
import styles from 'assets/styles/variables';
import PendingList from 'components/PendingList/PendingList';
import MediumButton from 'components/UI/MediumButton/MediumButton';
import MediumButtonDark from 'components/UI/MediumButtonDark/MediumButtonDark';
import {
  DisplayItems,
  PendingJEntry,
  PendingMFile,
  UploadItemType,
  UploadResponse
} from 'models/models';
// components
import { saveTaggedItemsToAsync, updateItemTags as updateItemTagsIds } from 'store/actions/actions';
import { addToken } from 'store/actions/loginInfo';
import { removeUploadFile } from 'store/actions/uploadFiles';
import { removeUploadJEntry } from 'store/actions/uploadJEntries';
import { selectUrl, selectUserName } from 'store/reducers/loginInfoReducer';
import { RootState } from 'store/reducers/rootReducer';
import { selectAllUploadFiles, selectAllUploadFilesIds } from 'store/reducers/uploadFilesReducer';
import { selectAllJEntries, selectAllJEntriesIds } from 'store/reducers/uploadJEntriesReducer';
import { GUEST_USERNAME } from 'utils/constants';
import { uploadItemToMahara } from 'utils/helperFunctions';
import { maharaTheme } from 'utils/theme';
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
};

function PendingScreen(props: Props) {
  const numUploadFiles = props.uploadFiles.length;
  const numUploadJEntries = props.uploadJEntries.length;
  const numUploadItems = numUploadFiles + numUploadJEntries;

  const [uploadedItemsIds, setUploadedItemsIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const url = useSelector((state: RootState) => selectUrl(state));

  //  This is no longer shown as we don't navigate to the pending screen upon adding an item
  // useEffect(() => {
  //   if (props.route.params?.added) {
  //     Toast.show({ title: t`Added to upload queue successfully!` });
  //   }
  // }, [props.route.params?.added]);

  /**
   * When 'Delete' is pressed, filter out the item with the given id and update the UploadList.
   */
  const onRemove = (itemId: string) => {
    ReactNativeAlert.alert(
      t`Are you sure?`,
      t`The deletion of this information or file cannot be undone`,
      [
        {
          text: t`Cancel`,
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: t`Delete`,
          onPress: () => {
            props.dispatch(removeUploadFile(itemId));
            props.dispatch(removeUploadJEntry(itemId));
            // TODO: update related tags
            props.dispatch(updateItemTagsIds(itemId, []));
            props.dispatch(saveTaggedItemsToAsync());
          }
        }
      ],
      { cancelable: false }
    );
  };

  const onEdit = (item: PendingMFile | PendingJEntry) => {
    const type: UploadItemType = item.type ?? 'J_ENTRY';
    props.navigation.navigate('EditItem', { itemToEdit: item, itemType: type });
  };

  const onUploadError = (itemId: string, errorMessage: string) => {
    toast.show({
      render: ({ id }) => (
        <Alert mx={2} status="error" variant="left-accent">
          <VStack alignItems="center">
            <HStack space="3" alignItems="center">
              <Alert.Icon />
              <Text w="100%" fontWeight="medium">{t`Upload error`}</Text>
              <IconButton
                icon={<CloseIcon size="4" />}
                onPress={() => toast.close(id)}
                colorScheme="red"
                ml="auto"
              />
            </HStack>
            <Text>{errorMessage}</Text>
          </VStack>
        </Alert>
      )
    });
  };

  /**
   * Renders a PendingList
   * @param dataList array of files and journal entries
   */
  const renderPendingList = (dataList: DisplayItems) => (
    <PendingList
      dataList={dataList}
      onRemove={onRemove}
      onEdit={onEdit}
      successfullyUploadedItemsIds={uploadedItemsIds}
    />
  );

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
        <Text style={{ ...pendingScreenStyles.noPendingText, ...generic.maharaText }}>
          <Trans>Your upload queue is empty</Trans>
        </Text>
      </View>
    );
  };

  const onSuccessfulUpload = (itemId: string) => {
    // change class to show upload success
    setUploadedItemsIds([...uploadedItemsIds, itemId]);
    // then, card disappears
    // and remove id from successfullyUploadedItems to clear memory
    setTimeout(() => {
      props.dispatch(removeUploadFile(itemId));
      props.dispatch(removeUploadJEntry(itemId));
      setUploadedItemsIds((state) => state.filter((item) => item !== itemId));
    }, 1000);

    toast.show({
      render: ({ id }) => (
        <Alert
          mx={2}
          status="success"
          backgroundColor={maharaTheme.colors.success[10]}
          variant="left-accent"
        >
          <VStack alignItems="center">
            <HStack space={3} alignItems="center">
              <Alert.Icon />
              <Text
                w="100%"
                color={maharaTheme.colors.success[900]}
                fontWeight="medium"
              >{t`Upload success`}</Text>
              <IconButton
                icon={<CloseIcon size="4" />}
                onPress={() => toast.close(id)}
                color={maharaTheme.colors.successIcon}
                ml="auto"
              />
            </HStack>
            <Text
              color={maharaTheme.colors.success[900]}
            >{t`Files have been uploaded to your Mahara successfully!`}</Text>
          </VStack>
        </Alert>
      )
    });
  };

  const onUploadClick = () => {
    setLoading(true);
    props.uploadFiles.forEach(async (file) => {
      uploadItemToMahara(file.url, file.maharaFormData)().then((result: UploadResponse) => {
        setLoading(false);
        // an error either returns result = undefined, or result = { error: true }
        if (result === undefined || result === null || result.error) {
          onUploadError(file.id, result.error_message);
        } else {
          onSuccessfulUpload(file.id);
        }
      });
    });

    props.uploadJEntries.forEach(async (journalEntry) => {
      console.log(journalEntry);
      uploadItemToMahara(journalEntry.url, journalEntry.journalEntry)().then(
        (result: UploadResponse) => {
          setLoading(false);
          if (result === undefined || result === null || result.error) {
            onUploadError(journalEntry.id, result.error_message);
          } else {
            onSuccessfulUpload(journalEntry.id);
          }
        }
      );
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
              <Text fontWeight="light" style={[pendingScreenStyles.urlText, textStyles.center]}>
                <Trans>Your site: {url}</Trans>
              </Text>
              <MediumButtonDark
                text={t`Upload to your site`}
                onPress={onUploadClick}
                icon={faCloudUploadAlt}
              />
            </View>
          ) : (
            <MediumButtonDark
              text={t`Please login`}
              accessibilityHint={t`To upload pending items`}
              icon={faSignInAlt}
              onPress={goToSiteCheck}
            />
          )}
        </View>
      ) : null}
    </View>
  );
}

const mapStateToProps = (state: RootState) => ({
  uploadFiles: selectAllUploadFiles(state),
  uploadFilesIds: selectAllUploadFilesIds(state),
  uploadJEntries: selectAllJEntries(state),
  uploadJEntriesIds: selectAllJEntriesIds(state),
  userName: selectUserName(state)
});

export default connect(mapStateToProps)(PendingScreen);
