export const clientAuthGuard = (to, from, next) => {
  const tokenExists = $cookies.isKey("client_khadamat_user");
  if (tokenExists) {
    // Token exists, redirect to contracts page
    next({ name: "client-dashboard" });
  } else {
    // Token doesn't exist, allow navigation to the requested route
    next();
  }
};

export const clientGuestGuard = (to, from, next) => {
  const tokenExists = $cookies.isKey("client_khadamat_user");
  if (!tokenExists) {
    next({ name: "client-login" });
  } else {
    next();
  }
};

export const clientRolesGuard = async (to, from, next) => {
  const userRoles = $cookies.get("client_khadamat_user").role.toLowerCase();
  const requiredRoles = to.meta.roles;
  const hasRole = requiredRoles.includes(userRoles);
  if (hasRole) {
    next();
  } else {
    next({ name: "client-dashboard" });
  }
};
