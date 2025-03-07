import { Copy } from "lucide-react";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { useShareDialog } from "../hooks/useShareDialog";

export function ShareDialog() {
    const { isOpen, onClose, data } = useShareDialog();

    const shareUrl = `${import.meta.env.VITE_LOGIN_REDIRECT_URL}/join/${data?.id}?access_code=${data?.access_code}&eventName=${data?.name}`;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Share this link with others so they can access the event track page.
                        <br />
                        Anyone who has this link will be able to view all info about this event including all people and tasks.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input id="link" defaultValue={shareUrl} readOnly />
                    </div>
                    <Button type="submit" size="sm" className="px-3" onClick={() => copyToClipboard(shareUrl)}>
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
