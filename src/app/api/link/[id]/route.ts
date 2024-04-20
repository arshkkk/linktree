import { NextRequest } from "next/server";
import { Link, Prisma } from "@prisma/client";
import { prismaClient } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

const checkIfUserOwnerOfLink = async (linkId: string, userId: string) => {
  const linkData = await prismaClient.link.findFirst({
    where: { id: linkId },
  });
  const linkTreeId = linkData?.linkTreePageId;

  const linkTreeData = await prismaClient.linkTree.findFirst({
    where: { id: linkTreeId!, userId: userId! },
  });

  return !!linkTreeData;
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const id = params.id;
    const { userId } = auth();

    const isUserOwnerOfLink = await checkIfUserOwnerOfLink(id, userId!);

    if (!isUserOwnerOfLink) {
      return Response.json(
        { success: false, message: "UnAuthorized" },
        { status: 403 },
      );
    }

    const { link, label, position, enabled, icon }: Prisma.LinkUpdateInput =
      await req.json();
    const linkData = await prismaClient.link.update({
      where: { id },
      data: {
        link,
        label,
        position,
        enabled,
        icon,
      },
    });

    return Response.json({
      data: linkData,
      success: true,
      message: "Link Added",
    });
  } catch (e) {
    return Response.json(
      { message: "Something went wrong!", success: true },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { userId } = auth();
    const id = params.id;
    const isUserOwnerOfLink = await checkIfUserOwnerOfLink(id, userId!);

    if (!isUserOwnerOfLink) {
      return Response.json(
        { success: false, message: "UnAuthorized" },
        { status: 403 },
      );
    }

    const linkData = await prismaClient.link.delete({
      where: { id },
    });

    return Response.json({
      data: linkData,
      success: true,
      message: "Link Deleted",
    });
  } catch (e) {
    return Response.json(
      { message: "Something went wrong!", success: true },
      { status: 500 },
    );
  }
};
