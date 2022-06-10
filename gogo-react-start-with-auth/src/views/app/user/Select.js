import { Field, ErrorMessage } from 'formik';
import React from 'react';
import TextError from './TextError';

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-group">
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Select;
