import { useDispatch, useSelector } from "react-redux";
import Image from "../Image";
import Heading from "../Heading";
import Paragraph from "../Paragraph";
import Flex from "../Flex";
import List from "../List";
import ListItem from "../ListItem";
import Button from "../Button";
import Form from "../Form";
import Label from "../Label";
import Input from "../Input";
import { Link, useNavigate } from "react-router-dom";
import { FaNewspaper, FaUserFriends, FaHandHoldingHeart } from "react-icons/fa";
import { IoIosContact, IoMdPhotos } from "react-icons/io";
import { RiFolderVideoFill, RiLogoutBoxFill } from "react-icons/ri";
import { FaLayerGroup } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { CircleStencil, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import axios from "axios";
import { setLogin } from "../../features/user/loginUserSlice";
import { io } from "socket.io-client";

function SideBar() {
  const loginUser = useSelector((state) => state.loginUser.value);
  const dispatch = useDispatch();
  const socket = io("http://localhost:8000");

  const [popupShow, setPopupShow] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [chooseImage, setChooseImage] = useState("");
  const [image, setImage] = useState(null);

  // useEffect(()=>{
  //   if()
  // },[])

  useEffect(() => {
    if (!selectedFile) {
      setChooseImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setChooseImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const cropperRef = useRef();

  // const [previewState, setPreviewState] = useState({
  //   state: null,
  //   image: null,
  //   transitions: null,
  // });
  // const onUpdate = () => {
  //   setPreviewState({
  //     state: cropperRef.current.getState(),
  //     image: cropperRef.current.getImage(),
  //     transitions: cropperRef.current.getTransitions(),
  //     loaded: cropperRef.current.isLoaded(),
  //     loading: cropperRef.current.isLoading(),
  //   });
  //   console.log(previewState);
  // };
  const onUpdate = async () => {
    // previewRef.current?.refresh();
    const croppedImageBlob = await cropperRef.current
      .getCanvas()
      .toDataURL("image/png");
    console.log(croppedImageBlob);
    setImage(croppedImageBlob);
  };

  // const onChange = (cropper) => {
  //   console.log(cropper.getCoordinates(), cropper.getCanvas());
  //   console.log(cropper.getCanvas());
  // };
  const uploadHandler = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/api/v4/auth/user/updateprofileimage",
      headers: {
        Authorization: "user",
        "Content-Type": "application/json",
      },
      data: { ownerId: loginUser._id, image, name: "k" },
    };

    axios.request(config).then((response) => {
      // console.log(JSON.stringify(response.data));
      console.log(response.data);
      if (response.status == 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        dispatch(setLogin(response.data.data));
        navigate("/newsfeed");
      }
    });
  };

  const logOutHandler = () => {
    localStorage.removeItem("user");
    dispatch(setLogin(null));
    socket.on("disconnect", onDisconnect);
    navigate("/");
  };

  return (
    <>
      <section>
        <div className="relative mb-20">
          <div className="w-full bg-gray-600 h-20">
            <Image
              src={loginUser.coverPic}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-1/2 border-4  translate-y-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gray-600 bg-no-repeat bg-cover bg-top overflow-hidden cursor-pointer group ease-linear transition duration-300">
            <Image
              src={
                `http://localhost:8000${loginUser?.profilePic?.image}` ||
                loginUser?.profilePicAvatar
              }
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white hidden group-hover:block ease-linear transition duration-300 text-center font-Poppins text-xs  text-grayColor">
              <Button
                onClick={() => setPopupShow("viewImage")}
                className="py-1 w-full capitalize hover:bg-grayColor hover:text-white"
                title="view image"
              />
              <Button
                onClick={() => setPopupShow("changeImage")}
                className="py-1 w-full capitalize hover:bg-grayColor hover:text-white"
                title="change image"
              />
            </div>
          </div>
        </div>
        <div className="w-full text-center">
          <Heading
            tagName="h1"
            className="font-Poppins font-bold text-xl text-black"
            title={loginUser.name}
          />
          <Paragraph
            className="font-Poppins font-medium text-base text-gray-400"
            title={loginUser.email}
          />
        </div>
        <Flex className="w-full flex">
          <div className="w-1/3 text-center border-r-2 border-gray-400">
            <Heading
              tagName="h1"
              className="font-Poppins font-medium text-xl text-black"
              title={loginUser.name}
            />
            <Paragraph
              className="font-Poppins font-normal text-base text-gray-400"
              title={loginUser.email}
            />
          </div>
          <div className="w-1/3 text-center border-r-2 border-gray-400">
            <Heading
              tagName="h1"
              className="font-Poppins font-medium text-xl text-black"
              title={loginUser.name}
            />
            <Paragraph
              className="font-Poppins font-normal text-base text-gray-400"
              title={loginUser.email}
            />
          </div>
          <div className="w-1/3 text-center">
            <Heading
              tagName="h1"
              className="font-Poppins font-medium text-xl text-black"
              title={loginUser.name}
            />
            <Paragraph
              className="font-Poppins font-normal text-base text-gray-400"
              title={loginUser.email}
            />
          </div>
        </Flex>
        <List className="pl-6 pr-2 text-center">
          <ListItem className="mb-2">
            <Link
              className=" px-5 py-3 rounded-xl flex items-center capitalize font-Poppins font-semibold text-grayColor cursor-pointer hover:bg-gray-600 hover:text-white group transition duration-300"
              to="/newsfeed"
            >
              <span>
                <FaNewspaper />
              </span>
              <span className="pl-7">newsfeed</span>
            </Link>
          </ListItem>
          <ListItem className="mb-2">
            <Link
              className=" px-5 py-3 rounded-xl flex items-center capitalize font-Poppins font-semibold text-grayColor cursor-pointer hover:bg-gray-600 hover:text-white group transition duration-300"
              to="/my-profile"
            >
              <span>
                <IoIosContact />
              </span>
              <span className="pl-7">profile</span>
            </Link>
          </ListItem>
          <ListItem className="mb-2">
            <Link
              className=" px-5 py-3 rounded-xl flex items-center capitalize font-Poppins font-semibold text-grayColor cursor-pointer hover:bg-gray-600 hover:text-white group transition duration-300"
              to="/videos"
            >
              <span>
                <RiFolderVideoFill />
              </span>
              <span className="pl-7">videos</span>
            </Link>
          </ListItem>
          <ListItem className="mb-2">
            <Link
              className=" px-5 py-3 rounded-xl flex items-center capitalize font-Poppins font-semibold text-grayColor cursor-pointer hover:bg-gray-600 hover:text-white group transition duration-300"
              to="/group"
            >
              <span>
                <FaLayerGroup />
              </span>
              <span className="pl-7">group</span>
            </Link>
          </ListItem>
          <ListItem className="mb-2">
            <Link
              className=" px-5 py-3 rounded-xl flex items-center capitalize font-Poppins font-semibold text-grayColor cursor-pointer hover:bg-gray-600 hover:text-white group transition duration-300"
              to="/photos"
            >
              <span>
                <IoMdPhotos />
              </span>
              <span className="pl-7">photos</span>
            </Link>
          </ListItem>
          <ListItem className="mb-2">
            <Link
              className=" px-5 py-3 rounded-xl flex items-center capitalize font-Poppins font-semibold text-grayColor cursor-pointer hover:bg-gray-600 hover:text-white group transition duration-300"
              to="/friends"
            >
              <span>
                <FaUserFriends />
              </span>
              <span className="pl-7">friends</span>
            </Link>
          </ListItem>
          <ListItem className="mb-2">
            <Link
              className=" px-5 py-3 rounded-xl flex items-center capitalize font-Poppins font-semibold text-grayColor cursor-pointer hover:bg-gray-600 hover:text-white group transition duration-300"
              to="/friend-request"
            >
              <span>
                <FaHandHoldingHeart />
              </span>
              <span className="pl-7">friend request</span>
            </Link>
          </ListItem>

          <ListItem className="px-5 py-3 rounded-xl flex items-center capitalize font-Poppins font-semibold text-grayColor cursor-pointer hover:bg-gray-600 hover:text-white group transition duration-300">
            <span>
              <RiLogoutBoxFill />
            </span>
            <Paragraph
              onClick={logOutHandler}
              className="pl-7 capitalize font-Poppins font-semibold text-grayColor group-hover:text-white transition duration-300"
              title="log out"
            />
          </ListItem>
        </List>
      </section>
      {popupShow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5/6 overflow-y-scroll p-20 rounded-sm bg-slate-300">
          <div
            onClick={() => setPopupShow("")}
            className="absolute top-3 right-3 text-grayColor font-bold text-xl cursor-pointer hover:text-red-600"
          >
            <MdOutlineClose />
          </div>
          {popupShow == "viewImage" ? (
            <div className="w-96 h-96">
              <Image
                src={
                  `http://localhost:8000${loginUser?.profilePic?.image}` ||
                  loginUser.profilePicAvatar
                }
              />
            </div>
          ) : popupShow == "changeImage" ? (
            <>
              <Heading
                tagName="h4"
                className="capitalize font-medium text-black"
                title="change your picture"
              />
              {/* <Form className="text-gray-600"> */}
              <Input
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="text-black"
                type="file"
              />
              {chooseImage && (
                <>
                  <div className="w-96 h-5/6 ">
                    <Cropper
                      ref={cropperRef}
                      src={chooseImage}
                      stencilComponent={CircleStencil}
                      // onChange={onChange}

                      onUpdate={onUpdate}
                    />
                  </div>
                </>
              )}
              {/* </Form> */}
              <div className=" w-48 h-48 rounded-full bg-no-repeat bg-cover object-cover overflow-hidden">
                <Image src={image} />
              </div>
              <Button onClick={uploadHandler} title="change" />
            </>
          ) : null}
        </div>
      )}
    </>
  );
}

export default SideBar;
