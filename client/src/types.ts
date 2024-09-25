import { ONBOARDING_STEP } from "./constants";

export type TOnboardingStep =
  (typeof ONBOARDING_STEP)[keyof typeof ONBOARDING_STEP];

export interface IUserData {
  firstName: string;
  lastName: string;
  fullName: string;
  email: Array<string>;
  domain: string;
  onboardingStep?: TOnboardingStep;
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
