import './App.css';
import { BrowserRouter as Router} from 'react-router-dom'
import RouterViews from './router/RouterViews';
import routes from './router/index'
function App() {
  return (
    <div className="App">
      <Router>
        <RouterViews routes={routes} />
      </Router>
    </div>
  );
}

export default App;
