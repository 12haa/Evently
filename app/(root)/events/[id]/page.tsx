import React from "react";
import { SearchParamProps } from "@/types";
import { getEventById } from "@/lib/actions/event.actions";

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  console.log(id, "im ID");
  const event = await getEventById(id);
  console.log(event, "im Event Details");
  return <div>EventDetails</div>;
};
export default EventDetails;
