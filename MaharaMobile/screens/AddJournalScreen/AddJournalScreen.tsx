import React, { Component } from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import UploadForm from '../../components/UploadForm/UploadForm';
import generic from '../../assets/styles/generic';
import { buttons } from '../../assets/styles/buttons';
import { UserTag, UserBlog, PendingJournalEntry } from '../../models/models';
import {
  selectUrl,
  selectToken
} from '../../reducers/loginInfoReducer';
import { selectUserFolders } from '../../reducers/userArtefactsReducer';
import { selectUserTags } from '../../reducers/userTagsReducer';
import { selectAllJEntries } from '../../reducers/uploadJEntriesReducer';
import { RootState } from '../../reducers/reducers';

type Props = {
  userTags: Array<UserTag>;
  userBlogs: Array<UserBlog>;
  token: string;
  dispatch: any;
  navigation: any;
  url: string;
  uploadList: {
    journalEntries: Array<PendingJournalEntry>;
  }
};

export class AddJournalScreen extends Component<Props> {

  static navigationOptions = {
    headerTitle: 'Add journal entry'
  };

  render() {
    return (
      <ScrollView>
        <View style={generic.wrap}>
          <UploadForm
            userTags={this.props.userTags}
            userBlogs={this.props.userBlogs}
            formType="journal"
            token={this.props.token}
            url={this.props.url}
          />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Add')}>
            <Text style={buttons.sm}>Back</Text>
          </TouchableOpacity>
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
    uploadJournals: selectAllJEntries(state)
  };
};

export default connect(mapStateToProps)(AddJournalScreen);
