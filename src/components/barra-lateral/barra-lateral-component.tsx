"use client";
import { MdOutlineStorage } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";

export const SideBarComponent = () => {
  const { push } = useRouter();

  return (
    <section className="w-20 bg-primary-foreground border border-none rounded-e-md p-5 flex flex-col gap-10">
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
      <FiUser size={30} cursor="pointer" />
    </section>
  );
};
