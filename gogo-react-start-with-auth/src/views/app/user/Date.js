import React from 'react';
import { Field, ErrorMessage } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import TextError from './TextError';

function Date(props) {
  const { name } = props;
  return (
    <div className="form-group col-6">
      <Field className="form-control " type="date" name="dob" />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Date;
