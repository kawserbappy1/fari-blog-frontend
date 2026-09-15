import { FolderPen } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className=" flex items-center gap-2 justify-center">
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground">
          <FolderPen className="w-4 h-4 sm:w-6 sm:h-6 " />
        </div>
        <h1 className="font-bold sm:text-lg text-sm">Fari Blog</h1>
      </div>
    </Link>
  );
};

export default Logo;
