import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Import videos
import video1 from "../assets/vecteezy_ai-generated-green-natural-eco-friendly-tree-and-computer_42383337.mp4";
import video2 from "../assets/vecteezy_caucasian-woman-stand-on-rocky-deda-ena-viewpoint-carefree_11433636.mov";
import video3 from "../assets/vecteezy_man-sit-on-rock-thoughtful-look-at-atlantic-ocean-waves_25273639.mov";
import video4 from "../assets/vecteezy_silhouettes-of-birds-over-the-sunset_1625660.mov";
import video5 from "../assets/vecteezy_ai-generated-a-serene-picturesque-evening-scene-captured-as_42384247.mp4";

const videos = [video1, video2, video3, video4, video5];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleAllVehiclesClick = () => {
    navigate("/all-vehicles");
  };

  // Auto-slide every 8s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goNext = () => setCurrentVideo((prev) => (prev + 1) % videos.length);
  const goPrev = () =>
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white">
      {/* Video Slider */}
      <div
        className="absolute w-full h-full flex transition-transform duration-[1200ms] ease-in-out"
        style={{ transform: `translateX(-${currentVideo * 100}%)` }}
      >
        {videos.map((video, index) => (
          <video
            key={index}
            className="w-full h-full object-cover flex-shrink-0"
            autoPlay
            loop
            muted
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute w-full h-full bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full shadow-lg text-3xl md:text-4xl transition-all duration-300"
      >
        {"<"}
      </button>
      <button
        onClick={goNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full shadow-lg text-3xl md:text-4xl transition-all duration-300"
      >
        {">"}
      </button>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fadeInDown">
          Explore Our Vehicles
        </h1>
        <p className="mb-8 text-lg md:text-2xl animate-fadeInUp delay-200">
          Find your perfect ride today!
        </p>
        <button
          onClick={handleAllVehiclesClick}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg transition transform hover:scale-105 shadow-lg"
        >
          All Vehicles
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
