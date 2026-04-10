import Common "common";

module {
  public type Category = {
    #proteins;
    #preWorkout;
    #postWorkout;
    #vitamins;
    #accessories;
  };

  public type ProductType = Text;

  public type NutritionFacts = {
    calories : Nat;
    protein : Nat;
    carbs : Nat;
    fat : Nat;
    servingSize : Text;
  };

  public type SizeVariant = {
    name : Text;
    priceInCents : Nat;
  };

  public type Product = {
    id : Common.ProductId;
    name : Text;
    brand : Text;
    category : Category;
    productType : ProductType;
    description : Text;
    ingredients : Text;
    nutritionFacts : ?NutritionFacts;
    sizeVariants : [SizeVariant];
    imageId : ?Text;
    inStock : Bool;
  };
};
