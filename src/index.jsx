import { createRoot } from 'react-dom/client';
import { MainView } from './components/MainView/main-view.jsx';

import './index.scss';

const App = () => {
  return <MainView />;
};

const container = document.querySelector('#root'); // #root is the id of the div in index.html
const root = createRoot(container); // createRoot is a new API in React 18

root.render(<App />); // render the application
