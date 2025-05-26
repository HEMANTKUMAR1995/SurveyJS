import React from "react";

const CustomTextInput = ({ value, onChange, question }) => {
    const inputType = question.inputType || "text";
    return (
    <div>
      {question.title && (
        <label style={{ display: "block", marginBottom: 4 }}>
          {question.title}
        </label>
      )}
      <input
       type={inputType}
         placeholder={inputType === "number" ? "Enter your age" : "Enter your text"}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: "8px", width: "100%" }}
      />
    </div>
  );
};

export default CustomTextInput;