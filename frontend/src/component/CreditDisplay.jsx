import { CreditCard } from "lucide-react";
import React from "react";

function CreditDisplay({ credits }) {
  return (
    <div className="flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full text-blue-700 border border-blue-100 shadow-sm">
      
      <CreditCard size={18} className="text-blue-600" />
      
      <span className="font-semibold text-sm">
        {credits}
      </span>
      
      <span className="text-xs text-blue-600">
        Credits
      </span>

    </div>
  );
}

export default CreditDisplay;