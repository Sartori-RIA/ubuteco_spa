import {AuthState} from '../../store/auth/auth.reducer';
import {admin} from '../factories/users.factory';

export const authInitialState: AuthState = {
  loading: false,
  user: admin,
};
