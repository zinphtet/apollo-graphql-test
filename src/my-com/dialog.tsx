import { UPDATE_USER } from "@/apollo/query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@apollo/client";
import { useRef } from "react";

type EditBtnType = {
  name: string;
  id: string;
};

export const EditBtn: React.FC<EditBtnType> = ({ name, id }) => {
  const nameRef = useRef<HTMLInputElement>(null);

  const [updateFn, { loading, error }] = useMutation(UPDATE_USER);

  const onSave = () => {
    console.log("name", nameRef.current?.value, id);
    updateFn({
      variables: {
        data: {
          name: {
            set: nameRef.current?.value,
          },
        },
        where: {
          id,
        },
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              ref={nameRef}
              defaultValue={name}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSave} disabled={loading}>
            Save changes
          </Button>
          {error && <div>Error occured while updating</div>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
