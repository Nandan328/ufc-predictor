import Image from "next/image";
import Link from "next/link";
import default_image from "@public/default-image.png";
import { Events } from "@/app/lib/types";

export default function EventCard( {e} : {e: Events}) {
    return (
      <>
        <Link
          href={`/fighter/${e.r_id}`}
          className={`col-span-9 relative overflow-hidden rounded-3xl mb-5 m-2 p-1 ${
            e.pred_winner_id == e.r_id
              ? "before:absolute before:content-[''] before:h-[250%] before:w-[250%] before:top-[-70%] before:left-[-70%] before:bottom-[-50%] before:right-[-50%] before:bg-[conic-gradient(transparent,transparent,transparent,transparent,#05df72)] before:animate-[spin_4s_linear_infinite] before:z-[-1]"
              : ""
          }`}
        >
          <div className="grid place-items-center gap-2 md:gap-0 md:grid-cols-3 relative border-y rounded-3xl p-3 bg-white dark:bg-black">
            {e.winner_id == e.r_id ? (
              <span className="absolute top-2 right-2 text-sm md:text-lg text-[#EFBF04] font-bold px-2 py-1 rounded-full">
                🏆<i>Win</i>
              </span>
            ) : null}
            <Image
              src={e.r_img || default_image}
              alt={e.r_name}
              width={208}
              height={316}
              priority
              className={`col-span-1 w-[80px] h-[110px] md:w-[150px] md:h-[200px] object-center ${
                e.r_img ? "" : "invert dark:invert-0"
              }`}
            />
            <div className="md:col-span-2 ml-2 md:m-0 text-[10px] md:text-lg w-full flex flex-col justify-center items-center space-y-[-2px]">
              <p className="text-sm md:text-lg">{e.r_name || "-"}</p>
              <p>
                <i className="text-[8px] md:text-sm">
                  &quot;{e.r_nickname}&quot;
                </i>
              </p>
              <p>{e.r_record || "-"}</p>
              <p>{e.r_stance || "-"}</p>
            </div>
          </div>
        </Link>
        <button className="hover:-translate-y-0.5 transition">
          <Link
            href={`/predict-winner?r_name=${e.r_name}&b_name=${e.b_name}`}
            className="font-bold text-lg dark:text-black text-white bg-black dark:bg-white p-1 rounded-lg"
          >
            Vs
          </Link>
        </button>
        <Link
          href={`/fighter/${e.b_id}`}
          className={`col-span-9 relative overflow-hidden rounded-3xl mb-5 m-2 p-1 ${
            e.pred_winner_id == e.b_id
              ? "before:absolute before:content-[''] before:h-[250%] before:w-[250%] before:top-[-70%] before:left-[-70%] before:bottom-[-50%] before:right-[-50%] before:bg-[conic-gradient(transparent,transparent,transparent,#05df72)] before:animate-[spin_4s_linear_infinite] before:z-[-1]"
              : ""
          }`}
        >
          <div className="grid place-items-center gap-2 md:gap-0 md:grid-cols-3 relative border-y rounded-3xl p-3 bg-white dark:bg-black">
            {e.winner_id == e.b_id ? (
              <span className="absolute top-2 left-2 text-sm md:text-lg text-[#EFBF04] font-bold px-2 py-1 rounded-full">
                🏆<i>Win</i>
              </span>
            ) : null}
            <div className="order-1 md:order-0 md:col-span-2 text-[10px] md:text-lg flex flex-col justify-center items-center space-y-[-2px]">
              <p className="text-sm md:text-lg">{e.b_name || "-"}</p>
              <p>
                <i className="text-[8px] md:text-sm">
                  &quot;{e.b_nickname}&quot;
                </i>
              </p>
              <p>{e.b_record || "-"}</p>
              <p>{e.b_stance || "-"}</p>
            </div>
            <Image
              src={e.b_img || default_image}
              alt={e.b_name}
              width={208}
              height={316}
              className={`w-[80px] h-[110px] md:w-[150px] md:h-[200px] transform scale-x-[-1] object-center ${
                e.b_img ? "" : "invert dark:invert-0"
              }`}
            />
          </div>
        </Link>
      </>
    );
}