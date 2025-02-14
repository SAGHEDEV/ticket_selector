import { Button } from "antd";
import LevelCounter from "../../components/LevelCounter";
import Ticket from "../../components/Ticket";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocalStorage } from "../../actions/localActions";
import { useNavigate } from "react-router-dom";

const TicketIsReady = () => {
  const printRef = useRef(null);
  const { getLocalStorage, removeLocalStorage } = useLocalStorage();
  const navigate = useNavigate();

  const attendee = getLocalStorage("attendee_details");

  const handleDownload = async () => {
    const element = printRef.current;

    if (!element) {
      return;
    }

    element.style.transform = "scale(1)";

    const canvas = await html2canvas(element, {
      useCORS: true,
      backgroundColor: null,
      ignoreElements: (el) => el.tagName === "CANVAS",
      onclone: (clonedDocument) => {
        clonedDocument.body.style.color = "rgb(255,255,255)";
      },
    });
    const data = canvas.toDataURL("image/png");

    const ticketPdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "a4",
    });

    ticketPdf.addImage(data, "PNG", 0, 0);
    ticketPdf.save(`${attendee.name}'s Ticket`);

    console.log(element);
  };

  const handleBookAnotherTicket = () => {
    removeLocalStorage("attendee_details");
    navigate("/");
  };
  return (
    <div className="w-full flex flex-col gap-10">
      <LevelCounter title={"Ready!!!"} step={3} />
      <div className="page-container">
        <div className="text-white">
          <h2 className="text-3xl text-center">Your Ticket is Booked!</h2>
          <p className="text-center !mt-2">
            Check your email for a copy or you can{" "}
            <span
              onClick={handleDownload}
              className="font-semibold text-[#24A0B5] cursor-pointer"
            >
              download!
            </span>
          </p>
          <p className="text-[10px] text-center font-semibold text-gray-200">
            PS: There is no email sent, it is advisable to download your
            ticket!😂
          </p>
        </div>
        <Ticket reference={printRef} />

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10 text-white">
          <Button
            onClick={handleBookAnotherTicket}
            className="w-full !bg-transparent border !border-[#197686] rounded-lg !p-3 cursor-pointer !text-[#24A0B5] hover:opacity-85 !h-[50px] font-semibold"
          >
            Book another Ticket
          </Button>
          <Button
            onClick={handleDownload}
            className="w-full !bg-[#24A0B5] !text-white border !border-[#197686] rounded-lg !p-3 cursor-pointer hover:opacity-85 hover:!text-white !h-[50px] font-semibold"
          >
            Download Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketIsReady;
