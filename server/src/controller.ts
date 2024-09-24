import { Response } from "express";
import { getByDomain, saveToJson } from "./model";
import {
  generateUserEmail,
  getEmailType,
  validateDomain,
  validateEmail,
} from "./utils";
import { IGetUserEmailReq, IPostUserEmailReq } from "./types";

const handleError = (status: number, message: string, res: Response) => {
  res.status(status).json({
    message,
  });
};

export const getUserEmail = async (req: IGetUserEmailReq, res: Response) => {
  try {
    const { firstName, lastName, domain } = req.query;

    if (!(firstName && lastName && domain && validateDomain(domain))) {
      return handleError(
        400,
        "Missing or Invalid query parameters: firstName, lastName and/or domain.",
        res
      );
    }

    const colleague = await getByDomain(domain);

    if (colleague) {
      const emailFormat = getEmailType({ ...colleague, domain });
      const userEmail = generateUserEmail({
        firstName,
        lastName,
        domain,
        emailFormat,
      });
      return res.status(200).json({
        message: "User email generated",
        data: {
          name: `${firstName} ${lastName}`,
          email: [userEmail],
          isNew: false,
        },
      });
    }

    const potentialEmails = [
      generateUserEmail({
        firstName,
        lastName,
        domain,
        emailFormat: "INITIAL",
      }),
      generateUserEmail({
        firstName,
        lastName,
        domain,
        emailFormat: "FULLNAME",
      }),
    ];

    return res.status(200).json({
      message: "Potential emails generated",
      data: {
        fullName: `${firstName} ${lastName}`,
        email: potentialEmails,
        isNew: true,
      },
    });
  } catch (err) {
    handleError(500, "Oops, something went wrong", res);
  }
};

export const saveNewEmail = async (req: IPostUserEmailReq, res: Response) => {
  const { fullName, email } = req.body;
  if (!(email && fullName)) {
    return handleError(
      400,
      "Missing required parameters: fullName and email are required.",
      res
    );
  }

  if (!validateEmail(email)) {
    return handleError(400, "Invalid email format", res);
  }

  try {
    await saveToJson(fullName, email);
    res.status(201).json({ message: "Success" });
  } catch (err) {
    handleError(
      500,
      "Oops! Something went wrong. Unable to save user email",
      res
    );
  }
};
