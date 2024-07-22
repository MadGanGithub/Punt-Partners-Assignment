import axios from "axios";
import React, { useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const Audio = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [transcript, setTranscript] = useState("");
  const [audioData, setAudioData] = useState(new FormData());
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [audio, setAudio] = useState("");
  const [key,setKey]=useState("");

  const handleSubmit = async (event) => {
    try {
      console.log("below");


      if (!audioData && !key) {
        console.log("No audio data/key available");
        return;
      }else{
        console.log(audioData)
      }

      const response = await axios.post(
        "https://punt-backend.vercel.app/audio",
        audioData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.name)
      const res = await axios.post(
        "https://punt-backend.vercel.app/deepgram",
        { name: response.data.name ,key:key},
        { withCredentials:true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data["output"]);
      setAudio(`https://punt-backend.vercel.app${res.data["output"]}`);
    } catch (error) {
      console.log(error);
    }
  };

  const startRecording = async () => {
    console.log("start");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    console.log("start1");
    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    console.log("start2");
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.wav");
      setAudioData(formData);
      setAudioURL(URL.createObjectURL(audioBlob));
    };
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    console.log("start5");
    mediaRecorderRef.current.stop();
    setRecording(false);
    console.log(audioData);
    audioChunksRef.current = [];
  };

  return (
    <div>
      <div className="w-screen h-3/6 bg-gray-600 flex justify-start p-5 mb-10">
        <h3 className="text-white">Speech to Speech Prompting</h3>
      </div>
      <div className="flex justify-center items-center gap-10">
          <div className="border border-solid p-10 gap-5 flex flex-col rounded-3xl">
            <div className="flex flex-col gap-5">
              <p className="font-bold">Record your question</p >
              {audioURL && <audio src={audioURL} controls />}
            </div>
            <div className="flex gap-3">
                <label>API KEY</label>
                <input type="text" className="bg-gray-200 rounded-3xl p-1" onChange={(e)=>setKey(e.target.value)} value={key} required/>
            </div>
            <div className="flex justify-between gap-5">
              <button
                onClick={startRecording}
                disabled={recording}
                className="bg-green-500 text-white rounded-3xl p-3"
              >
                Start Recording
              </button>
              <button
                onClick={stopRecording}
                disabled={!recording}
                className="bg-red-500 text-white rounded-3xl p-3"
              >
                Stop Recording
              </button>
            </div>
            <button onClick={handleSubmit} className="rounded-3xl bg-blue-500 text-white p-3">Submit</button>
          </div>

          <div className="border border-solid p-10 rounded-3xl flex flex-col gap-7">
          <p className="font-bold">Answer </p >
            <ReactAudioPlayer src={audio} controls />
          </div>
      </div>
    </div>
  );
};

export default Audio;