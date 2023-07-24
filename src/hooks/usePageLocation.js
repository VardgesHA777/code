import { matchRoutes, useLocation } from "react-router-dom";

export const useIsExpectedPage = (expectedRoute) => {
  const location = useLocation();

  let routesPath = [{ path: expectedRoute }] || [];

  if (typeof expectedRoute === "object") {
    routesPath = expectedRoute.map((expRoute) => {
      return { path: expRoute };
    });
  }

  return !!matchRoutes(routesPath, location);
};
