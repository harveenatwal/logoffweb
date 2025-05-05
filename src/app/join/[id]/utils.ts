import { Bytes } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

interface TimeComponents {
  second: number;
  minute: number;
  hour: number;
}

// Interface for the friction type
interface FrictionType {
  none?: unknown;
  delay?: unknown;
  breathe?: unknown;
  pushup?: unknown;
}

// Interface for friction
interface Friction {
  type: FrictionType;
}

// Interface for Location Type
interface LocationType {
  entering?: unknown;
}

// --- Main Session Interface ---
export interface Session {
  id: string;
  name: string;
  whenMinutesSpent: number[];
  type: Record<string, unknown>;
  mode: string;
  warning: TimeComponents;
  startTimeComponents: TimeComponents;
  sendHalfWayWarning: boolean;
  repeatsOn: boolean[];
  endTimeComponents: TimeComponents;
  createdAt: number;
  minutesSpent: number;
  maxOpens: number;
  stayOpenFor: TimeComponents;
  timeLimit: TimeComponents;
  cooldown: TimeComponents;
  friction: Friction;
  activitySelection: unknown;
  locationType: LocationType;
}

export interface Challenge {
  id: string;
  name: string;
  description: string | null;
  endDate: Timestamp;
  createdAt: Timestamp;
  sessionData: Bytes;
}

function formattedTimeLimit(timeLimit: TimeComponents): string {
  const { hour, minute } = timeLimit;

  if (hour === 0 && minute > 0) {
    return `${minute} minutes`;
  } else if (hour === 1 && minute === 0) {
    return "1 hour";
  } else if (hour === 1 && minute > 0) {
    return `1 hour and ${minute} minutes`;
  } else if (hour > 1 && minute === 0) {
    return `${hour} hours`;
  } else if (hour > 1 && minute > 0) {
    return `${hour} hours and ${minute} minutes`;
  } else {
    // Handle cases with missing or invalid time components as needed
    return "Invalid";
  }
}

const displayedDaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDays(repeatsOn: boolean[]): string {
  let result = "";
  let i = 0;

  while (i < repeatsOn.length) {
    if (repeatsOn[i]) {
      // Start of a range
      const startDay = displayedDaysOfWeek[i];
      let endDay = startDay;
      let j = i + 1;

      // Find the end of the consecutive range.
      while (j < repeatsOn.length && repeatsOn[j]) {
        endDay = displayedDaysOfWeek[j];
        j += 1;
      }

      // Add the range to the result.
      if (startDay === endDay) {
        result += `${startDay}, `;
      } else {
        result += `${startDay} - ${endDay}, `;
      }
      i = j; // Move index to the end of the current range.
    } else {
      i += 1;
    }
  }

  // Remove the trailing comma and space.
  if (result.length > 0) {
    result = result.slice(0, -2);
  }

  // Handle "Every day" or "No repeat".
  if (repeatsOn.every((day) => day)) {
    return "Every day";
  } else if (repeatsOn.every((day) => !day)) {
    return "No repeat";
  }

  return result;
}

function formatTimeFromComponents(timeComponents: TimeComponents): string {
  // Create a Date object using today's date but the specified time components.
  // The date part (year, month, day) is arbitrary but needed for the Date object.
  const now = new Date();
  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    timeComponents.hour,
    timeComponents.minute,
    timeComponents.second
  );

  // Default formatting options if none are provided: typically hour and minute
  // This usually corresponds to "short" time style in formatters.
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // e.g., '5' or '17' depending on locale/options
    minute: "2-digit", // e.g., '30', '05'
    // second: '2-digit' // Add this if you want seconds by default
  };

  // Use provided options or fall back to default options
  const effectiveOptions = defaultOptions;

  // Use toLocaleTimeString for locale-aware formatting
  // It internally uses Intl.DateTimeFormat
  return date.toLocaleTimeString("en-US", effectiveOptions);
}

function getDuration(
  startTimeComponents: TimeComponents,
  endTimeComponents: TimeComponents
): number {
  // Extract hour, minute, and second values, defaulting to 0 if undefined
  const startHours = startTimeComponents.hour ?? 0;
  const startMinutes = startTimeComponents.minute ?? 0;
  const startSeconds = startTimeComponents.second ?? 0;
  const endHours = endTimeComponents.hour ?? 0;
  const endMinutes = endTimeComponents.minute ?? 0;
  const endSeconds = endTimeComponents.second ?? 0;

  // Calculate the difference in hours and minutes, adjusting for next day if needed
  let hours = endHours - startHours;
  let minutes = endMinutes - startMinutes;
  let seconds = endSeconds - startSeconds;

  // Handle seconds underflow
  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }

  // Handle minute underflow
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }

  // Handle hour underflow (next day scenario)
  if (hours < 0) {
    hours += 24;
  }

  if (hours === 0 && minutes === 0 && seconds === 0) {
    hours = 24;
  }

  return hours * 3600 + minutes * 60 + seconds;
}

function getFormattedDuration(durationInSeconds: number): string {
  const hours = getDurationHours(durationInSeconds);
  const minutes = getDurationMinutes(durationInSeconds);
  return `${hours}h ${minutes}m`;
}

function getDurationHours(durationInSeconds: number): number {
  return Math.floor(durationInSeconds / 3600);
}

function getDurationMinutes(durationInSeconds: number): number {
  return Math.floor((durationInSeconds % 3600) / 60);
}

function formatAction(friction: Friction): string {
  if (friction.type.none) {
    return "None";
  }
  if (friction.type.delay) {
    return "Delay";
  }
  if (friction.type.breathe) {
    return "Meditate";
  }
  if (friction.type.pushup) {
    return "Push-ups";
  }
  return "None";
}

