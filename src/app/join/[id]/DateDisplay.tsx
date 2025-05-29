"use client";

interface DateDisplayProps {
  startDate: string;
  endDate: string;
}

export default function DateDisplay({ startDate, endDate }: DateDisplayProps) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="flex justify-center items-center text-sm text-tertiary-light mb-4">
      <div className="flex flex-col items-center space-y-2">
        <div className="text-md">
          {diffDays} {diffDays === 1 ? "day" : "day"} challenge
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center flex-col">
            <div>{start.toDateString()}</div>
            <div>
              {start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div>→</div>
          <div className="flex items-center justify-center flex-col">
            <div>{end.toDateString()}</div>
            <div>
              {end.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
