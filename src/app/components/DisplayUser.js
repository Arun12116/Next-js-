"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../Redux/slice";

const DisplayUser = () => {
  const userData = useSelector((state) => state.addUser.users);

  const dispatch = useDispatch();

  const handleDelete = (userId) => {
   dispatch(removeUser(userId));
  };

  return (
    <div>
      <h2>Display Users</h2>
      {userData && userData.length > 0 ? (
        <ul>
          {userData.map((user) => (
            <li key={user.id} style={{ marginBottom: "10px" }}>
              {user.name}
              <button 
                onClick={() => handleDelete(user.id)} 
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default DisplayUser;
