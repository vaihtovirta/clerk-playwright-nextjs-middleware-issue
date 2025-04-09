import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { orgId } = await auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>{orgId && <p>Organization ID: {orgId}</p>}</header>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
