import { readFile, writeFile } from "fs/promises";
import { IUser } from "./types";
import path from "path";

const dataPath = path.resolve(__dirname, "./data.json");

export const getAllFromJson = async (): Promise<Record<string, string>> => {
  try {
    const data = await readFile(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    throw new Error("Error reading or parsing data file");
  }
};

export const getByDomain = async (domain: string): Promise<IUser | null> => {
  try {
    const jsonData = await getAllFromJson();
    for (const [name, email] of Object.entries(jsonData)) {
      if (email.endsWith(`@${domain}`)) {
        return { name, email };
      }
    }
    return null;
  } catch (error) {
    console.error("Error in getByDomain:", error);
    return null;
  }
};

export const saveToJson = async (
  name: string,
  email: string
): Promise<boolean> => {
  try {
    const jsonData = await getAllFromJson();
    jsonData[name] = email;
    await writeFile(dataPath, JSON.stringify(jsonData, null, 2));
    return true;
  } catch (error) {
    throw new Error("error saving email");
  }
};
