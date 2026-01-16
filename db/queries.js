import { eventModel } from "@/models/event-modal";
import { replaceMongoIdInArray } from "@/utils/data-util";

export const getAllEvents = async () => {
  const allEvents = await eventModel.find();
  return replaceMongoIdInArray(allEvents);
};
