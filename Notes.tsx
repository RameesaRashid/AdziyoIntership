import type React from "react";
import { useEffect, useState } from "react";

// import { DeleteIcon } from "lucide-react";

interface Note {
    id: number,
    content: string,
    // description: string,
    // date: string
}

export const Notes: React.FC = () => {

    const [notes, setNotes] = useState<Note[]>(()=>{
  const stored = localStorage.getItem("notes");
  return stored ? JSON.parse(stored) : [];
    });

    // const [description, setDescription] = useState("")
    const [content, setContent] = useState("");

    useEffect(() => {
        console.log("Saving Notes:", notes);
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);


    const addNote = () => {
        if (!content.trim())
            return;
        const newNote: Note = {id: Date.now(), content};
        setNotes([...notes, newNote]);
        setContent("");
    };

    const deleteNote = (id:number) => {
        setNotes(notes.filter((n)=> n.id !== id));
    }
    
    return(
    <div className="text-center text-2xl justify-center mt-10 w-full items-center pb-10">
        <h1 className="text-3xl text-center font-light">Sticky Notes</h1>

        <div className="mt-10 bg-white w-350 rounded-2xl ml-90">
        <textarea className="outline-1 outline-gray-200 w-300 h-15 mt-6 pl-8 pt-4 text-lg" placeholder="Write your note..." value={content} onChange={(e)=> setContent(e.target.value)}/>
            <br />
            <button className="mt-8 text-sm outline-1 w-300 h-12 rounded-2xl outline-purple-200 cursor-pointer hover:bg-gray-300 mb-10" onClick={addNote}>Add Note</button>  
        </div>
            
            <div className="flex flex-wrap gap-5 overflow-hidden text-center ml-20 mt-10">
                {notes.map((note) => (
                    <div key={note.id}
                     className="bg-yellow-100 w-64 h-56 rounded-md mt-5 shadow-md p-4 flex flex-col justify-between"
>
                        <p className="mt-6 text-sm font-extralight whitespace-normal overflow-hidden">
                            {note.content}
                        </p>
                                            
                    <button className="flex items-center justify-center gap-2 w-full py-2 text-white rounded bg-rose-700 hover:bg-red-600 mt-3"
                    onClick={()=> deleteNote(note.id)}>
                <p className="text-sm text-white hover:text-white">delete</p>                        
                    </button> 
                    </div>
                ))}
            </div>
    </div>
    )
}