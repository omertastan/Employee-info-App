import React, { useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

import EmployeesScreen from './screens/EmployeesScreen';
import { RestrictedPage } from './components/restrictedpage';

const App = () => {
  const history = useHistory();
  useEffect(() => {
    history.push('/employees');
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Container>
          <Switch>
            <RestrictedPage
              exact={true}
              Component={EmployeesScreen}
              name={'EmployeesScreen'}
              path={'/employees'}
            />
          </Switch>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
