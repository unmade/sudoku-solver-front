import { connect } from 'react-redux';
import { signInUser } from '../store/auth/actions';
import GoogleButton from '../components/GoogleButton';


const mapDispatchToProps = (dispatch) => ({
  onSuccess: (response) => dispatch(signInUser(response)),
  onFailue: () => {},
});


export default connect(
  null,
  mapDispatchToProps,
)(GoogleButton);
