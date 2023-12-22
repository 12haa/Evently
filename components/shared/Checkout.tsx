import React from "react";
import { IEvent } from "@/lib/mongodb/database/models/event.model";
import { Button } from "@/components/ui/button";

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const onCheckOut = async () => {
    console.log("checkout");
  };

  return (
    <form action={onCheckOut} method="post">
      <Button
        type="submit"
        role="link"
        size="lg"
        className="ut-button: sm:w-fit"
      >
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
};

export default Checkout;
