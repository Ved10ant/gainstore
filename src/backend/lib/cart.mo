import Map "mo:core/Map";
import List "mo:core/List";
import CartTypes "../types/cart";

module {
  public type Cart = CartTypes.Cart;
  public type CartItem = CartTypes.CartItem;

  func getUserCart(carts : Map.Map<Principal, List.List<CartItem>>, userId : Principal) : List.List<CartItem> {
    switch (carts.get(userId)) {
      case (?list) list;
      case null {
        let list = List.empty<CartItem>();
        carts.add(userId, list);
        list;
      };
    };
  };

  public func getCart(carts : Map.Map<Principal, List.List<CartItem>>, userId : Principal) : [CartItem] {
    getUserCart(carts, userId).toArray();
  };

  public func addToCart(carts : Map.Map<Principal, List.List<CartItem>>, userId : Principal, item : CartItem) : () {
    let list = getUserCart(carts, userId);
    // merge quantity if same product+variant already in cart
    var found = false;
    list.mapInPlace(func(existing : CartItem) : CartItem {
      if (existing.productId == item.productId and existing.variantIndex == item.variantIndex) {
        found := true;
        { existing with quantity = existing.quantity + item.quantity };
      } else {
        existing;
      };
    });
    if (not found) {
      list.add(item);
    };
  };

  public func updateCartItem(carts : Map.Map<Principal, List.List<CartItem>>, userId : Principal, productId : Nat, variantIndex : Nat, quantity : Nat) : () {
    let list = getUserCart(carts, userId);
    if (quantity == 0) {
      // remove the item
      let filtered = list.filter(func(item : CartItem) : Bool {
        not (item.productId == productId and item.variantIndex == variantIndex)
      });
      list.clear();
      list.append(filtered);
    } else {
      list.mapInPlace(func(item : CartItem) : CartItem {
        if (item.productId == productId and item.variantIndex == variantIndex) {
          { item with quantity };
        } else {
          item;
        };
      });
    };
  };

  public func removeCartItem(carts : Map.Map<Principal, List.List<CartItem>>, userId : Principal, productId : Nat, variantIndex : Nat) : () {
    let list = getUserCart(carts, userId);
    let filtered = list.filter(func(item : CartItem) : Bool {
      not (item.productId == productId and item.variantIndex == variantIndex)
    });
    list.clear();
    list.append(filtered);
  };

  public func clearCart(carts : Map.Map<Principal, List.List<CartItem>>, userId : Principal) : () {
    let list = getUserCart(carts, userId);
    list.clear();
  };
};
