import React, { useState } from "react";
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = input;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, input]);
    }
    setInput("");
  };

  const handleEditTask = (index) => {
    setInput(tasks[index]);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
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
        {editIndex !== null ? "Update Task" : "Add Task"}
      </Button>
      <List style={{ marginTop: "20px" }}>
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(index)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(index)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={task} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
export default TodoApp;

//this is the todoaAPp component file