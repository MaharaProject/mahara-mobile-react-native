import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, ScrollView, Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { connect } from 'react-redux';

import UploadForm from '../../components/UploadForm/UploadForm';
import generic from '../../assets/styles/generic';
import { buttons } from '../../assets/styles/buttons';
import styles from './AddAudioScreen.style';
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
  audioFile: string;
  recordSecs: number;
  recordTime: number;
  recordButtonText: string;
  playButtonText: string;
  isRecorded: boolean;
  isPlaying: boolean;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

export class AddAudioScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pickedFile: { uri: '', name: '', type: '', size: 0 },
      audioFile: '',
      recordSecs: 0,
      recordTime: 0,
      recordButtonText: 'Record',
      playButtonText: 'Play',
      isRecorded: false,
      isPlaying: false
    };
  };

  static navigationOptions = {
    headerTitle: 'Add audio'
  };

  // Audio stuff
  // Handling recording
  handleRecord = () => {
    if (this.state.recordButtonText === "Record" || this.state.recordButtonText === "Re-record") {
      this.onStartRecord();
      this.setState({ isRecorded: false });
    } else {
      this.onStopRecord();
    }
  };

  onStartRecord = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        this.setState({
          audioFile: result,
          recordSecs: e.current_position,
          recordButtonText: 'Stop recording',
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
      audioFile: result,
      recordButtonText: 'Re-record',
      isRecorded: true,
      pickedFile: {
        ...prevState.pickedFile,
        uri: result,
        name: result,
        type: 'audio/m4a'
      }
    }));
    this.getFileSize();
  };

  getFileSize = async () => {
    const base64 = require('base-64');
    RNFetchBlob.fs.readFile(this.state.audioFile, 'base64')
      .then((data) => {
        var decodedData = base64.decode(data);
        var bytes=decodedData.length;
        this.setState(prevState=> ({
          pickedFile: {
            ...prevState.pickedFile,
            size: bytes
          }
        }));
      });
  };

  // Handling playing

  handlePlay = () => {
    if (this.state.playButtonText === 'Play') {
      this.setState({ playButtonText: 'Pause' });
      this.onStartPlay();
    } else if (this.state.playButtonText === 'Pause') {
      this.setState({ playButtonText: 'Play' });
      this.onPausePlay();
    }
  }

  onStartPlay = async () => {
    const msg = await audioRecorderPlayer.startPlayer(this.state.audioFile);
    console.log(msg);
    this.setState({ isPlaying: true });
    audioRecorderPlayer.addPlayBackListener((e: any) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        audioRecorderPlayer
          .stopPlayer()
          .catch(e => console.log(e.message));
        this.setState({
          isPlaying: false,
          playButtonText: 'Play'
        });
      };
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
    this.setState({
      playButtonText: 'Play',
      isPlaying: false
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={generic.wrap}>
          <View>
             <TouchableOpacity onPress={() => this.handleRecord()}>
               <Text style={[buttons.md, styles.button]}>{this.state.recordButtonText}</Text>
             </TouchableOpacity>
             <View style={styles.buttonWrap}>
               {this.state.isRecorded ?
                 <TouchableOpacity onPress={() => this.handlePlay()}>
                  <Text style={[buttons.sm, styles.smButton]}>{this.state.playButtonText}</Text>
                 </TouchableOpacity>
               : null}
              {this.state.isPlaying ?
                 <TouchableOpacity onPress={() => this.onStopPlay()}>
                  <Text style={[buttons.sm, styles.smButton]}>Stop</Text>
                 </TouchableOpacity>
               : null}
             </View>
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
