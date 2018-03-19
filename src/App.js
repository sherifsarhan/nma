import React, { Component } from 'react';
import './App.css';
import CompanyForm from './components/company-form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CompanyForm></CompanyForm>
      </div>
    );
  }
}

export default App;
