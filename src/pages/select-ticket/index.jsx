import { useState } from "react";
import LevelCounter from "../../components/LevelCounter";
import { Button, Select } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../../actions/localActions";
import { AllEvetnsDetails } from "../../data";

const SelectTicket = () => {
  const [chosenTicket, setChosenTicket] = useState("");
  const [numOfTicket, setNumOfTicket] = useState(1);
  const [inputsError, setInputsError] = useState({ ticket: "", number: "" });
  const { setLocalStorage } = useLocalStorage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedEvent = searchParams.get("event");
  const EventDetails = AllEvetnsDetails[selectedEvent || 0];

  const handleNext = () => {
    setInputsError((prev) => ({ ...prev, ticket: "", number: "" }));
    if (!chosenTicket) {
      setInputsError((prev) => ({ ...prev, ticket: "No ticket was chosen!" }));
      return;
    }
    if (!numOfTicket) {
      setInputsError((prev) => ({
        ...prev,
        number: "Select the number of tickets to be bought!",
      }));
      return;
    }
    const data = {
      ticket_name: EventDetails.name,
      ticket_location: EventDetails.location,
      ticket_date: EventDetails.date,
      ticket_time: EventDetails.time,
      ticket: chosenTicket,
      number: numOfTicket,
    };
    setLocalStorage("ticket-data", data);
    navigate("/attendee-details");
  };
  return (
    <div className="w-full flex flex-col gap-10">
      <LevelCounter title={"Ticket Selection"} step={1} />

      <div className="page-container">
        <div className="w-fit bg-[#0A0C11]/10 border border-[#07373F] border-t-0 !p-4 md:!p-6 flex flex-col gap-3 text-white rounded-3xl">
          <h2 className="text-5xl md:text-7xl text-center long-font">
            {EventDetails.name}
          </h2>
          <p className="text-center">{EventDetails.desc}</p>
          <p className="text-center flex flex-col md:flex-row justify-center gap-4">
            <span>{EventDetails.location}</span>
            <span className="hidden md:block">| |</span>
            <span>
              {EventDetails.date} | {EventDetails.time}
            </span>
          </p>
        </div>
        <div className="w-full rounded-2xl bg-[#07373F] !p-0.5"></div>
        <div className="w-full flex flex-col gap-3">
          <p className="text-lg text-white font-medium">
            Select Ticket Type: *{" "}
            {inputsError.ticket && (
              <span className="!ml-3 text-red-600">{inputsError.ticket}</span>
            )}
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#052228] border border-[#07373F] rounded-3xl !p-4 md:!p-6">
            {EventDetails.ticketTypes.map((ticket) => (
              <div
                key={ticket.value}
                className={`w-full border border-[#197686] rounded-2xl !p-3 flex justify-between items-start text-white cursor-pointer hover:bg-[#197686]/30 ${
                  chosenTicket === ticket.value
                    ? "bg-[#197686]"
                    : "bg-transparent"
                }`}
                onClick={() => {
                  setChosenTicket(ticket.value);
                }}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold">{ticket.price}</p>
                  <p>{ticket.name}</p>
                  <p className="text-sm">20/52</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <p className="text-lg text-white font-medium">
            Number of Tickets: *{" "}
            {inputsError.number && (
              <span className="!ml-3 text-red-600">{inputsError.number}</span>
            )}
          </p>
          <Select
            defaultValue={numOfTicket}
            className="!w-full !bg-transparent border !border-[#07373F] rounded-2xl !h-[50px]"
            size="large"
            style={{
              background: "transparent",
              borderColor: "#07373F",
            }}
            value={numOfTicket}
            onChange={setNumOfTicket}
            options={[
              {
                value: 1,
                label: 1,
              },
              {
                value: 2,
                label: 2,
              },
              {
                value: 3,
                label: 3,
              },
              {
                value: 4,
                label: 4,
              },
              {
                value: 5,
                label: 5,
              },
            ]}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10 text-white">
          <Button
            htmlType="button"
            className="w-full !bg-transparent border !border-[#197686] rounded-lg !p-3 cursor-pointer !text-[#24A0B5] hover:opacity-85 !h-[50px] font-semibold !text-lg"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
          <Button
            htmlType="button"
            onClick={handleNext}
            className="w-full !bg-[#24A0B5] !text-white border !border-[#197686] rounded-lg !p-3 cursor-pointer hover:opacity-85 hover:!text-white !h-[50px] font-semibold !text-lg"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectTicket;
