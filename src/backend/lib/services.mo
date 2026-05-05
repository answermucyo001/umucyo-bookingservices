import List "mo:core/List";
import CommonTypes "../types/common";
import ServiceTypes "../types/services";

module {
  public func createService(
    services : List.List<ServiceTypes.Service>,
    nextId : Nat,
    req : ServiceTypes.CreateServiceRequest,
  ) : ServiceTypes.Service {
    let svc : ServiceTypes.Service = {
      id = nextId;
      name = req.name;
      description = req.description;
      durationMinutes = req.durationMinutes;
      price = req.price;
      isActive = true;
    };
    services.add(svc);
    svc;
  };

  public func getService(
    services : List.List<ServiceTypes.Service>,
    id : CommonTypes.ServiceId,
  ) : ?ServiceTypes.Service {
    services.find(func(s) { s.id == id });
  };

  public func listActiveServices(
    services : List.List<ServiceTypes.Service>
  ) : [ServiceTypes.Service] {
    services.filter(func(s) { s.isActive }).toArray();
  };

  public func listAllServices(
    services : List.List<ServiceTypes.Service>
  ) : [ServiceTypes.Service] {
    services.toArray();
  };

  public func updateService(
    services : List.List<ServiceTypes.Service>,
    req : ServiceTypes.UpdateServiceRequest,
  ) : Bool {
    var found = false;
    services.mapInPlace(
      func(s) {
        if (s.id == req.id) {
          found := true;
          { s with name = req.name; description = req.description; durationMinutes = req.durationMinutes; price = req.price };
        } else { s };
      }
    );
    found;
  };

  public func deleteService(
    services : List.List<ServiceTypes.Service>,
    id : CommonTypes.ServiceId,
  ) : Bool {
    var found = false;
    services.mapInPlace(
      func(s) {
        if (s.id == id) { found := true; { s with isActive = false } } else { s };
      }
    );
    found;
  };
};
