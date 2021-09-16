import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar"
// import NavBar from "./components/nav-bar";
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";
import Loading from "./components/Loading";
import Profile from "./components/Profile";
import ProtectedRoute from "./auth/protected-route";
import Home from "./components/Home";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }
  return (
    <Router>
      <div className="App">
        <Navbar />
        <br/>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/exercises" exact component={ExercisesList} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/edit/:id" component={EditExercise} />
        <ProtectedRoute path="/create" component={CreateExercise} />
        <ProtectedRoute path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
