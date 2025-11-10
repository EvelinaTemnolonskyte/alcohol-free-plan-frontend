import ProgressBar from "./ProgressBar";
import Image from "next/image";

interface SummaryProps {
    icon? : string;
    characteristic: string;
    value: number;
    isPositive: boolean;
}

export default function SummaryCard ({icon, characteristic, value, isPositive}: SummaryProps) {

  let range: "low" | "medium" | "high" | "veryHigh";
  if (value >= 74) range = "veryHigh";
  else if (value >= 55) range = "high";
  else if (value >= 24) range = "medium";
  else range = "low";

  let badgeText = "";
  let color = "";

  switch (isPositive) {
    case true:
      switch (range) {
        case "veryHigh":
        case "high":
          badgeText = range === "veryHigh" ? "VERY STRONG" : "STRONG";
          color = "bg-[#289F67]"; 
          break;
        case "medium":
          badgeText = "MODERATELY HIGH";
          color = "bg-[#FFC633]";
          break;
        case "low":
          badgeText = "LOW";
          color = "bg-[#E35244]";
          break;
      }
      break;

    case false:
      switch (range) {
        case "veryHigh":
        case "high":
          badgeText = range === "veryHigh" ? "TOO HIGH" : "MODERATELY HIGH";
          color = "bg-[#E35244]";
          break;
        case "medium":
          badgeText = "MODERATELY HIGH";
          color = "bg-[#FFC633]";
          break;
        case "low":
          badgeText = "LOW";
          color = "bg-[#289F67]"; 
          break;
      }
      break;
  }
  
  return (
    <div className="flex items-center gap-4 rounded-lg border p-2 border-[#767AF9] mb-4 font-semibold w-full max-w-xl">
      <div className="flex-none">
        {icon && <Image src={icon} alt={characteristic} width={40} height={40} />}
      </div>
      <div className="flex flex-1 items-start flex-col min-w-0">
        <span className={`${color} text-white truncate text-[0.625rem] rounded text-center px-[4px] py-[2px] inline-block`}>{badgeText}</span>
        <span className="truncate text-base"><b>{characteristic}</b></span>
      </div>
      <div className="flex items-center ml-8 gap-2 flex-shrink-0">
        <ProgressBar currentNumber={value} max={100} progressColor={color} width="w-20"/>
        <span className="text-sm">{value}% </span>
      </div>
    </div>
  )

}