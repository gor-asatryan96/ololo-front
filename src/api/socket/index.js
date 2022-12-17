import Centrifuge from 'centrifuge';
import { batchActions } from 'redux-batched-actions';
import { emitAuth } from './emitters';
import { lobbySubscriber, userSubscriber } from './subscribers';
import { getTokenFromUrl } from '../../helpers/general';
import { dispatch, isSocketChanging } from '../../redux/store';
import { setRemoteId, setUserId } from '../../redux/ducks/userDuck';
import { sendRequest } from '../../helpers/fetch';
import { setErrorMessage } from '../../redux/ducks/errorDuck';
import { errorHandler } from './errorHandler';

export let centrifuge = null;

export const openConnection = async (url) => {
  try {
    const urlToken = getTokenFromUrl();
    const { token, userId, remoteId } = await sendRequest(process.env.REACT_APP_BACK_URL, 'POST', { token: urlToken });
    // const { token, userId, remoteId } =
    // await sendRequest(process.env.REACT_APP_GET_TOKEN_URL, 'POST', { token: urlToken });
    dispatch(batchActions([ setUserId(userId), setRemoteId(remoteId) ]));

    // WebSocket Connection
    centrifuge = new Centrifuge(url);

    centrifuge.setToken(token);

    centrifuge.on('connect', (res) => {
      emitAuth();
      console.log(res, 'connect centrifuge');
    });

    centrifuge.on('disconnect', (res) => {
      if (!isSocketChanging()) {
        dispatch(setErrorMessage(errorHandler.getErrorText('404')));
      }
      console.log('centrifuge disconnect', res);
    });

    const userSub = userSubscriber(userId);
    userSub.on('subscribe', res => console.log('user subscribe', res));

    const lobbySub = lobbySubscriber();
    lobbySub.on('subscribe', res => console.log('lobby subscribe', res));

    centrifuge.connect();
  } catch (error) {
    console.log('centrifuge error', error);
  }
};

export const closeConnection = () => {
  centrifuge.disconnect();
};
