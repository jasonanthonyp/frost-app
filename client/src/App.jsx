import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from "./components/PrivateRoute";
import CreateSubmission from "./pages/createSubmission";
import Actor from "./pages/Actor";
import Search from "./pages/Search";
import Footer from "./components/Footer";




function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/casting/:castingId' element={<Actor />} />
        <Route element={<PrivateRoute />} >
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-submission' element={<CreateSubmission />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App