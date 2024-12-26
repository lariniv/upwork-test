import { Clock } from 'lucide-react';
import { convertIsoStringToPretty } from '../../../helpers/convert-iso-string-to-pretty';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setLastQuery } from '../../../store/video/video-slice';

function History() {
  const { history } = useAppSelector((state) => state.history);
  const dispatch = useAppDispatch();

  return (
    <div className="max-h-screen w-full flex flex-col gap-6 justify-end">
      <div className="font-bold text-2xl">History</div>
      <div className="flex flex-col gap-2 h-full overflow-y-auto ">
        {history.map((history) => (
          <div
            onClick={() => {
              dispatch(setLastQuery(history.query));
            }}
            className="bg-orange-300/20 p-3 max-w-[400px] cursor-pointer rounded-lg border border-orange-300 hover:opacity-80 duration-300"
          >
            <div>
              <div className="font-medium">{history.query}</div>
              <i className="flex gap-1 items-center">
                <Clock size={12} />
                {convertIsoStringToPretty(history.timestamp)}
              </i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
