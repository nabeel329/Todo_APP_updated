import React, { useState, useEffect } from "react";
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "../firebaseConfig";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Firestore collection reference
  const tasksCollection = collection(db, "tasks");

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const snapshot = await getDocs(tasksCollection);
      const taskList = snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().text }));
      setTasks(taskList);
    };
    fetchTasks();
  }, []);

  // Add or Update task in Firestore
  const handleAddTask = async () => {
    if (input.trim() === "") return;

    if (editId) {
      const taskRef = doc(db, "tasks", editId);
      await updateDoc(taskRef, { text: input });
      setTasks((prev) => prev.map((task) => (task.id === editId ? { ...task, text: input } : task)));
      setEditId(null);
    } else {
      const docRef = await addDoc(tasksCollection, { text: input });
      setTasks([...tasks, { id: docRef.id, text: input }]);
    }

    setInput("");
  };

  // Edit Task
  const handleEditTask = (id, text) => {
    setInput(text);
    setEditId(id);
  };

  // Delete task from Firestore
  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h1>TODO App</h1>
      <TextField
        label="Add a Task"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        {editId ? "Update Task" : "Add Task"}
      </Button>
      <List style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task.id, task.text)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={task.text} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoApp;
