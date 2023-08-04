"use client";

import React, { useState, useEffect } from "react";
import ToDoItem from "../components/ToDoItem";
import { PlusIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const ToDoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  const USERNAME = process.env.USERNAME;
  const PASSWORD = process.env.PASSWORD;
  const Domain = process.env.BASE_URL;
  const basicAuth = Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64");



  const getAllTodo= async () => {
    const config = {
      method: "GET",
      url: `${Domain}`,
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${basicAuth}`,
      },
    };

    try {
      const response = await axios(config);
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createnewTodo = async (text) => {
    let data = {text}
    const config = {
      method: "POST",
      url: `${Domain}/save`,
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${basicAuth}`,
      },
      data:data
    };

    try {
      const response = await axios(config);
      console.log(response.data);
      console.log( { _id: response.data._id, text: response.data.text, status: response.data.status } );
      setTodos((prevTodos) => [
        ...prevTodos,
        { _id: response.data._id, text: response.data.text, status: response.data.status },
      ]);
      setTodoInput("");
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateTodo = async (id, text, status) => {
    let data = {};
    if (text == undefined) {
      data = { _id: id, status: status };
    }else{
      data = { _id: id, text: text };
    }
    const config = {
      method: "PUT",
      url: `${Domain}/update`,
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${basicAuth}`,
      },
      data: data,
    };
    try {
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async(id)=>{
    const config = {
      method: "DELETE",
      url: `${Domain}/delete/${id}`,
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${basicAuth}`,
      },
    };
    try {
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTodo();
  }, []);

  const handleAddTodo = () => {
    if (todoInput.trim() !== "") {
      createnewTodo(todoInput)
      // getAllTodo()
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    deleteTodo(id)
  };

  const handleEditTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, text: newText } : todo
      )
    );
    UpdateTodo(id, newText ,undefined);

  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, status: !todo.status } : todo
      )
    );
    UpdateTodo(id, undefined, !todos.filter(each => {return each._id == id})[0].status);
  };

  return (
    <>
      <div className="max-w-[600px] shadow-[0_0_10px_rgba(0,0,0,0.1)] mx-auto my-5 p-5 rounded-[5px]">
        <h1 className="text-center text-lg">ToDo App</h1>
        <div className="flex gap-[5px] mb-2.5">
          <input
            className="flex-1 border p-2.5 rounded-[5px] border-solid border-[#ccc] outline-none"
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="Add a new ToDo"
          />
          <button
            className="bg-[#007bff] text-white cursor-pointer px-[15px] py-2.5 rounded-[5px] border-[none]"
            onClick={handleAddTodo}
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
        <ul id="todo-list" className="m-0 p-0">
          {todos && todos.map((todo) => (
            <ToDoItem
              key={todo._id}
              todo={todo}
              onDelete={() => handleDeleteTodo(todo._id)}
              onEdit={(newText) => handleEditTodo(todo._id, newText)}
              onToggleComplete={() => handleToggleComplete(todo._id)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDoApp;
