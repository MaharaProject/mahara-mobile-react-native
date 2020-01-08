import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, ScrollView, Alert } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { connect } from 'react-redux';

import UploadForm from '../../components/UploadForm/UploadForm';
import generic from '../../assets/styles/generic';
import { buttons } from '../../assets/styles/buttons';
import { MaharaFile, UserTag, UserFolder, MaharaPendingFile } from '../../models/models';
import {
  selectUrl,
  selectToken
} from '../../reducers/loginInfoReducer';
import { selectUserFolders } from '../../reducers/userArtefactsReducer';
import { selectUserTags } from '../../reducers/userTagsReducer';
import { selectAllUploadFiles } from '../../reducers/uploadFilesReducer';
import { RootState } from '../../reducers/rootReducer';

type Props = {
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  userName: string;
  token: string;
  dispatch: any;
  navigation: any;
  url: string;
  uploadList: {
    files: Array<MaharaPendingFile>;
  }
};

type State = {
  pickedFile: MaharaFile;
  filePickerButtonText: string;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

export class AddAudioScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pickedFile: { uri: '', name: '', type: '', size: 0 },
      filePickerButtonText: 'Select a file'
    };
  };

  static navigationOptions = {
    headerTitle: 'Add audio'
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
        // result.play();
  };

  onStartPlay = async () => {
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
  };

  render() {
    return (
      <ScrollView>
        <View style={generic.wrap}>
          <View>
             <TouchableOpacity onPress={() => this.onStartRecord()}>
               <Text style={buttons.sm}>Record</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => this.onStopRecord()}>
               <Text style={buttons.sm}>Stop</Text>
             </TouchableOpacity>
          </View>
          <View>
            <UploadForm
              pickedFile={this.state.pickedFile}
              userFolders={this.props.userFolders}
              userTags={this.props.userTags}
              formType="file"
              token={this.props.token}
              url={this.props.url}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    url: selectUrl(state),
    token: selectToken(state),
    userTags: selectUserTags(state),
    userFolders: selectUserFolders(state),
    uploadFiles: selectAllUploadFiles(state)
  };
};

export default connect(mapStateToProps)(AddAudioScreen);
