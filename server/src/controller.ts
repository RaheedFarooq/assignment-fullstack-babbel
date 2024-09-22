import { Response } from "express";
import { getByDomain, saveToJson } from "./model";
import { getEmailType, generateUserEmail } from "./utils";
import { IGetUserEmailReq, IPostUserEmailReq } from "./types";

const handleError = (status: number, message: string, res: Response) => {
  res.status(status).json({
    message,
  });
};

export const getUserEmail = async (req: IGetUserEmailReq, res: Response) => {
  try {
    const { firstName, lastName, domain } = req.query as {
      firstName: string;
      lastName: string;
      domain: string;
    };

    if (!(firstName && lastName && domain)) {
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
        name: `${firstName} ${lastName}`,
        email: potentialEmails,
        isNew: true,
      },
    });
  } catch (err) {
    handleError(500, "Oops, something went wrong", res);
  }
};

export const saveNewEmail = async (req: IPostUserEmailReq, res: Response) => {
  const { name, email } = req.body;
  if (!(email && name)) {
    return handleError(
      400,
      "Missing required parameters: name and email are required.",
      res
    );
  }

  try {
    await saveToJson(name, email);
    res.status(201).json({ message: "Success" });
  } catch (err) {
    handleError(
      500,
      "Oops! Something went wrong. Unable to save user email",
      res
    );
  }
};
