import { eventModel } from "@/models/event-model";
import { userModel } from "@/models/user-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

const getAllEvents = async () => {
  const allEvents = await eventModel.find().lean(); //here using link has been removed all metadata related to mongodb except the field you defined. so here no other mongodb method will work.so be carefull while using this lean method

  return replaceMongoIdInArray(allEvents);
};

const getEventById = async (eventId) => {
  const eventDetails = await eventModel.findById(eventId).lean();

  return replaceMongoIdInObject(eventDetails);
};

const createUser = async (formData) => {
  const user = await userModel.create(formData);

  return user;
};
const findUserByCredentials = async (credentials) => {
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
};

async function updateInterest(eventId, authId) {
  const event = await eventModel.findById(eventId);

  if (event) {
    const foundUsers = event.interested_ids.find(
      (id) => id.toString() === authId,
    );

    if (foundUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }

    event.save();
  }
}
async function updateGoings(eventId, authId) {
  const event = await eventModel.findById(eventId);

  if (event) {
    const foundUsers = event.going_ids.find((id) => id.toString() === authId);

    if (foundUsers) {
      event.going_ids.push(new mongoose.Types.ObjectId(authId));
    }

    event.save();
  }
}

export {
  createUser,
  findUserByCredentials,
  getAllEvents,
  getEventById,
  updateInterest,
};
