import React from 'react';
import Input from './Input';
import Select from './Select';
import Date from './Date';

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
    case 'select':
      return <Select {...rest} />;
    case 'radio':
    case 'checkbox':
    case 'date':
      return <Date {...rest} />;
    default:
      return null;
  }
}
export default FormikControl;
