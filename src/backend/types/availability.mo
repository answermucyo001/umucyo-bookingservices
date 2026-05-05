import CommonTypes "common";

module {
  public type TimeRange = {
    startTime : CommonTypes.TimeStr;
    endTime : CommonTypes.TimeStr;
  };

  public type DayAvailability = {
    day : CommonTypes.DayOfWeek;
    ranges : [TimeRange];
  };

  public type WeeklyAvailability = [DayAvailability];
};
