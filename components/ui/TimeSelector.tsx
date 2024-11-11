import * as React from "react";
import { cn } from "@/lib/utils";

export interface TimeSelectorProps {

  name: string;
  value: { hour: string; minute: string };
  onChange: (value: { hour: string; minute: string }) => void;
  className?: string;
}

const TimeSelector = React.forwardRef<HTMLDivElement, TimeSelectorProps>(
  ({ name, value, onChange, className }, ref) => {
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const handleChange = (type: "hour" | "minute", newValue: string) => {
      onChange({
        ...value,
        [type]: newValue,
      });
    };

    return (
      <div ref={ref} className={cn("time-selector", className)}>
        <div className="flex gap-2">
          <select
            id={`${name}-hour`}
            name={`${name}-hour`}
            value={value.hour}
            onChange={(e) => handleChange("hour", e.target.value)}
            className="at-input"
          >
            <option value="">HH</option>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          :
          <select
            id={`${name}-minute`}
            name={`${name}-minute`}
            value={value.minute}
            onChange={(e) => handleChange("minute", e.target.value)}
            className="at-input"
          >
            <option value="">MM</option>
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
);

TimeSelector.displayName = "TimeSelector";

export { TimeSelector };
