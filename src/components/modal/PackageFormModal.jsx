import React, { useRef, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { Upload, Image } from "lucide-react";

const PackageFormModal = ({ id, onSave }) => {
  const [data, setData] = useState({
    image: null,
    gallery: [],
    name: "",
    difficulty: "",
    size: "",
    duration: "",
    overview: "",
    highlights: "",
    itinerary: "",
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const GALLERY_LIMIT = 6;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFile = (e) => {
    setData((prev) => ({ ...prev, image: e.target.files[0] }));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleGalleryFiles = (e) => {
    const files = Array.from(e.target.files);

    setData((prev) => {
      const remainingSlots = GALLERY_LIMIT - prev.gallery.length;
      if (remainingSlots <= 0) return prev;

      return {
        ...prev,
        gallery: [...prev.gallery, ...files.slice(0, remainingSlots)],
      };
    });

    e.target.value = null;
  };

  const removeGalleryImage = (index) => {
    setData((prev) => {
      const newGallery = [...prev.gallery];
      newGallery.splice(index, 1);
      return { ...prev, gallery: newGallery };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(data).forEach((key) => {
      if (key !== "gallery" && !data[key]) newErrors[key] = "Required";
    });

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    onSave(data);
    document.getElementById(id).close();

    setData({
      image: null,
      gallery: [],
      name: "",
      difficulty: "",
      size: "",
      duration: "",
      overview: "",
      highlights: "",
      itinerary: "",
    });

    setErrors({});
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-full max-w-4xl mx-auto bg-base-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h3 className="text-lg font-semibold">Add New Package</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Featured Image */}
          <div>
            <label className="label font-medium">Featured Image Upload</label>
            <label
              className={`h-30 sm:h-20 md:h-30 border border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-base-200
              ${errors.image ? "border-error" : ""}`}
            >
              {data.image ? (
                <img
                  src={URL.createObjectURL(data.image)}
                  alt="featured"
                  className="h-full w-full object-contain rounded-lg"
                />
              ) : (
                <span className="text-sm text-gray-400 text-center">
                  Drag & drop box
                  <br />
                  or click to upload
                </span>
              )}
              <input type="file" className="hidden" onChange={handleFile} />
            </label>
            {errors.image && (
              <p className="text-error text-xs mt-1">Required</p>
            )}
          </div>

          {/* Package Name & Difficulty */}
          <div>
            <div className="mb-4">
              <label className="label font-medium">Package Name</label>
              <input
                name="name"
                value={data.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="label font-medium">Difficulty</label>
                <select
                  name="difficulty"
                  value={data.difficulty}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select</option>
                  <option>Easy</option>
                  <option>Moderate</option>
                  <option>Challenging</option>
                </select>
              </div>

              <div>
                <label className="label font-medium">Max Group Size</label>
                <input
                  type="number"
                  min="1"
                  name="size"
                  value={data.size}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>

          {/* Duration & Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="label font-medium">Duration</label>
              <input
                name="duration"
                value={data.duration}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-medium">Tour Overview</label>
              <textarea
                name="overview"
                value={data.overview}
                onChange={handleChange}
                className="textarea textarea-bordered w-full min-h-24"
              />
            </div>
          </div>

          {/* Highlights */}
          <div>
            <label className="label font-medium">Highlights</label>
            <textarea
              name="highlights"
              value={data.highlights}
              onChange={handleChange}
              className="textarea textarea-bordered w-full min-h-24"
              placeholder="• Highlight 1"
            />
          </div>

          {/* Itinerary */}
          <div className="md:col-span-2">
            <label className="label font-medium">Detailed Itinerary</label>
            <RichTextEditor
              value={data.itinerary}
              onChange={(html) =>
                setData((prev) => ({ ...prev, itinerary: html }))
              }
              error={errors.itinerary}
            />
          </div>

          {/* Gallery */}
          <div className="md:col-span-2">
            <label className="label font-medium">Gallery</label>

            <div className="flex flex-col sm:flex-row gap-4">
              <div
                className={`bg-base-100 p-6 rounded-lg border border-dashed 
                ${
                  data.gallery.length >= GALLERY_LIMIT
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  if (data.gallery.length < GALLERY_LIMIT) handleClick();
                }}
              >
                <Upload size={32} />
              </div>

              <input
                type="file"
                multiple
                onChange={handleGalleryFiles}
                className="hidden"
                ref={fileInputRef}
              />

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {[...Array(GALLERY_LIMIT)].map((_, index) => {
                  const file = data.gallery[index];
                  return (
                    <div
                      key={index}
                      className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 bg-base-100 rounded-lg border border-dashed"
                    >
                      {file ? (
                        <>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`gallery-${index}`}
                            className="h-full w-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                            onClick={() => removeGalleryImage(index)}
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <Image size={24} className="text-gray-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => document.getElementById(id).close()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Package
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default PackageFormModal;
