"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUsers } from "./slice";

const AddUser = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const add = () => {
    // console.log(name);
    dispatch(addUsers(name));
    setName("");
  };
  return (
    <div>
      <input
      value={name}
        type="text"
        placeholder="Enter items"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={add} className="m-1">
        Add
      </button>
    </div>
  );
};

export default AddUser;
