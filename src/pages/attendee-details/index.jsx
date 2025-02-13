import { Button, Form, Input, message } from "antd";
import LevelCounter from "../../components/LevelCounter";
import { Upload } from "antd";
import { IoMdCloudUpload } from "react-icons/io";
import { MdMailOutline } from "react-icons/md";
import { useState } from "react";
import { useLocalStorage } from "./../../actions/localActions";
import { useNavigate } from "react-router-dom";

const { Dragger } = Upload;
const { TextArea } = Input;

const AttandeeDetails = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const props = {
    name: "file",
    multiple: false,
    showUploadList: false,
    beforeUpload: () => false,
    onChange(info) {
      const file = info.file;
      console.log(file);
      const fileObj = file.originFileObj || file;
      if (!fileObj) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result);
      };

      reader.readAsDataURL(fileObj);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const navigate = useNavigate();
  const { setLocalStorage } = useLocalStorage();

  const [form] = Form.useForm();

  const uploadToCloud = async (file) => {
    if (!file) {
      return;
    }
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "ticket_generator_app");
    imageData.append("cloud_name", "dkc7tnvs7");

    try {
      const options = {
        method: "POST",
        body: imageData,
      };
      const result = await fetch(
        "https://api.cloudinary.com/v1_1/dkc7tnvs7/image/upload",
        options
      );
      const imageUrl = result.json();
      return imageUrl;
    } catch (error) {
      messageApi.error("An error occurred, Kindly try again");
      throw new Error("An error Occurred", error);
    }
  };

  const handleProceed = async (e) => {
    setLoading(true);
    const imageUrl = await uploadToCloud(e.profile_pic.file);
    // console.log(imageUrl.url);

    const attendeeData = {
      name: e.name,
      email: e.email,
      special_request: e.special_request,
      profile_pic: imageUrl?.url || "",
    };

    setLocalStorage("attendee_details", attendeeData);
    navigate("/ready");
    setLoading(false);
  };
  return (
    <div className="w-full flex flex-col gap-10">
      {contextHolder}
      <LevelCounter title={"Attendee Details"} step={2} />
      <div className="page-container">
        <Form
          form={form}
          layout="vertical"
          className="w-full flex flex-col gap-5"
          onFinish={(e) => handleProceed(e)}
        >
          <div className="w-full bg-[#052228] border border-[#07373F] rounded-3xl flex flex-col gap-4 !p-5">
            <p className="text-white font-semibold">Upload Profile Photo</p>
            <div className="w-full bg-black/20 rounded-3xl flex justify-center items-end">
              <Form.Item name={"profile_pic"}>
                <Dragger {...props} className="!border-none">
                  <div className=" border-4 border-[#24A0B5] rounded-xl bg-[#0E464F] flex flex-col gap-3 items-center text-white">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-48 h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-48 h-48 flex flex-col gap-3 items-center justify-center">
                        <IoMdCloudUpload size={26} />
                        <p className="text-center max-w-[160px] font-semibold">
                          Drag & drop or click to upload
                        </p>
                      </div>
                    )}
                  </div>
                </Dragger>
              </Form.Item>
            </div>
          </div>
          <div className="w-full rounded-2xl bg-[#07373F] !p-0.5"></div>
          <Form.Item
            layout="vertical"
            className="w-full !m-0"
            name={"name"}
            label={
              <span className="text-white font-semibold">Enter your name:</span>
            }
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input type="text" size="large" className="h-[50px]" />
          </Form.Item>
          <Form.Item
            layout="vertical"
            className="w-full !m-0"
            label={
              <span className="text-white font-semibold">Email address:</span>
            }
            name={"email"}
            rules={[
              { required: true, message: "Please input your email address!" },
            ]}
          >
            <Input
              type="email"
              size="large"
              className="h-[50px]"
              prefix={<MdMailOutline size={24} />}
            />
          </Form.Item>
          <Form.Item
            layout="vertical"
            className="w-full !m-0"
            label={
              <span className="text-white font-semibold">Special Request:</span>
            }
            name={"special-reuest"}
          >
            <TextArea showCount maxLength={100} />
          </Form.Item>
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10 text-white">
            <Button
              htmlType="button"
              className="w-full !bg-transparent border !border-[#197686] rounded-lg !p-3 cursor-pointer !text-[#24A0B5] hover:opacity-85 !h-[50px] font-semibold"
            >
              Back
            </Button>
            <Button
              htmlType="submit"
              loading={loading}
              className="w-full !bg-[#24A0B5] !text-white border !border-[#197686] rounded-lg !p-3 cursor-pointer hover:opacity-85 hover:!text-white !h-[50px] font-semibold"
            >
              Get my Ticket
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AttandeeDetails;
