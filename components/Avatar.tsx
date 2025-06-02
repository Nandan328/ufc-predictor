import Image from "next/image";
import default_image from "@public/default-image.png";

interface AvatarProps {
  invert?: boolean;
  fighterType?: "red" | "blue";
  fighterImage?: string;
}

export function Avatar({
  invert = false,
  fighterImage,
}: AvatarProps) {

  return (
    <div className="mb-3 p-3 bg-black">
      {invert ? (
        <Image
          src={fighterImage || default_image}
          alt="Fighter Avatar"
          width={208}
          height={316}
          className="transform scale-x-[-1] w-[208px] h-[316px] object-cover"
        />
      ) : (
        <Image
          src={fighterImage || default_image}
          alt="Fighter Avatar"
          width={208}
          height={316}
          className="w-[208px] h-[316px] object-cover"
        />
      )}
    </div>
  );
}
