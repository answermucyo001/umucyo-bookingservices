module {
  public type ServiceId = Nat;
  public type BookingId = Nat;
  public type Timestamp = Int;

  // "YYYY-MM-DD"
  public type DateStr = Text;
  // "HH:MM" 24-hour
  public type TimeStr = Text;

  public type DayOfWeek = {
    #monday;
    #tuesday;
    #wednesday;
    #thursday;
    #friday;
    #saturday;
    #sunday;
  };
};
