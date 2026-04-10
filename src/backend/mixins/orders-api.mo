import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CatalogTypes "../types/catalog";
import CartTypes "../types/cart";
import OrderTypes "../types/orders";
import CartLib "../lib/cart";
import OrdersLib "../lib/orders";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, CatalogTypes.Product>,
  carts : Map.Map<Principal, List.List<CartTypes.CartItem>>,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
) {
  public shared ({ caller }) func confirmOrder(orderId : Common.OrderId) : async () {
    switch (OrdersLib.getOrder(orders, orderId)) {
      case (?order) {
        if (order.userId != caller and not AccessControl.hasPermission(accessControlState, caller, #admin)) {
          Runtime.trap("Unauthorized: Cannot confirm another user's order");
        };
        OrdersLib.confirmOrder(orders, orderId);
      };
      case null Runtime.trap("Order not found");
    };
  };

  public query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    OrdersLib.getOrdersByUser(orders, caller);
  };

  public query ({ caller }) func getOrderById(orderId : Common.OrderId) : async ?OrderTypes.Order {
    switch (OrdersLib.getOrder(orders, orderId)) {
      case (?order) {
        if (order.userId == caller or AccessControl.hasPermission(accessControlState, caller, #admin)) {
          ?order;
        } else {
          null;
        };
      };
      case null null;
    };
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Common.OrderId, status : Common.OrderStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrdersLib.updateOrderStatus(orders, orderId, status);
  };
};
