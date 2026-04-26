import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-lg h-screen flex flex-col justify-center px-5">
      {children}
    </div>
  );
};

export default AuthLayout;
