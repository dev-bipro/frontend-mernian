import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Users() {
  const loginUser = useSelector((state) => state.loginUser.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUser) {
      navigate("/");
    }else {
        
    }
  }, []);
  return (
    <>
      <h1>ami users list</h1>
    </>
  );
}

export default Users;
