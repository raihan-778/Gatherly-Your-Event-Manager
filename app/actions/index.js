"use server";
import {
  createUser,
  findUserByCredentials,
  updateInterest,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
};

export { addInterestedEvent, performLogin, registerUser };
