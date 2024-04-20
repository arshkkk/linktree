import { AppButton } from "@/components/appbutton";
import { prismaClient } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { icons } from "@tabler/icons-react";

const TreePage = async ({ params }: { params: { username: string } }) => {
  const user = await prismaClient.user.findFirst({
    where: { username: params.username },
    include: { linkTree: { include: { links: { where: { enabled: true } } } } },
  });

  if (!user) {
    return notFound();
  }

  const fullName = user.firstName + " " + user.lastName;
  const links = (user.linkTree?.links || []).sort(
    (a, b) => a.position - b.position,
  );

  return (
    <div className="space-y-6  px-4  max-w-[600px] h-screen w-full mx-auto pt-12 md:pt-24">
      <div className="space-y-2 flex flex-col justify-center items-center">
        <img
          className="h-24 w-24 rounded-full"
          alt={fullName}
          src="https://ugc.production.linktr.ee/0488363d-81c9-4e53-b9fe-99427d149f4f_Profile-pic.jpeg?io=true&size=avatar-v3_0"
        />
        <h1 className="text-3xl font-bold text-center">{fullName}</h1>
        <h2 className="text-xl font-semibold text-center">@{user.username}</h2>
        <p className="text-center">
          India-based software developer passionate about travel, finance,
          freelancing
        </p>
      </div>
      <div className="w-full space-y-6">
        {(links).map((link) => {
          // @ts-ignore
          const Icon = link.icon ? icons[link.icon] : null;

          return (
            <div key={link.id}>
              <a href={link.link} target="_blank" className={"w-full"}>
                <AppButton className={"relative"}>
                  {Icon ? <Icon className={"absolute left-4"} /> : null}
                  {link.label}
                </AppButton>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TreePage;
