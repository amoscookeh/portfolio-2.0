import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function Loading() {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 500); // Slight delay before hiding
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="mb-4 text-xl font-light text-white">
        Loading your experience...
      </div>

      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 text-sm text-gray-400">
        ({Math.round(progress)}% completed)
      </div>
    </div>
  );
}
