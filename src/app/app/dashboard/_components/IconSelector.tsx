import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { icons } from "@tabler/icons-react";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DrawerClose } from "@/components/ui/drawer";
import debounce from "lodash/debounce";

const iconsList = Object.keys(icons)
  .filter((icon) => !icon.endsWith("Filled"))
  .slice(500, 1200);

export default function IconSelector({
  onSelect,
}: {
  onSelect: (icon: string) => void;
}) {
  const [query, setQuery] = useState("");
  console.log({ length: iconsList.length });
  const filteredList = useMemo(() => {
    if (query === "") return iconsList;
    return iconsList.filter((icon) => icon.toLowerCase().includes(query));
  }, [query]);

  const onQueryChange = useCallback(
    debounce((text) => {
      console.log(text);
      setQuery(text);
    }, 250),
    [],
  );

  console.log(filteredList);
  return (
    <div>
      <div className={"relative flex items-center"}>
        <Input
          placeholder={"Search icons"}
          className={"pl-8 z-10"}
          onChange={(e) => {
            onQueryChange(e.target.value.toLowerCase());
          }}
        />
        <div className={"absolute"}>
          <SearchIcon size={16} className={"text-muted-foreground ml-2"} />
        </div>
      </div>

      <p className={"text-sm"}>
        Icons By{" "}
        <Button variant={"link"} className={"p-0"}>
          <Link
            href={
              "https://tabler.io/icons?utm_source=Linktree&utm_medium=referral"
            }
            target={"_blank"}
          >
            Tabler Icons
          </Link>
        </Button>
      </p>

      <div
        className={
          "grid grid-cols-4 md:grid-cols-6 gap-3 overflow-scroll mt-6 max-h-[500px]"
        }
      >
        {filteredList.map((icon) => {
          // @ts-ignore
          const Icon = icons[icon];
          return (
            <DrawerClose asChild key={icon}>
              <div
                onClick={() => onSelect(icon)}
                className={
                  "flex justify-center items-center p-4 border rounded-sm hover:border-black border-muted cursor-pointer"
                }
              >
                <Icon size={32} className={"text-muted-foreground"} />
              </div>
            </DrawerClose>
          );
        })}
      </div>
    </div>
  );
}
