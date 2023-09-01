"use client";
import { MdOutlineStorage } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";

export const SideBarComponent = () => {
  const { push } = useRouter();

  return (
    <section className="w-14 bg-primary-foreground border border-none rounded-e-md p-3 flex flex-col gap-10">
      <MdOutlineStorage
        onClick={() => push("/storage")}
        size={30}
        cursor="pointer"
      />
      <AiOutlinePlus
        onClick={() => push("/create-storage")}
        size={30}
        cursor="pointer"
      />
    </section>
  );
};
