import { dispatch } from '../../redux/store';
import { setErrorMessage } from '../../redux/ducks/errorDuck';

export const errorHandler = {
  handle(fn) {
    return (res) => {
      const { error, code } = res;
      if (error) {
        dispatch(setErrorMessage(this.getErrorText(code)));
        return;
      }
      fn(res);
    };
  },

  getErrorText(code) {
    return this.messages[code] || 'Something went wrong';
  },

  messages: {
    1: 'Room Limit reached',
    404: 'You don\'t have connection',
    5: 'You have insufficient funds',
  },
};
