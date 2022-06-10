import Request from 'helpers/request.service';

export const logInWithCredentials = (email, password) => {
  return Request.postJson('login', {
    email,
    password,
  });
};

export const forgotPasswordEmail = (email) => {
  return Request.postJson('forgotpassword', {
    email,
  });
};

export const logoutUser = () => {
  return Request.postJson('logout');
};
