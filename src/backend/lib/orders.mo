import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import OrderTypes "../types/orders";
import CartTypes "../types/cart";
import CatalogTypes "../types/catalog";

module {
  public type Order = OrderTypes.Order;
  public type OrderItem = OrderTypes.OrderItem;

  public func createOrder(
    orders : Map.Map<Common.OrderId, Order>,
    nextId : Nat,
    userId : Principal,
    cartItems : [CartTypes.CartItem],
    products : Map.Map<Common.ProductId, CatalogTypes.Product>,
    billingAddress : ?Common.Address,
    stripeSessionId : ?Text,
  ) : Common.OrderId {
    let id = nextId;

    let orderItems : [OrderItem] = cartItems
      .filter(func(ci : CartTypes.CartItem) : Bool {
        switch (products.get(ci.productId)) {
          case (?p) ci.variantIndex < p.sizeVariants.size();
          case null false;
        };
      })
      .map<CartTypes.CartItem, OrderItem>(func(ci : CartTypes.CartItem) : OrderItem {
        let p = switch (products.get(ci.productId)) {
          case (?p) p;
          case null Runtime.trap("Product not found");
        };
        let variant = p.sizeVariants[ci.variantIndex];
        {
          productId = ci.productId;
          variantIndex = ci.variantIndex;
          quantity = ci.quantity;
          priceInCents = variant.priceInCents;
          productName = p.name # " - " # variant.name;
        };
      });

    var total : Nat = 0;
    for (item in orderItems.values()) {
      total += item.priceInCents * item.quantity;
    };

    let order : Order = {
      id;
      userId;
      items = orderItems;
      totalInCents = total;
      status = #pending;
      createdAt = Time.now();
      billingAddress;
      stripeSessionId;
    };

    orders.add(id, order);
    id;
  };

  public func getOrder(orders : Map.Map<Common.OrderId, Order>, id : Common.OrderId) : ?Order {
    orders.get(id);
  };

  public func getOrdersByUser(orders : Map.Map<Common.OrderId, Order>, userId : Principal) : [Order] {
    orders.toArray()
      .filter(func((_, o) : (Common.OrderId, Order)) : Bool = o.userId == userId)
      .map<(Common.OrderId, Order), Order>(func((_, o)) = o);
  };

  public func confirmOrder(orders : Map.Map<Common.OrderId, Order>, id : Common.OrderId) : () {
    switch (orders.get(id)) {
      case (?order) {
        orders.add(id, { order with status = #paid });
      };
      case null {};
    };
  };

  public func updateOrderStatus(orders : Map.Map<Common.OrderId, Order>, id : Common.OrderId, status : Common.OrderStatus) : () {
    switch (orders.get(id)) {
      case (?order) {
        orders.add(id, { order with status });
      };
      case null {};
    };
  };
};
