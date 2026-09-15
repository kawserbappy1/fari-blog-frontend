import Logo from "@/components/shared/navbar/Logo";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div>
      <Logo />
      {children}
    </div>
  );
};

export default PublicLayout;
