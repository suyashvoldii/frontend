import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const List = React.lazy(() =>
  import(/* webpackChunkName: "list" */ './pages/list')
);
const Add = React.lazy(() =>
  import(/* webpackChunkName: "add" */ './pages/add')
);
const Edit = React.lazy(() =>
  import(/* webpackChunkName: "edit" */ './pages/edit')
);
const User = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={(props) => <List {...props} />}
      />
      <Route path={`${match.url}/add`} render={(props) => <Add {...props} />} />
      <Route
        path={`${match.url}/edit/:id`}
        render={(props) => <Edit {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default User;
