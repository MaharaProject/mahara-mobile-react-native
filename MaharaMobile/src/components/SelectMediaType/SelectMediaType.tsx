import React from 'react';
import { View } from 'react-native';
import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import GridButton from '../UI/GridButton/GridButton';
import { FILE, PHOTO, JOURNAL_ENTRY, AUDIO } from '../../utils/constants';
import styles from './SelectMediaType.style';

// Images
import PickFileSvg from '../../assets/images/PickFile';
import TakePhotoSvg from '../../assets/images/TakePhoto';
import AddJournalEntrySvg from '../../assets/images/AddJournalEntry';
import RecordAudioSvg from '../../assets/images/RecordAudio';

type Props = {
  selectMediaType: Function;
};

const SelectMediaType = (props: Props) => (
  <View>
    <View style={styles.row}>
      <GridButton
        image={<PickFileSvg />}
        title={t`Select a file`}
        color="green"
        onPress={() => props.selectMediaType(FILE)}
      />
      <GridButton
        image={<TakePhotoSvg />}
        title={t`Take a photo`}
        color="purple"
        onPress={() => props.selectMediaType(PHOTO)}
      />
    </View>
    <View style={styles.row}>
      <GridButton
        image={<AddJournalEntrySvg />}
        title={t`Add a journal entry`}
        color="lightbrown"
        onPress={() => props.selectMediaType(JOURNAL_ENTRY)}
      />
      <GridButton
        image={<RecordAudioSvg />}
        title={t`Record audio`}
        color="darkbrown"
        onPress={() => props.selectMediaType(AUDIO)}
      />
    </View>
  </View>
);

export default withI18n()(SelectMediaType);
