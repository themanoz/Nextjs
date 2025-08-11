import DodoPayments from "dodopayments";

export const dodopayments = new DodoPayments({
  bearerToken: process.env.DODO_API_KEY_TEST,

  environment:
    process.env.NODE_ENV === "development" ? "test_mode" : "live_mode",
});