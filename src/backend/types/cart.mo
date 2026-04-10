import Common "common";

module {
  public type CartItem = {
    productId : Common.ProductId;
    variantIndex : Nat;
    quantity : Nat;
  };

  public type Cart = {
    items : [CartItem];
  };
};
