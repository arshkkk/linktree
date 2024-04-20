import { GripVerticalIcon, ImageIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link, Prisma } from "@prisma/client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { IApiResponse } from "@/types/api";
import { Button } from "@/components/ui/button";
import AppModal from "@/components/AppModal";
import { IconPencil, icons } from "@tabler/icons-react";
import IconSelector from "@/app/app/dashboard/_components/IconSelector";
import { cn } from "@/lib/utils";
import LinkUpdateInput = Prisma.LinkUpdateInput;
import debounce from "lodash/debounce";

export default function LinkForm({
  data: linkData,
  onUpdate: onUpdateCallback,
}: {
  data: Link;
  onUpdate: () => void;
}) {
  const [titleEditable, setTitleEditable] = useState(false);
  const [linkEditable, setLinkEditable] = useState(false);
  const [link, setLink] = useState<Link>(linkData);
  const ref = useRef<HTMLParagraphElement>();

  const onUpdate = useCallback(
    debounce(() => {
      console.log("onupdate");
      onUpdateCallback();
    }, 1000),
    [],
  );
  const {
    mutate,
    isPending,
  }: UseMutationResult<
    IApiResponse<Link>,
    IApiResponse,
    LinkUpdateInput & { id: string }
  > = useMutation<
    IApiResponse<Link>,
    IApiResponse,
    LinkUpdateInput & { id: string }
  >({
    mutationFn: async (variables) => {
      return (
        await fetch(`/api/link/${variables.id}`, {
          method: "PATCH",
          body: JSON.stringify(variables),
        })
      ).json();
    },
    onSuccess: (data) => {
      setLink(data.data);
      onUpdate();
    },
  });

  const updateLink = (data: LinkUpdateInput) => {
    mutate({ ...data, id: link.id });
  };

  // @ts-ignore
  const Icon = icons[link.icon];

  return (
    <div className={"flex bg-white py-3 rounded-xl shadow-sm w-full pl-2"}>
      <div className={"flex items-center"}>
        <GripVerticalIcon size={16} />
      </div>

      <div className={"flex items-start justify-between px-4 w-full"}>
        <div className={"flex flex-col space-y-1"}>
          <div className={"space-y-0.5"}>
            <div
              className={"flex space-x-0.5 items-center"}
              onClick={() => {
                setTitleEditable(true);
                ref.current?.focus();
              }}
            >
              <p
                ref={ref}
                className={cn(
                  "text-foreground accent-accent-foreground outline-none",
                  titleEditable && "font-semibold",
                )}
                onBlur={(event) => {
                  setTitleEditable(false);
                  if (
                    event.target.innerText &&
                    event.target.innerText !== link.label
                  ) {
                    updateLink({ label: event.target.innerText });
                  }
                }}
                suppressContentEditableWarning={true}
                contentEditable
              >
                {link.label ?? "Add Title"}
              </p>
              {!titleEditable ? <IconPencil size={16} /> : null}
            </div>
            <p className={"text-muted-foreground"}>{link.link}</p>
          </div>

          <AppModal
            title={"Select Icon"}
            description={"You can choose from 1,0000 available icons"}
            content={<IconSelector onSelect={(icon) => updateLink({ icon })} />}
            trigger={
              <Button className={"p-0 w-fit"} variant={"ghost"}>
                {link.icon && Icon ? <Icon /> : <ImageIcon size={24} />}
              </Button>
            }
          />
        </div>

        <Switch
          disabled={isPending}
          checked={link.enabled}
          onCheckedChange={(enabled) => {
            updateLink({ enabled, id: link.id });
          }}
        />
      </div>
    </div>
  );
}
