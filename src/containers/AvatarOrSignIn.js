import { connect } from 'react-redux';
import { retrieveProfile } from '../store/profiles/actions';
import AvatarOrSignIn from '../components/AvatarOrSignIn';


const mapStateToProps = (state) => ({
  profile: state.profile,
  tokens: state.auth.tokens,
});


const mapDispatchToProps = (dispatch) => ({
  retrieveProfile: ({ token }) => dispatch(retrieveProfile({ token })),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvatarOrSignIn);
