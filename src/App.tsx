import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Pyramid from "./components/Pyramid";
import "./index.css";
import Loading from "./components/Loading";

const sectionTitles = ["Amos", "Projects", "Work", "Vlogs", "Blog", "Socials"];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="h-full w-full bg-gray-800">
      <Loading />
      <Canvas shadows>
        <Suspense fallback={null}>
          <Pyramid
            sectionTitles={sectionTitles}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
