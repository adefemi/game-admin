"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "../common/logo";
import { axiosHander } from "@/lib/handlers";
import { auth } from "@/lib/network";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type LoginProps = {
  email: string;
  password: string;
};

const login = async (data: LoginProps) => {
  const { data: response } = await axiosHander<{ token: string }>(
    auth.login,
    "POST",
    data,
    true
  );
  return response;
};

export default function Login() {
  const router = useRouter();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("token", data?.token);
      router.push("/games");
    },
    onError: (e: any) => {
      toast.error(e.response?.data.error || e.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: LoginProps = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    mutate(data);
  };
  return (
    <Card className="max-w-sm mx-auto my-auto">
      <div className="flex items-center justify-center">
        <Logo classContent="w-20 mt-6" />
      </div>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your admin credentials to access the control panel.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              name="email"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" required type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
