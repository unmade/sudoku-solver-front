import { connect } from 'react-redux';
import { signIn } from '../store/auth/actions';
import GoogleButton from '../components/GoogleButton';


const mapDispatchToProps = (dispatch) => ({
  onSuccess: (response) => dispatch(signIn(response)),
  onFailure: () => {},
});


export default connect(
  null,
  mapDispatchToProps,
)(GoogleButton);
