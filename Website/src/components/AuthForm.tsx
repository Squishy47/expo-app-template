import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useAuthDialog } from "../hooks/useLoginDialog";

const FormSchema = z.object({
    email: z.string().email(),
});

export type AuthFormTypes = z.infer<typeof FormSchema>;

export function AuthForm({ onSubmit, isLoading = false }: { onSubmit: (data: AuthFormTypes) => void; isLoading: boolean }) {
    const form = useForm<AuthFormTypes>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full max-w-screen-md ">
                <div className="space-y-6 h-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {!isLoading ? "Submit" : "Loading..."}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export enum AuthPage {
    Login = "Login",
    Signup = "Signup",
}

export function AuthFormHeader({ page }: { page: AuthPage }) {
    return (
        <div className="bg-slate-100 h-96 flex place-content-center">
            <div className="h-full">
                <div className="h-4/5 content-center text-center text-2xl">
                    <h1>{page}</h1>
                </div>
            </div>
        </div>
    );
}

export function AuthFormPage({
    onSubmit,
    isLoading = false,
    page,
    hasSubmitted = false,
    resetSubmitted,
}: {
    onSubmit: (data: AuthFormTypes) => void;
    isLoading: boolean;
    page: AuthPage;
    hasSubmitted: boolean;
    resetSubmitted: () => void;
}) {
    const { setTitle } = useAuthDialog();

    const isLogin = page === AuthPage.Login;

    return (
        <div className="flex flex-col grow lg:mx-auto flex-grow w-full">
            <AuthFormHeader page={page} />

            <div className="m-2">
                {hasSubmitted ? (
                    <div className="text-center">
                        <h1>We've send a link to you email. please click that link to continue.</h1>
                        <Button onClick={resetSubmitted} variant={"link"}>
                            email not arrived? click here
                        </Button>
                    </div>
                ) : (
                    <AuthForm onSubmit={onSubmit} isLoading={isLoading} />
                )}
            </div>
            {!hasSubmitted && (
                <Button variant="link" onClick={() => setTitle(isLogin ? "Signup" : "Login")}>
                    {isLogin ? "Not got an account? Click here." : "Already got an account? Click here."}
                </Button>
            )}
        </div>
    );
}
