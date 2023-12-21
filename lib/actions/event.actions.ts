"use server";

import { CreateEventParams } from "@/types";
import { connectToDatabase } from "@/lib/mongodb/database";
import User from "@/lib/mongodb/database/models/user.model";
import Event from "@/lib/mongodb/database/models/event.model";
import { handleError } from "@/lib/utils";
import Category from "@/lib/mongodb/database/models/category.model";
import { revalidatePath } from "next/cache";

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    // revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}
export async function getEventById(eventId: string) {
  try {
    await connectToDatabase();
    const event = await populateEvent(Event.findById(eventId));

    if (!event) {
      console.log("Could not find event");
    }
    return JSON.parse(JSON.stringify(event));
  } catch (err) {
    console.log(err, "im Erro`r from event acrion");
  }
}
