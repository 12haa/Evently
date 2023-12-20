"use server";

import { CreateEventParams } from "@/types";
import { connectToDatabase } from "@/lib/mongodb/database";
import User from "@/lib/mongodb/database/models/user.model";
import Event from "@/lib/mongodb/database/models/event.model";
import { handleError } from "@/lib/utils";

export const createEvent = async ({
  path,
  event,
  userId,
}: CreateEventParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Could not find organizer");
    }

    console.log({
      categoryId: event.categoryId,
      organizerId: userId,
    });
    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    return JSON.parse(JSON.stringify(event));
  } catch (err) {
    console.log(err);
    handleError(err);
  }
};
