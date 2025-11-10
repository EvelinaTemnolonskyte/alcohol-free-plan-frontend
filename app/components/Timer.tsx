interface TimerProps {
  timeLeft: number;
  label?: string;
}

export default function Timer({ timeLeft, label = "Reserved price for:" }: TimerProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="font-semibold text-lg">
      <p className="text-lg">
        {label}{" "}
        <span className="text-[#5349DB] text-2xl">{formatTime(timeLeft)}</span>
      </p>
    </div>
  );
}
