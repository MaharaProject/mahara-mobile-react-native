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
  <View style={styles.wrapper}>
    <GridButton
      image={<PickFileSvg />}
      title={t`Select a file`}
      onPress={() => props.selectMediaType(FILE)}
    />
    <GridButton
      image={<TakePhotoSvg />}
      title={t`Take a photo`}
      onPress={() => props.selectMediaType(PHOTO)}
    />
    <GridButton
      image={<AddJournalEntrySvg />}
      title={t`Add a journal entry`}
      onPress={() => props.selectMediaType(JOURNAL_ENTRY)}
    />
    <GridButton 
      image={<RecordAudioSvg />}
      title={t`Record audio`}
      onPress={() => props.selectMediaType(AUDIO)}
    />
  </View>
);

export default withI18n()(SelectMediaType);
