// CarouselScene.jsx — Three.js scene containing all certificate planes in a circular carousel
import CertificatePlane from "./CertificatePlane";
import { CERTIFICATIONS } from "../../../constants/certifications";

const CarouselScene = ({ rotationY, activeIndex, radius }) => {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[0, 3, 4]} intensity={1.2} />
      {CERTIFICATIONS.map((cert, index) => (
        <CertificatePlane
          key={cert.title}
          cert={cert}
          index={index}
          total={CERTIFICATIONS.length}
          rotationY={rotationY}
          activeIndex={activeIndex}
          radius={radius}
        />
      ))}
    </>
  );
};

export default CarouselScene;
