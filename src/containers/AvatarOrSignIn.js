import { connect } from 'react-redux';
import { getTokens } from '../store/auth/selectors';
import { retrieveProfile } from '../store/profiles/actions';
import AvatarOrSignIn from '../components/AvatarOrSignIn';
import { signOut } from '../store/auth/actions';


const mapStateToProps = (state) => ({
  profile: state.profile,
  tokens: getTokens(state),
});


const mapDispatchToProps = (dispatch) => ({
  retrieveProfile: ({ token }) => dispatch(retrieveProfile({ token })),
  onSignOut: () => dispatch(signOut()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvatarOrSignIn);
