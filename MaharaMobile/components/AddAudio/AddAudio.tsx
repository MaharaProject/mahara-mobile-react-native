import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Platform, PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Trans } from '@lingui/macro';

import { buttons } from '../../assets/styles/buttons';
import styles from './AddAudio.style';
import { MaharaFile } from '../../models/models';

type Props = {
  setPickedFile: any;
  isEditing: boolean;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const AddAudio = (props: Props) => {
  type PlayStatus = 'playing' | 'notplaying';
  type RecordStatus = 'unrecorded' | 'recording' | 'recorded';

  let initialState = { uri: '', name: '', type: '', size: 0 };
  const [pickedFile, setPickedFile] = useState<MaharaFile>(initialState);
  const [audioFile, setAudioFile] = useState('');
  const [recordButtonStatus, setRecordButtonStatus] = useState<RecordStatus>('unrecorded');
  const [playButtonStatus, setPlayButtonStatus] = useState<PlayStatus>('notplaying');
  const [isRecorded, setIsRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(true);

  const playStrings = {
    playing: <Trans>Pause</Trans>,
    notplaying: <Trans>Play</Trans>
  }

  const recordStrings = {
    unrecorded: <Trans>Record</Trans>,
    recording: <Trans>Stop</Trans>,
    recorded: <Trans>Re-record</Trans>
  }

  useEffect(() => {
    props.setPickedFile(pickedFile);
  }, [pickedFile.size]);

  useEffect(() => {
    if(props.isEditing) {
      setRecordButtonStatus('recorded');
      setIsRecorded(true);
    }
  }, [props.isEditing]);

  // Check permissions
  const checkPermissions = async () => {
    let permission = true;

    if (Platform.OS === 'android') {
      try {
        const grantedStorage = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (grantedStorage === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied for storage');
          setIsPermissionGranted(false);
          return;
        }

        const grantedRecord = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for recoding audio',
            message: 'Give permission to your microphone to record a file',
            buttonPositive: 'ok',
          },
        );
        if (grantedRecord === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('Permission denied for microphone');
          setIsPermissionGranted(false);
          return;
        }
      } catch (err) {
        setIsPermissionGranted(false);
        permission = false;
        return permission;
      }
      return permission;
    }
  };

  // Handling recording
  const handleRecord = async () => {
    const permission = await checkPermissions();

    if (!permission) {
      return;
    }

    if (recordButtonStatus === 'unrecorded' || recordButtonStatus === 'recorded') {
      onStartRecord();
      setIsRecorded(false);
    } else {
      onStopRecord();
    }
  };

  const onStartRecord = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener(() => {
        setAudioFile(result);
        setRecordButtonStatus('recording');
        return;
      });
    } catch (e) {
      console.log(e);
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
      size: size
    });
  };

  const getFileSize = () => {
    const base64 = require('base-64');
    const bytes = RNFetchBlob.fs.readFile(audioFile, 'base64')
      .then((data) => {
        const decodedData = base64.decode(data);
        const bytes=decodedData.length;
        return bytes;
      });
    return bytes;
  };

  // Handling playing
  const handlePlay = () => {
    if (playButtonStatus === 'notplaying') {
      setPlayButtonStatus('playing');
      onStartPlay();
    } else if (playButtonStatus === 'playing') {
      setPlayButtonStatus('notplaying');
      onPausePlay();
    }
  }

  const onStartPlay = async () => {
    await audioRecorderPlayer.startPlayer(audioFile);
    setIsPlaying(true);
    audioRecorderPlayer.addPlayBackListener((e: any) => {
      if (e.current_position === e.duration) {
        audioRecorderPlayer
          .stopPlayer()
          .catch(e => console.log(e.message));
          setIsPlaying(false);
          setPlayButtonStatus('notplaying');
      };
      return;
    });
  };

  const onPausePlay = async () => {
    try {
      await audioRecorderPlayer.pausePlayer();
    } catch(e) {
      console.log(e);
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
      <TouchableOpacity onPress={() => handleRecord()}>
        <Text style={[buttons.md, styles.button]}>{recordStrings[recordButtonStatus]}</Text>
      </TouchableOpacity>
      <View style={styles.buttonWrap}>
        {isRecorded ?
          <TouchableOpacity onPress={() => handlePlay()}>
            <Text style={[buttons.sm, styles.smButton]}>{playStrings[playButtonStatus]}</Text>
          </TouchableOpacity>
        : null}
        {isPlaying ?
          <TouchableOpacity onPress={() => onStopPlay()}>
            <Text style={[buttons.sm, styles.smButton]}><Trans>Stop</Trans></Text>
          </TouchableOpacity>
        : null}
        {!isPermissionGranted ?
          <Text style={styles.warning}>You need to grant the app permission in order to use this feature</Text>
        : null}
      </View>
    </View>
  );
}

export default AddAudio;
