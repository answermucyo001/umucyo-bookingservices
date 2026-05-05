import List "mo:core/List";
import Principal "mo:core/Principal";
import AvailabilityTypes "../types/availability";
import Runtime "mo:core/Runtime";
import AvailabilityLib "../lib/availability";

mixin (
  adminPrincipal : { var value : ?Principal },
  availability : List.List<AvailabilityTypes.DayAvailability>,
) {
  public shared ({ caller }) func setAvailability(
    schedule : AvailabilityTypes.WeeklyAvailability
  ) : async () {
    switch (adminPrincipal.value) {
      case (?admin) { if (not Principal.equal(caller, admin)) { Runtime.trap("Unauthorized") } };
      case null { Runtime.trap("No admin set") };
    };
    AvailabilityLib.setAvailability(availability, schedule);
  };

  public query func getAvailability() : async AvailabilityTypes.WeeklyAvailability {
    AvailabilityLib.getAvailability(availability);
  };
};
