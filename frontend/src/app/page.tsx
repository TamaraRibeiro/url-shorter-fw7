import Image from "next/image";
import { FormURL } from "../components/formUrl/page";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center px-6">
      <FormURL />
    </div>
  );
}
