import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import ProfileTypes "../types/profile";

module {
  public type UserProfile = ProfileTypes.UserProfile;

  public func getProfile(profiles : Map.Map<Principal, UserProfile>, userId : Principal) : ?UserProfile {
    profiles.get(userId);
  };

  public func upsertProfile(profiles : Map.Map<Principal, UserProfile>, userId : Principal, profile : UserProfile) : () {
    profiles.add(userId, profile);
  };

  public func addAddress(profiles : Map.Map<Principal, UserProfile>, userId : Principal, address : Common.Address) : () {
    let defaultProfile : UserProfile = { displayName = ""; savedAddresses = [] };
    let current = switch (profiles.get(userId)) {
      case (?p) p;
      case null defaultProfile;
    };
    if (current.savedAddresses.size() >= 5) {
      Runtime.trap("Maximum of 5 saved addresses allowed");
    };
    let updated : UserProfile = {
      current with savedAddresses = current.savedAddresses.concat([address]);
    };
    profiles.add(userId, updated);
  };

  public func removeAddress(profiles : Map.Map<Principal, UserProfile>, userId : Principal, index : Nat) : () {
    let current = switch (profiles.get(userId)) {
      case (?p) p;
      case null Runtime.trap("Profile not found");
    };
    let addrs = current.savedAddresses;
    if (index >= addrs.size()) {
      Runtime.trap("Address index out of range");
    };
    let updated : UserProfile = {
      current with savedAddresses = addrs.enumerate()
        .filter(func((i, _) : (Nat, Common.Address)) : Bool = i != index)
        .map<(Nat, Common.Address), Common.Address>(func((_, a)) = a)
        .toArray();
    };
    profiles.add(userId, updated);
  };
};
