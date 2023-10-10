import { Storage } from "@/types/storage.types";
import { useRouter } from "next/navigation";
import { BsDatabaseLock } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";

export const CardStorageComponent = ({ props }: Storage) => {
  const { push } = useRouter();
  const { toast } = useToast();
  const copyToClipboard = async () => {
    try {
      if (props.link) {
        await navigator.clipboard.writeText(props.link);

        toast({
          title: "Texto copiado com sucesso",
          description: `Texto na area de transferencia: ${props.link} `,
        });
      } else {
        toast({
          title: "Falhou ao copiar texto",
          description: "Certifique-se que o campo não esta vazio",
        });
      }
    } catch (error) {
      toast({
        title: "Falhou ao tentar copiar o texto",
      });
    }
  };

  return (
    <Card className="max-h-72">
      <CardHeader>
        <CardTitle>{props.usageLocation}</CardTitle>
        <CardDescription>
          Minha conta do(a) {props.usageLocation}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex space-x-2">
          <Input
            className="text-[0.7rem] p-2 outline-none focus-visible:outline-none focus-visible:ring-transparent hover:cursor-pointer"
            value={props.link}
            onClick={() => {
              window.open(props.link);
            }}
            readOnly
          />
          <Button
            variant="secondary"
            className="shrink-0"
            onClick={copyToClipboard}
          >
            Copy Link
          </Button>
        </div>
        <Separator className="mt-1" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Preview</h4>
          <div>
            <p className="text-sm font-medium leading-none">Username/email:</p>
            <p className="text-sm text-muted-foreground">{props.account}</p>
          </div>
        </div>
        <CardFooter>
          <Button
            className="w-full hover:border"
            onClick={() => push(`/storage/card-details/${props.storageId}`)}
          >
            Abrir
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
