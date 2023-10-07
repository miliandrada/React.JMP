import './App.css';
import NavBar from "./Components/NavBar";
import Public from "./Routes/Public";
import {BrowserRouter as Router} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import AuthProvider from './Context/AuthContext';


function App() {

  return (
    <div className="App"  data-testid="app">
      <Router>
      <AuthProvider>
         <NavBar/>
        <Container>
        <Public/>
        </Container> 
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
