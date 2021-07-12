import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Profile from './pages/profile'
import Nav from './components/nav'
import ImageGrid from './components/imageGrid';
import Dashboard from './pages/dashboard';
import TopGrid from './components/tops';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from './auth/protected-route';
import Rater from './components/rating';
import Recommendation from './components/recommendation';
import FAQIndex from './pages/FAQ';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="h-screen">
      <Nav/>
      <Switch>
        <Route path="/" exact component={isAuthenticated?Dashboard:Home}/>
        <Route path="/info" component={() => { 
            window.location.href = 'https://info.scan4wall.xyz'; 
            return null;
        }}/>
        <Route path="/faq" component={FAQIndex}/>
        <ProtectedRoute path="/profile" component={Profile}/>
        <ProtectedRoute path="/rating" component={Rater}/>
        <ProtectedRoute path="/imgrid" component={ImageGrid}/>
        <ProtectedRoute path="/recommend" component={Recommendation}/>
        <ProtectedRoute path="/dash" component={Dashboard}/>
        <ProtectedRoute path="/top" component={TopGrid}/>
      </Switch>
    </div>
  );
}

export default App;
