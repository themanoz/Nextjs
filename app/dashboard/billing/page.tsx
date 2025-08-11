"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Button } from "@/components/ui/button";
import BillingData from "@/components/BillingData";

interface SubscriptionProps {
  status: string;
  interval: string;
  amount: number;
  trialEnd: Date;
  customerEmail: string;
  customerName: string;
  nextBillingDate: Date;
}

function Billing() {
  const [subscription, setSubscription] = useState<SubscriptionProps>();

  useEffect(() => {
    async function fetchSubscription() {
      const response = await axios.get("/api/subscription");
      setSubscription(response.data);
    }
    fetchSubscription();
  }, []);

  const amount = subscription?.amount
    ? (subscription.amount / 100).toFixed(0)
    : "0";

  return (
    <section className="px-8 py-4">
      <h2 className="text-xl">Billing</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Manage your billing information and invoices
      </p>
      {subscription && (
        <>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-48">
            <div className="mt-4 space-y-2">
              <div>
                <div className="flex items-center gap-2">
                  <p>Basic Plan</p>
                  <Badge className="py-[1.8px] rounded-full text-xs px-[6px]">
                    {subscription.status}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  ${(subscription.amount / 100).toFixed(0)} /{" "}
                  {subscription.interval}
                </span>
              </div>
              <Button size={"sm"} variant={"secondary"}>
                Explore Plans
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <div>
                <p>Billing Period</p>
                <span className="text-sm text-muted-foreground">
                  {subscription.interval}ly (renews on{" "}
                  {subscription &&
                    new Date(subscription.trialEnd).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  )
                </span>
              </div>
              <Button size={"sm"} variant={"secondary"}>
                Change to annual billing
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <h2>Billing details</h2>
            <div className="mt-2">
              <label className="pt-4">Name</label>
              <p className="text-sm text-muted-foreground">
                {subscription.customerName
                  .split(" ")
                  .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                  .join(" ")}
              </p>
              <label>Email</label>
              <p className="text-sm text-muted-foreground">
                {subscription.customerEmail || "Not provided"}
              </p>
            </div>
            <Button size={"sm"} variant={"secondary"} className="mt-2">
              Update billing details
            </Button>
          </div>
          <div className="mt-6 space-y-2">
            <h2>Billing history</h2>
            <p className="text-xs text-muted-foreground">
              Please reach out to our team{" "}
              <span className="text-green-600">billing@gittrek.com</span> with
              questions
            </p>
            <BillingData amount={amount} />
          </div>
        </>
      )}
    </section>
  );
}

export default Billing;
