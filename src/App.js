import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Profile from './pages/profile'
import Nav from './components/nav'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProtectedRoute from './auth/protected-route';
import Ranker from './components/ranker';


function App() {
  return (
    <>
      <Nav/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <ProtectedRoute path="/profile" component={Profile}/>
        <ProtectedRoute path="/ranking" component={Ranker}/>
      </Switch>
    </>
  );
}

export default App;
