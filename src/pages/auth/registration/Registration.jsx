import Flex from "../../../components/Flex";
import Image from "../../../components/Image";
import resgistrationImage from "../../../assets/registration.webp";
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
import { useSelector } from "react-redux";

function Registration() {
  const loginUser = useSelector((state) => state.loginUser.value);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");

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

    if (e.target.name == "name") {
      setNameError("");
    } else if (e.target.name == "email") {
      setEmailError("");
    } else if (e.target.name == "password") {
      setPasswordError("");
    } else if (e.target.name == "confirmPassword") {
      setConfirmPasswordError("");
    } else if (e.target.name == "gender") {
      setGenderError("");
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.gender
    ) {
      if (!formData.name) {
        setNameError("please type your name");
      }
      if (!formData.email) {
        setEmailError("please type your email");
      }
      if (!formData.password) {
        setPasswordError("please type your password");
      }
      if (!formData.confirmPassword) {
        setConfirmPasswordError("please type your confirm Password");
      }
      if (!formData.gender) {
        setGenderError("please select your gender");
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
      } else if (
        formData.confirmPassword.length < 4 ||
        formData.confirmPassword.length > 16
      ) {
        setConfirmPasswordError(
          "type confirm password minimum 4 and maximum 16 character"
        );
      } else if (formData.password != formData.confirmPassword) {
        setConfirmPasswordError("password and confirm password are not same");
      } else {
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "http://localhost:8000/api/v4/auth/user/create",
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
                navigate("/");
              }, 5000);
            }
          })
          .catch((error) => {
            if (error.response.status == 409) {
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
                navigate("/");
              }, 5000);
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
          <div className="w-1/2 h-screen bg-no-repeat bg-cover bg-top">
            <Image
              className="w-full h-full object-cover"
              src={resgistrationImage}
            />
          </div>
          <div className="w-1/2 flex items-center justify-center ">
            <div className="py-9 px-14 rounded-sm bg-gray-600 shadow-lg">
              <div className="flex justify-center">
                <Image src={logo} />
              </div>
              <Heading
                tagName="h2"
                className="capitalize font-Inter font-semibold text-2xl mt-8 mb-2"
                title="register"
              />
              <Paragraph
                className="capitalize font-Inter font-semibold text-sm text-gray-300 mb-8"
                title="free register and you can enjoy it"
              />

              <Form onSubmit={submitHandler}>
                {nameError && (
                  <Paragraph
                    className="capitalize text-xs text-red-400"
                    title={nameError}
                  />
                )}
                <Flex className="flex justify-between items-center mb-4">
                  <Label
                    htmlFor="name"
                    className="capitalize font-Poppins font-medium text-white mr-4"
                    title="name :"
                  />
                  <Input
                    id="name"
                    className="placeholder:capitalize placeholder:text-xs"
                    name="name"
                    onChange={changeHandler}
                    placeholder="type your name"
                    type="text"
                    value={formData.name}
                  />
                </Flex>
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
                    className="placeholder:capitalize placeholder:text-xs"
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
                      className="placeholder:capitalize placeholder:text-xs"
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

                {confirmPasswordError && (
                  <Paragraph
                    className="capitalize text-xs text-red-400"
                    title={confirmPasswordError}
                  />
                )}
                <Flex className="flex justify-between items-center mb-4">
                  <Label
                    htmlFor="confirmPassword"
                    className="capitalize font-Poppins font-medium text-white mr-4"
                    title="confirm password :"
                  />
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      className="placeholder:capitalize placeholder:text-xs"
                      name="confirmPassword"
                      onChange={changeHandler}
                      placeholder="type your confirm password"
                      type={confirmPasswordType}
                      value={formData.confirmPassword}
                    />

                    {confirmPasswordType === "password" ? (
                      <div
                        className="absolute top-1/2 right-3 -translate-y-1/2 z-30 cursor-pointer"
                        onClick={() => setConfirmPasswordType("text")}
                      >
                        <BsEye />
                      </div>
                    ) : (
                      <div
                        className="absolute top-1/2 right-3 -translate-y-1/2 z-30 cursor-pointer"
                        onClick={() => setConfirmPasswordType("password")}
                      >
                        <BsEyeSlash />
                      </div>
                    )}
                  </div>
                </Flex>

                {genderError && (
                  <Paragraph
                    className="capitalize text-xs text-red-400"
                    title={genderError}
                  />
                )}
                <Flex className="flex justify-between items-center mb-4">
                  <Label
                    className="capitalize font-Poppins font-medium text-white mr-4"
                    title="gender :"
                  />
                  <Flex className="flex items-center gap-4">
                    <Flex className="flex items-center gap-1">
                      <Input
                        id="male"
                        className=""
                        name="gender"
                        onChange={changeHandler}
                        type="radio"
                        value="male"
                      />
                      <Label
                        htmlFor="male"
                        className="capitalize text-white text-sm "
                        title="male"
                      />
                    </Flex>
                    <Flex className="flex items-center gap-1">
                      <Input
                        id="female"
                        name="gender"
                        onChange={changeHandler}
                        type="radio"
                        value="female"
                      />
                      <Label
                        htmlFor="female"
                        className="capitalize text-white text-sm "
                        title="female"
                      />
                    </Flex>
                    <Flex className="flex items-center gap-1">
                      <Input
                        id="other"
                        name="gender"
                        onChange={changeHandler}
                        type="radio"
                        value="other"
                      />
                      <Label
                        htmlFor="other"
                        className="capitalize text-white text-sm "
                        title="other"
                      />
                    </Flex>
                  </Flex>
                </Flex>

                <Paragraph
                  className="capitalize text-white"
                  title="you have already account? "
                >
                  <Link className="text-blue-400" to="/">
                    login
                  </Link>
                </Paragraph>

                <Button
                  className="py-2 px-4 rounded-md capitalize hover:bg-white transition-all"
                  type="submit"
                  title="register"
                />
              </Form>
            </div>
          </div>
        </Flex>
      </section>
    </>
  );
}

export default Registration;
