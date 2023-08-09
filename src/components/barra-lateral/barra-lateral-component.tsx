import { MdOutlineStorage } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

export const SideBarComponent = () => {
  return (
    <section className="w-20 h-full bg-fundo-secundario border border-none rounded-e-md p-5 flex flex-col gap-10">
      <Link href="/storage">
        <MdOutlineStorage size={30} cursor="pointer" />
      </Link>
      <AiOutlinePlus size={30} cursor="pointer" />
      <FiUser size={30} cursor="pointer" />
    </section>
  );
};
