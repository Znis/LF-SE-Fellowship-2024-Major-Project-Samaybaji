import { StateManager } from './../state-management/stateManager';
import axios from 'axios';

const baseUrl = 'http://localhost:8000';
const cartUrl = '/carts';
const clearCartUrl = `${cartUrl}/clear`;
export const clearCart = async () => {
  return await axios
    .delete(`${baseUrl}${clearCartUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};