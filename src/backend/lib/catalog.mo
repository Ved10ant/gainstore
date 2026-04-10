import Map "mo:core/Map";
import Common "../types/common";
import CatalogTypes "../types/catalog";

module {
  public type Product = CatalogTypes.Product;
  public type Category = CatalogTypes.Category;
  public type SizeVariant = CatalogTypes.SizeVariant;
  public type NutritionFacts = CatalogTypes.NutritionFacts;

  public func getAllProducts(products : Map.Map<Common.ProductId, Product>) : [Product] {
    products.toArray().map<(Common.ProductId, Product), Product>(func((_, p)) = p);
  };

  public func getProductById(products : Map.Map<Common.ProductId, Product>, id : Common.ProductId) : ?Product {
    products.get(id);
  };

  public func getProductsByCategory(products : Map.Map<Common.ProductId, Product>, category : Category) : [Product] {
    products.toArray()
      .filter(func((_, p) : (Common.ProductId, Product)) : Bool = p.category == category)
      .map<(Common.ProductId, Product), Product>(func((_, p)) = p);
  };

  public func searchProducts(products : Map.Map<Common.ProductId, Product>, term : Text) : [Product] {
    let lower = term.toLower();
    products.toArray()
      .filter(func((_, p) : (Common.ProductId, Product)) : Bool {
        p.name.toLower().contains(#text lower) or
        p.brand.toLower().contains(#text lower) or
        p.ingredients.toLower().contains(#text lower)
      })
      .map<(Common.ProductId, Product), Product>(func((_, p)) = p);
  };

  public func addProduct(products : Map.Map<Common.ProductId, Product>, nextId : Nat, product : Product) : Common.ProductId {
    let id = nextId;
    products.add(id, { product with id });
    id;
  };

  public func updateProduct(products : Map.Map<Common.ProductId, Product>, product : Product) : () {
    products.add(product.id, product);
  };

  public func deleteProduct(products : Map.Map<Common.ProductId, Product>, id : Common.ProductId) : () {
    products.remove(id);
  };

  public func seedProducts(products : Map.Map<Common.ProductId, Product>, startId : Nat) : Nat {
    var id = startId;

    func addP(p : Product) {
      products.add(id, p);
      id += 1;
    };

    // 1. Whey Protein Gold Standard
    addP({
      id;
      name = "Gold Standard 100% Whey";
      brand = "Optimum Nutrition";
      category = #proteins;
      productType = "Whey Protein Concentrate/Isolate";
      description = "The world's best-selling whey protein powder. 24g of protein per serving with minimal fat and sugar.";
      ingredients = "Protein Blend (Whey Protein Isolate, Whey Protein Concentrate, Whey Peptides), Cocoa, Lecithin, Natural Flavors, Acesulfame Potassium, Sucralose";
      nutritionFacts = ?{
        calories = 120;
        protein = 24;
        carbs = 3;
        fat = 1;
        servingSize = "1 scoop (30.4g)";
      };
      sizeVariants = [
        { name = "1 lb (14 servings)"; priceInCents = 2499 },
        { name = "2 lb (29 servings)"; priceInCents = 4299 },
        { name = "5 lb (73 servings)"; priceInCents = 8999 },
      ];
      imageId = null;
      inStock = true;
    });

    // 2. Casein Protein
    addP({
      id;
      name = "Gold Standard 100% Casein";
      brand = "Optimum Nutrition";
      category = #proteins;
      productType = "Casein Protein";
      description = "Slow-digesting micellar casein protein ideal for overnight recovery. 24g of protein per serving.";
      ingredients = "Micellar Casein (from Milk), Cocoa Powder, Lecithin, Natural and Artificial Flavors, Acesulfame Potassium, Sucralose";
      nutritionFacts = ?{
        calories = 120;
        protein = 24;
        carbs = 4;
        fat = 1;
        servingSize = "1 scoop (35g)";
      };
      sizeVariants = [
        { name = "2 lb (26 servings)"; priceInCents = 4999 },
        { name = "4 lb (53 servings)"; priceInCents = 8999 },
      ];
      imageId = null;
      inStock = true;
    });

    // 3. Plant-Based Protein
    addP({
      id;
      name = "Vega Sport Premium Protein";
      brand = "Vega";
      category = #proteins;
      productType = "Plant-Based Protein";
      description = "30g of plant-based protein from pea, pumpkin seed, sunflower seed, and alfalfa. Complete amino acid profile.";
      ingredients = "Protein Blend (Pea Protein, Pumpkin Seed Protein, Sunflower Seed Protein, Alfalfa Protein), Cocoa Powder, Natural Flavors, Stevia";
      nutritionFacts = ?{
        calories = 160;
        protein = 30;
        carbs = 5;
        fat = 3;
        servingSize = "1 scoop (44g)";
      };
      sizeVariants = [
        { name = "1.8 lb (20 servings)"; priceInCents = 4999 },
        { name = "4.3 lb (45 servings)"; priceInCents = 9999 },
      ];
      imageId = null;
      inStock = true;
    });

    // 4. Pea Protein
    addP({
      id;
      name = "Orgain Organic Pea Protein";
      brand = "Orgain";
      category = #proteins;
      productType = "Pea Protein Isolate";
      description = "21g of USDA certified organic pea protein. Non-GMO, gluten free, no artificial sweeteners.";
      ingredients = "Organic Pea Protein, Organic Cocoa, Organic Coconut Sugar, Sea Salt, Organic Sunflower Lecithin";
      nutritionFacts = ?{
        calories = 150;
        protein = 21;
        carbs = 15;
        fat = 4;
        servingSize = "2 scoops (46g)";
      };
      sizeVariants = [
        { name = "2 lb (20 servings)"; priceInCents = 3499 },
      ];
      imageId = null;
      inStock = true;
    });

    // 5. BCAA
    addP({
      id;
      name = "Xtend Original BCAA Powder";
      brand = "Scivation";
      category = #postWorkout;
      productType = "BCAA";
      description = "7g BCAAs in the proven 2:1:1 ratio per serving. Zero sugar, zero calories. With electrolytes for hydration.";
      ingredients = "L-Leucine, L-Isoleucine, L-Valine, Citrulline Malate, Electrolyte Blend (Sodium, Potassium), Natural Flavors, Sucralose";
      nutritionFacts = ?{
        calories = 0;
        protein = 0;
        carbs = 0;
        fat = 0;
        servingSize = "1 scoop (14.3g)";
      };
      sizeVariants = [
        { name = "30 servings"; priceInCents = 2799 },
        { name = "90 servings"; priceInCents = 5999 },
      ];
      imageId = null;
      inStock = true;
    });

    // 6. Pre-Workout C4
    addP({
      id;
      name = "C4 Original Pre-Workout";
      brand = "Cellucor";
      category = #preWorkout;
      productType = "Pre-Workout";
      description = "America's #1 selling pre-workout. Explosive energy, sharp focus, and enhanced endurance.";
      ingredients = "CarnoSyn Beta-Alanine, Arginine AKG, Caffeine Anhydrous (150mg), Niacin, Vitamin B6, Vitamin B12, Folic Acid, Natural Flavors, Sucralose";
      nutritionFacts = ?{
        calories = 5;
        protein = 0;
        carbs = 1;
        fat = 0;
        servingSize = "1 scoop (6.5g)";
      };
      sizeVariants = [
        { name = "30 servings"; priceInCents = 3299 },
        { name = "60 servings"; priceInCents = 4999 },
      ];
      imageId = null;
      inStock = true;
    });

    // 7. Pre-Workout Pump
    addP({
      id;
      name = "Pump Formula Stim-Free Pre-Workout";
      brand = "Transparent Labs";
      category = #preWorkout;
      productType = "Pre-Workout";
      description = "Stim-free pump formula with citrulline, beta-alanine, and betaine for maximum muscle pumps.";
      ingredients = "L-Citrulline (6000mg), Beta-Alanine (4000mg), Betaine Anhydrous (2500mg), L-Tyrosine, Alpha GPC, Huperzine A";
      nutritionFacts = ?{
        calories = 25;
        protein = 0;
        carbs = 5;
        fat = 0;
        servingSize = "1 scoop (22g)";
      };
      sizeVariants = [
        { name = "30 servings"; priceInCents = 4999 },
      ];
      imageId = null;
      inStock = true;
    });

    // 8. Creatine Monohydrate
    addP({
      id;
      name = "Micronized Creatine Monohydrate";
      brand = "Optimum Nutrition";
      category = #postWorkout;
      productType = "Creatine";
      description = "5g of pure micronized creatine monohydrate per serving. Supports strength, power, and muscle size gains.";
      ingredients = "Creatine Monohydrate (Creapure)";
      nutritionFacts = ?{
        calories = 0;
        protein = 0;
        carbs = 0;
        fat = 0;
        servingSize = "1 teaspoon (5g)";
      };
      sizeVariants = [
        { name = "300g (60 servings)"; priceInCents = 1899 },
        { name = "600g (120 servings)"; priceInCents = 2999 },
        { name = "1200g (240 servings)"; priceInCents = 4999 },
      ];
      imageId = null;
      inStock = true;
    });

    // 9. Multivitamin
    addP({
      id;
      name = "Opti-Men Multivitamin";
      brand = "Optimum Nutrition";
      category = #vitamins;
      productType = "Multivitamin";
      description = "Complete multivitamin for active men with 75+ active ingredients, 4 blends of vitamins, minerals, and phytonutrients.";
      ingredients = "Vitamin A, Vitamin C, Vitamin D3, Vitamin E, B-Complex (B1, B2, B3, B5, B6, B7, B9, B12), Zinc, Selenium, Amino Blend, Phyto Blend";
      nutritionFacts = ?{
        calories = 10;
        protein = 1;
        carbs = 1;
        fat = 0;
        servingSize = "3 tablets";
      };
      sizeVariants = [
        { name = "90 tablets (30 servings)"; priceInCents = 1999 },
        { name = "180 tablets (60 servings)"; priceInCents = 3299 },
      ];
      imageId = null;
      inStock = true;
    });

    // 10. Vitamin D3 + K2
    addP({
      id;
      name = "Vitamin D3 + K2";
      brand = "Sports Research";
      category = #vitamins;
      productType = "Vitamin";
      description = "5000 IU of Vitamin D3 with 100mcg of Vitamin K2 (MK-7). Supports bone health, immune function, and cardiovascular health.";
      ingredients = "Vitamin D3 (as Cholecalciferol), Vitamin K2 (as Menaquinone-7), Organic Coconut Oil, Organic Beeswax, Sunflower Lecithin";
      nutritionFacts = ?{
        calories = 15;
        protein = 0;
        carbs = 0;
        fat = 1;
        servingSize = "1 softgel";
      };
      sizeVariants = [
        { name = "60 softgels"; priceInCents = 1799 },
        { name = "360 softgels"; priceInCents = 5499 },
      ];
      imageId = null;
      inStock = true;
    });

    // 11. Omega-3 Fish Oil
    addP({
      id;
      name = "Ultra Omega-3 Fish Oil";
      brand = "BodyTech";
      category = #vitamins;
      productType = "Omega-3";
      description = "1200mg Omega-3 per serving (840mg EPA + 360mg DHA). Molecularly distilled for purity. Supports heart and joint health.";
      ingredients = "Fish Oil Concentrate, EPA (Eicosapentaenoic Acid), DHA (Docosahexaenoic Acid), Natural Lemon Flavor, Mixed Tocopherols";
      nutritionFacts = ?{
        calories = 20;
        protein = 0;
        carbs = 0;
        fat = 2;
        servingSize = "2 softgels";
      };
      sizeVariants = [
        { name = "90 softgels"; priceInCents = 1499 },
        { name = "180 softgels"; priceInCents = 2499 },
      ];
      imageId = null;
      inStock = true;
    });

    // 12. Mass Gainer
    addP({
      id;
      name = "Serious Mass Weight Gainer";
      brand = "Optimum Nutrition";
      category = #proteins;
      productType = "Mass Gainer";
      description = "1250 calories per serving with 50g of protein. The ultimate weight gain formula with vitamins and minerals.";
      ingredients = "Protein Blend (Whey Protein Concentrate, Calcium Caseinate, Egg Albumen), Maltodextrin, Fructose, Cocoa, MCT Oil, Vitamins & Minerals";
      nutritionFacts = ?{
        calories = 1250;
        protein = 50;
        carbs = 252;
        fat = 4;
        servingSize = "2 scoops (334g)";
      };
      sizeVariants = [
        { name = "6 lb (8 servings)"; priceInCents = 3999 },
        { name = "12 lb (16 servings)"; priceInCents = 6999 },
      ];
      imageId = null;
      inStock = true;
    });

    id;
  };
};
