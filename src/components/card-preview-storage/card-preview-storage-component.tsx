import { Storage } from "@/types/storage.types";
import { useRouter } from "next/navigation";
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
    <div className="w-96 p-2 border gap-3 rounded-md flex flex-col bg-primary-foreground hover:scale-105">
      <Card className="bg-primary-foreground border-none">
        <CardHeader>
          <CardTitle>Storage</CardTitle>
          <CardContent className="flex flex-col gap-5">
            <div>
              <Label>Local de uso:</Label>
              <Input
                className="outline-none text-red-800 font-semibold"
                value={`${props.usageLocation}`}
                readOnly
              />
            </div>
            <div>
              <Label>Username:</Label>
              <Input
                className="outline-none text-red-800 font-semibold"
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
        </CardHeader>
      </Card>
    </div>
  );
};
