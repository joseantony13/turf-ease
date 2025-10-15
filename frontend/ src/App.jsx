import { useState } from "react";
import axios from "axios";

const turfs = ["TURF-1", "TURF-2", "TURF-3"];
const slots = ["6 AM - 8 AM", "8 AM - 10 AM", "10 AM - 12 PM", "4 PM - 6 PM", "6 PM - 8 PM"];

export default function App() {
  const [selectedTurf, setSelectedTurf] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    try {
      const res = await axios.post("http://backend-service:8000/book", {
        turf: selectedTurf,
        slot: selectedSlot,
      });
      setMessage(res.data.message);
    } catch {
      setMessage("Booking failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">TurfEase 🏏</h1>
      <div className="p-6 bg-white rounded-xl shadow-md">
        <select onChange={(e) => setSelectedTurf(e.target.value)} className="border p-2 m-2 rounded">
          <option value="">Select Turf</option>
          {turfs.map((turf) => (
            <option key={turf}>{turf}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedSlot(e.target.value)} className="border p-2 m-2 rounded">
          <option value="">Select Time Slot</option>
          {slots.map((slot) => (
            <option key={slot}>{slot}</option>
          ))}
        </select>

        <button onClick={handleBooking} className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Book Now
        </button>

        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
}
