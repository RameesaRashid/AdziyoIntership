// import { error } from "console";
import type React from "react";

import { useEffect, useState } from "react";
// import { text } from "stream/consumers";
// import { json } from "stream/consumers";

interface Tasks {
    id: number,
    title: string,
    description: string,
    completed: boolean
    date: string
}

export const Task: React.FC = () => {

const [title, setTitle] = useState("");
const [tasks, setTasks] = useState<Tasks[]>([]);
const [description, setDescription] = useState ("");
const [date, setDate] = useState (()=> new Date().toISOString().split("T")[0]);
const [loaded, setLoaded] = useState(false);
const [message, setMessage] = useState<{text: string, type: "success" | "error" | ""}>({text: "",type: "",});


useEffect (()=>
    {
    const stored= localStorage.getItem("tasks");
    if (stored) {setTasks(JSON.parse(stored));}
setLoaded(true);
}

,[])

useEffect(()=>{
    if (loaded) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}, [tasks, loaded]);

const addTask = () => {
    if(!title.trim() || description.trim()){
        setMessage({text: "Please fill in all fields before adding a Task", type: "error"});
        setTimeout(() => setMessage({text: "", type: ""}), 3000);
        return;}
    const storedTasks : Tasks[] = JSON.parse(localStorage.getItem("tasks")|| "[]");

    const newTask: Tasks ={
        id: Date.now(),
        title,
        description,
        completed: false,
        date,
    };

    const updatedTasks = [...storedTasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setMessage({text: "Task Saved Successfully.", type:"success"});
    setTimeout(() => setMessage({text: "", type: ""}), 3000);

    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
};

// const toggleComplete = (id: number) => {
//     setTasks(tasks.map(t => (t.id === id? {...t, completed: !t.completed}: t)));
// };

// const deleteTask = (id: number) => {
//     setTasks(tasks.filter(t => t.id !== id));
// };

return(
        <div>
            <div className="p-1 w-300 rounded-2xl bg-white ml-120 mt-20 justify-center flex flex-col text-center items-center object-center shadow-2xl">
            <h1 className="pt-8 text-3xl mb-10 font-light">Task Manager</h1>
            <br />
            
            <input className="w-250 h-20 outline-1 outline-gray-500 pl-6 text-xl" type="text" placeholder="Task Title" value={title} onChange={(event)=> setTitle (event.target.value)}/>
            <br />

            <textarea className="w-250 h-15 mt-10 text-lg pl-6 pt-4 outline-1 outline-gray-200 rounded-lg" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <br />

            <input className="w-35 h-20" type="date" name={date} onChange={(e) => setDate(e.target.value)}/>
            
            <button className="mt-10 mb-8 cursor-pointer w-250 h-12 text-white border-2 border-gray-400 bg-gray-800 rounded-xl hover:bg hover:border-red-800 hover:bg-rose-900 hover:text-white" onClick={addTask}>Add Task</button>
            </div>
            <div>
                {message.text && (
                <p className="text-center mt-10 text-rose-700">{message.text}</p>
            )}
            </div>
                {/* <div className="flex flex-wrap ml-10 mt-10">
                <ul className="flex">
                    {tasks.map((tasks)=> (
                        <li className="bg-amber-100 border-0 rounded-xl p-12 m-5 shadow-xl" key={tasks.id}>
                            <h4 className="text-center font-extralight text-2xl w-full h-10">{tasks.title}</h4>
                            <p className="text-center font-medium text-2xl mb-10 w-full h-10">{tasks.description}</p>
                            <button className="text-xs w-25 h-10 items-center border-2 border-amber-400 rounded-lg" onClick={()=> toggleComplete(tasks.id)}>
                                {tasks.completed ? "Undo": "Completed"}
                            </button>
                            <button className="ml-2 text-xs w-25 h-10 items-center border-2 border-red-600 rounded-lg" onClick={()=> deleteTask(tasks.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                </div> */}
        </div>
    );
}