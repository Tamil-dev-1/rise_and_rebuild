const MEMBERSHIP_PERMISSIONS = {
  community: [
    "transformation",
    "inner-circle",
    "annual-pass",
  ],

  liveQna: [
    "transformation",
    "inner-circle",
    "annual-pass",
  ],

  accountability: [
    "transformation",
    "inner-circle",
    "annual-pass",
  ],

  bonusContent: [
    "transformation",
    "inner-circle",
    "annual-pass",
  ],

  smallGroup: [
    "inner-circle",
    "annual-pass",
  ],

  monthlyAccountability: [
    "inner-circle",
    "annual-pass",
  ],

  priorityQna: [
    "inner-circle",
    "annual-pass",
  ],

  twelveMonthJourney: [
    "annual-pass",
  ],
};

export const hasMembershipPermission = (
  planId,
  permission
) => {
  if (!planId || !permission) {
    return false;
  }

  const allowedPlans =
    MEMBERSHIP_PERMISSIONS[permission];

  if (!allowedPlans) {
    return false;
  }

  return allowedPlans.includes(planId);
};

export default MEMBERSHIP_PERMISSIONS;