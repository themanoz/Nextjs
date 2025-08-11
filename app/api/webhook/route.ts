import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { dodopayments } from "@/lib/dodopayments";
import { prisma } from "@/lib/prisma";

const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY!);

export async function POST(request: Request) {
  const headersList = await headers();

  try {
    const rawBody = await request.text();
    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    };
    await webhook.verify(rawBody, webhookHeaders);
    const payload = JSON.parse(rawBody);

    if (payload.data.payload_type === "Subscription") {
      const subscriptionId = payload.data.subscription_id;
      switch (payload.type) {
        case "subscription.active":
          try {
            const subscription = await dodopayments.subscriptions.retrieve(
              subscriptionId
            );
            console.log("-------SUBSCRIPTION DATA START ---------");
            console.log(subscription);

            const user = await prisma.user.findUnique({
              where: { email: subscription.customer.email },
            });

            if (!user) {
              console.error(
                `User with email ${subscription.customer.email} not found`
              );
              break;
            }

            const existingSub = await prisma.subscription.findUnique({
              where: { externalSubscriptionId: subscription.subscription_id },
            });

            console.log("existingSub: ", existingSub);

            if (!existingSub) {
              const trialStartDate = new Date(subscription.created_at);
              const trialEndDate = new Date(
                trialStartDate.getTime() +
                  (subscription.trial_period_days || 7) * 24 * 60 * 60 * 1000
              );

              const newSub = await prisma.subscription.create({
                data: {
                  status:
                    subscription.trial_period_days > 0 ? "TRIAL" : "ACTIVE",
                  externalSubscriptionId: subscription.subscription_id,
                  subscriptionId: subscription.subscription_id,
                  productId: subscription.product_id,
                  userId: user.id,
                  // Customer information
                  customerEmail: subscription.customer.email,
                  customerName: subscription.customer.name,
                  customerId: subscription.customer.customer_id,

                  // Subscription details
                  currency: subscription.currency,
                  amount: subscription.recurring_pre_tax_amount,
                  interval:
                    subscription.payment_frequency_interval.toLowerCase(),
                  intervalCount: subscription.payment_frequency_count,

                  // Dates
                  trialStart: trialStartDate,
                  trialEnd: trialEndDate,
                  currentPeriodStart: trialStartDate,
                  currentPeriodEnd: new Date(subscription.next_billing_date),
                  nextBillingDate: new Date(subscription.next_billing_date),
                },
              });
              console.log("new Subscription created: ", newSub);
            } else {
              // Update existing subscription
              await prisma.subscription.update({
                where: { id: existingSub.id },
                data: {
                  status: "ACTIVE",
                  currentPeriodStart: new Date(subscription.created_at),
                  currentPeriodEnd: new Date(subscription.next_billing_date),
                  nextBillingDate: new Date(subscription.next_billing_date),
                },
              });
              console.log("Subscription updated to ACTIVE");
            }
            console.log("-------SUBSCRIPTION DATA END ---------");
          } catch (subError) {
            console.error("Error processing subscription.active:", subError);
          }
          break;
        case "subscription.renewed": {
          console.log("Subscription renewed event:", payload);
          // Assume payload.data.current_period_end contains the new end date.
          // const newEndDate = payload.data.current_period_end
          //   ? new Date(payload.data.current_period_end)
          //   : null;
          break;
        }
        case "subscription.on_hold": {
          console.log("Subscription on hold event:", payload);
          // Mark as expired to revoke access to the dashboard.
          break;
        }
        default:
          break;
      }
    } else if (payload.data.payload_type === "Payment") {
      switch (payload.type) {
        case "payment.succeeded":
          const paymentDataResp = await dodopayments.payments.retrieve(
            payload.data.payment_id
          );
          console.log("-------PAYMENT DATA START ---------");
          console.log(paymentDataResp);
          console.log("-------PAYMENT DATA END ---------");
          break;
        default:
          break;
      }
    }
    return Response.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(" ----- webhoook verification failed -----");
    console.log(error);
    return Response.json(
      { message: "Webhook verification failed" },
      { status: 500 }
    );
  }
}
