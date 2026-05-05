import CommonTypes "common";

module {
  public type BookingStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  public type Booking = {
    id : CommonTypes.BookingId;
    serviceId : CommonTypes.ServiceId;
    customerName : Text;
    customerEmail : Text;
    date : CommonTypes.DateStr;
    timeSlot : CommonTypes.TimeStr;
    status : BookingStatus;
    createdAt : CommonTypes.Timestamp;
  };

  public type CreateBookingRequest = {
    serviceId : CommonTypes.ServiceId;
    customerName : Text;
    customerEmail : Text;
    date : CommonTypes.DateStr;
    timeSlot : CommonTypes.TimeStr;
  };

  public type TimeSlot = {
    startTime : CommonTypes.TimeStr;
    isAvailable : Bool;
  };
};
