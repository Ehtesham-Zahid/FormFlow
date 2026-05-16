import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const SubmissionsEmptyState = ({ icon, title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] space-y-4 text-center">
      <div className="text-gray-400 bg-gray-50 p-4 rounded-full">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );
};
