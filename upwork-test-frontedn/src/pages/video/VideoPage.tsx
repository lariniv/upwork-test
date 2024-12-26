import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getVideoById } from '../../store/video-with-stats/video-with-stats-thunks';
import { convertIsoStringToPretty } from '../../helpers/convert-iso-string-to-pretty';
import { Clock, MessageCircle, ThumbsUp, Eye } from 'lucide-react';

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentVideo, state } = useAppSelector(
    (state) => state.videoWithStats
  );

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id) return;
      await dispatch(getVideoById(id));
    };
    fetchVideo();
  }, [id]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-3/4 max-w-[1200px] h-full bg-orange-200/20 rounded-lg p-2 shadow-sm shadow-orange-300 flex flex-col gap-4">
        {!state.loading && (
          <>
            <div className="relative pb-[56.25%] h-0 overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo?.videoId}`}
                title="YouTube video player"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h1 className="font-bold text-2xl">{currentVideo?.title}</h1>
            <p className="leading-[1.4] text-justify">
              {currentVideo?.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="italic text-sm font-semibold flex items-center gap-1">
                  <Clock size={12} />
                  {convertIsoStringToPretty(
                    currentVideo?.publishedAt ? currentVideo.publishedAt : ''
                  )}
                </div>
                <div className="italic text-sm font-semibold flex items-center gap-1">
                  <Eye size={12} />
                  {currentVideo?.viewCount}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="italic text-sm font-semibold flex items-center gap-1">
                  <ThumbsUp size={12} />
                  {currentVideo?.likeCount}
                </div>
                <div className="italic text-sm font-semibold flex items-center gap-1">
                  <MessageCircle size={12} />
                  {currentVideo?.commentCount}
                </div>
              </div>
            </div>
          </>
        )}
        {state.loading && (
          <div className="w-full h-full min-h-[600px] flex items-center justify-center">
            <div className="w-24 aspect-square border border-r-black rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
