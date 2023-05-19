import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App'; // export default
// import { App } from './App' // múltiplos exports
// import Obj from './App';
// console.log(Obj);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App name="Luís Fernando" lastName="Teixeira Bicalho" />
  </React.StrictMode>
)
