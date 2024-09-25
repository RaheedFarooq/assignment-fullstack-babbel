import axios from "axios";
import { ENDPOINT } from "./contants";
import { IGetUserEmailRequest, IGetUserEmailResponse } from "../types";

export const getUserEmail = async (
  userData: IGetUserEmailRequest
): Promise<IGetUserEmailResponse> => {
  try {
    const response = await axios.get(ENDPOINT.EMAIL, { params: userData });
    return response.data.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const saveUserEmail = async (userEmailData: {
  email: string;
  fullName: string;
}) => {
  try {
    const response = await axios.post(ENDPOINT.EMAIL, userEmailData);
    return response.data;
  } catch (error) {
    console.log("Error saving user email");
    throw error;
  }
};
