import SiteProvider from "@/src/providers/site";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <SiteProvider>{children}</SiteProvider>;
};

export default RootLayout;