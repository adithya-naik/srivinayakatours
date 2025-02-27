// components/IconWithHover.js
import React from "react";

const IconWithHover = ({ icon, name, size = 24, className = "", withRipple = false, hoveredIcon, setHoveredIcon }) => {
  const isHovered = hoveredIcon === name;
  
  return (
    <div 
      className={`transition-all duration-500 transform ${isHovered ? 'scale-125 rotate-3' : ''} ${className} relative`}
      onMouseEnter={() => setHoveredIcon(name)}
      onMouseLeave={() => setHoveredIcon(null)}
    >
      {React.cloneElement(icon, { size: size })}
      {withRipple && isHovered && (
        <span className="absolute inset-0 bg-white bg-opacity-30 rounded-full animate-ping"></span>
      )}
    </div>
  );
};

export default IconWithHover;