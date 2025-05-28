'use client';

interface DateDisplayProps {
  startDate: string;
  endDate: string;
}

export default function DateDisplay({ startDate, endDate }: DateDisplayProps) {
  return (
    <div className="flex justify-center items-center text-sm text-tertiary-light mb-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center flex-col">
          <div>{new Date(startDate).toDateString()}</div>
          <div>
            {new Date(startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <div>→</div>
        <div className="flex items-center justify-center flex-col">
          <div>{new Date(endDate).toDateString()}</div>
          <div>
            {new Date(endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}