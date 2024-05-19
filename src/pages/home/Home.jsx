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
import Image from "../../components/Image";
import List from "../../components/List";
import ListItem from "../../components/ListItem";
import Video from "../../components/Video";
import { MdOutlineClose } from "react-icons/md";

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
    setPopupShow(true);
  };

  const changeHandler = (e) => {
    if (e.target.type == "file" && files.length < 13) {
      setFiles([...files, e.target.files[0]]);
    } else if (e.target.type == "textarea") {
      setText(e.target.value);
    }
  };
  const deleteSelectFileHandler = (index) => {
    setFiles((item) => [...item.slice(0, index), ...item.slice(index + 1)]);
  };
  const discardHandler = () => {
    setImage("");
    setFiles([]);
    setText("");
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

      data.append("ownerId", loginUser._id);
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
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      setImage("");
      setFiles([]);
      setText("");
    }
  };

  return (
    <>
      <section>
        <div className="rounded-sm overflow-hidden shadow-md">
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <Button
              onClick={() => setPopupShow(true)}
              className="px-3 py-2 bg-red-600 capitalize rounded-sm text-white mb-2"
              title="close"
            />
            <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
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
            />
          </div>
        )}
        {(image || files.length > 0) && (
          <div>
            <div className="w-96 relative">
              <div
                onClick={() => setImage("")}
                className="absolute top-3 right-3 text-grayColor font-bold text-xl cursor-pointer text-red-600 hover:text-white hover:bg-red-600"
              >
                <MdOutlineClose />
              </div>
              <Image className="w-full" src={image} />
            </div>
            <List className="flex flex-wrap gap-3">
              {files.map((item, index) => {
                if (item.type.split("/")[0] == "image") {
                  return (
                    <ListItem className="w-96 h-72 overflow-hidden relative py-8">
                      <div
                        onClick={() => deleteSelectFileHandler(index)}
                        className="absolute top-3 right-3 text-grayColor font-bold text-xl cursor-pointer text-red-600 hover:text-white hover:bg-red-600"
                      >
                        <MdOutlineClose />
                      </div>
                      <Image
                        className="h-fit object-fill"
                        src={URL.createObjectURL(item)}
                      />
                    </ListItem>
                  );
                } else if (item.type.split("/")[0] == "video") {
                  return (
                    <ListItem className="w-96 h-72 relative flex justify-center items-center">
                      <div
                        onClick={() => deleteSelectFileHandler(index)}
                        className="absolute top-3 right-3 text-grayColor font-bold text-xl cursor-pointer text-red-600 hover:text-white hover:bg-red-600"
                      >
                        <MdOutlineClose />
                      </div>
                      <Video
                        width="100%"
                        src={URL.createObjectURL(item)}
                        type="video/mp4"
                      />
                    </ListItem>
                  );
                }
              })}
            </List>
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
