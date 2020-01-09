import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, ScrollView, Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
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
  result: string;
  recordSecs: number;
  recordTime: number;
  playTime: number;
  duration: number;
  currentPositionSec: number;
  filePickerButtonText: string;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

export class AddAudioScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pickedFile: { uri: '', name: '', type: '', size: 0 },
      result: '',
      recordSecs: 0,
      recordTime: 0,
      playTime: 0,
      duration: 0,
      currentPositionSec: 0,
      filePickerButtonText: 'Select a file'
    };
  };

  static navigationOptions = {
    headerTitle: 'Add audio'
  };

  // Audio stuff
  onStartRecord = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        this.setState({
          result: result,
          recordSecs: e.current_position,
          recordTime: audioRecorderPlayer.mmssss(
            Math.floor(e.current_position)
          ),
        });
        return;
      });
    } catch (e) {
      console.log(e);
    }
  };

  onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    this.setState(prevState => ({
      result: result,
      pickedFile: {
        ...prevState.pickedFile,
        uri: result,
        name: result,
        type: 'audio/m4a'
      }
    }));
    this.getFileSize();
  };

  onStartPlay = async () => {
    const msg = await audioRecorderPlayer.startPlayer(this.state.result);
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        audioRecorderPlayer
          .stopPlayer()
          .catch(e => console.log(e.message));
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
    try {
      await audioRecorderPlayer.pausePlayer();
    } catch(e) {
      console.log(e);
    }
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  getFileSize = async () => {
    const base64 = require('base-64');
    RNFetchBlob.fs.readFile(this.state.result, 'base64')
      .then((data) => {
        var decodedData = base64.decode(data);
        var bytes=decodedData.length;
        this.setState(prevState=> ({
          pickedFile: {
            ...prevState.pickedFile,
            size: bytes
          }
        }));
      })
      console.log(this.state.pickedFile);
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
             <TouchableOpacity onPress={() => this.onStartPlay()}>
               <Text style={buttons.sm}>Play</Text>
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
