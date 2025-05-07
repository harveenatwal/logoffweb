import { Tables } from "@/lib/supabase/database.types";

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
  challenge: Tables<"challenges">,
  session: Session | null
): Map<string, string> {
  const rules = new Map<string, string>();
  if (!session) {
    return rules;
  }

  const startDate = new Date(challenge.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
  const endDate = new Date(challenge.end_date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

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

export function decodeSessionData(
  sessionDataHexString: string | null
): Session | null {
  if (!sessionDataHexString || typeof sessionDataHexString !== "string") {
    console.error(
      "Invalid sessionDataHexString: input is null or not a string"
    );
    return null;
  }

  try {
    // 1. Hex String to Uint8Array (binary data)
    let hex = sessionDataHexString;
    if (hex.startsWith("\\x")) {
      hex = hex.substring(2);
    } else if (hex.startsWith("0x")) {
      hex = hex.substring(2);
    }

    if (hex.length % 2 !== 0) {
      console.error("Invalid hex string: odd length after removing prefix.");
      return null;
    }

    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      const byte = parseInt(hex.substring(i, i + 2), 16);
      if (isNaN(byte)) {
        console.error(
          "Invalid hex character encountered:",
          hex.substring(i, i + 2)
        );
        return null;
      }
      bytes[i / 2] = byte;
    }

    // 2. Uint8Array (binary data) to a string.
    // This string is now expected to be a Base64 encoded representation of the actual JSON.
    const base64EncodedJsonString = new TextDecoder().decode(bytes);

    // 3. Base64 decode this string to get the actual JSON string.
    // `atob()` is used for Base64 decoding in browsers and Node.js (>= v16.0.0).
    // For older Node.js versions, you might need `Buffer.from(base64EncodedJsonString, 'base64').toString('utf8')`.
    let actualJsonString: string;
    if (typeof atob === "function") {
      actualJsonString = atob(base64EncodedJsonString);
    } else if (typeof Buffer === "function") {
      // For Node.js environments
      actualJsonString = Buffer.from(
        base64EncodedJsonString,
        "base64"
      ).toString("utf8");
    } else {
      console.error(
        "Base64 decoding (atob) not available in this environment."
      );
      return null;
    }

    // 4. JSON String to TypeScript Object
    const sessionObject = JSON.parse(actualJsonString);

    // 5. Type assertion/validation (basic)
    return sessionObject as Session;
  } catch (error) {
    console.error("Error decoding session data:", error);
    if (error instanceof SyntaxError) {
      // This error would now likely occur if actualJsonString is still not valid JSON
      console.error(
        "Failed to parse JSON string. Original string (after Base64 decode) might be corrupted or not JSON."
      );
    } else if (
      typeof DOMException !== "undefined" &&
      error instanceof DOMException &&
      (error.name === "InvalidCharacterError" ||
        error.message.includes(" небезопасный символ"))
    ) {
      // Error from atob() if the string is not valid Base64
      console.error("The decoded hex string was not valid Base64");
    }
    return null;
  }
}
