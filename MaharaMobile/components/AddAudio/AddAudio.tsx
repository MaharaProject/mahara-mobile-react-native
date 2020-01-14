import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Trans } from '@lingui/macro';

import { buttons } from '../../assets/styles/buttons';
import styles from './AddAudio.style';
import { MaharaFile } from '../../models/models';

type Props = {
  addPickedFile: any;
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
    props.addPickedFile(pickedFile);
  }, [pickedFile.size]);

  useEffect(() => {
    if(props.isEditing) {
      setRecordButtonStatus('recorded');
      setIsRecorded(true);
    }
  }, [props.isEditing]);

  // Handling recording
  const handleRecord = () => {
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
    const msg = await audioRecorderPlayer.startPlayer(audioFile);
    console.log(msg);
    setIsPlaying(true);
    audioRecorderPlayer.addPlayBackListener((e: any) => {
      if (e.current_position === e.duration) {
        console.log('finished');
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
       </View>
    </View>
  );
}

export default AddAudio;
