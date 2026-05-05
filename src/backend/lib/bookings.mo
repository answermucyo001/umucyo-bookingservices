import List "mo:core/List";
import CommonTypes "../types/common";
import BookingTypes "../types/bookings";
import Time "mo:core/Time";

module {
  public func createBooking(
    bookings : List.List<BookingTypes.Booking>,
    nextId : Nat,
    req : BookingTypes.CreateBookingRequest,
  ) : BookingTypes.Booking {
    let booking : BookingTypes.Booking = {
      id = nextId;
      serviceId = req.serviceId;
      customerName = req.customerName;
      customerEmail = req.customerEmail;
      date = req.date;
      timeSlot = req.timeSlot;
      status = #pending;
      createdAt = Time.now();
    };
    bookings.add(booking);
    booking;
  };

  public func getBooking(
    bookings : List.List<BookingTypes.Booking>,
    id : CommonTypes.BookingId,
  ) : ?BookingTypes.Booking {
    bookings.find(func(b) { b.id == id });
  };

  public func listAllBookings(
    bookings : List.List<BookingTypes.Booking>
  ) : [BookingTypes.Booking] {
    bookings.toArray();
  };

  public func listUpcomingBookings(
    bookings : List.List<BookingTypes.Booking>,
    now : CommonTypes.Timestamp,
  ) : [BookingTypes.Booking] {
    bookings.filter(func(b) {
      b.status != #cancelled and b.status != #completed and b.createdAt >= now;
    }).toArray();
  };

  public func listPastBookings(
    bookings : List.List<BookingTypes.Booking>,
    now : CommonTypes.Timestamp,
  ) : [BookingTypes.Booking] {
    bookings.filter(func(b) {
      b.status == #completed or b.status == #cancelled or b.createdAt < now;
    }).toArray();
  };

  public func updateBookingStatus(
    bookings : List.List<BookingTypes.Booking>,
    id : CommonTypes.BookingId,
    status : BookingTypes.BookingStatus,
  ) : Bool {
    var found = false;
    bookings.mapInPlace(
      func(b) {
        if (b.id == id) { found := true; { b with status } } else { b };
      }
    );
    found;
  };

  public func isSlotTaken(
    bookings : List.List<BookingTypes.Booking>,
    serviceId : CommonTypes.ServiceId,
    date : CommonTypes.DateStr,
    timeSlot : CommonTypes.TimeStr,
  ) : Bool {
    bookings.any(func(b) {
      b.serviceId == serviceId and
      b.date == date and
      b.timeSlot == timeSlot and
      b.status != #cancelled;
    });
  };
};
