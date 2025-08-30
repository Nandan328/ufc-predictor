import Image from "next/image";
import default_image from "@public/default-image.png";

interface AvatarProps {
  invert?: boolean;
  fighterType?: "red" | "blue";
  fighterImage?: string | null;
}

export function Avatar({
  invert = false,
  fighterImage,
}: AvatarProps) {

  return (
    <div className="mb-2 p-2">
      {invert ? (
        <Image
          draggable={false}
          src={fighterImage || default_image}
          alt="Fighter Avatar"
          width={208}
          height={316}
          priority
          className={`w-[170px] h-[230px] transform scale-x-[-1] md:w-[208px] md:h-[316px] object-cover ${
            fighterImage ? "" : "invert dark:invert-0"
          }`}
        />
      ) : (
        <Image
          draggable={false}
          src={fighterImage || default_image}
          alt="Fighter Avatar"
          width={208}
          height={316}
          priority
          className={`w-[170px] h-[230px] md:w-[208px] md:h-[316px] object-cover ${
            fighterImage ? "" : "invert dark:invert-0"
          }`}
        />
      )}
    </div>
  );
}
