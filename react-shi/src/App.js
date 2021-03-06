import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import RouterViews from './router/RouterViews';
import routes from './router/index'
import {Provider} from 'react-redux'
import store from './store/store'
import './App.css'
class App extends Component {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
          <Router>
            <RouterViews routes={routes} />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;



















// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
