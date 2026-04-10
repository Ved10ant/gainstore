import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import CartTypes "../types/cart";
import CartLib "../lib/cart";
import AccessControl "mo:caffeineai-authorization/access-control";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<Principal, List.List<CartTypes.CartItem>>,
) {
  public query ({ caller }) func getCart() : async [CartTypes.CartItem] {
    CartLib.getCart(carts, caller);
  };

  public shared ({ caller }) func addToCart(item : CartTypes.CartItem) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated to add to cart");
    };
    CartLib.addToCart(carts, caller, item);
  };

  public shared ({ caller }) func updateCartItem(productId : Nat, variantIndex : Nat, quantity : Nat) : async () {
    CartLib.updateCartItem(carts, caller, productId, variantIndex, quantity);
  };

  public shared ({ caller }) func removeCartItem(productId : Nat, variantIndex : Nat) : async () {
    CartLib.removeCartItem(carts, caller, productId, variantIndex);
  };

  public shared ({ caller }) func clearCart() : async () {
    CartLib.clearCart(carts, caller);
  };
};
