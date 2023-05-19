import { FormEvent, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Task from "../../models/Task";
import { TaskContext } from "../../contexts/task.context";

const BASE_URL = "https://crudcrud.com/api/46d163768b914f899ebbd8118cc55819/tasks";

interface TaskFormProps {
  mode?: string;
}

export default function TaskForm(props: TaskFormProps): JSX.Element {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLInputElement>(null);
  const context = useContext(TaskContext);
  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const defaultTask: Task = { 
    title: "Título Padrão",
    description: "Descrição Padrão",
    dueDate: new Date(),
    status: false
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // if (titleRef.current != null)
    //   console.log(titleRef.current.value);
    
    const newTask: Task = {
      title: titleRef.current?.value || defaultTask.title,
      description: descriptionRef.current?.value || defaultTask.description,
      dueDate: new Date(dueDateRef.current?.value || defaultTask.dueDate),
      status: doneRef.current?.checked || defaultTask.status
    }

    if (props.mode == "update") {
      context?.updateTask(id, newTask);
    } else {
      context?.createTask(newTask);
    }
  }

  // Roda uma única vez quando o componente é criado
  useEffect(() => {
    async function updateFormValues() {
      if (props.mode == "update") {
        // chamar uma função do contexto responsável por buscar a tarefa que possui o id indicado
        const taskToUpdate = await context?.getTask(id);
  
        titleRef.current.value = taskToUpdate?.title;
        descriptionRef.current.value = taskToUpdate?.description;
        dueDateRef.current.value = taskToUpdate?.dueDate;
        doneRef.current.checked = taskToUpdate?.done;
      }
    }
    updateFormValues();
  }, []);

  return <form onSubmit={submitForm}>
    <div>
      <label>Título</label>
      <input name="title" ref={titleRef} />
    </div>
    <div>
      <label>Descrição</label>
      <textarea name="description" ref={descriptionRef} ></textarea>
    </div>
    <div>
      <label>Data de Entrega</label>
      <input name="due-date" type="date" ref={dueDateRef} />
    </div>
    <div>
      <input name="done" type="checkbox" ref={doneRef} />
      <label>Feita</label>
    </div>
    <input type="submit" value="Enviar" />
  </form>
}