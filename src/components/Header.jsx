import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const Header = () => {
  return (
    <header className="w-full sticky top-4 flex justify-center items-center !py-3 !px-2 !md:px-5 lg:!py-6 z-20 ">
      <div className="w-full md:w-[80%] m-auto bg-[#05252C]/40 backdrop-blur-3xl border border-[#197686] rounded-3xl !p-5 flex justify-between items-center">
        <div>
          <Link to={"/"}>
            <img
              src="/assets/full-logo.svg"
              alt="Ticz"
              width={92}
              height={36}
            />
          </Link>
        </div>
        <div className=" hidden md:flex justify-center items-center gap-4 text-lg text-white">
          <Link to="#">Events</Link>
          <Link to="#">My Tickets</Link>
          <Link to="#">About Project</Link>
        </div>

        <div>
          <button
            type="button"
            className="group !p-4 rounded-xl bg-white text-[#0A0C11] uppercase cursor-pointer hover:bg-[#24A0B5] hover:text-white text-base flex gap-2 items-center"
          >
            MY Tickets <IoIosArrowRoundForward size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
