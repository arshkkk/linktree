import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/webhook/clerk", "/", "/:username"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/app/(.*)", "/(api|trpc)(.*)"],
};
