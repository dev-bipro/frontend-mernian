import Flex from "../Flex";
import Image from "../Image";
import logo from "../../assets/logo.svg";

function navBar() {
  return (
    <>
      <nav>
        <div className="w-container bg-gray-600 py-4 px-6">
          <Flex>
            <div>
              <Image src={logo} />
            </div>
          </Flex>
        </div>
      </nav>
    </>
  );
}

export default navBar;
