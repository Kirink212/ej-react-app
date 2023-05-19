import { useState, useEffect, useContext, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../../contexts/task.context";
import Task from "../../models/Task";

import "./styles.css";

const BASE_URL = "https://crudcrud.com/api/f58e9ddcc62d4c81aae745ee68bd055e/tasks";

export default function TasksList(): JSX.Element {
  const context = useContext(TaskContext);

  useEffect(() => {
    context?.listTasks();
  }, []);

  function confirmDelete(id: string) {
    const sure = confirm("Você tem certeza que deseja deletar esta tarefa?");
    if (sure) context?.deleteTask(id);
  }

  return <>
    <ul>
      {context?.tasksList.map((elem) => <li>
        {elem.title}
        <Link to={`/tasks/update/${elem._id}`}>Editar</Link>
        <a href="#" onClick={() => confirmDelete(elem._id)}>Remover</a>
      </li>)}
    </ul>
    <Link to={"/tasks/create"}>Criar nova tarefa</Link>
  </>
}