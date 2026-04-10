import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CatalogTypes "../types/catalog";
import CatalogLib "../lib/catalog";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, CatalogTypes.Product>,
) {
  public query func getProducts() : async [CatalogTypes.Product] {
    CatalogLib.getAllProducts(products);
  };

  public query func getProduct(id : Common.ProductId) : async ?CatalogTypes.Product {
    CatalogLib.getProductById(products, id);
  };

  public query func getProductsByCategory(category : CatalogTypes.Category) : async [CatalogTypes.Product] {
    CatalogLib.getProductsByCategory(products, category);
  };

  public query func searchProducts(term : Text) : async [CatalogTypes.Product] {
    CatalogLib.searchProducts(products, term);
  };

  public shared ({ caller }) func addProduct(product : CatalogTypes.Product) : async Common.ProductId {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let id = CatalogLib.addProduct(products, products.size(), product);
    id;
  };

  public shared ({ caller }) func updateProduct(product : CatalogTypes.Product) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    CatalogLib.updateProduct(products, product);
  };

  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    CatalogLib.deleteProduct(products, id);
  };
};
