import {I18n} from '@lingui/core';
import {t} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import {Button, Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import variables from '../../assets/styles/variables';
import {File, PendingMFile, Playback} from '../../models/models';
import {newFile} from '../../models/typeCreators';
import MediumButton from '../UI/MediumButton/MediumButton';
import OutlineButton from '../UI/OutlineButton/OutlineButton';
import styles from './AddAudio.style';

type Props = {
  setPickedFile: React.Dispatch<React.SetStateAction<File>>;
  editItem?: PendingMFile;
  i18n: I18n;
};

type RecordStatus = 'recording' | 'recorded' | 'not-recorded';
type PlayStatus = 'playing' | 'not-playing';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AddAudio = (props: Props) => {
  const [recordStatus, setRecordStat] = useState<RecordStatus>('not-recorded');

  const [audioFile, setAudioFile] = useState('');
  const [playStatus, setPlayStatus] = useState<PlayStatus>('not-playing');
  const [isPermissionGranted, setIsPermissionGranted] = useState(true);

  const PLAY_ICON = 'play-circle';
  const PAUSE_ICON = 'pause-circle';
  const STOP_ICON = 'stop-circle';

  const checkIOS = (filename: string): string => {
    let checkedURI = filename;
    if (Platform.OS === 'ios') {
      checkedURI = filename.replace('file:', '');
    }
    return checkedURI;
  };
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

  useEffect(() => {
    if (props.editItem) {
      setRecordStat('recorded');
    }
  }, [props.editItem]);

  const onStartRecord = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener(() => {
        setAudioFile(result);
        setRecordStat('recording');
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const onStopRecord = async () => {
    const fileURI = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    setAudioFile(fileURI);
    setRecordStat('recorded');

    RNFetchBlob.fs.stat(checkIOS(fileURI)).then(stats => {
      props.setPickedFile(
        newFile(
          stats.path,
          'audio/m4a',
          stats.filename,
          parseInt(stats.size, 10)
        )
      );
    });
  };

  const handleRecord = async () => {
    // const permission = await checkPermissions();

    if (!isPermissionGranted) {
      return;
    }
    if (recordStatus !== 'recording') {
      onStartRecord();
    } else {
      onStopRecord();
    }
  };

  // Handling playing
  const onStartPlay = async () => {
    await audioRecorderPlayer.startPlayer(audioFile);
    audioRecorderPlayer.addPlayBackListener((e: Playback) => {
      if (e.current_position === e.duration) {
        audioRecorderPlayer.stopPlayer().catch(() => {
          // do nothing
        });
        setPlayStatus('not-playing');
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
    if (playStatus === 'not-playing') {
      setPlayStatus('playing');
      onStartPlay();
    } else if (playStatus === 'playing') {
      setPlayStatus('not-playing');
      onPausePlay();
    }
  };

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setPlayStatus('not-playing');
  };

  return (
    <View style={styles.buttonWrapper}>
      <View style={styles.playbackButtonWrapper}>
        {recordStatus === 'recorded' ? (
          <AudioPlayButton
            iconName={playStatus === 'not-playing' ? PLAY_ICON : PAUSE_ICON}
            onPress={() => handlePlay()}
          />
        ) : null}
        {playStatus === 'playing' ? (
          <AudioPlayButton iconName={STOP_ICON} onPress={() => onStopPlay()} />
        ) : null}
        {!isPermissionGranted ? (
          <Text style={styles.warning}>
            You need to grant the app permission in order to use this feature
          </Text>
        ) : null}
      </View>
      <View style={styles.recordButton}>
        {recordStatus === 'recording' ? (
          <MediumButton
            dark
            style={{backgroundColor: variables.colors.red}}
            text={t`Stop`}
            onPress={() => handleRecord()}
            icon={STOP_ICON}
          />
        ) : (
          <OutlineButton
            text={recordStatus === 'recorded' ? t`Re-record` : t`Record`}
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
  <Button
    bordered
    rounded
    onPress={props.onPress}
    style={{marginEnd: variables.padding.sm}}>
    <Icon name={props.iconName} />
  </Button>
);

export default withI18n()(AddAudio);
