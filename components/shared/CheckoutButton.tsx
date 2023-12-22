"use client";
import React from "react";
import { IEvent } from "@/lib/mongodb/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Checkout from "@/components/shared/Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  return (
    <div className="flex items-center gap-3 md:gap-5">
      {/* Cannot Buy Past Event */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry , Tickets are no longer available
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="ut-button: rounded-full " size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
