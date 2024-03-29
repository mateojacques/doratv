import { IStreamBtn } from "../../interfaces/liveInterfaces";

const StreamBtn = ({ stream, activeStream, setActiveStream }: IStreamBtn) => {
  return (
    <button
      className={`streamBtn ${activeStream && "streamBtn-active"}`}
      onClick={() => setActiveStream(Number(stream?.id))}
    >
      <img
        src={stream.thumbnail_url.replace(/{width}.{height}/, "180x100")}
        alt={stream.user_name}
      />
      <div>
        <h3>{stream.title}</h3>
        <div>
          <p>{stream.user_name}</p>
          <p className="viewer_count">{stream.viewer_count}</p>
        </div>
      </div>
    </button>
  );
};

export default StreamBtn;
