import React from "react";

export default function Audio(props) {
	const {fileId, audioSrc, ...other} = props;
	return <audio controls><source id={fileId} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" /></audio>
}
