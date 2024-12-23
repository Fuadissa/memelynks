"use client";

import { FaCloudArrowUp, FaImage } from "react-icons/fa6";
import { FaSave, FaPalette } from "react-icons/fa";
import Image from "next/image";
import { useState, ChangeEvent, useRef } from "react";
import toast from "react-hot-toast";
import RadioTogglers from "@/components/radioTogglers";
import SectionBox from "../../layout/SectionBox";
import SubmitButton from "../SubmitButton";
import { savePageSettings } from "@/actions/pageAction";
import { uploadToCloudinary } from "@/lib/upload";
import EmbeddedTwitterPost from "@/components/EmbeddedTwitterPost";

interface PageSettingsFormProps {
  page: {
    bgType: string;
    bgColor: string;
    bgImage: string;
    memeName: string;
    embedded: string;
    memeMoment: string;
    memeColor: string;
  };
  user?: {
    image?: string;
  };
}

export default function PageSettingsForm({
  page,
  user,
}: PageSettingsFormProps) {
  const [formData, setFormData] = useState({
    bgType: page.bgType,
    bgColor: page.bgColor,
    bgImage: page.bgImage,
    avatar: user?.image || "",
    memeName: page.memeName,
    embedded: page.embedded,
    memeMoment: page.memeMoment,
    memeColor: page.memeColor,
  });

  // Update form data dynamically
  const updateFormData = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    console.log(key, value);
  };

  // Handle image upload (common for both cover and avatar)
  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    key: "bgImage" | "avatar"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    const loadingToast = toast.loading("Uploading image...");

    try {
      const uploadedImageUrl = await uploadToCloudinary(file);
      updateFormData(key, uploadedImageUrl);

      toast.success(
        `${
          key === "bgImage" ? "Background" : "Avatar"
        } image uploaded successfully!`
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image."
      );
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await savePageSettings(formData);
      if (result) {
        toast.success("Settings saved!");
      }
    } catch (error) {
      console.log("Error saving settings:", error);
      toast.error("Failed to save settings.");
    }
  };

  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click(); // Trigger the color picker
    }
  };

  return (
    <div>
      <SectionBox>
        <form onSubmit={handleSubmit}>
          {/* Background Section */}
          <div
            className="py-4 lg:-m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center rounded-md"
            style={
              formData.bgType === "color"
                ? { backgroundColor: formData.bgColor }
                : { backgroundImage: `url(${formData.bgImage})` }
            }
          >
            <div>
              <RadioTogglers
                defaultValue={formData.bgType}
                options={[
                  { value: "color", icon: FaPalette, label: "Color" },
                  { value: "image", icon: FaImage, label: "Image" },
                ]}
                onChange={(val) => updateFormData("bgType", val)}
              />

              {formData.bgType === "color" && (
                <div className="bg-[#ffce7b] rounded-lg shadow text-gray-700 p-2 mt-2">
                  <div className="flex gap-2 justify-center">
                    <span>Background color:</span>
                    <input
                      type="color"
                      value={formData.bgColor}
                      onChange={(e) =>
                        updateFormData("bgColor", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}

              {formData.bgType === "image" && (
                <div className="flex justify-center">
                  <label className="bg-[#ffce7b] shadow px-4 py-2 mt-2 flex gap-2 rounded-md">
                    <input
                      type="file"
                      onChange={(e) => handleImageUpload(e, "bgImage")}
                      className="hidden"
                    />
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FaCloudArrowUp className="text-gray-700" />
                      <span>Change image</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Avatar Section */}
          <div className="flex justify-center -mb-12">
            <div className="relative -top-11 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                <Image
                  className="w-full h-full object-cover"
                  src={formData.avatar || ""}
                  alt="avatar"
                  width={128}
                  height={128}
                />
              </div>
              <label
                htmlFor="avatarIn"
                className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer"
              >
                <FaCloudArrowUp className="text-xl" />
              </label>
              <input
                onChange={(e) => handleImageUpload(e, "avatar")}
                id="avatarIn"
                type="file"
                className="hidden"
              />
            </div>
          </div>

          {/* Other Form Fields */}
          <div className="p-0">
            <label className="input-label" htmlFor="nameIn">
              Meme Name
            </label>
            <input
              type="text"
              id="nameIn"
              value={formData.memeName}
              onChange={(e) => updateFormData("memeName", e.target.value)}
              placeholder="Department of government efficiency (DOGE)"
            />

            <label className="input-label" htmlFor="nameIn">
              Meme Colour
            </label>
            <div
              style={{
                display: "flex",
              }}
              className="meme-colour justify-between items-center"
            >
              {/* Color Preview Div */}
              <div
                onClick={handleDivClick}
                style={{
                  backgroundColor: `${formData.memeColor || "black"}`,
                  cursor: "pointer",
                }}
                className="w-[80%] h-[2rem] rounded-md"
              ></div>

              {/* Hidden Color Picker Input */}
              <input
                type="color"
                id="memeColorIn"
                ref={colorInputRef} // Attach the ref to the input
                value={formData.memeColor}
                onChange={(e) => updateFormData("memeColor", e.target.value)}
                className="" // Hide the input element
              />
            </div>

            <label className="input-label" htmlFor="bioIn">
              Meme Moment
            </label>
            <textarea
              id="bioIn"
              value={formData.memeMoment}
              onChange={(e) => updateFormData("memeMoment", e.target.value)}
              placeholder="Information about how the meme started..."
            />

            <label className="input-label" htmlFor="locationIn">
              Embed Meme Moment
            </label>
            <input
              type="text"
              id="locationIn"
              value={formData.embedded}
              onChange={(e) => updateFormData("embedded", e.target.value)}
              placeholder="Copy and paste X (Twitter) post url of how the meme started..."
            />

            <EmbeddedTwitterPost tweetUrl={formData.embedded} theme="light" />

            <div className="max-w-[200px] mx-auto">
              <SubmitButton>
                <FaSave />
                <span>Save</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
}
