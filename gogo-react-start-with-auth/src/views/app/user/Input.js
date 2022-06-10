import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TypeError from './TextError';

function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-group">
      <Field id={name} name={name} className="form-control" {...rest} />
      <ErrorMessage name={name} component={TypeError} />
    </div>
  );
}

export default Input;
