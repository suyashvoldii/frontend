import React, { useState, useEffect } from 'react';
import Storage from 'helpers/storage.service';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { userDetail, updateUser } from 'api/userControl';
import { withRouter } from 'react-router-dom';
import FormikControl from '../FormikControl';

function Edit(props) {
  console.log(props);
  const user = Storage.getItem('gogo_current_user');
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [errorMessages, setErrorMessages] = useState({});
  const [isrole, setIsRole] = useState(false);
  const [issupervisor, setSuperVisor] = useState(true);
  const [issuperadmin, setIsSuperAdmin] = useState(false);
  // const [company, setCompany] = useState(user.company_id);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log(props.match.params.id);
        const response = await userDetail(props);
        console.log(response);
        setUsers(response.data.data);
      } catch (err) {
        if (!err?.response) {
          setErrorMessages('No server Response');
        } else if (err.response?.status === 401) {
          setErrorMessages('Username Taken');
        } else {
          setErrorMessages('Failed');
        }
        console.error(err);
      }
    };

    fetchUsers();
    if (user.role === 0) {
      setIsSuperAdmin(false);
    } else {
      setIsSuperAdmin(true);
    }
  }, []);

  const dropdownRole = [
    { key: 'Role', value: '' },
    { key: 'superadmin', value: 0 },
    { key: 'admin', value: 1 },
    { key: 'supervisor', value: 2 },
    { key: 'user', value: 3 },
  ];

  const dropdownSupervisor = [
    { key: null, value: '' },
    { key: 'me', value: 0 },
    { key: 'you', value: 1 },
  ];
  const initialValues = {
    company: user.role === 0 ? '' : user.company_id,
    name: '',
    email: '',
    password: '',
    contact: '',
    dob: '',
    role: '',
    supervisor: '',
  };
  const validationSchema = Yup.object({
    company: user.role === 0 ? Yup.string().required('Required') : Yup.string(),
    name: Yup.string()
      .matches(/^[a-zA-ZÑñ\s]+$/, 'Please enter your full name.')
      .required('Required'),
    email: Yup.string().email('Email not valid').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Password should be 8 character long'),
    contact: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits')
      .required('Required'),
    dob: Yup.date().required('Required'),
    role: Yup.string().required('Required'),
    supervisor: isrole ? Yup.number().required('Required') : Yup.string(),
  });

  const onSubmit = async (values) => {
    console.log('Form data', values);
    console.log(user);

    try {
      const response = await updateUser(values);
      return console.log(response);
    } catch (error) {
      return alert(error.response.data.error.email);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <div className="container">
          <div className="row justify-content-center dflex">
            <Form className="form-container">
              <div>
                <FormikControl
                  name="company"
                  control="select"
                  label="select company"
                  options={dropdownSupervisor}
                  disabled={issuperadmin}
                  className="form-control"
                />
              </div>
              <FormikControl
                control="input"
                type="text"
                label="name"
                name="name"
                placeholder="Full name"
              />
              <FormikControl
                control="input"
                type="email"
                label="email"
                name="email"
                placeholder="Email"
              />
              <FormikControl
                control="input"
                type="password"
                label="password"
                name="password"
                placeholder="Password"
              />
              <div className="row">
                <div className="col-6">
                  <FormikControl
                    control="input"
                    type="text"
                    label="contact"
                    name="contact"
                    placeholder="Contact"
                  />
                </div>
                <FormikControl control="date" type="date" name="dob" />
              </div>
              <div className="row">
                <div className="col-6">
                  <FormikControl
                    control="select"
                    label="select role"
                    name="role"
                    options={dropdownRole}
                    className="form-control"
                    onChange={(e) => {
                      formik.setFieldValue('role', e.target.value);
                      if (e.target.value === '3') {
                        setSuperVisor(false);
                        setIsRole(true);
                      } else {
                        setSuperVisor(true);
                        setIsRole(false);
                        formik.setFieldValue('supervisor', '');
                      }
                      console.log(formik.values);
                    }}
                  />
                </div>
                <div className="col-6">
                  <FormikControl
                    control="select"
                    label="select supervisor"
                    name="supervisor"
                    options={dropdownSupervisor}
                    disabled={issupervisor}
                    className="form-control"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}
export default withRouter(Edit);
