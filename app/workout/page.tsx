import { CURRENT_USER } from "../lib/constants";
import { User } from "../lib/definitions";

export default async function Page() {
  // imported
  const user: User = CURRENT_USER; //temp

  // derived

  return (
    <div className="w-full min-h-[calc(100vh-74px)] p-8">
      <h1 className="text-xl mb-4">log workout</h1>
    </div>
  );
}
