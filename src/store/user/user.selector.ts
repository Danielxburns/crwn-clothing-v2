import { createSelector } from 'reselect';
import { RootState } from '../store';
import { UserState } from './user.reducer';

export const selectUserFromState = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserFromState,
  (user) => user.currentUser
);
