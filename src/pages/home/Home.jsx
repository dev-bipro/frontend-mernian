import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/Heading";
import Label from "../../components/Label";
import { AiFillPicture } from "react-icons/ai";
import { IoCameraReverse } from "react-icons/io5";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Flex from "../../components/Flex";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import Form from "../../components/Form";
import FormData from "form-data";

function Home() {
  const loginUser = useSelector((state) => state.loginUser.value);
  const navigate = useNavigate();
  const [popupShow, setPopupShow] = useState(true);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!loginUser) {
      navigate("/");
    }
  }, []);

  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    // console.log("takePhoto", dataUri);
    setImage(dataUri);
  };

  const handleTakePhotoAnimationDone = (dataUri) => {
    // Do stuff with the photo...
    // console.log("takePhoto", dataUri);
  };

  const handleCameraError = (error) => {
    console.log("handleCameraError", error);
  };

  const handleCameraStart = (stream) => {
    console.log("handleCameraStart");
  };

  const handleCameraStop = () => {
    console.log("handleCameraStop");
  };
  const changeHandler = (e) => {
    console.log(e.target.type);
    if (e.target.type == "file" && files.length < 13) {
      setFiles([...files, e.target.files[0]]);
    } else if (e.target.type == "textarea") {
      setText(e.target.value);
    }
    console.log(text);
  };
  const discardHandler = () => {
    setImage("");
    setFiles([]);
    setText("");
    // console.log(image, files, text);
  };
  const postHandler = (e) => {
    e.preventDefault();
    console.log(files);
    if (!image && files.length <= 0 && !text) {
      toast.error("You Have No Post Item 🤷‍♂️", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      const data = new FormData();
      // let newArr = [];
      Object.values(files).forEach((file) => {
        data.append("images", file);
      });
      data.append("text", text);
      data.append("image", image);
      // data.append("images", newArr);
      console.log(Object.values(files));
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/api/v4/post/create",
        data: data,
        headers: {
          Authorization: "user",
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <section>
        <div className="rounded-3xl overflow-hidden shadow-md">
          <div className="w-full h-20 text-center bg-gray-600">
            <Heading
              className="capitalize font-semibold text-4xl text-white leading-20"
              tagName="h3"
              title="add your post"
            />
          </div>
          {/* <Form> */}
          <Form Form onSubmit={postHandler}>
            <textarea
              onChange={changeHandler}
              name="newPostTextInp"
              className="w-full text-gray-600 border-b-2 border-gray-600 p-3"
              placeholder={`hi, ${loginUser.name}, share your post ...`}
              value={text}
              cols="150"
              rows="5"
            />
            <Flex className="flex justify-between items-center mb-5">
              <Flex className="ml-3 flex gap-x-2">
                <div onClick={() => setPopupShow(false)}>
                  <IoCameraReverse className="text-2xl cursor-pointer" />
                </div>
                <Label className="newPostPicBtnDiv">
                  <AiFillPicture className="text-2xl cursor-pointer" />
                  <Input
                    onChange={changeHandler}
                    name="images"
                    className={"hidden"}
                    type="file"
                    accept="image/*, video/*"
                  />
                </Label>
                <Button />
              </Flex>
              <Flex className="flex gap-4 mr-3">
                <Button
                  onClick={discardHandler}
                  className="px-12 py-3 rounded-lg bg-slate-300 hover:bg-mainColor capitalize font-Poppins font-semibold text-base text-text-gray-600 hover:text-white"
                  title="discard"
                />
                <Button
                  type="submit"
                  className="px-12 py-3 rounded-lg bg-secondoryColor hover:bg-slate-300 capitalize font-Poppins font-semibold text-base text-white hover:text-secondoryColor"
                  title="post"
                />
              </Flex>
            </Flex>
          </Form>
          {/* </Form> */}
        </div>
        {!popupShow && (
          <div>
            <Button onClick={() => setPopupShow(true)} title="close" />
            <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
              }}
              onTakePhotoAnimationDone={(dataUri) => {
                handleTakePhotoAnimationDone(dataUri);
              }}
              onCameraError={(error) => {
                handleCameraError(error);
              }}
              idealFacingMode={FACING_MODES.ENVIRONMENT}
              idealResolution={{ width: 640, height: 480 }}
              imageType={IMAGE_TYPES.JPG}
              imageCompression={0.97}
              isMaxResolution={true}
              isImageMirror={false}
              isSilentMode={false}
              isDisplayStartCameraError={true}
              isFullscreen={false}
              sizeFactor={1}
              onCameraStart={(stream) => {
                handleCameraStart(stream);
              }}
              onCameraStop={() => {
                handleCameraStop();
              }}
            />
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
