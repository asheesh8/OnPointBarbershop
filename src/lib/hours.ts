import { dayNames, dayOrder, type DayKey, type Location } from './site';

const SHOP_TZ = 'America/New_York';

export type OpenState = {
  isOpen: boolean;
  /** "Open until 5:00 PM" / "Opens Thursday at 9:00 AM" */
  label: string;
  /** Short form for tight chips: "Until 5:00 PM" / "Thu 9:00 AM" */
  short: string;
};

const fmtTime = (minutes: number) => {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
};

/**
 * "Now" as the *shop* experiences it. A visitor in Denver still needs to be
 * told whether the chair in Williston is open, so the visitor's own clock is
 * deliberately not used.
 */
export function shopNow(date = new Date()): { day: DayKey; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SHOP_TZ,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const weekday = get('weekday').toLowerCase().slice(0, 3) as DayKey;
  // 24h formatting yields "24" at midnight in some ICU builds.
  const hour = Number(get('hour')) % 24;
  const minute = Number(get('minute'));

  return { day: weekday, minutes: hour * 60 + minute };
}

export function getOpenState(location: Location, date = new Date()): OpenState {
  const { day, minutes } = shopNow(date);
  const today = location.hours[day];

  if (today && minutes >= today.open && minutes < today.close) {
    const closing = fmtTime(today.close);
    return {
      isOpen: true,
      label: `Open now · until ${closing}`,
      short: `Until ${closing}`,
    };
  }

  // Not open right now: find the next opening, scanning today first.
  const startIdx = dayOrder.indexOf(day);
  for (let offset = 0; offset < 8; offset += 1) {
    const key = dayOrder[(startIdx + offset) % 7];
    const hrs = location.hours[key];
    if (!hrs) continue;
    // Today only counts if we haven't already passed opening time.
    if (offset === 0 && minutes >= hrs.open) continue;

    const opening = fmtTime(hrs.open);
    if (offset === 0) {
      return {
        isOpen: false,
        label: `Closed · opens today at ${opening}`,
        short: `Today ${opening}`,
      };
    }
    const dayLabel = offset === 1 ? 'tomorrow' : dayNames[key];
    const shortDay = dayNames[key].slice(0, 3);
    return {
      isOpen: false,
      label: `Closed · opens ${dayLabel} at ${opening}`,
      short: `${shortDay} ${opening}`,
    };
  }

  return { isOpen: false, label: 'Closed', short: 'Closed' };
}
