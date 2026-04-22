"use client";

import { useEffect, useState } from "react";

const images = [
  "/slide1.jpg",
  "/slide2.jpg",
  "/slide3.jpg",
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="mt-4">
      <div className="relative overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-sm">
        <img
          src={images[index]}
          alt={`슬라이드 ${index + 1}`}
          className="h-[180px] w-full object-cover"
        />

        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-sm font-bold text-white hover:bg-black/65"
          type="button"
        >
          ◀
        </button>

        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-sm font-bold text-white hover:bg-black/65"
          type="button"
        >
          ▶
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              type="button"
              className={`h-2.5 w-2.5 rounded-full ${
                i === index ? "bg-white" : "bg-white/45"
              }`}
              aria-label={`슬라이드 ${i + 1}번으로 이동`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}