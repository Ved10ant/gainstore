import Common "common";

module {
  public type UserProfile = {
    displayName : Text;
    savedAddresses : [Common.Address];
  };
};
