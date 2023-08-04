import React, { useState } from 'react';
import {
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

const ToDoItem = ({ todo, onDelete, onEdit, onToggleComplete }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEditClick = () => { 
    setEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(newText);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setNewText(todo.text);
    setEditing(false);
  };

  return (
    <li className={`todo-item  flex justify-between bg-[#f8f9fa] border mb-2.5 p-2.5 rounded-[5px] border-solid border-[#ccc] cursor-pointer`}>
      {editing ? (
        <>
          <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} />
         <div className='flex gap-2'> <button className='bg-[#dc3545] text-white cursor-pointer px-2.5 py-[5px] rounded-[5px] border-[none] no-underline' onClick={handleSaveClick}>Save</button>
          <button className='bg-[#dc3545] text-white cursor-pointer px-2.5 py-[5px] rounded-[5px] border-[none] no-underline' onClick={handleCancelEdit}>Cancel</button></div>
        </>
      ) : (
        <>
          <span className={`todo-text flex-1 ${todo.status ? 'completed line-through' : ''}`} onClick={onToggleComplete}>
            {todo.text}
          </span>
          <div className='flex gap-2'>
            <button className='bg-[#dc3545] text-white cursor-pointer px-2.5 py-[5px] rounded-[5px] border-[none]' onClick={handleEditClick}>
              <PencilSquareIcon className='w-5 h-5'/>
            </button>
            <button className='bg-[#dc3545] text-white cursor-pointer px-2.5 py-[5px] rounded-[5px] border-[none]' onClick={onDelete}>
              <TrashIcon className='w-5 h-5'/>
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default ToDoItem;
