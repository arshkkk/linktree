import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const LoadingSpinner = ({
  size = 24,
  className,
  ...props
}: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

export default function Preview({
  url,
  lastUpdateTime,
}: {
  url: string;
  lastUpdateTime: string;
}) {
  const [src, setSrc] = useState(url);
  const [isLoading, setLoading] = useState(true);
  const reload = () => {
    setLoading(true);
    setSrc(url + `?abc=${Math.random()}`);
  };

  useEffect(() => {
    if (lastUpdateTime) {
      reload();
    }
  }, [lastUpdateTime]);

  return (
    <div
      className={
        "max-w-[360px] mx-auto relative flex items-center justify-center"
      }
    >
      {isLoading ? (
        <div
          className={"absolute inset-0 z-10 bg-black/30 rounded-[3rem]"}
        ></div>
      ) : null}

      {isLoading ? (
        <div className={"absolute z-50 "}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className={"absolute z-10 bottom-6 right-6"}>
          <Button className={"rounded-full"} onClick={reload}>
            <RefreshCwIcon size={16} />
          </Button>
        </div>
      )}
      <iframe
        onLoadStart={() => {
          console.log("load start");
          setLoading(true);
        }}
        onLoad={() => {
          console.log("load end");

          setLoading(false);
        }}
        className={cn("rounded-[3rem] border-[0.75rem] border-black w-full")}
        style={{ aspectRatio: 9 / 18 }}
        // src={"https://www.youtube.com/embed/hiLjA-tQtfU?si=hUroZkFY4w5PehK1"}
        src={src}
        // srcDoc={
        //   "<!DOCTYPE html><html><head></head><body><div class=&quot;frame-root&quot;></div><h1>hello</h1></body></html>"
        // }
      ></iframe>
    </div>
  );
}
