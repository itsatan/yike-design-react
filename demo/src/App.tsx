import { RouterProvider } from 'react-router-dom';
import router from './router';

import './App.scss';
import 'highlight.js/styles/github.css';

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
