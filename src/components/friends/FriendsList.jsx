import Heading from "../Heading";
import Image from "../Image";
import Paragraph from "../Paragraph";

function FriendsList({ friend, children }) {
  console.log(friend);
  // const profilePicUrl = user?.profilePic?.image
  //   ? `http://localhost:8000${user.profilePic.image}`
  //   : user.profilePicAvatar;

  return (
    <></>
    // <div className="w-44 p-4 shadow-md overflow-hidden">
    //   <div className="w-40 h-40 bg-gray-600 bg-no-repeat bg-cover bg-top overflow-hidden">
    //     <Image className="w-full h-full bg-cover" src={profilePicUrl} />
    //   </div>
    //   <div>
    //     <Heading
    //       tagName="h3"
    //       className="font-Poppins font-bold text-xl text-black"
    //       title={user?.name}
    //     />
    //     <Paragraph
    //       className="font-Poppins font-medium text-base text-gray-400"
    //       showText={user?.email}
    //       title={user?.email.slice(0, 11) + "..."}
    //     />
    //     <div className="mt-2 text-center">{children}</div>
    //   </div>
    // </div>
  );
}

export default FriendsList;
