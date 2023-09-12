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
import { useForm } from "react-hook-form";
import axios from "axios";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { deleteStorage } from "../../store/toolkit/storage/storage.slice";

interface CardDetailsProps {
  dataStorage: Storage;
  clickFunction?: () => void;
}
interface UpdateStorageProps {
  usageLocation?: string;
  account?: string;
  password?: string;
  description?: string;
  link?: string;
}

export const CardDetailStorageComponent = ({
  dataStorage,
  clickFunction,
}: CardDetailsProps) => {
  const {
    handleSubmit,
    resetField,
    register,
    formState: { errors },
  } = useForm<UpdateStorageProps>();
  const { push } = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleSubmitPress = async (data: UpdateStorageProps) => {
    try {
      const { token } = await checkIsAuthenticated();
      const valuesToUpdate: UpdateStorageProps = {};

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          if (data[key as keyof UpdateStorageProps] !== "") {
            valuesToUpdate[key as keyof UpdateStorageProps] =
              data[key as keyof UpdateStorageProps];
          }
        }
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/storages/${dataStorage.props.storageId}`,
        { ...valuesToUpdate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Storage atualizado com sucesso!",
        description: "Aqui seus dados estão no protegidos...",
      });

      for (const key in data) {
        resetField<any>(key);
      }
    } catch (error: any) {
      toast({
        title: "Não foi possivel atualizar este storage",
        description: `${error.response.data.error}`,
      });
    }
  };
  const handleDeletePress = async () => {
    try {
      const { token } = await checkIsAuthenticated();

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/storages/${dataStorage.props.storageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(deleteStorage(dataStorage.props.storageId));

      toast({
        title: "Storage deletado com sucesso!",
        description:
          "Para não precisar gravar outra senha, salve com a gente!!",
      });

      push("/storage");
    } catch (error: any) {
      toast({
        title: "Storage deletado com sucesso!",
        description: `${error.response.data.error}`,
      });
    }
  };

  return (
    <Card className="bg-primary-foreground border-none w-96 m-auto">
      <CardHeader>
        <CardTitle>Storage</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex gap-3 items-center">
          <Label className="">Local de uso:</Label>
          <Input
            readOnly
            value={dataStorage.props.usageLocation}
            className="outline-none  text-[0.8rem] text-red-800 font-semibold items-center"
          />
        </div>
        <div className="flex gap-3 items-center">
          <Label className="">Username:</Label>
          <Input
            readOnly
            value={dataStorage.props.account}
            className="outline-none  text-[0.8rem] text-red-800 font-semibold items-center"
          />
        </div>
        <div className="flex gap-3 items-center">
          <Label className="">Senha:</Label>
          <div className="flex items-center gap-2 border rounded-md">
            <Input
              readOnly
              value={"******"}
              className="outline-none  text-[0.8rem] text-red-800 font-semibold items-center border-none"
            />
            <span className="mr-5">
              <HiEye cursor={"pointer"} onClick={clickFunction} />
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Label>Link:</Label>
          <Input
            readOnly
            value={dataStorage.props.link}
            className="outline-none  text-[0.8rem] text-red-800 font-semibold items-center"
          />
        </div>
        <div className="flex gap-3 items-center">
          <Label className="">Description:</Label>
          <Textarea
            readOnly
            value={dataStorage.props.description}
            className="outline-none  text-[0.8rem] text-red-800 font-semibold items-center max-h-20"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-green-700 text-white  p-5"
            >
              Atualizar Storage
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Storage</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Local de uso</Label>
                <Input
                  id="name"
                  className="col-span-3"
                  {...register("usageLocation")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Username</Label>
                <Input className="col-span-3" {...register("account")} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Senha</Label>
                <Input className="col-span-3" {...register("password")} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Link</Label>
                <Input className="col-span-3" {...register("link")} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Descrição</Label>
                <Textarea
                  className="col-span-3 max-h-16"
                  {...register("description")}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => handleSubmit(handleSubmitPress)()}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-red-700 text-white  p-5"
            >
              Deletar Storage
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza disso ?</AlertDialogTitle>
              <AlertDialogDescription>
                Após a exclusão do storage, não sera possivel recupera-lo !!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeletePress()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
