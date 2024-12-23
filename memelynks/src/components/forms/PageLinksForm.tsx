"use client";

// import { savePageLinks } from "@/actions/pageActions";
// import { upload } from "@/libs/upload";
import { FaSave, FaLink } from "react-icons/fa";
import { FaCloudArrowUp, FaGripLines, FaPlus, FaTrash } from "react-icons/fa6";
import Image from "next/image";
import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import SectionBox from "../../layout/SectionBox";
import SubmitButton from "../SubmitButton";
import { uploadToCloudinary } from "@/lib/upload";
import { savePageLinks } from "@/actions/pageAction";

export type Link = {
  id: string;
  key: string;
  title: string;
  subtitle: string;
  icon: string;
  url: string;
};

interface PageLinksFormProps {
  page: { links: Link[] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any; // Replace with a specific user type if available
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PageLinksForm({ page, user }: PageLinksFormProps) {
  const [links, setLinks] = useState<Link[]>(page.links || []);

  async function save() {
    // Directly use the links array for saving
    const success = await savePageLinks(links);

    if (success) {
      toast.success("Links saved successfully!");
    } else {
      toast.error("Failed to save links.");
    }
  }

  function addNewLink() {
    setLinks((prev) => [
      ...prev,
      {
        key: Date.now().toString(),
        title: "",
        subtitle: "",
        icon: "",
        url: "",
        id: Date.now().toString(),
      },
    ]);
  }

  function handleUpload(
    ev: ChangeEvent<HTMLInputElement>,
    linkKeyForUpload: string
  ): void {
    const file = ev.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Uploading image...");

    uploadToCloudinary(file)
      .then((uploadedImageUrl) => {
        // Update the state with the uploaded image URL
        setLinks((prevLinks) =>
          prevLinks.map((link) =>
            link.key === linkKeyForUpload
              ? { ...link, icon: uploadedImageUrl }
              : link
          )
        );

        // Show success toast
        toast.success("Image uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Show error toast
        toast.error(
          error instanceof Error ? error.message : "Failed to upload image."
        );
      })
      .finally(() => {
        // Dismiss loading toast
        toast.dismiss(loadingToast);
      });
  }

  function handleLinkChange(
    keyOfLinkToChange: string,
    prop: keyof Link,
    ev: ChangeEvent<HTMLInputElement>
  ) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return newLinks;
    });
  }

  function removeLink(linkKeyToRemove: string) {
    setLinks((prevLinks) =>
      [...prevLinks].filter((link) => link.key !== linkKeyToRemove)
    );
  }

  return (
    <SectionBox>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer"
        >
          <FaPlus className="bg-blue-500 text-white p-1 rounded-full aspect-square" />
          <span>Add new</span>
        </button>
        <div>
          <ReactSortable<Link>
            handle={".handle"}
            list={links}
            setList={setLinks}
          >
            {links.map((link) => (
              <div key={link.key} className="mt-8 md:flex gap-6 items-center">
                <div className="handle">
                  <FaGripLines className="text-gray-500 mr-2 cursor-ns-resize" />
                </div>
                <div className="text-center">
                  <div className="bg-gray-300 inline-block relative aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center">
                    {link.icon ? (
                      <Image
                        className="w-full h-full object-cover"
                        src={link.icon}
                        alt="icon"
                        width={64}
                        height={64}
                      />
                    ) : (
                      <FaLink />
                    )}
                  </div>
                  <div>
                    <input
                      onChange={(ev) => handleUpload(ev, link.key)}
                      id={"icon" + link.key}
                      type="file"
                      className="hidden"
                    />
                    <label
                      htmlFor={"icon" + link.key}
                      className="border mt-2 p-2 flex items-center gap-1 text-gray-600 cursor-pointer mb-2 justify-center"
                    >
                      <FaCloudArrowUp />
                      <span>Change icon</span>
                    </label>
                    <button
                      onClick={() => removeLink(link.key)}
                      type="button"
                      className="w-full bg-gray-300 py-2 px-3 mb-2 h-full flex gap-2 items-center justify-center"
                    >
                      <FaTrash />
                      <span>Remove this link</span>
                    </button>
                  </div>
                </div>
                <div className="grow">
                  <label className="input-label">Title:</label>
                  <input
                    value={link.title}
                    onChange={(ev) => handleLinkChange(link.key, "title", ev)}
                    type="text"
                    placeholder="title"
                  />
                  <label className="input-label">Subtitle:</label>
                  <input
                    value={link.subtitle}
                    onChange={(ev) =>
                      handleLinkChange(link.key, "subtitle", ev)
                    }
                    type="text"
                    placeholder="subtitle (optional)"
                  />
                  <label className="input-label">URL:</label>
                  <input
                    value={link.url}
                    onChange={(ev) => handleLinkChange(link.key, "url", ev)}
                    type="text"
                    placeholder="url"
                  />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="border-t pt-4 mt-4">
          <SubmitButton className="max-w-xs mx-auto">
            <FaSave />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
