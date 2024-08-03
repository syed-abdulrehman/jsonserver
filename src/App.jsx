import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch users from JSON server
    axios
      .get("http://localhost:3001/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addUser = () => {
    const newUser = { name, email };
    axios
      .post("http://localhost:3001/users", newUser)
      .then((response) => setUsers([...users, response.data]))
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      <h2>Add User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
};

export default App;
