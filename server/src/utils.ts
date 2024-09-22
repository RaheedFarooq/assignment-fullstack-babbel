import { EmailFormat, IUser } from "./types";

export const getEmailType = ({ name, email, domain }: IUser): EmailFormat => {
    let defaultEmailFormat = `${name
      .split(" ")
      .join("")
      .toLowerCase()}@${domain}`;
  
      return email === defaultEmailFormat ? "FULLNAME" : "INITIAL";
  };

  export const generateUserEmail = ({
    firstName,
    lastName,
    domain,
    emailFormat,
  }: {
    firstName: string;
    lastName: string;
    domain: string;
    emailFormat: EmailFormat;
  }) : string => {
    let emailSuffix = firstName + lastName;
    if (emailFormat === "INITIAL") emailSuffix = firstName[0] + lastName;
    return `${emailSuffix}@${domain}`.toLowerCase();
  };
  
  export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validateDomain = (domain: string): boolean => {
    return domain.split(".").length >= 2;
  };
  