import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserList from "../../components/users/UserList";
import Button from "../../components/Button";

function Friends() {
  const loginUser = useSelector((state) => state.loginUser.value);
  const navigate = useNavigate();
  // const apiUrl = process.env.API_URL;
  // console.log("API URL:", process.env.API_URL);
  let [reloadUseEffect, setReloadUseEffect] = useState("");

  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    if (!loginUser) {
      navigate("/");
    } else {
      const getAllFriend = () => {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `http://localhost:8000/api/v4/auth/user/friend?loginuser=${loginUser._id}`,
          headers: {
            Authorization: "user",
          },
        };

        axios
          .request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            const arr = [];
            response.data.data.map((item) => {
              if (!item.userOne) {
                arr.push({ key: item._id, ...item.userTwo });
              } else {
                arr.push({ key: item._id, ...item.userOne });
              }
            });
            setFriendsList(arr);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getAllFriend();
    }
  }, [reloadUseEffect] || []);

  const blockHandler = (blockTo) => {
    if (!blockTo) {
      console.log("error daw");
    } else {
      let data = JSON.stringify({
        blockBy: loginUser._id,
        blockTo,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/api/v4/auth/user/block",
        headers: {
          Authorization: "user",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setReloadUseEffect(Date.now());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="flex gap-8 flex-wrap">
        {friendsList?.map((item, index) => {
          console.log(item);
          return (
            // <></>
            <UserList key={index} user={item}>
              <Button
                className="w-full py-1 bg-sky-300 rounded-sm capitalize font-Poppins font-semibold text-gray-600 mb-1"
                title="view profile"
              />
              <Button
                className="w-full py-1 bg-sky-300 rounded-sm capitalize font-Poppins font-semibold text-gray-600 mb-1"
                title="unfriend"
              />
              <Button
                onClick={() => blockHandler(item._id)}
                className="w-full py-1 bg-sky-300 rounded-sm capitalize font-Poppins font-semibold text-gray-600"
                title="block"
              />
            </UserList>
          );
        })}
      </div>
    </>
  );
}

export default Friends;
