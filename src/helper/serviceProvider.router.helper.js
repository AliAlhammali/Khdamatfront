export const serviceProviderAuthGuard = (to, from, next) => {
  const tokenExists = $cookies.isKey("service_provider_khadamat_user");
  if (tokenExists) {
    // Token exists, redirect to contracts page
    next({ name: "service-provider-dashboard" });
  } else {
    // Token doesn't exist, allow navigation to the requested route
    next();
  }
};

export const serviceProviderGuestGuard = (to, from, next) => {
  const tokenExists = $cookies.isKey("service_provider_khadamat_user");
  if (!tokenExists) {
    next({ name: "service-provider-login" });
  } else {
    next();
  }
};

export const SPRolesGuard = async (to, from, next) => {
  const userRoles = $cookies
    .get("service_provider_khadamat_user")
    .role.toLowerCase();
  const requiredRoles = to.meta.roles;
  const hasRole = requiredRoles.includes(userRoles);
  if (hasRole) {
    next();
  } else {
    next({ name: "service-provider-dashboard" });
  }
};
