import {I18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import base64 from 'base-64';
import {Button, Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import variables from '../../assets/styles/variables';
import {
  MaharaFile,
  MaharaPendingFile,
  MessageDescriptor,
  Playback
} from '../../models/models';
import {RECORDED, RECORDING, UNRECORDED} from '../../utils/constants';
import MediumButton from '../UI/MediumButton/MediumButton';
import OutlineButton from '../UI/OutlineButton/OutlineButton';
import styles from './AddAudio.style';

type Props = {
  setPickedFile: React.Dispatch<React.SetStateAction<MaharaFile>>;
  editItem?: MaharaPendingFile;
  i18n: I18n;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const AddAudio = (props: Props) => {
  const getButtonText = (recordStatus: string): MessageDescriptor => {
    let buttonText: MessageDescriptor = {id: ''};
    switch (recordStatus) {
      case UNRECORDED:
        buttonText = t`Record`;
        break;
      case RECORDING:
        buttonText = t`Stop`;
        break;
      case RECORDED:
        buttonText = t`Re-record`;
        break;
      default:
        break;
    }
    return buttonText;
  };

  const PLAY_BUTTON_STATUSES = {
    NOT_PLAYING: 'not playing',
    PLAYING: 'playing'
  };

  const [audioFile, setAudioFile] = useState('');
  const [recordButtonText, setRecordButtonText] = useState(t`Record`);
  const [playButtonStatus, setPlayButtonStatus] = useState(
    PLAY_BUTTON_STATUSES.NOT_PLAYING
  );
  const [isRecorded, setIsRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(true);

  const PLAY_ICON = 'play-circle';
  const PAUSE_ICON = 'pause-circle';
  const STOP_ICON = 'stop-circle';

  // Check permissions
  const checkPermissions = async () => {
    // let permission = true;

    if (Platform.OS === 'android') {
      try {
        const grantedStorage = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: props.i18n._(t`Access permission`),
            message: props.i18n._(
              t`Allow Mahara Mobile to access photos, media, and files on your device?`
            ),
            buttonPositive: props.i18n._(t`Allow`)
          }
        );
        const grantedRecord = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: props.i18n._(t`Permission to record audio`),
            message: props.i18n._(
              t`Allow your microphone to record audio and save the files?`
            ),
            buttonPositive: props.i18n._(t`Allow`)
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
        setRecordButtonText(getButtonText(RECORDING));
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setAudioFile(result);
    setRecordButtonText(getButtonText(RECORDED));
    setIsRecorded(true);
    const size = await getFileSize();
    props.setPickedFile({
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
      recordButtonText.id === t`Record`.id ||
      recordButtonText.id === t`Re-record`.id
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
        audioRecorderPlayer.stopPlayer().catch(() => {
          // do nothing
        });
        setIsPlaying(false);
        setPlayButtonStatus(PLAY_BUTTON_STATUSES.NOT_PLAYING);
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
    if (playButtonStatus === PLAY_BUTTON_STATUSES.NOT_PLAYING) {
      setPlayButtonStatus(PLAY_BUTTON_STATUSES.PLAYING);
      onStartPlay();
    } else if (playButtonStatus === PLAY_BUTTON_STATUSES.PLAYING) {
      setPlayButtonStatus(PLAY_BUTTON_STATUSES.NOT_PLAYING);
      onPausePlay();
    }
  };

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setPlayButtonStatus(PLAY_BUTTON_STATUSES.NOT_PLAYING);
    setIsPlaying(false);
  };

  return (
    <View style={styles.buttonWrapper}>
      <View style={styles.playbackButtonWrapper}>
        {isRecorded ? (
          <AudioPlayButton
            iconName={
              playButtonStatus === PLAY_BUTTON_STATUSES.NOT_PLAYING
                ? PLAY_ICON
                : PAUSE_ICON
            }
            onPress={() => handlePlay()}
          />
        ) : null}
        {isPlaying ? (
          <AudioPlayButton iconName={STOP_ICON} onPress={() => onStopPlay()} />
        ) : null}
        {!isPermissionGranted ? (
          <Text style={styles.warning}>
            You need to grant the app permission in order to use this feature
          </Text>
        ) : null}
      </View>
      <View style={styles.recordButton}>
        {recordButtonText.id === t`Stop`.id ? (
          <MediumButton
            dark
            style={{backgroundColor: variables.colors.red}}
            text={t`Stop`}
            onPress={() => handleRecord()}
            icon={STOP_ICON}
          />
        ) : (
          <OutlineButton
            text={t`Record`}
            onPress={() => handleRecord()}
            icon="mic"
          />
        )}
      </View>
    </View>
  );
};

type AudioPlayButtonProps = {
  onPress: () => void;
  iconName: string;
};
const AudioPlayButton = (props: AudioPlayButtonProps) => (
  <Button bordered rounded onPress={props.onPress}>
    <Icon name={props.iconName} />
  </Button>
);

export default withI18n()(AddAudio);
