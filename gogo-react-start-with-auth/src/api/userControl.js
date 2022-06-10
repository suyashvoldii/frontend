import Request from 'helpers/request.service';

export const fetchCompany = (val) => {
  return Request.postJson('login', {
    val,
  });
};

export const fetchSupervisor = () => {
  return Request.postJson('forgotpassword', {});
};

export const addUser = (val) => {
  return Request.postJson('users', val);
};
export const userDetail = (val) => {
  return Request.getJson('users', val);
};
export const updateUser = (val) => {
  return Request.putJson('users', val);
};
export const deleteUser = (val) => {
  return Request.deleteJson('users', val);
};

export const listUser = () => {
  return Request.getJson('users');
};
