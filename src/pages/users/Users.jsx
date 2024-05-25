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
  let [newSendRequest, setNewSendFriendRequest] = useState("");

  const [allUser, setAllUser] = useState([]);
  const [sendFriendRequestList, setSendFriendRequestList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    if (!loginUser) {
      navigate("/");
    } else {
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

      const getAllFriendRequest = () => {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `http://localhost:8000/api/v4/auth/user/friendrequest?loginuser=${loginUser._id}`,
          headers: {
            Authorization: "user",
          },
        };

        axios
          .request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data.data));

            setFriendRequestList(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getAllFriendRequest();
      const getAllSendFriendRequest = () => {
        let config = {
          method: "put",
          maxBodyLength: Infinity,
          url: `http://localhost:8000/api/v4/auth/user/friendrequest?loginuser=${loginUser._id}`,
          headers: {
            Authorization: "user",
          },
        };

        axios
          .request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data.data));

            setSendFriendRequestList(response.data.data);
            console.log(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getAllSendFriendRequest();
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
            setFriendsList(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getAllFriend();
    }
  }, [newSendRequest] || []);
  const sendFriendRequestHandler = (receiver) => {
    if (!loginUser._id || !receiver) {
      console.log("error daw");
    } else {
      let data = JSON.stringify({
        sender: loginUser._id,
        receiver,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/api/v4/auth/user/friendrequest",
        headers: {
          Authorization: "user",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setNewSendFriendRequest(Date.now());
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const cancelFriendRequest = (receiver) => {
    if (!loginUser._id || !receiver) {
      console.log("error daw");
    } else {
      let data = JSON.stringify({
        receiver,
        sender: loginUser._id,
      });

      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/api/v4/auth/user/friendrequest",
        headers: {
          Authorization: "user",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setNewSendFriendRequest(Date.now());
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const acceptFriendRequest = (userTwo) => {
    if (!loginUser._id || !userTwo) {
      console.log("error daw");
    } else {
      let data = JSON.stringify({
        userOne: loginUser._id,
        userTwo,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/api/v4/auth/user/friend",
        headers: {
          Authorization: "user",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setNewSendFriendRequest(Date.now());
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="flex gap-8 flex-wrap">
        {allUser?.map((item, index) => {
          return (
            <UserList key={index} user={item}>
              {sendFriendRequestList.find(
                (el) => el.receiver._id == item._id
              ) ? (
                <Button
                  className="w-full py-1 bg-sky-300 hover:bg-red-300 rounded-sm capitalize font-Poppins font-semibold text-gray-600 mb-1"
                  onClick={() => cancelFriendRequest(item._id)}
                  title="cancel"
                />
              ) : friendRequestList.find((el) => el.sender._id == item._id) ? (
                <Button
                  className="w-full py-1 bg-sky-300 hover:bg-green-300 rounded-sm capitalize font-Poppins font-semibold text-gray-600 mb-1"
                  onClick={() => acceptFriendRequest(item._id)}
                  title="accept"
                />
              ) : friendsList.find(
                  (el) =>
                    el.userOne._id == item._id || el.userTwo._id == item._id
                ) ? (
                <Button
                  className="w-full py-1 bg-sky-300 hover:bg-green-300 rounded-sm capitalize font-Poppins font-semibold text-gray-600 mb-1"
                  onClick={() => acceptFriendRequest(item._id)}
                  title="block"
                />
              ) : (
                <Button
                  className="w-full py-1 bg-sky-300 rounded-sm capitalize font-Poppins font-semibold text-gray-600 mb-1"
                  onClick={() => sendFriendRequestHandler(item._id)}
                  title="add friend"
                />
              )}
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
