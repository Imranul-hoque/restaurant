/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Utensils } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"


const verifySchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

const formSchema = z.object({
  username: z.string().min(2, { message: "Atleast 2 charechter require." }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
});

export default function RegistrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();
    const { toast } = useToast();
    
    const verifyForm = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      pin: "",
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    if (!isLoaded) {
      return;
    }

    try {
        await signUp.create({
            emailAddress: values.email,
            password: values.password,
            username: values.username
        });

        await signUp.prepareEmailAddressVerification({
            strategy: "email_code"
        });

        setVerifying(true)

    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
    };

    const handleVerify = async (data : z.infer<typeof verifySchema>) => {
        

        if (!isLoaded) {
            return;
        }

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
              code : data.pin,
            });

            if (signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.push("/")
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (error) {
            
        }
    }

  if (verifying) {
    return (
      <div className="w-full h-[97vh] flex items-center justify-center">
        <Form {...verifyForm}>
          <form
            onSubmit={verifyForm.handleSubmit(handleVerify)}
            className="max-w-xl space-y-6"
          >
            <FormField
              control={verifyForm.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold flex items-center justify-center">
                    Enter your OTP
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot className="w-14 h-14" index={0} />
                        <InputOTPSlot className="w-14 h-14" index={1} />
                        <InputOTPSlot className="w-14 h-14" index={2} />
                        <InputOTPSlot className="w-14 h-14" index={3} />
                        <InputOTPSlot className="w-14 h-14" index={4} />
                        <InputOTPSlot className="w-14 h-14" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full cursor-pointer">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary p-2">
              <Utensils className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Restoria</CardTitle>
          <CardDescription>
            Enter your credentials to access the feature
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="'Jhon doe'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@restaurant.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div id="clerk-captcha"></div>

              <Button
                type="submit"
                className="cursor-pointer w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  "Signup"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Demo credentials: admin@restaurant.com / password
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
