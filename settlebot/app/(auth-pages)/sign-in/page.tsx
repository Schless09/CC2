import { signInAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignIn({ searchParams }: { searchParams: { message?: string } }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form className="flex flex-col">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign in to SettleBot.ai</h1>
          <p className="text-sm text-gray-600 mb-8 text-center">
            Don't have an account?{" "}
            <Link className="text-blue-600 font-medium hover:underline" href="/sign-up">
              Sign up
            </Link>
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email" 
                type="email"
                placeholder="you@example.com" 
                required 
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="password">Password</Label>
                <Link
                  className="text-xs text-blue-600 hover:underline"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                required
              />
            </div>
            <SubmitButton pendingText="Signing In..." formAction={signInAction}>
              Sign in
            </SubmitButton>
            {searchParams?.message && (
              <FormMessage message={{ type: searchParams.message.startsWith('error:') ? 'error' : 'success', text: searchParams.message.replace(/^(error|success):/, '') }} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}