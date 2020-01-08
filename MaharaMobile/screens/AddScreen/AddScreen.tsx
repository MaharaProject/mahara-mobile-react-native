import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import generic from '../../assets/styles/generic';
import SelectMediaType from '../../components/SelectMediaType/SelectMediaType';

type Props = {
  navigation: any;
}

export default class AddScreen extends Component<Props> {

  selectMediaType = (type: string) => {
    switch (type) {
      case 'file':
        this.props.navigation.navigate('AddFile');
        break;
      case 'journal':
        this.props.navigation.navigate('AddJournal');
        break;
      default:
        return;
    };
  };

  static navigationOptions = {
    headerTitle: 'Add items'
  };

  // Audio stuff
  onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      });
      return;
    });
    console.log(result);
  };

  onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };

  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  }

  render() {
    return (
      <ScrollView>
        <View style={generic.wrap}>
          <SelectMediaType selectMediaType={this.selectMediaType} />
        </View>
      </ScrollView>
    );
  }
}
