import { createRoot } from 'react-dom/client';

import './index.scss';

const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>Good morning</div>
    </div>
  );
};

const container = document.querySelector('#root'); // #root is the id of the div in index.html
const root = createRoot(container); // createRoot is a new API in React 18

root.render(<MyFlixApplication />); // render the application
