import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import ProfileTypes "../types/profile";
import OrderTypes "../types/orders";
import ProfileLib "../lib/profile";
import OrdersLib "../lib/orders";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Principal, ProfileTypes.UserProfile>,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?ProfileTypes.UserProfile {
    ProfileLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : ProfileTypes.UserProfile) : async () {
    ProfileLib.upsertProfile(profiles, caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?ProfileTypes.UserProfile {
    if (user == caller or AccessControl.hasPermission(accessControlState, caller, #admin)) {
      ProfileLib.getProfile(profiles, user);
    } else {
      Runtime.trap("Unauthorized: Cannot view another user's profile");
    };
  };

  public shared ({ caller }) func addAddress(address : Common.Address) : async () {
    ProfileLib.addAddress(profiles, caller, address);
  };

  public shared ({ caller }) func removeAddress(index : Nat) : async () {
    ProfileLib.removeAddress(profiles, caller, index);
  };

  public query ({ caller }) func getOrderHistory() : async [OrderTypes.Order] {
    OrdersLib.getOrdersByUser(orders, caller);
  };
};
