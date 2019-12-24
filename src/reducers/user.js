import { UNAUTHORIZED, CLEAR_ALL } from '../constants';

const defaultState = {
  lists: [],
  num: 0,
  test: 'this is a test'
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UNAUTHORIZED:
      return { ...state, lists: action.lists };
    case CLEAR_ALL:
      return { lists: [], num: 0, test: 'this is a test' };
    default:
      return state;
  }
};
export default userReducer;
