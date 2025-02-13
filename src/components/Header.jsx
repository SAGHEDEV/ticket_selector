import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const Header = () => {
  return (
    <header className="w-full sticky top-4 flex justify-center items-center !py-3 lg:!py-6 z-20 !px-5">
      <div className="w-full md:w-[80%] m-auto bg-[#05252C]/40 backdrop-blur-3xl border border-[#197686] rounded-3xl !p-5 flex justify-between items-center">
        <div>
          <img src="/assets/full-logo.svg" alt="Ticz" width={92} height={36} />
        </div>
        <div className=" hidden md:flex justify-center items-center gap-4 text-lg text-white">
          <Link to="#">Events</Link>
          <Link to="#">My Tickets</Link>
          <Link to="#">About Project</Link>
        </div>

        <div>
          <button
            type="button"
            className="!p-4 rounded-xl bg-white text-[#0A0C11] uppercase cursor-pointer hover:bg-gray-50 text-base flex gap-2 items-center"
          >
            MY Tickets <IoIosArrowRoundForward size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
