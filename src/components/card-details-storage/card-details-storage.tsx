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
            <Input className="outline-none text-red-800 font-semibold" />
          </div>
          <div>
            <Label>Username:</Label>
            <Input className="outline-none text-red-800 font-semibold" />
          </div>
          <div>
            <Label>Senha:</Label>
            <Input className="outline-none text-red-800 font-semibold" />
          </div>
          <div>
            <Label>Link:</Label>
            <Input className="outline-none text-red-800 font-semibold" />
          </div>
          <div>
            <Label>Description:</Label>
            <Textarea className="outline-none text-red-800 font-semibold max-h-20" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full flex justify-center items-center rounded-md p-2 hover:border hover:border-color-contraste-secundario">
            Abrir
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};
