import CommonTypes "common";

module {
  public type Service = {
    id : CommonTypes.ServiceId;
    name : Text;
    description : Text;
    durationMinutes : Nat;
    price : Text;
    isActive : Bool;
  };

  public type CreateServiceRequest = {
    name : Text;
    description : Text;
    durationMinutes : Nat;
    price : Text;
  };

  public type UpdateServiceRequest = {
    id : CommonTypes.ServiceId;
    name : Text;
    description : Text;
    durationMinutes : Nat;
    price : Text;
  };
};
