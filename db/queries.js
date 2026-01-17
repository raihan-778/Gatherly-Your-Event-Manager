import { eventModel } from "@/models/event-modal";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export const getAllEvents = async () => {
  const allEvents = await eventModel.find().lean(); //here using link has been removed all metadata related to mongodb except the field you defined. so here no other mongodb method will work.so be carefull while using this lean method

  return replaceMongoIdInArray(allEvents);
};

export const getEventById = async (eventId) => {
  const eventDetails = await eventModel.findById(eventId).lean();
  console.log("details", eventDetails);
  return replaceMongoIdInObject(eventDetails);
};
