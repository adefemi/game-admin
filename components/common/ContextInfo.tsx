import React from "react";

const ContextInfo = ({
  title,
  value,
  isLast = false,
  customValue,
  spacer = "mb-4",
}: {
  title: string;
  value: string;
  customValue?: React.ReactNode;
  isLast?: boolean;
  spacer?: string;
}) => (
  <div className={`flex ${!isLast && spacer}`}>
    <div className="text-sm text-gray-500 w-28">{title}:</div>
    {customValue ? (
      customValue
    ) : (
      <div className="text-sm text-gray-800">{value}</div>
    )}
  </div>
);

export default ContextInfo;
