// src/components/ReportForm.jsx

import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function ReportForm() {
  const { addReport, currentUser } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("overflowing_bin");
  const [priority, setPriority] = useState("medium");
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReport = {
      title,
      description,
      location: { address },
      type,
      priority,
      images,
    };

    addReport(newReport);

    // reset form
    setTitle("");
    setDescription("");
    setAddress("");
    setType("overflowing_bin");
    setPriority("medium");
    setImages([]);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Report an Issue</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Location/Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      >
        <option value="overflowing_bin">Overflowing Bin</option>
        <option value="dirty_toilet">Dirty Toilet</option>
        <option value="illegal_dumping">Illegal Dumping</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="file"
        multiple
        onChange={handleImageUpload}
        className="mb-2"
      />

      {images.length > 0 && (
        <div className="flex gap-2 mb-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="preview"
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Report
      </button>
    </form>
  );
}

export default ReportForm;
