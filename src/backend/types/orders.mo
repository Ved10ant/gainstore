import Common "common";
import Cart "cart";

module {
  public type OrderItem = {
    productId : Common.ProductId;
    variantIndex : Nat;
    quantity : Nat;
    priceInCents : Nat;
    productName : Text;
  };

  public type Order = {
    id : Common.OrderId;
    userId : Principal;
    items : [OrderItem];
    totalInCents : Nat;
    status : Common.OrderStatus;
    createdAt : Common.Timestamp;
    billingAddress : ?Common.Address;
    stripeSessionId : ?Text;
  };
};
