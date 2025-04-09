import { currentUser } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  return <div>Welcome, {user.emailAddresses[0].emailAddress}</div>;
}
