import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        {/* Adjust the size of the loader circle based on screen size */}
        <div
          className="animate-spin-slow bg-gradient-to-r from-[#1BD8C4] to-[#1A3F6B] rounded-full opacity-80
          h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-50 xl:w-50"
        ></div>

        {/* Adjust the FontAwesome icon size based on screen size */}
        <FontAwesomeIcon
          icon={faSync}
          className="absolute top-0 left-0 right-0 bottom-0 m-auto text-white animate-spin
          h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28"
        />
      </div>
    </div>
  );
}
