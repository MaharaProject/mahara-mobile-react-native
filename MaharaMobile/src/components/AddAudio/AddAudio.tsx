import {faPauseCircle, faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {i18n, I18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import base64 from 'base-64';
import buttons from '../../assets/styles/buttons';
import variables from '../../assets/styles/variables';
import {MaharaFile, Playback} from '../../models/models';
import OutlineButton from '../UI/OutlineButton/OutlineButton';
import styles from './AddAudio.style';

type Props = {
  setPickedFile: React.Dispatch<React.SetStateAction<MaharaFile>>;
  isEditing: boolean;
  i18n: I18n;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const AddAudio = (props: Props) => {
  type PlayStatus = 'playing' | 'notplaying';
  type RecordStatus = 'unrecorded' | 'recording' | 'recorded';

  const initialState = {uri: '', name: '', type: '', size: 0};
  const [pickedFile, setPickedFile] = useState<MaharaFile>(initialState);
  const [audioFile, setAudioFile] = useState('');
  const [recordButtonStatus, setRecordButtonStatus] = useState<RecordStatus>(
    'unrecorded'
  );
  const [playButtonStatus, setPlayButtonStatus] = useState<PlayStatus>(
    'notplaying'
  );
  const [isRecorded, setIsRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(true);

  const playStrings = {
    playing: (
      <FontAwesomeIcon icon={faPauseCircle} color={variables.colors.tertiary} />
    ),
    notplaying: (
      <FontAwesomeIcon icon={faPlayCircle} color={variables.colors.tertiary} />
    )
  };

  const recordStrings = {
    unrecorded: i18n._(t`Record`),
    recording: i18n._(t`Stop`),
    recorded: i18n._(t`Re-record`)
  };

  useEffect(() => {
    props.setPickedFile(pickedFile);
  }, [pickedFile.size]);

  useEffect(() => {
    if (props.isEditing) {
      setRecordButtonStatus('recorded');
      setIsRecorded(true);
    }
  }, [props.isEditing]);

  // Check permissions
  const checkPermissions = async () => {
    // let permission = true;

    if (Platform.OS === 'android') {
      try {
        const grantedStorage = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: props.i18n._(t`Permission to save files`),
            message: props.i18n._(
              t`Give permission to save files on your device.`
            ),
            buttonPositive: props.i18n._(t`OK`)
          }
        );
        const grantedRecord = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: props.i18n._(t`Permission to record audio`),
            message: props.i18n._(
              t`Allow your microphone to record audo and save the files.`
            ),
            buttonPositive: props.i18n._(t`OK`)
          }
        );

        if (!(grantedStorage === PermissionsAndroid.RESULTS.GRANTED)) {
          setIsPermissionGranted(false);
          return;
        }
        if (!(grantedRecord === PermissionsAndroid.RESULTS.GRANTED)) {
          setIsPermissionGranted(false);
          return;
        }
      } catch (err) {
        setIsPermissionGranted(false);
        // permission = false;
        // return permission;
      }
      setIsPermissionGranted(true);
      // return permission;
    }
  };

  useEffect(() => {
    checkPermissions();
  });

  // Handling recording
  const getFileSize = () => {
    const fileSize = RNFetchBlob.fs.readFile(audioFile, 'base64').then(data => {
      const decodedData = base64.decode(data);
      const bytes = decodedData.length;
      return bytes;
    });
    return fileSize;
  };

  const onStartRecord = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener(() => {
        setAudioFile(result);
        setRecordButtonStatus('recording');
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setAudioFile(result);
    setRecordButtonStatus('recorded');
    setIsRecorded(true);
    const size = await getFileSize();
    setPickedFile({
      name: result,
      uri: result,
      type: 'audio/m4a',
      size
    });
  };

  const handleRecord = async () => {
    // const permission = await checkPermissions();

    if (!isPermissionGranted) {
      return;
    }

    if (
      recordButtonStatus === 'unrecorded' ||
      recordButtonStatus === 'recorded'
    ) {
      onStartRecord();
      setIsRecorded(false);
    } else {
      onStopRecord();
    }
  };

  // Handling playing
  const onStartPlay = async () => {
    await audioRecorderPlayer.startPlayer(audioFile);
    setIsPlaying(true);
    audioRecorderPlayer.addPlayBackListener((e: Playback) => {
      if (e.current_position === e.duration) {
        audioRecorderPlayer.stopPlayer().catch(() => {});
        setIsPlaying(false);
        setPlayButtonStatus('notplaying');
      }
    });
  };

  const onPausePlay = async () => {
    try {
      await audioRecorderPlayer.pausePlayer();
    } catch (e) {
      // console.log(e);
    }
  };

  const handlePlay = () => {
    if (playButtonStatus === 'notplaying') {
      setPlayButtonStatus('playing');
      onStartPlay();
    } else if (playButtonStatus === 'playing') {
      setPlayButtonStatus('notplaying');
      onPausePlay();
    }
  };

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setPlayButtonStatus('notplaying');
    setIsPlaying(false);
  };

  return (
    <View>
      <View style={styles.playbackButtonWrapper}>
        {isRecorded ? (
          <TouchableOpacity
            onPress={() => handlePlay()}
            accessibilityRole="button">
            <Text style={[buttons.sm, styles.smButton]}>
              {playStrings[playButtonStatus]}
            </Text>
          </TouchableOpacity>
        ) : null}
        {isPlaying ? (
          <TouchableOpacity
            onPress={() => onStopPlay()}
            accessibilityRole="button">
            <Text style={[buttons.sm, styles.smButton]}>
              <Trans>Stop</Trans>
            </Text>
          </TouchableOpacity>
        ) : null}
        {!isPermissionGranted ? (
          <Text style={styles.warning}>
            You need to grant the app permission in order to use this feature
          </Text>
        ) : null}
      </View>
      <OutlineButton
        title={t`${recordStrings[recordButtonStatus]}`}
        style={recordButtonStatus === 'recording' ? styles.recording : ''}
        onPress={() => handleRecord()}
      />
    </View>
  );
};

export default withI18n()(AddAudio);
