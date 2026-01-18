"use server";

import {
  createUser,
  findUserByCredentials,
  getEventById,
  updateGoings,
  updateInterest,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

// when we want to use any serverside actions like form submit, add ,delete, update, we have to mention the page explicitly as server site using"use server" .That means this actions only executed in server side.

const registerUser = async (formData) => {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  console.log("created User", created);
  redirect("/login");
};

const performLogin = async (formData) => {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredentials(credential);

    return found;
  } catch (error) {
    throw error;
  }
};

const addInterestedEvent = async (eventId, authId) => {
  try {
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
  redirect("/");
};

const addGoingEvent = async (eventId, user) => {
  try {
    await updateGoings(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (err) {
    throw err;
  }
  revalidatePath("/");
  redirect("/");
};

const sendEmail = async (eventId, user) => {
  try {
    console.log(eventId, user, process.env.RESEND_API_KEY);
    const event = await getEventById(eventId);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
    const sent = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: user?.email,
      subject: "Successfully Registered for the event!",
      // react: EmailTemplate({ message }),
      html: `<strong>${message}</strong>`,
    });
  } catch (error) {
    throw error;
  }
};

export {
  addGoingEvent,
  addInterestedEvent,
  performLogin,
  registerUser,
  sendEmail,
};
