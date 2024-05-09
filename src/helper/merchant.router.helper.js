export const merchantAuthGuard = (to, from, next) => {
  const tokenExists = $cookies.isKey("merchant_khadamat_user");
  if (tokenExists) {
    // Token exists, redirect to contracts page
    next({ name: "merchant-dashboard" });
  } else {
    // Token doesn't exist, allow navigation to the requested route
    next();
  }
};

export const merchantGuestGuard = (to, from, next) => {
  const tokenExists = $cookies.isKey("merchant_khadamat_user");
  if (!tokenExists) {
    next({ name: "merchant-login" });
  } else {
    next();
  }
};

export const merchantRolesGuard = async (to, from, next) => {
  const userRoles = $cookies.get("merchant_khadamat_user").role.toLowerCase();
  const requiredRoles = to.meta.roles;
  const hasRole = requiredRoles.includes(userRoles);
  if (hasRole) {
    next();
  } else {
    next({ name: "merchant-dashboard" });
  }
};
