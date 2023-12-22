import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Collection from "@/components/shared/Collection";
import { auth } from "@clerk/nextjs";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/mongodb/database/models/order.model";
import { SearchParamProps } from "@/types";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.ordersPage) || 1;
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });
  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedEvents =
    orders?.data.map((orders: IOrder) => {
      orders.event;
    }) || [];
  return (
    <>
      {/*My Tickets Section*/}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild className="button hidden sm:flex" size="lg">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8 ">
        <Collection
          data={orderedEvents}
          emptyTitle="No Events tickets purchased yet"
          emptyStateSubtext="No worries plenty of exiting events to explore ;)"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/*Events Organized*/}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild className="button hidden sm:flex" size="lg">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8 ">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No Events Have Been Created Yet"
          emptyStateSubtext="Go Create Some Now  ;)"
          collectionType="Events_Organized"
          limit={6}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  );
};
export default ProfilePage;
