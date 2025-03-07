import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

import supabase from "../hooks/useSupabase";
import { useAuthDialog } from "../hooks/useLoginDialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export function AuthDialog() {
    const { isOpen, onClose, title, redirectUrl } = useAuthDialog();

    return (
        <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                        extend: true,
                        variables: {
                            default: {
                                radii: {
                                    buttonBorderRadius: "1rem",
                                    borderRadiusButton: "1rem",
                                    inputBorderRadius: "1rem",
                                },
                                colors: {
                                    brandAccent: "hsl(346.8 77.2% 49.8%)",
                                    brand: "hsl(346.8 77.2% 49.8%)",
                                },
                            },
                        },
                    }}
                    providers={[]}
                    magicLink
                    view={"magic_link"}
                    showLinks={false}
                    redirectTo={redirectUrl}
                />
            </DialogContent>
        </Dialog>
    );
}
