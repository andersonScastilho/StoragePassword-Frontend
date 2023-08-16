"use client";
import { findCookie } from "@/functions/cookies";
import { Storage } from "@/types/storage.types";
import axios from "axios";
import { useEffect, useState } from "react";
import { CardComponent } from "../card/card-component";

export const StorageCardsComponent = () => {
  const [storage, setStorage] = useState<Storage[]>([]);

  useEffect(() => {
    const findStorage = async () => {
      const token: string = await findCookie("token");

      await axios
        .get("http://localhost:3002/storages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data: { data: { storages: Array<Storage> } }) => {
          setStorage(data.data.storages);
        });
    };
    findStorage();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {storage.map((storage) => (
          <CardComponent props={storage.props} />
        ))}
      </div>
    </>
  );
};
