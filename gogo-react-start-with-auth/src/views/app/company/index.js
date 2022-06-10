import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Add = React.lazy(() => import(/* webpackChunkName: "add" */ './add'));
const Edit = React.lazy(() => import(/* webpackChunkName: "edit" */ './edit'));
const Company = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/add`} />
      <Route path={`${match.url}/add`} render={(props) => <Add {...props} />} />
      <Route
        path={`${match.url}/edit`}
        render={(props) => <Edit {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Company;
