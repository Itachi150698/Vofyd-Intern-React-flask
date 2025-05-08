import React from "react";

const ButtonComponent = ({ label, onClick, className = "", variant = "btnGray", icon, iconPosition = "left" }) => {
  // Define variant classes
  const variantClasses = {
    btnGray: "btn btn-theme btn-gray text-white",
    btnBlue: "btn btn-theme btn-blue text-white",
    btnDark: "btn btn-theme btn-dark text-white",
  };

  return (
    <button
  className={`p-0 d-flex align-items-center px-3 gap-2 ${variantClasses[variant] || variantClasses.btnGray} ${className}`}
  onClick={onClick}
>
  {/* Render icon based on type and position */}
  {icon && iconPosition === "left" && (
    typeof icon === "string" ? <span className={icon}></span> : icon
  )}
  
  {label}
  
  {icon && iconPosition === "right" && (
    typeof icon === "string" ? <span className={icon}></span> : icon
  )}
</button>
  );
};

export default ButtonComponent;


{/* <ButtonComponent 
      variant="btnGray" 
      label="Save and Close" 
      icon="feathers fea-add-icon fea-15" 
      iconPosition="left" 
      iconPosition="right" 
    /> */}