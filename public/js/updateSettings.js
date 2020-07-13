/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

//type is either 'password' or 'data'
export const updateUser = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated succesfully`);
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

/* export const changeUserPhoto = async (data) => {
  try {
    const url = 'http://127.0.0.1:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      console.log(res.data);
      return { ...res };
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
 */
