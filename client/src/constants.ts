export const ONBOARDING_STEP = {
    USER_FORM : "USER_FORM",
    EMAIL_SELECT: "EMAIL_SELECT",
    SUCCESS: "SUCCESS"
};

export const DEFAULT_USER_DATA = {
    firstName: "",
    lastName: "",
    fullName: "",
    email: [],
    domain: "",
    onboardingStep: ONBOARDING_STEP.USER_FORM,
  };