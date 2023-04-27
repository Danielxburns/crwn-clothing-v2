import { createSelector } from 'reselect';
import { UserState } from './user.reducer';

export const selectUserFromState = (state): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserFromState,
  (user) => user.currentUser
);
