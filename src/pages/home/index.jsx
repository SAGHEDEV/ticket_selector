import { Button } from "antd";
import { AllEvetnsDetails } from "../../data";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-white">
        All events at your finger tips!!
      </h1>

      <div className="flex flex-col justify-center items-center w-full !my-3 md:!my-8  gap-5  ">
        {AllEvetnsDetails.map((eachEvent, index) => (
          <div
            key={eachEvent.name}
            className="w-fit bg-[#0A0C11]/10 border border-[#07373F]  !p-4 md:!p-6 flex flex-col gap-3 text-white rounded-3xl"
          >
            <h2 className="text-xl md:text-3xl text-left font-bold">
              {eachEvent.name}
            </h2>
            <p className="text-left">{eachEvent.desc}</p>
            <p className="text-left flex flex-col md:flex-row justify-left gap-4">
              <span>{eachEvent.location}</span>
              <span className="hidden md:block">| |</span>
              <span>
                {eachEvent.date} | {eachEvent.time}
              </span>
            </p>
            <Button
              onClick={() => navigate(`/register?event=${index}`)}
              className="w-full !bg-[#24A0B5] !text-white border !border-[#197686] rounded-lg !p-3 cursor-pointer hover:opacity-85 hover:!text-white !h-[50px] font-semibold text-lg"
            >
              Register
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
