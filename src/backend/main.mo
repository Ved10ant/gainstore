import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "types/common";
import CatalogTypes "types/catalog";
import CartTypes "types/cart";
import OrderTypes "types/orders";
import ProfileTypes "types/profile";
import CatalogLib "lib/catalog";
import CatalogMixin "mixins/catalog-api";
import CartMixin "mixins/cart-api";
import OrdersMixin "mixins/orders-api";
import ProfileMixin "mixins/profile-api";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Product catalog state
  let products = Map.empty<Common.ProductId, CatalogTypes.Product>();

  // Shopping cart state (one list of items per user)
  let carts = Map.empty<Principal, List.List<CartTypes.CartItem>>();

  // Orders state
  let orders = Map.empty<Common.OrderId, OrderTypes.Order>();

  // User profiles state
  let profiles = Map.empty<Principal, ProfileTypes.UserProfile>();

  // Seed tracking
  var seeded : Bool = false;

  // Stripe configuration
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Seed products on first deploy
  if (not seeded) {
    ignore CatalogLib.seedProducts(products, 0);
    seeded := true;
  };

  // Mixins
  include CatalogMixin(accessControlState, products);
  include CartMixin(accessControlState, carts);
  include OrdersMixin(accessControlState, products, carts, orders);
  include ProfileMixin(accessControlState, profiles, orders);

  // Stripe functions (must be declared directly in the actor)
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let config = switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config = switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
