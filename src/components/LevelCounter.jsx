/* eslint-disable react/prop-types */

const LevelCounter = ({ title, step }) => {
  const widthClasses = {
    1: "w-[33%]",
    2: "w-[66%]",
    3: "w-[100%]",
  };
  return (
    <div className="w-full flex flex-col gap-2 text-white">
      <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
        <p className="text-2xl md:text-4xl text-left">{title}</p>
        <span>Steps {step}/3</span>
      </div>
      <div className="w-full flex justify-start items-center bg-[#0E464F] rounded-3xl">
        <div
          className={`bg-[#24A0B5] !p-1 rounded-2xl ${widthClasses[step]}`}
        ></div>
      </div>
    </div>
  );
};

export default LevelCounter;
