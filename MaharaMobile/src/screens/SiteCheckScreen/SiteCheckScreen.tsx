import {Icon, Text, Toast} from 'native-base';
import React, {Component} from 'react';
import {View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {checkLoginTypes} from '../../actions/actions';
import generic from '../../assets/styles/generic';
import variables from '../../assets/styles/variables';
import LoginTypes from '../../components/LoginTypes/LoginTypes';
import {
  selectLocalLogin,
  selectSsoLogin,
  selectTokenLogin,
  selectUrl
} from '../../reducers/loginInfoReducer';
import {RootState} from '../../reducers/rootReducer';
import {setUpGuest} from '../../utils/authHelperFunctions';

type Props = {
  dispatch: Dispatch;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  tokenLogin: boolean;
  ssoLogin: boolean;
  localLogin: boolean;
};

type State = {
  errorMessage: string;
  loginType: string;
  serverPing: boolean;
  isInputHidden: boolean;
  loading: boolean;
};

const initialState: State = {
  errorMessage: '',
  loginType: '',
  serverPing: false,
  isInputHidden: false,
  loading: false
};

export class SiteCheckScreen extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = initialState;
  }

  setLoginType = (loginType: string) => {
    this.props.navigation.navigate('Login', {
      loginType
    });
  };

  /**
   * Turns on/off the loading spinner state
   */
  switchLoading = (newValue?: boolean) => {
    if (newValue) {
      this.setState({loading: newValue});
    } else {
      this.setState(prevState => ({loading: !prevState.loading}));
    }
  };

  checkServer = async (url: string) => {
    const serverUrl = url;

    if (!serverUrl) {
      return;
    }

    try {
      this.switchLoading();
      await this.props.dispatch(checkLoginTypes(serverUrl));
      if (
        this.props.tokenLogin ||
        this.props.localLogin ||
        this.props.ssoLogin
      ) {
        this.switchLoading();
        this.setState({
          serverPing: true,
          isInputHidden: true,
          errorMessage: ''
        });
      }
    } catch (error) {
      this.setState({errorMessage: error.message});
      this.switchLoading();

      Toast.show({
        text: (
          <Text
            style={{
              fontSize: variables.font.md,
              color: variables.colors.red
            }}>
            <Icon
              style={{
                color: variables.colors.red
              }}
              name="home"
            />
            &nbsp;&nbsp;{this.state.errorMessage}
          </Text>
        ),
        type: 'danger',
        style: {
          backgroundColor: variables.colors.warnbg,
          paddingBottom: variables.padding.md
        },
        position: 'center',
        duration: 3000
      });
    }
  };

  skipLogin = () => {
    setUpGuest(this.props.dispatch);
    this.props.navigation.navigate('App');
  };

  resetForm = () => {
    this.setState(initialState);
  };

  render() {
    const {loading} = this.state;

    return (
      <View style={generic.view}>
        <LoginTypes
          url={this.state.url}
          isInputHidden={this.state.isInputHidden}
          serverPing={this.state.serverPing}
          enterUrlWarning={this.state.enterUrlWarning}
          setLoginType={this.setLoginType}
          checkServer={this.checkServer}
          checkUrl={this.checkUrl}
          resetForm={this.resetForm}
          localLogin={this.props.localLogin}
          ssoLogin={this.props.ssoLogin}
          tokenLogin={this.props.tokenLogin}
          errorMessage={this.state.errorMessage}
          navigation={this.props.navigation}
          onSkip={this.skipLogin}
          loading={loading}
        />
        <FlashMessage position="top" />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  tokenLogin: selectTokenLogin(state),
  ssoLogin: selectSsoLogin(state),
  localLogin: selectLocalLogin(state)
});

export default connect(mapStateToProps)(SiteCheckScreen);
