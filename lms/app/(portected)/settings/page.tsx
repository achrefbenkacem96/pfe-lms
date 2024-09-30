"use client";
import { signOut, useSession } from "next-auth/react";
const SettingsPage = () => {
  const { data } = useSession();
  return (
    <div>
      {JSON.stringify(data)}
      <form
        action={async () => {
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};
export default SettingsPage;
