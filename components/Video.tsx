import React from "react";

export function Video() {
  return (
    <video width="320" height="240" controls preload="none">
      <source
        src="https://youtu.be/l_b19z5vZjY?si=V608Ytho5NwDw-Ru"
        type="video/mp4"
      />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  );
}
