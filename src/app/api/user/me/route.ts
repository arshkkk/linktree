import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { prismaClient } from "@/lib/prisma";

export const GET = async () => {
  try {
    const { userId } = auth();

    const user = await prismaClient.user.findFirst({
      where: { id: userId! },
      include: { linkTree: { include: { links: true } } },
    });

    return Response.json({
      data: user,
      success: true,
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
