interface StepIndicatorProps {
  current: number;
  total: number;
}

export default function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div className="font-medium text-base">
      <b>{current}/</b>{total}
    </div>
  );
}
