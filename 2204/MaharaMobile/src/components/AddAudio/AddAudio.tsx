// import {I18n} from '@lingui/core';
// import {t} from '@lingui/macro';
// import {withI18n} from '@lingui/react';
import {
  faMicrophone,
  faPause,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, Text, View } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import variables from '../../assets/styles/variables';
import { File, PlayBackType } from '../../models/models';
import { newFile } from '../../models/typeCreators';
import AudioPlayButton from '../UI/AudioPlayButton/AudioPlayButton';
import MediumButton from '../UI/MediumButton/MediumButton';
import OutlineButton from '../UI/OutlineButton/OutlineButton';
import styles from './AddAudio.style';

type Props = {
  setPickedFile: any;
  audioFileToEdit?: File;
  // i18n: I18n;
  i18n?: any;
};

type RecordStatus = 'recording' | 'recorded' | 'not-recorded';
type PlayStatus = 'playing' | 'not-playing';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AddAudio = (props: Props) => {
  const [recordStatus, setRecordStat] = useState<RecordStatus>('not-recorded');
  const [uri, setURI] = useState(
    props.audioFileToEdit ? props.audioFileToEdit.uri : ''
  );

  const [playStatus, setPlayStatus] = useState<PlayStatus>('not-playing');
  const [isPermissionGranted, setIsPermissionGranted] = useState(true);

  const PLAY_ICON = faPlay;
  const PAUSE_ICON = faPause;
  const STOP_ICON = faStop;

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
        const grantedWriteStorage = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          // {
          //   title: props.i18n._(t`Access permission`),
          //   message: props.i18n._(
          //     t`Allow Mahara Mobile to access photos, media, and files on your device?`
          //   ),
          //   buttonPositive: props.i18n._(t`Allow`)
          // }
          {
            title: 'Access permission',
            message:
              'Allow Mahara Mobile to access photos, media, and files on your device?',
            buttonPositive: 'Allow',
          }
        );

        if (grantedWriteStorage !== PermissionsAndroid.RESULTS.GRANTED) {
          setIsPermissionGranted(false);
          return;
        }
      } catch (e) {
        console.warn(e);
        setIsPermissionGranted(false);
      }

      try {
        const grantedReadStorage = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          // {
          //   title: props.i18n._(t`Access permission`),
          //   message: props.i18n._(
          //     t`Allow Mahara Mobile to read photos, media, and files on your device?`
          //   ),
          //   buttonPositive: props.i18n._(t`Allow`)
          // }
          {
            title: 'Access permission',
            message:
              'Allow Mahara Mobile to read photos, media, and files on your device?',
            buttonPositive: 'Allow',
          }
        );

        if (grantedReadStorage !== PermissionsAndroid.RESULTS.GRANTED) {
          setIsPermissionGranted(false);
          return;
        }
      } catch (e) {
        console.warn(e);
        setIsPermissionGranted(false);
      }

      try {
        const grantedRecord = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          // {
          //   title: props.i18n._(t`Permission to record audio`),
          //   message: props.i18n._(
          //     t`Allow your microphone to record audio and save the files?`
          //   ),
          //   buttonPositive: props.i18n._(t`Allow`),
          // }
          {
            title: 'Permission to record audio',
            message:
              'Allow your microphone to record audio and save the files?',
            buttonPositive: 'Allow',
          }
        );
        if (grantedRecord !== PermissionsAndroid.RESULTS.GRANTED) {
          setIsPermissionGranted(false);
          return;
        }
      } catch (e) {
        console.warn(e);
        setIsPermissionGranted(false);
      }
      setIsPermissionGranted(true);
      // return permission;
    }
  };

  useEffect(() => {
    checkPermissions();
  });

  useEffect(() => {
    if (props.audioFileToEdit) {
      setRecordStat('recorded');
    }
  }, [props.audioFileToEdit]);

  const onStartRecord = async () => {
    // check not playing recording
    if (playStatus === 'playing') {
      setPlayStatus('not-playing');
      audioRecorderPlayer.pausePlayer();
    }

    const rand = Math.round(Math.random() * 1000);
    const { dirs } = RNFetchBlob.fs;
    const path =
      Platform.select({
        ios: `${rand}recording.m4a`,
        android: `${dirs.CacheDir}/${rand}recording.mp3`,
      }) ?? `${rand}recording.m4a`;

    setURI(path);

    const resultURI = await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener(() => {
      setURI(resultURI);
      setRecordStat('recording');
    });
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordStat('recorded');

    let fileSize = 0;
    let filename = '';

    await RNFetchBlob.fs.stat(checkIOS(result)).then((stats) => {
      filename = stats.filename;
      fileSize = parseInt(stats.size, 10);
    });

    const mime = `audio/${Platform.OS === 'ios' ? 'm4a' : 'mp3'}`;

    const file = newFile(uri, mime, filename, fileSize);

    props.setPickedFile(file);
  };

  const handleRecord = async () => {
    console.log('recording');
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
    console.log('start play');
    const msg = await audioRecorderPlayer.startPlayer(uri);
    audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      if (e.currentPosition === e.duration) {
        audioRecorderPlayer
          .stopPlayer()
          .then(() => {
            setPlayStatus('not-playing');
          })
          .catch(() => {
            // audio reached end
            setPlayStatus('not-playing');
          });
      }
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
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
            style={{ backgroundColor: variables.colors.recordingStopButtonRed }}
            // text={t`Stop`}
            text="Stop"
            onPress={() => handleRecord()}
            icon={STOP_ICON}
          />
        ) : (
          <OutlineButton
            // text={recordStatus === 'recorded' ? t`Re-record` : t`Record`}
            text={recordStatus === 'recorded' ? 'Re-record' : 'Record'}
            onPress={() => handleRecord()}
            icon={faMicrophone}
          />
        )}
      </View>
    </View>
  );
};

// export default withI18n()(AddAudio);
export default AddAudio;
