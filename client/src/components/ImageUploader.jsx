"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";

const ImageUploader = ({ image, onUploadSuccess, onUploadError }) => {
  return (
    <div>
      <label className="block mb-1 font-medium">Event Image</label>
      <div className="mb-2">
        <CldUploadWidget
          uploadPreset="Furrever"
          onSuccess={onUploadSuccess}
          onError={onUploadError}
          options={{
            sources: ["local", "url", "camera"],
            multiple: false,
            maxFiles: 1,
          }}>
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              {image ? "Change Image" : "Upload Image"}
            </button>
          )}
        </CldUploadWidget>
      </div>

      {image && (
        <div className="mt-2">
          <img
            src={image}
            alt="Event preview"
            className="h-40 object-contain border rounded p-1"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
