import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const MagneticButton = ({
  children,
  as: Component = "button",
  strength = 0.3,
  className = "",
  style = {},
  ...props
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <motion.div
      ref={ref}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      style={{ display: "inline-block", width: "100%" }}
    >
      <Component className={className} style={style} {...props}>
        {children}
      </Component>
    </motion.div>
  );
};

export default MagneticButton;
