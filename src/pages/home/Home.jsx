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

function Home() {
  const loginUser = useSelector((state) => state.loginUser.value);
  const navigate = useNavigate();
  const [popupShow, setPopupShow] = useState(true);

  useEffect(() => {
    if (!loginUser) {
      navigate("/");
    }
  }, []);

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto", dataUri);
  }

  function handleTakePhotoAnimationDone(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto", dataUri);
  }

  function handleCameraError(error) {
    console.log("handleCameraError", error);
  }

  function handleCameraStart(stream) {
    console.log("handleCameraStart");
  }

  function handleCameraStop() {
    console.log("handleCameraStop");
  }
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
          <textarea
            // onChange={changeHandler}
            name="newPostTextInp"
            className="w-full text-gray-600 border-b-2 border-gray-600 p-3"
            type="text"
            placeholder={`hi, ${loginUser.name}, share your post ...`}
            // value={inpValue}
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
                  // onChange={changeHandler}
                  name="imageAndVideoInp"
                  className={"hidden"}
                  type="file"
                  accept="image/*, video/*"
                />
              </Label>
              <Button />
            </Flex>
            <Flex className="flex gap-4 mr-3">
              <Button
                className="px-12 py-3 rounded-lg bg-slate-300 hover:bg-mainColor capitalize font-Poppins font-semibold text-base text-text-gray-600 hover:text-white"
                title="discard"
              />
              <Button
                className="px-12 py-3 rounded-lg bg-secondoryColor hover:bg-slate-300 capitalize font-Poppins font-semibold text-base text-white hover:text-secondoryColor"
                title="post"
              />
            </Flex>
          </Flex>
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
