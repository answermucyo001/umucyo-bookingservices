import List "mo:core/List";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import BookingTypes "../types/bookings";
import ServiceTypes "../types/services";
import AvailabilityTypes "../types/availability";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import BookingsLib "../lib/bookings";
import AvailabilityLib "../lib/availability";

mixin (
  adminPrincipal : { var value : ?Principal },
  bookings : List.List<BookingTypes.Booking>,
  nextBookingId : { var value : Nat },
  services : List.List<ServiceTypes.Service>,
  availability : List.List<AvailabilityTypes.DayAvailability>,
) {
  public query func getAvailableSlots(
    serviceId : CommonTypes.ServiceId,
    date : CommonTypes.DateStr,
  ) : async [BookingTypes.TimeSlot] {
    AvailabilityLib.getAvailableSlots(availability, bookings, services, serviceId, date);
  };

  public func createBooking(
    req : BookingTypes.CreateBookingRequest
  ) : async CommonTypes.BookingId {
    // Verify service exists
    let _ = switch (services.find(func(s) { s.id == req.serviceId and s.isActive })) {
      case null { Runtime.trap("Service not found or inactive") };
      case (?s) { s };
    };
    // Verify slot is available
    if (BookingsLib.isSlotTaken(bookings, req.serviceId, req.date, req.timeSlot)) {
      Runtime.trap("Time slot is already booked");
    };
    let booking = BookingsLib.createBooking(bookings, nextBookingId.value, req);
    nextBookingId.value += 1;
    booking.id;
  };

  public shared ({ caller }) func listBookings() : async [BookingTypes.Booking] {
    switch (adminPrincipal.value) {
      case (?admin) { if (not Principal.equal(caller, admin)) { Runtime.trap("Unauthorized") } };
      case null { Runtime.trap("No admin set") };
    };
    BookingsLib.listAllBookings(bookings);
  };

  public shared ({ caller }) func listUpcomingBookings() : async [BookingTypes.Booking] {
    switch (adminPrincipal.value) {
      case (?admin) { if (not Principal.equal(caller, admin)) { Runtime.trap("Unauthorized") } };
      case null { Runtime.trap("No admin set") };
    };
    BookingsLib.listUpcomingBookings(bookings, Time.now());
  };

  public shared ({ caller }) func listPastBookings() : async [BookingTypes.Booking] {
    switch (adminPrincipal.value) {
      case (?admin) { if (not Principal.equal(caller, admin)) { Runtime.trap("Unauthorized") } };
      case null { Runtime.trap("No admin set") };
    };
    BookingsLib.listPastBookings(bookings, Time.now());
  };

  public shared ({ caller }) func updateBookingStatus(
    id : CommonTypes.BookingId,
    status : BookingTypes.BookingStatus,
  ) : async Bool {
    switch (adminPrincipal.value) {
      case (?admin) { if (not Principal.equal(caller, admin)) { Runtime.trap("Unauthorized") } };
      case null { Runtime.trap("No admin set") };
    };
    BookingsLib.updateBookingStatus(bookings, id, status);
  };

  public func cancelBooking(id : CommonTypes.BookingId) : async Bool {
    BookingsLib.updateBookingStatus(bookings, id, #cancelled);
  };

  public query func getBooking(
    id : CommonTypes.BookingId
  ) : async ?BookingTypes.Booking {
    BookingsLib.getBooking(bookings, id);
  };
};
