import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Login from './screens/Login';
import Register from './screens/Register';
import FoodIntake from './screens/FoodIntake';
import { Profile } from './screens/Profile';
import { AddToIntake } from './screens/AddToIntake';
import Statistics from './screens/Statistics';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main>
          <Route exact path='/' component={FoodIntake} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route exact path='/intake' component={FoodIntake} />
          <Route path='/profile' component={Profile} />
          <Route exact path='/intake/add' component={AddToIntake} />
          <Route path='/statistics' component={Statistics} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
