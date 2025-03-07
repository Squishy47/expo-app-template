import { Button } from "./ui/button";

import { useSignout } from "../hooks/useSignout";

export function SignoutButton() {
    const signoutMutation = useSignout();

    return (
        <Button className="w-full" variant={"destructive"} onClick={() => signoutMutation.mutate()}>
            Signout
        </Button>
    );
}
