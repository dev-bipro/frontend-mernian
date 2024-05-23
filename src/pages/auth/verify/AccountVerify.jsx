import Flex from "../../../components/Flex";
import Image from "../../../components/Image";
import verifyImage from "../../../assets/verify.webp";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function AccountVerify() {
  const loginUser = useSelector((state) => state.loginUser.value);
  const navigate = useNavigate();
  const { email } = useParams();
  const [otp, setOtp] = useState("");

  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (loginUser) {
      navigate("/newsfeed");
    }
  }, []);

  const changeHandler = (e) => {
    // console.log(e);
    setOtp(e.target.value);

    if (e.target.name == "otp") {
      setOtpError("");
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!otp) {
      setOtpError("please enter your otp");
    } else {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/api/v4/auth/user/create",
        headers: {
          Authorization: "user",
          "Content-Type": "application/json",
        },
        data: { email, otp },
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
          console.log(error);
          if (error.response.status == 404) {
            console.log(error.response);
            toast.error(error.response.data.message, {
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
          } else if (error.response.status == 409) {
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
    // console.log(formDataErrors);
  };
  return (
    <>
      <section>
        <Flex className="flex">
          <div className="w-1/2 h-screen bg-no-repeat bg-cover bg-top">
            <Image className="w-full h-full object-cover" src={verifyImage} />
          </div>
          <div className="w-1/2 flex items-center justify-center ">
            <div className="py-9 px-14 rounded-sm bg-gray-600 shadow-lg">
              <div className="flex justify-center">
                <Image src={logo} />
              </div>
              <Heading
                tagName="h2"
                className="capitalize font-Inter font-semibold text-2xl mt-8 mb-2"
                title="verify"
              />
              <Paragraph
                className="capitalize font-Inter font-semibold text-sm text-gray-300 mb-8"
                title="verify your account and login"
              />

              <Form onSubmit={submitHandler}>
                {otpError && (
                  <Paragraph
                    className="capitalize text-xs text-red-400"
                    title={otpError}
                  />
                )}
                <Flex className="flex justify-between items-center mb-4">
                  <Label
                    htmlFor="otp"
                    className="capitalize font-Poppins font-medium text-white mr-4"
                    title="OTP  :"
                  />
                  <Input
                    id="otp"
                    className="bg-transparent placeholder:capitalize placeholder:text-xs text-white"
                    name="otp"
                    onChange={changeHandler}
                    placeholder="type your OTP"
                    type="text"
                    value={otp}
                  />
                </Flex>

                <Paragraph
                  className="capitalize text-white"
                  title="go to login? "
                >
                  <Link className="text-blue-400" to="/">
                    login
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
        </Flex>
      </section>
    </>
  );
}

export default AccountVerify;
