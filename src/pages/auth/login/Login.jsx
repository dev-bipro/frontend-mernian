import Flex from "../../../components/Flex";
import Image from "../../../components/Image";
import loginImage from "../../../assets/login.webp";
import logo from "../../../assets/logo.svg";
import Heading from "../../../components/Heading";
import Paragraph from "../../../components/Paragraph";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import Label from "../../../components/Label";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Flip, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../features/user/loginUserSlice";

function Login() {
  const loginUser = useSelector((state) => state.loginUser.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (loginUser) {
      navigate("/newsfeed");
    }
  }, []);

  const changeHandler = (e) => {
    // console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name == "email") {
      setEmailError("");
    } else if (e.target.name == "password") {
      setPasswordError("");
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (!formData.email || !formData.password) {
      if (!formData.email) {
        setEmailError("please type your email");
      }
      if (!formData.password) {
        setPasswordError("please type your password");
      }
    } else {
      const mailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

      const validMail = mailRegex.test(formData.email);

      if (!validMail) {
        emailError("please type a valid mail");
      } else if (
        formData.password.length < 4 ||
        formData.password.length > 16
      ) {
        setPasswordError("type password minimum 4 and maximum 16 character");
      } else {
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://backend-mernian-yxi0.onrender.com/api/v4/auth/user/login",
          headers: {
            Authorization: "user",
            "Content-Type": "application/json",
          },
          data: { ...formData },
        };

        axios
          .request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            console.log(response.data);
            if (response.status == 200) {
              toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
              });

              setTimeout(() => {
                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.data)
                );
                dispatch(setLogin(response.data.data));
                navigate("/newsfeed");
              }, 5000);
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status == 404) {
              console.log(error.response);
              toast.info(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
              });
              setTimeout(() => {
                navigate("/registration");
              }, 5000);
            } else if (error.response.status == 403) {
              toast.info(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
              });
            }
          });
      }
    }
    // console.log(formDataErrors);
  };
  return (
    <>
      <section>
        <Flex className="flex">
          <div className="w-1/2 flex items-center justify-center ">
            <div className="py-9 px-14 rounded-sm bg-gray-600 shadow-lg">
              <div className="flex justify-center">
                <Image src={logo} />
              </div>
              <Heading
                tagName="h2"
                className="capitalize font-Inter font-semibold text-2xl mt-8 mb-2"
                title="login"
              />
              <Paragraph
                className="capitalize font-Inter font-semibold text-sm text-gray-300 mb-8"
                title="free register and you can enjoy it"
              />

              <Form onSubmit={submitHandler}>
                {emailError && (
                  <Paragraph
                    className="capitalize text-xs text-red-400"
                    title={emailError}
                  />
                )}
                <Flex className="flex justify-between items-center mb-4">
                  <Label
                    htmlFor="email"
                    className="capitalize font-Poppins font-medium text-white mr-4"
                    title="email :"
                  />
                  <Input
                    id="email"
                    className="bg-transparent placeholder:capitalize placeholder:text-xs text-white"
                    name="email"
                    onChange={changeHandler}
                    placeholder="type your email"
                    type="email"
                    value={formData.email}
                  />
                </Flex>

                {passwordError && (
                  <Paragraph
                    className="capitalize text-xs text-red-400"
                    title={passwordError}
                  />
                )}
                <Flex className="flex justify-between items-center mb-4">
                  <Label
                    htmlFor="password"
                    className="capitalize font-Poppins font-medium text-white mr-4"
                    title="password :"
                  />

                  <div className="relative">
                    <Input
                      id="password"
                      className="bg-transparent placeholder:capitalize placeholder:text-xs text-white"
                      name="password"
                      onChange={changeHandler}
                      placeholder="type your password"
                      type={passwordType}
                      value={formData.password}
                    />
                    {passwordType === "password" ? (
                      <div
                        className="absolute top-1/2 right-3 -translate-y-1/2 z-30 cursor-pointer"
                        onClick={() => setPasswordType("text")}
                      >
                        <BsEye />
                      </div>
                    ) : (
                      <div
                        className="absolute top-1/2 right-3 -translate-y-1/2 z-30 cursor-pointer"
                        onClick={() => setPasswordType("password")}
                      >
                        <BsEyeSlash />
                      </div>
                    )}
                  </div>
                </Flex>

                <Paragraph
                  className="capitalize text-white"
                  title="you have no account? "
                >
                  <Link className="text-blue-400" to="/registration">
                    register
                  </Link>
                </Paragraph>

                <Button
                  className="py-2 px-4 rounded-md capitalize hover:bg-white transition-all"
                  type="submit"
                  title="login"
                />
              </Form>
            </div>
          </div>
          <div className="w-1/2 h-screen bg-no-repeat bg-cover bg-top">
            <Image className="w-full h-full object-cover" src={loginImage} />
          </div>
        </Flex>
      </section>
    </>
  );
}

export default Login;
