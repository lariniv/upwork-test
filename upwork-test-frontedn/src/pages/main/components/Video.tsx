import { useState } from 'react';
import { Clock, MoreHorizontal } from 'lucide-react';
import { convertIsoStringToPretty } from '../../../helpers/convert-iso-string-to-pretty';
import { Link } from 'react-router-dom';

export default function Video({
  videoId,
  title,
  description,
  publishedAt,
  thumbnailUrl,
}: {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-2 bg-orange-200/20 rounded-lg p-2 shadow-sm shadow-orange-300 relative">
      <img src={thumbnailUrl} />
      <div className="flex flex-col justify-between">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm">{description}</div>
        <div className="text-sm flex items-center gap-2 font-medium">
          <Clock size={12} />
          <i>{convertIsoStringToPretty(publishedAt)}</i>
        </div>
      </div>
      <div className="absolute right-2 top-2">
        <MoreHorizontal
          size={20}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer"
        />
        <Link
          to={`/video/${videoId}`}
          className={`absolute bg-white rounded-sm p-2 duration-300 font-medium cursor-pointer ${
            isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-3 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        >
          Details
        </Link>
      </div>
    </div>
  );
}
