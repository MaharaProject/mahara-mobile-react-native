import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import { buttons } from '../../assets/styles/buttons';
import styles from './AddAudio.style';
import { MaharaFile } from '../../models/models';

type Props = {
  addPickedFile: any;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const AddAudio = (props: Props) => {
  let initialState = { uri: '', name: '', type: '', size: 0 };
  const [pickedFile, setPickedFile] = useState<MaharaFile>(initialState);
  const [audioFile, setAudioFile] = useState('');
  const [recordButtonText, setRecordButtonText] = useState('Record');
  const [playButtonText, setPlayButtonText] = useState('Play');
  const [isRecorded, setIsRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    props.addPickedFile(pickedFile);
  }, [pickedFile.size]);

  // Handling recording
  const handleRecord = () => {
    if (recordButtonText === "Record" || recordButtonText === "Re-record") {
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
        setRecordButtonText('Stop recording');
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
    setRecordButtonText('Re-record');
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
    if (playButtonText === 'Play') {
      setPlayButtonText('Pause');
      onStartPlay();
    } else if (playButtonText === 'Pause') {
      setPlayButtonText('Play');
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
          setPlayButtonText('Play');
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
    setPlayButtonText('Play');
    setIsPlaying(false);
  };

  return (
    <View>
       <TouchableOpacity onPress={() => handleRecord()}>
         <Text style={[buttons.md, styles.button]}>{recordButtonText}</Text>
       </TouchableOpacity>
       <View style={styles.buttonWrap}>
         {isRecorded ?
           <TouchableOpacity onPress={() => handlePlay()}>
            <Text style={[buttons.sm, styles.smButton]}>{playButtonText}</Text>
           </TouchableOpacity>
         : null}
        {isPlaying ?
           <TouchableOpacity onPress={() => onStopPlay()}>
            <Text style={[buttons.sm, styles.smButton]}>Stop</Text>
           </TouchableOpacity>
        : null}
       </View>
    </View>
  );
}

export default AddAudio;
