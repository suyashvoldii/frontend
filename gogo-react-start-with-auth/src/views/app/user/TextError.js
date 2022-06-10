import React from 'react';

function TextError(props) {
  const { children } = props;
  return <div className="help-block text-danger">{children}</div>;
}

export default TextError;
