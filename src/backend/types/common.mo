module {
  public type Timestamp = Int;
  public type ProductId = Nat;
  public type OrderId = Nat;

  public type Address = {
    fullName : Text;
    street : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
  };

  public type OrderStatus = {
    #pending;
    #paid;
    #shipped;
    #delivered;
    #cancelled;
  };
};
