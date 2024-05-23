import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserList from "../../components/users/UserList";
import Button from "../../components/Button";

function Users() {
  const loginUser = useSelector((state) => state.loginUser.value);
  const navigate = useNavigate();
  // const apiUrl = process.env.API_URL;
  // console.log("API URL:", process.env.API_URL);

  const [allUser, setAllUser] = useState([]);

  console.log(allUser);

  useEffect(() => {
    const getAllUser = () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://localhost:8000/api/v4/auth/user/alluser?loginuser=${loginUser._id}`,
        headers: {
          Authorization: "user",
        },
      };

      axios
        .request(config)
        .then((response) => {
          setAllUser(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllUser();
  }, []);

  useEffect(() => {
    if (!loginUser) {
      navigate("/");
    } else {
    }
  }, []);
  return (
    <>
    <div className="flex gap-8 flex-wrap">

      {allUser?.map((item, index) => {
        return (
          <UserList key={index} user={item}>
            <Button
              className="w-full py-1 bg-sky-300 rounded-sm capitalize font-Poppins font-semibold text-gray-600 mb-1"
              title="add friend"
            />
            <Button
              className="w-full py-1 bg-sky-300 rounded-sm capitalize font-Poppins font-semibold text-gray-600"
              title="view profile"
            />
          </UserList>
        );
      })}
    </div>
    </>
  );
}

export default Users;
