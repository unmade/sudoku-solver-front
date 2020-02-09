import { connect } from 'react-redux';
import { signInUser } from '../store/auth/actions';
import Header from '../components/Header';


const mapStateToProps = (state) => ({
  profile: state.profile.item,
});


const mapDispatchToProps = (dispatch) => ({
  onSignInSuccess: (response) => dispatch(signInUser(response)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
