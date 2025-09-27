import { useEffect, useState } from "react";
import "./Preloader.css"; // Import CSS for animation

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⏳ Hide preloader after 2.5 seconds
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null; // Don't render when finished

  return (
    <div className="preloader">
      <img src="https://i.ibb.co/9mbthcCv/Colorful-Modern-Stream-C-Free-Logo-20250927-040047-0000.png" alt="Logo" className="logo" />
    </div>
  );
};

export default Preloader;
