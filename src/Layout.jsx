/* eslint-disable react/prop-types */

const Layout = ({ children }) => {
  return (
    <div className="!py-7 lg:!py-10 !overflow-x-hidden !px-2 md:!px-10">
      <div className="w-full bg-[#041E23] !p-4 md:!p-12 border border-[#0E464F] rounded-3xl md:max-w-[700px] !m-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
