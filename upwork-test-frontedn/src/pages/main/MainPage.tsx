import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getVideosByQuery } from '../../store/video/video-thunks';
import Video from './components/Video';
import History from './components/History';
import { SendHorizontal } from 'lucide-react';
import { getHistory } from '../../store/history/history-thunks';
import { ArrowBigLeft } from 'lucide-react';

function MainPage() {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const { videos, lastQuery, nextPageToken, prevPageToken, state } =
    useAppSelector((state) => state.video);

  useEffect(() => {
    if (lastQuery) {
      setQuery(lastQuery);
    }
  }, [lastQuery]);
  const handleClick = async () => {
    try {
      await dispatch(getVideosByQuery({ query: query, pageToken: null }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getHistory());
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-[1fr_1.5fr_1fr] p-6 gap-8">
      <History />

      <div className="w-full flex flex-col gap-2">
        <div className="w-1/2 mx-auto rounded-2xl flex flex-col gap-8 p-4">
          <h1 className="text-4xl font-bold text-center">Youtube finder</h1>
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                id="query"
                name="query"
                type="text"
                className="outline-none rounded-lg px-2 py-3 w-full font-semibold h-full border border-orange-200 hover:border-orange-500 focus:border-orange-500 duration-300"
                placeholder="Start typing..."
              />
              <SendHorizontal
                onClick={handleClick}
                size={20}
                className="absolute -translate-x-3 right-0 top-1/2 -translate-y-1/2 cursor-pointer text-orange-500"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <button
            className="font-semibold border-orange-200 border p-1.5 rounded-xl"
            onClick={() =>
              dispatch(
                getVideosByQuery({ query: lastQuery, pageToken: prevPageToken })
              )
            }
          >
            <ArrowBigLeft size={20} />
          </button>
          <button
            className="font-semibold border-orange-200 border p-1.5 rounded-xl"
            onClick={() =>
              dispatch(
                getVideosByQuery({ query: lastQuery, pageToken: nextPageToken })
              )
            }
          >
            <ArrowBigLeft size={20} className="rotate-180" />
          </button>
        </div>
        <div className="w-full h-full min-w-[600px] gap-4 flex flex-col">
          {state.loading && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 aspect-square border border-r-black rounded-full animate-spin" />
            </div>
          )}
          {!state.loading &&
            videos.map((video) => (
              <Video
                key={video.videoId}
                videoId={video.videoId}
                title={video.title}
                description={video.description}
                publishedAt={video.publishedAt}
                thumbnailUrl={video.thumbnailUrl}
              />
            ))}
        </div>
      </div>

      <div />
    </div>
  );
}

export default MainPage;
