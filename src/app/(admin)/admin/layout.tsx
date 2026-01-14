import AdminProvider from "@/src/providers/admin";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminProvider>{children}</AdminProvider>;
};

export default RootLayout;