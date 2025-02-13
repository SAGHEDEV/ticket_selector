import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./Layout";
import SelectTicket from "./pages/select-ticket";
import AttandeeDetails from "./pages/attendee-details";
import TicketIsReady from "./pages/ticket-ready";
import Index from "./pages/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="bg-[#02191D] max-w-screen min-h-screen">
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<SelectTicket />} />
              <Route path="/attendee-details" element={<AttandeeDetails />} />
              <Route path="/ready" element={<TicketIsReady />} />
            </Routes>
          </Layout>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
