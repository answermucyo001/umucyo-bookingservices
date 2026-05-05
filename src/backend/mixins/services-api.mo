import List "mo:core/List";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import ServiceTypes "../types/services";
import Runtime "mo:core/Runtime";
import ServicesLib "../lib/services";

mixin (
  adminPrincipal : { var value : ?Principal },
  services : List.List<ServiceTypes.Service>,
  nextServiceId : { var value : Nat },
) {
  public shared ({ caller }) func createService(
    req : ServiceTypes.CreateServiceRequest
  ) : async ServiceTypes.Service {
    switch (adminPrincipal.value) {
      case (?admin) { if (not Principal.equal(caller, admin)) { Runtime.trap("Unauthorized") } };
      case null { Runtime.trap("No admin set") };
    };
    let svc = ServicesLib.createService(services, nextServiceId.value, req);
    nextServiceId.value += 1;
    svc;
  };

  public shared ({ caller }) func updateService(
    req : ServiceTypes.UpdateServiceRequest
  ) : async Bool {
    switch (adminPrincipal.value) {
      case (?admin) { if (not Principal.equal(caller, admin)) { Runtime.trap("Unauthorized") } };
      case null { Runtime.trap("No admin set") };
    };
    ServicesLib.updateService(services, req);
  };

  public shared ({ caller }) func deleteService(
    id : CommonTypes.ServiceId
  ) : async Bool {
    switch (adminPrincipal.value) {
      case (?admin) { if (not Principal.equal(caller, admin)) { Runtime.trap("Unauthorized") } };
      case null { Runtime.trap("No admin set") };
    };
    ServicesLib.deleteService(services, id);
  };

  public query func listServices() : async [ServiceTypes.Service] {
    ServicesLib.listActiveServices(services);
  };

  public query func getService(id : CommonTypes.ServiceId) : async ?ServiceTypes.Service {
    ServicesLib.getService(services, id);
  };

  public shared ({ caller }) func setAdmin() : async () {
    switch (adminPrincipal.value) {
      case (?_) { Runtime.trap("Admin already set") };
      case null { adminPrincipal.value := ?caller };
    };
  };

  public query func getAdmin() : async ?Principal {
    adminPrincipal.value;
  };
};
