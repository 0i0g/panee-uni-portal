import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      axios
        .get('user')
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          // console.error(err);
        });
    };
    fetchUser();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            path="/"
            exact
            user={user}
            component={() => <HomePage user={user} setUser={setUser} />}
          />
          <PrivateRoute
            path="/class/:className"
            exact
            user={user}
            component={() => <HomePage user={user} setUser={setUser} />}
          />
          <Route path="/login" exact>
            <LoginPage user={user} setUser={setUser} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
