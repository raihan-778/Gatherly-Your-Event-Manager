import Image from "next/image";
import Link from "next/link";
import { ActionButtons } from "../ActionButtons";

export const EventCard = ({ event }) => {
  const {
    id,
    name,
    details,
    location,
    imageUrl,
    interested_ids,
    going_ids,
    swags,
  } = event;

  return (
    <div className="overflow-hidden rounded-md bg-[#242526]">
      <Image
        width={500}
        height={500}
        src={imageUrl}
        alt="Event 1"
        className="w-full"
      />

      <div className="p-3">
        <Link href={`details/${id}`} className="font-bold text-lg">
          {name}
        </Link>
        <p className="text-[#9C9C9C] text-sm mt-1">{location}</p>
        <div className="text-[#737373] text-sm mt-1">
          <span>{interested_ids?.length} Interested</span>
          <span>|</span>
          <span>{going_ids?.length} Going</span>
        </div>

        {/* <!-- Buttons --> */}
        <ActionButtons />
      </div>
    </div>
  );
};
