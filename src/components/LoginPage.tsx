import React from "react";
import Card from "./atoms/Card";
import Input from "./atoms/Input";
import Button from "./atoms/Button";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-6">
          <div>
            <Input type="email" label="Email" fullWidth />
          </div>
          <div>
            <Input type="password" label="Password" fullWidth />
          </div>
          <Button type="submit" fullWidth>
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
