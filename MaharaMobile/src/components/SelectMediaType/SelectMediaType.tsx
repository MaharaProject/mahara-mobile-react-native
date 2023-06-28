import React from 'react';
import { t } from '@lingui/macro';
import { View } from 'react-native';
import AddJournalEntrySvg from 'assets/images/AddJournalEntry';
// Images
import PickFileSvg from 'assets/images/PickFile';
import RecordAudioSvg from 'assets/images/RecordAudio';
import TakePhotoSvg from 'assets/images/TakePhoto';
import GridButton from 'components/UI/GridButton/GridButton';
import { UploadItemType } from 'models/models';
import styles from './SelectMediaType.style';

type Props = {
  selectMediaType: (type: UploadItemType) => void;
};

function SelectMediaType(props: Props) {
  return (
    <View>
      <View style={styles.row}>
        <GridButton
          image={<PickFileSvg />}
          title={t`File`}
          color="green"
          onPress={() => props.selectMediaType('FILE')}
        />
        <GridButton
          image={<TakePhotoSvg />}
          title={t`Photo`}
          color="purple"
          onPress={() => props.selectMediaType('PHOTO')}
        />
      </View>
      <View style={styles.row}>
        <GridButton
          image={<AddJournalEntrySvg />}
          title={t`Journal entry`}
          color="lightbrown"
          onPress={() => props.selectMediaType('J_ENTRY')}
        />
        {/* <GridButton
          image={<RecordAudioSvg />}
          title={t`Audio (disabled)`}
          color="disabled"
          onPress={() => {}}
        /> */}
      </View>
    </View>
  );
}

export default SelectMediaType;
