import List "mo:core/List";
import ServicesMixin "mixins/services-api";
import AvailabilityMixin "mixins/availability-api";
import BookingsMixin "mixins/bookings-api";
import ServiceTypes "types/services";
import AvailabilityTypes "types/availability";
import BookingTypes "types/bookings";

actor {
  let services = List.empty<ServiceTypes.Service>();
  let availability = List.empty<AvailabilityTypes.DayAvailability>();
  let bookings = List.empty<BookingTypes.Booking>();
  var adminPrincipalValue : ?Principal = null;
  let adminPrincipal = { var value = adminPrincipalValue };
  var nextServiceIdValue : Nat = 1;
  let nextServiceId = { var value = nextServiceIdValue };
  var nextBookingIdValue : Nat = 1;
  let nextBookingId = { var value = nextBookingIdValue };

  include ServicesMixin(adminPrincipal, services, nextServiceId);
  include AvailabilityMixin(adminPrincipal, availability);
  include BookingsMixin(adminPrincipal, bookings, nextBookingId, services, availability);
};

