import { Storage } from "@/types/storage.types";
import { useRouter } from "next/navigation";
import { BsDatabaseLock } from "react-icons/bs";
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

export const CardStorageComponent = ({ props }: Storage) => {
  const { push } = useRouter();

  return (
    <Card className="w-72 max-h-80 p-3 border gap-3 justify-between rounded-md flex flex-col hover:scale-105 ">
      <CardHeader className="p-1 items-center">
        <CardTitle>
          <BsDatabaseLock size={35} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-3 flex-col p-1">
        <div className="">
          <Label>Local de uso:</Label>
          <Input
            className="outline-none text-red-500 bg-primary"
            value={`${props.usageLocation}`}
            readOnly
          />
        </div>
        <div>
          <Label>Username:</Label>
          <Input
            className="outline-none text-red-500 bg-primary "
            value={`${props.account}`}
            readOnly
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full hover:border"
          onClick={() => push(`/storage/card-details/${props.storageId}`)}
        >
          Abrir
        </Button>
      </CardFooter>
    </Card>
  );
};
