import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import UploadForm from '../../components/UploadForm/UploadForm';
import generic from '../../assets/styles/generic';
import { UserTag, UserBlog, PendingJournalEntry } from '../../models/models';
import {
  selectUrl,
  selectToken
} from '../../reducers/loginInfoReducer';
import { selectUserBlogs } from '../../reducers/userArtefactsReducer';
import { selectUserTags } from '../../reducers/userTagsReducer';
import { selectAllJEntries } from '../../reducers/uploadJEntriesReducer';
import { RootState } from '../../reducers/rootReducer';
import { JOURNAL_ENTRY } from '../../utils/constants';

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
            formType={JOURNAL_ENTRY}
            token={this.props.token}
            url={this.props.url}
            navigation={this.props.navigation}
          />
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
    userBlogs: selectUserBlogs(state),
    uploadJournals: selectAllJEntries(state)
  };
};

export default connect(mapStateToProps)(AddJournalScreen);
