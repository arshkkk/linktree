import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { prismaClient } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    const { link, label, position, enabled }: Prisma.LinkCreateInput =
      await req.json();

    const linkTreeData = await prismaClient.linkTree.findFirst({
      where: { userId: userId! },
    });

    if (!linkTreeData) {
      throw new Error("Link Tree doesn't exists");
    }

    const linkTreeId = linkTreeData.id;

    const linkData = await prismaClient.link.create({
      data: {
        link,
        label,
        position,
        LinkTreePage: { connect: { id: linkTreeId } },
        enabled,
      },
    });

    return Response.json({
      data: linkData,
      success: true,
      message: "Link Added",
    });
  } catch (e) {
    console.log(e);
    return Response.json(
      // @ts-ignore
      { message: "Something went wrong!", success: true },
      { status: 500 },
    );
  }
};
