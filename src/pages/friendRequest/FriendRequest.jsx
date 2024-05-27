import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserList from "../../components/users/UserList";
import Button from "../../components/Button";

function FriendRequest() {
  const loginUser = useSelector((state) => state.loginUser.value);
  const navigate = useNavigate();
  // const apiUrl = process.env.API_URL;
  // console.log("API URL:", process.env.API_URL);
  let [reloadUseEffect, setReloadUseEffect] = useState("");

  const [friendRequestList, setFriendRequestList] = useState([]);

  useEffect(() => {
    if (!loginUser) {
      navigate("/");
    } else {
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
    }
  }, [reloadUseEffect] || []);

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
          setReloadUseEffect(Date.now());
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const rejectFriendRequest = (id) => {
    if (!id) {
      console.log("error daw");
    } else {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `http://localhost:8000/api/v4/auth/user/rejectfriendrequest?_id=${id}`,
        headers: {
          Authorization: "user",
        },
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
        {friendRequestList?.map((item, index) => {
          return (
            <UserList key={index} user={item.sender}>
              <Button
                className="w-full py-1 bg-sky-300 hover:bg-green-300 rounded-sm capitalize font-Poppins font-semibold text-gray-600 mb-1"
                onClick={() => acceptFriendRequest(item.sender._id)}
                title="accept"
              />
              <Button
                className="w-full py-1 bg-sky-300 hover:bg-green-300 rounded-sm capitalize font-Poppins font-semibold text-gray-600 mb-1"
                onClick={() => rejectFriendRequest(item._id)}
                title="reject"
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

export default FriendRequest;