// --- Main Function ---

export function getSessionDetails(session: Session | null): {
  label: string;
  description: string;
} {
  if (session?.type["timer"]) {
    return {
      label: "Blocks immediately",
      description: "Jump straight into a distraction-free zone",
    };
  }

  if (session?.type["schedule"]) {
    return {
      label: "Blocks on a schedule",
      description:
        "Block distractions during specific, pre-planned times and days.",
    };
  }

  if (session?.type["appLimit"]) {
    return {
      label: "App Time Limit",
      description:
        "Automatically block specific apps after you've used them for a chosen amount of time each day",
    };
  }

  if (session?.type["challenge"]) {
    return {
      label: "Action",
      description:
        "Once the time limit is reached, complete an action before apps can be used again.",
    };
  }

  if (session?.type["appLock"]) {
    return {
      label: "Open Limit",
      description:
        "Block access to selected apps or websites after you've opened them a specific number of times within a set period",
    };
  }

  if (session?.type["cooldown"]) {
    return {
      label: "Cooldown",
      description:
        'Cycle between periods of allowed app/website usage and mandatory "cooldown" breaks where distractions are blocked.',
    };
  }

  if (session?.type["adult"]) {
    return {
      label: "Adult Block",
      description: "Stay focused with automatic blocking of all adult content.",
    };
  }

  return {
    label: "Unknown",
    description: "",
  };
}

/**
 * Generates a map of human-readable rules from a Session object.
 * Keys are based on the example markup labels.
 */
export function getChallengeRules(
  challenge: Challenge,
  session: Session | null
): Map<string, string> {
  const rules = new Map<string, string>();
  if (!session) {
    return rules;
  }

  const startDate = challenge.createdAt.toDate().toDateString();
  const endDate = challenge.endDate.toDate().toDateString();

  // Rule: Action
  // const actionStr = formatAction(session.friction);
  // const maxOpens = session.maxOpens.toString()

  if (session.type["timer"]) {
    rules.set("Type", "Focus now");
    rules.set("Starts on", startDate);
    rules.set("Ends on", endDate);
    rules.set(
      "Duration",
      getFormattedDuration(
        getDuration(session.startTimeComponents, session.endTimeComponents)
      )
    );
    rules.set(
      "Start time",
      formatTimeFromComponents(session.startTimeComponents)
    );
    rules.set("End time", formatTimeFromComponents(session.endTimeComponents));
  }

  if (session.type["schedule"]) {
    rules.set("Type", "Schedule");
    rules.set("Starts on", startDate);
    rules.set("Ends on", endDate);
    rules.set(
      "Start time",
      formatTimeFromComponents(session.startTimeComponents)
    );
    rules.set("End time", formatTimeFromComponents(session.endTimeComponents));
    rules.set("Days active", formatDays(session.repeatsOn));
  }

  if (session.type["appLimit"]) {
    rules.set("Type", "App Time Limit");
    rules.set("Starts on", startDate);
    rules.set("Ends on", endDate);
    rules.set("Time limit", formattedTimeLimit(session.timeLimit));
    rules.set("Days active", formatDays(session.repeatsOn));
  }

  if (session.type["challenge"]) {
    rules.set("Type", "Action");
    rules.set("Starts on", startDate);
    rules.set("Ends on", endDate);
    rules.set("Time limit", formattedTimeLimit(session.timeLimit));
    rules.set("Action", formatAction(session.friction));
    rules.set("Days active", formatDays(session.repeatsOn));
  }

  if (session.type["appLock"]) {
    rules.set("Type", "App Open Limit");
    rules.set("Starts on", startDate);
    rules.set("Ends on", endDate);
    rules.set("Max opens", session.maxOpens.toString());
    rules.set("Stay open for", formattedTimeLimit(session.stayOpenFor));
    rules.set("Days active", formatDays(session.repeatsOn));
  }

  if (session.type["cooldown"]) {
    rules.set("Type", "Cooldown");
    rules.set("Starts on", startDate);
    rules.set("Ends on", endDate);
    rules.set("Time limit", formattedTimeLimit(session.timeLimit));
    rules.set("Cooldown", formattedTimeLimit(session.cooldown));
    rules.set("Days active", formatDays(session.repeatsOn));
  }

  if (session.type["adult"]) {
    rules.set("Type", "Adult Block");
    rules.set("Starts on", startDate);
    rules.set("Ends on", endDate);
  }

  return rules;
}

/**
 * Decodes the Firebase Bytes object containing session data into a Session object.
 * Assumes the Bytes object contains a UTF-8 encoded JSON string.
 *
 * @param sessionData - The Firebase Bytes object to decode.
 * @returns The parsed Session object, or null if decoding fails.
 */
export function decodeSessionData(sessionData: Bytes): Session | null {
  try {
    // 1. Convert Firebase Bytes to a Uint8Array
    const uint8Array = sessionData.toUint8Array();

    // 2. Decode the Uint8Array into a UTF-8 string
    // TextDecoder is standard in modern browsers and Node.js (v11+)
    const jsonString = new TextDecoder().decode(uint8Array);

    // 3. Parse the JSON string into a JavaScript object
    const parsedData = JSON.parse(jsonString);

    // 4. Return the parsed data, casting it to the Session interface.
    //    Note: This is a type assertion. For robustness, you might add
    //    runtime validation to ensure parsedData actually matches the Session structure.
    return parsedData as Session;
  } catch (error) {
    console.error("Failed to decode sessionData:", error);
    console.error(
      "Original Bytes data (might be truncated):",
      sessionData.toString().substring(0, 200)
    ); // Log part of the raw data for debugging
    return null; // Return null or throw the error, depending on desired behavior
  }
}
