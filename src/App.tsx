import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TasksList from './components/TasksList';
import { TaskProvider } from './contexts/task.context';

interface AppProps {
  name: string;
  lastName: string;
};

// App(props: { name: string, subtitle: string })
export default function App(props: AppProps): JSX.Element {
  const num: number = 5;
  let str: string = "ABCDEF";

  return <>
    <h1>Todo List de {props.name} <span className="last-name">{props.lastName}</span></h1>
      <BrowserRouter>
        <TaskProvider>
          <Routes>
            <Route path="/tasks" element={<TasksList />}/>
            <Route path="/tasks/create" element={<TaskForm />} />
            <Route path="/tasks/update/:id" element={<TaskForm mode="update"/>} />
          </Routes>
        </TaskProvider>
      </BrowserRouter>
  </>
  // return <>
  //   <h1>Todo List de {props.name} {props.lastName}</h1>
  //   <TasksList />
  // </>
}

// function AloMundo() {
//   console.log("Hello World!");
// }

// export default {
//   App,
//   AloMundo
// }