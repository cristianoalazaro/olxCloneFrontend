import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Routes from './Routes';
import { Template } from './components/MainComponents';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

function App() {
  return (
    <BrowserRouter>
      <Template>
        <Header />
        <Routes />
        <Footer />
      </Template>
    </BrowserRouter>
  );
}

const mapToProps = (state) => {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapToProps, mapDispatchToProps)(App);
