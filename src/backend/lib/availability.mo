import CommonTypes "../types/common";
import AvailabilityTypes "../types/availability";
import ServiceTypes "../types/services";
import BookingTypes "../types/bookings";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

module {
  public func setAvailability(
    availability : List.List<AvailabilityTypes.DayAvailability>,
    schedule : AvailabilityTypes.WeeklyAvailability,
  ) : () {
    availability.clear();
    for (day in schedule.values()) {
      availability.add(day);
    };
  };

  public func getAvailability(
    availability : List.List<AvailabilityTypes.DayAvailability>
  ) : AvailabilityTypes.WeeklyAvailability {
    availability.toArray();
  };

  public func getAvailableSlots(
    availability : List.List<AvailabilityTypes.DayAvailability>,
    bookings : List.List<BookingTypes.Booking>,
    services : List.List<ServiceTypes.Service>,
    serviceId : CommonTypes.ServiceId,
    date : CommonTypes.DateStr,
  ) : [BookingTypes.TimeSlot] {
    // Find the service to get duration
    let durationMinutes = switch (services.find(func(s) { s.id == serviceId and s.isActive })) {
      case null { return [] };
      case (?svc) { svc.durationMinutes };
    };
    if (durationMinutes == 0) { return [] };

    // Get day of week for the given date
    let dow = dateToDayOfWeek(date);

    // Find availability for that day
    let dayAvail = switch (availability.find(func(da) { da.day == dow })) {
      case null { return [] };
      case (?da) { da };
    };

    // For each time range, generate slots of durationMinutes
    let slots = List.empty<BookingTypes.TimeSlot>();
    for (range in dayAvail.ranges.values()) {
      // parse startTime and endTime "HH:MM"
      let startMins = parseTimeMins(range.startTime);
      let endMins = parseTimeMins(range.endTime);
      var cur = startMins;
      label genloop while (cur + durationMinutes <= endMins) {
        let slotTime = formatTimeMins(cur);
        // check if taken
        let taken = bookings.any(func(b) {
          b.serviceId == serviceId and
          b.date == date and
          b.timeSlot == slotTime and
          b.status != #cancelled;
        });
        slots.add({ startTime = slotTime; isAvailable = not taken });
        cur += durationMinutes;
      };
    };
    slots.toArray();
  };

  func parseTimeMins(t : CommonTypes.TimeStr) : Nat {
    let parts = t.split(#char ':');
    let arr = parts.toArray();
    let h = switch (Nat.fromText(arr[0])) { case (?v) v; case null 0 };
    let m = switch (Nat.fromText(arr[1])) { case (?v) v; case null 0 };
    h * 60 + m;
  };

  func formatTimeMins(mins : Nat) : CommonTypes.TimeStr {
    let h = mins / 60;
    let m = mins % 60;
    let hStr = if (h < 10) { "0" # h.toText() } else { h.toText() };
    let mStr = if (m < 10) { "0" # m.toText() } else { m.toText() };
    hStr # ":" # mStr;
  };

  // Parse "YYYY-MM-DD" and return the day of week using Zeller's congruence
  public func dateToDayOfWeek(date : CommonTypes.DateStr) : CommonTypes.DayOfWeek {
    // split on '-'
    let parts = date.split(#char '-');
    let partsArr = parts.toArray();
    let y = switch (Nat.fromText(partsArr[0])) { case (?v) v; case null 2024 };
    let m = switch (Nat.fromText(partsArr[1])) { case (?v) v; case null 1 };
    let d = switch (Nat.fromText(partsArr[2])) { case (?v) v; case null 1 };
    // Tomohiko Sakamoto's algorithm
    // month adjusted: Jan=1 and Feb=2 treated as months 13 and 14 of previous year
    let (adjY, adjM) = if (m < 3) { (y - 1, m + 12) } else { (y, m) };
    let k = adjY % 100;
    let j = adjY / 100;
    // h: 0=Saturday,1=Sunday,2=Monday,...,6=Friday
    let h = (d + (13 * (adjM + 1)) / 5 + k + k / 4 + j / 4 + 5 * j) % 7;
    // convert to ISO: 0=Mon,1=Tue,...,6=Sun
    let iso = (h + 5) % 7;
    switch (iso) {
      case 0 { #monday };
      case 1 { #tuesday };
      case 2 { #wednesday };
      case 3 { #thursday };
      case 4 { #friday };
      case 5 { #saturday };
      case _ { #sunday };
    };
  };
};
