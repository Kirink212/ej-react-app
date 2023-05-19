import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Task from "../models/Task";

interface TaskProviderProps {
  children: JSX.Element | JSX.Element[]
}

export interface ContextValues {
  tasksList: Task[];
  listTasks: () => void;
  getTask: (id: string) => void;
  createTask: (newTask: Task) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  deleteTask: (id: string) => void;
}

export const TaskContext = createContext<ContextValues | null>(null);

export function TaskProvider(props: TaskProviderProps) {
  const BASE_URL = "https://crudcrud.com/api/3b57d5a1fed1423195a54dd1e452e2e3/tasks";
  // Array<string>
  let [tasksList, setTasksList] = useState<Task[]>([]);
  const navigate = useNavigate();
  
  function listTasks() {
    fetch(BASE_URL).then((response) => {
      return response.json();
    }).then((data: Task[]) => {
      // Rerenderiza para mim este componente, por favor?
      setTasksList(data);
    });
  }

  function getTask(id: string): Promise<Task> {
    return fetch(`${BASE_URL}/${id}`).then((response) => {
      return response.json();
    });
  }
  
  function createTask(newTask: Task) {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    };
    
    fetch(BASE_URL, requestOptions)
      .then((response: Response) => response.json())
      .then(() => navigate("/tasks"));
  }

  function updateTask(id: string, updatedTask: Task) {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    };
    
    fetch(`${BASE_URL}/${id}`, requestOptions)
      .then(() => navigate("/tasks"));
  }

  function deleteTask(id: string) {
    const requestOptions = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    };
    
    fetch(`${BASE_URL}/${id}`, requestOptions)
      .then(() => {
        alert("Tarefa removida com sucesso!");
        listTasks();
      });
  }
  

  const contextValues: ContextValues = { tasksList, listTasks, getTask, createTask, updateTask, deleteTask };
  
  return <TaskContext.Provider value = { contextValues }>
    {props.children}
  </TaskContext.Provider>
} 