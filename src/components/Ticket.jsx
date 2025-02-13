/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoCalendar, IoLocationSharp } from "react-icons/io5";
import { useLocalStorage } from "./../actions/localActions";
// import { useNavigate } from "react-router-dom";

const Ticket = ({ reference }) => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [attandeeDetails, setAttendeeDetails] = useState(null);
  const { getLocalStorage } = useLocalStorage();

  useEffect(() => {
    const storedTicket = getLocalStorage("ticket-data");
    const storedAttendee = getLocalStorage("attendee_details");

    setTicketDetails(storedTicket);
    setAttendeeDetails(storedAttendee);
  }, []);

  if (ticketDetails && attandeeDetails)
    return (
      <div
        ref={reference}
        className="relative w-[400px] scale-75 md:scale-100 h-fit min-h-[800px] flex justify-center items-start"
      >
        <img
          src="/assets/ticket-body.png"
          alt="."
          className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <div className="!px-2 !py-5 z-10 w-full m-auto absolute">
          <div
            className="w-[90%] !m-auto rounded-3xl flex flex-col gap-7 !p-3"
            style={{
              backgroundColor: "rgba(3, 30, 33, 0.1)", // bg-[#031E21]/10
              border: "1px solid #24A0B5",
              color: "white",
            }}
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-3xl text-center">
                {ticketDetails.ticket_name}
              </h3>
              <p className="text-center flex justify-center items-center gap-2">
                <IoLocationSharp style={{ color: "red" }} />
                {ticketDetails.ticket_location}
              </p>
              <p className="text-center flex justify-center items-center gap-2">
                <IoCalendar style={{ color: "red" }} />{" "}
                {ticketDetails.ticket_date} || {ticketDetails.ticket_time}
              </p>
            </div>
            <img
              src={attandeeDetails?.profile_pic || ""}
              alt=""
              className="w-44 h-44 rounded-lg self-center"
              style={{
                border: "4px solid #24A0B5",
              }}
            />
            <div
              className="rounded-3xl !p-3"
              style={{
                backgroundColor: "#08343C",
                border: "1px solid #133D44",
                color: "white",
              }}
            >
              <div
                className="flex justify-between items-start gap-5 border-b"
                style={{ borderBottom: "1px solid #374151" }} // gray-700 in RGB
              >
                <div
                  className="w-[50%] flex flex-col gap-2 justify-between !py-1 border-r"
                  style={{ borderRight: "1px solid #374151" }} // gray-700 in RGB
                >
                  <span style={{ color: "gray" }}>Name:</span>
                  <span className="font-semibold">{attandeeDetails.name}</span>
                </div>
                <div className="w-[50%] flex flex-col gap-2 justify-between !py-1">
                  <span style={{ color: "gray" }}>Email:</span>
                  <span className="font-semibold text-wrap break-all">
                    {attandeeDetails.email}
                  </span>
                </div>
              </div>
              <div
                className="flex justify-between items-start gap-5 border-b"
                style={{ borderBottom: "1px solid #374151" }} // gray-700 in RGB
              >
                <div
                  className="flex flex-col w-full justify-between !py-1 border-r"
                  style={{ borderRight: "1px solid #374151" }} // gray-700 in RGB
                >
                  <span style={{ color: "gray" }}>Ticket Type:</span>
                  <span className="font-semibold">{ticketDetails.ticket}</span>
                </div>
                <div className="w-full flex flex-col justify-between !py-1">
                  <span style={{ color: "gray" }}>Tickets:</span>
                  <span className="font-semibold">{ticketDetails.number}</span>
                </div>
              </div>
              <div className="mt-2 text-xs !py-1">
                <span style={{ color: "gray" }}>Special Request?</span>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "rgb(209, 213, 219)" }} // gray-300 in RGB
                >
                  {attandeeDetails.special_request || "None"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 w-full z-10 flex justify-center items-center">
          <img src="/assets/Bar Code.png" alt="" />
        </div>
      </div>
    );
};

export default Ticket;
