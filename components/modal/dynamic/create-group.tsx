import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { ImagePicker } from "../../input/ImagePicker";
import TextField from "../../input/TextField";
import { Button } from "../../system/button";
import { label } from "../../system/text";

export default function Content({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState<string | null>(null);
    const create = trpc.group.create.useMutation({
        onSuccess: onClose,
    });

    return (
        <>
            <form className="mt-8 space-y-2">
                <fieldset>
                    <label htmlFor="icon" className="sr-only">
                        Icon
                    </label>
                    <ImagePicker
                        id="icon"
                        value={icon}
                        onChange={(v) => setIcon(v)}
                        previewClassName="mx-auto w-[120px] aspect-square flex flex-col gap-3 items-center"
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="firstName" className={label()}>
                        Name
                        <span className="text-red-400 mx-1 text-base">*</span>
                    </label>
                    <TextField
                        id="firstName"
                        placeholder="My Group"
                        autoComplete="given-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-required
                    />
                </fieldset>
            </form>

            <div className="mt-4 flex justify-end">
                <Button
                    color="primary"
                    onClick={() =>
                        create.mutate({
                            name,
                            icon: icon ?? undefined,
                        })
                    }
                    isLoading={create.isLoading}
                    disabled={create.isLoading || name.trim().length === 0}
                >
                    Save
                </Button>
            </div>
        </>
    );
}
