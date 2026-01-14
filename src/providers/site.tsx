import { ReactNode } from "react";

const SiteProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>{children}</>
  );
};

export default SiteProvider;