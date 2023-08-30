import { Storage } from "@/types/storage.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { HiEye } from "react-icons/hi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CardDetailsProps {
  dataStorage: Storage;
  clickFunction?: () => void;
}

export const CardDetailStorageComponent = ({
  dataStorage,
  clickFunction,
}: CardDetailsProps) => {
  return (
    <Card className="bg-primary-foreground border-none w-96 m-auto">
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardContent className="flex flex-col gap-5">
          <div>
            <Label>Local de uso:</Label>
            <Input
              readOnly
              value={dataStorage.props.usageLocation}
              className="outline-none text-red-800 font-semibold items-center"
            />
          </div>
          <div>
            <Label>Username:</Label>
            <Input
              readOnly
              value={dataStorage.props.account}
              className="outline-none text-red-800 font-semibold items-center"
            />
          </div>
          <div>
            <Label>Senha:</Label>
            <div className="flex items-center gap-2 border rounded-md">
              <Input
                readOnly
                value={"******"}
                className="outline-none text-red-800 font-semibold items-center border-none"
              />
              <span className="mr-5">
                <HiEye cursor={"pointer"} onClick={clickFunction} />
              </span>
            </div>
          </div>
          <div>
            <Label>Link:</Label>
            <Input
              readOnly
              value={dataStorage.props.link}
              className="outline-none text-red-800 font-semibold items-center"
            />
          </div>
          <div>
            <Label>Description:</Label>
            <Textarea
              readOnly
              value={dataStorage.props.description}
              className="outline-none text-red-800 font-semibold items-center max-h-20"
            />
          </div>
        </CardContent>
      </CardHeader>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
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
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
