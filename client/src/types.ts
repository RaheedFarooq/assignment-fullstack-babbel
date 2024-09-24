import { ONBOARDING_STEP } from "./constants";

export interface UserData {
  firstName: string;
  lastName: string;
  fullName: string;
  email: Array<string>;
  domain: string;
}

export interface IGetUserEmailRequest {
  firstName: string;
  lastName: string;
  domain: string;
}

export interface IGetUserEmailResponse {
  email: Array<string>;
  fullName: string;
  isNew: boolean;
}

export type TOnboardingStep =
  (typeof ONBOARDING_STEP)[keyof typeof ONBOARDING_STEP];
