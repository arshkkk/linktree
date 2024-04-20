"use client";
import { useMemo, useState } from "react";
import { Link, LinkTree, Prisma, User } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import LinkForm from "@/app/app/dashboard/_components/LinkForm";
import { Button } from "@/components/ui/button";
import { GripVerticalIcon, PlusIcon } from "lucide-react";
import AppModal from "@/components/AppModal";
import { AddLinkForm } from "@/app/app/dashboard/_components/AddLinkForm";
import { RefreshCwIcon } from "lucide-react";
import Preview from "@/app/app/dashboard/_components/Preview";
import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type IUser = User & { linkTree: LinkTree & { links: Array<Link> } };

export default function Dashboard() {
  const { userId } = useAuth();
  const { data, isLoading } = useQuery<{ data: IUser }>({
    queryFn: async () => {
      return (await fetch("/api/user/me")).json();
    },
    queryKey: ["get_user_details"],
  });

  const [lastUpdateTime, setLastUpdateTime] = useState(
    new Date().toISOString(),
  );

  console.log({ load: lastUpdateTime });
  const links = useMemo(() => {
    return (data?.data?.linkTree?.links || []).sort(
      (a, b) => a.position - b.position,
    );
  }, [data]);

  return (
    <div className={"mx-auto px-4 grid grid-cols-7 divide-x"}>
      <div
        className={
          "min-h-screen md:col-span-4 px-2 col-span-7 py-12 md:py-24 max-h-screen overflow-scroll"
        }
      >
        <div className={"space-y-4 max-w-[600px] w-full mx-auto"}>
          <h1 className={"text-foreground text-4xl font-bold"}>Links</h1>
          <AppModal
            title={"Add Link"}
            maxWidth={"400px"}
            description={"Here you can add your title and Url of Link"}
            content={<AddLinkForm />}
            trigger={
              <Button className={"w-full text-lg mb-8"} size={"lg"}>
                <PlusIcon size={20} />
                Add Link
              </Button>
            }
          />

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            links.map((link) => (
              <LinkForm
                data={link}
                key={link.id}
                onUpdate={() => setLastUpdateTime(new Date().toISOString())}
              />
            ))
          )}
        </div>
      </div>
      <div
        className={
          "pt-24 h-screen w-full col-span-3 md:block hidden pl-8 xl:pl-16"
        }
      >
        {data ? (
          <Preview
            url={`http://localhost:3000/${data?.data?.username}`}
            lastUpdateTime={lastUpdateTime}
          />
        ) : null}
      </div>
    </div>
  );
}
