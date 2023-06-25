import { createRoot } from 'react-dom/client';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import { MainView } from './components/MainView/MainView';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './index.scss';

const App = () => {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
};

const container = document.querySelector('#root'); // #root is the id of the div in index.html
const root = createRoot(container); // createRoot is a new API in React 18

root.render(<App />); // render the application
