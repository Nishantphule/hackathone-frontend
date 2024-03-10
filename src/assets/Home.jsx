import React from "react";
import { useEffect, useState } from "react";
import { API } from "../global";
import { CardBuilder } from "./CardBuilder";
import { useUserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { userToken } = useUserContext();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const getUsers = () => {
    fetch(`${API}/users/allUser`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => setUsers(res.users));
  };

  useEffect(() => getUsers(), []);

  return (
    <>
      {userToken ? (
        <div className="CardContainer">
          {users.map((user) => {
            return (
              <CardBuilder key={user.userId} content={user} id={user.userId} />
            );
          })}
        </div>
      ) : (
        <div className="CardContainer p-3">
          <button onClick={() => navigate("/login")} style={{ padding: "5px" }}>
            Login First
          </button>
        </div>
      )}
    </>
  );
}

export default Home;
