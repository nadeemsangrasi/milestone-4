import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({ label }: { label: string }): JSX.Element => {
  return (
    <div className="flex items-center gap-2 mt-8">
      <h1>
        <Loader2 size={32} strokeWidth={3} absoluteStrokeWidth />
      </h1>
      <span className="text-xl font-semibold ">{label}</span>
    </div>
  );
};

export default Loader;
