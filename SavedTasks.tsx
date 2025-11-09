// import type React from "react";

// import { title } from "process";
import type React from "react";
import { useEffect, useState } from "react";
import { Trash2, Edit3, SaveIcon, X } from "lucide-react";
interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
}

export const SavedTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditData({
      title: task.title,
      description: task.description,
      date: task.date,
    });
  };

  const saveEdit = (id: number) => {
    const updatedTasks = tasks.map((t) =>
      t.id == id ? { ...t, ...editData } : t
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col flex-wrap">
      <h1 className="text-3xl mb-10 font-light text-center">Saved Tasks</h1>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No saved tasks yet.</p>
      ) : (
        tasks
          .sort((a, b) => a.date.localeCompare(b.date))
          .map((task) => (
            <div
              key={task.id}
              className="bg-gray-100 p-5 rounded-lg mb-4 shadow-md outline-1 outline-blue-200"
            >
              {editingId === task.id ? (
                // Edit
                <div className="flex flex-col gap-3">
                  <input
                    className="border border-gray-300 rounded px-3 py-2"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                  <textarea
                    className="border border-gray-300 rounded px-3 py-2"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    className="border border-gray-300 rounded px-3 py-2 w-1/3"
                    value={editData.date}
                    onChange={(e) =>
                      setEditData({ ...editData, date: e.target.value })
                    }
                  />

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="flex items-center gap-1 text-green-600 hover:text-green-800"
                    >
                      <SaveIcon size={18} /> Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                    >
                      <X size={18} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // 🧩 Display mode
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-xl">{task.title}</h2>
                    <p className="text-gray-700 mt-1">{task.description}</p>
                    <p className="text-sm text-rose-700 mt-2">{task.date}</p>
                  </div>

                  {/* Edit + Delete buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEditing(task)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Edit3 size={20} />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
      )}
    </div>
  );
};
