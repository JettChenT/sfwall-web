import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Profile from './pages/profile'
import Nav from './components/nav'
import ImageGrid from './components/imageGrid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProtectedRoute from './auth/protected-route';
import Rater from './components/rating';
import Recommendation from './components/recommendation';

function App() {
  return (
    <div className="h-screen">
      <Nav/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/info" component={() => { 
            window.location.href = 'https://info.scan4wall.xyz'; 
            return null;
        }}/>
        <ProtectedRoute path="/profile" component={Profile}/>
        <ProtectedRoute path="/rating" component={Rater}/>
        <ProtectedRoute path="/imgrid" component={ImageGrid}/>
        <ProtectedRoute path="/recommend" component={Recommendation}/>
      </Switch>
    </div>
  );
}

export default App;
