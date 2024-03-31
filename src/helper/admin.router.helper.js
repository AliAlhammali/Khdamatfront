export const adminAuthGuard = (to, from, next) => {
  const tokenExists = $cookies.isKey("admin_khadamat_user");
  if (tokenExists) {
    // Token exists, redirect to contracts page
    next({ name: "admin-dashboard" });
  } else {
    // Token doesn't exist, allow navigation to the requested route
    next();
  }
};

export const adminGuestGuard = (to, from, next) => {
  const tokenExists = $cookies.isKey("admin_khadamat_user");
  if (!tokenExists) {
    next({ name: "admin-login" });
  } else {
    next();
  }
};
