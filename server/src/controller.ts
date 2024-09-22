import { Request, Response } from "express";
import { getByDomain } from "./model";
import { getEmailType, generateUserEmail } from "./utils";

export const getUserEmail = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, domain } = req.query as {
      firstName: string;
      lastName: string;
      domain: string;
    };

    if (!(firstName && lastName && domain)) {
      res.status(400).json({
        message:
          "Missing or Invalid query parameters: firstName, lastName and/or domain!",
      });
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
    res.status(400).json({
      message:
        "Missing or Invalid query parameters: firstName, lastName and/or domain!",
    });
  }
};
