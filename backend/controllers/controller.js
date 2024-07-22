import axios from "axios";
import fs from "fs";

const check = (req, res) => {
  res.json({ message: "Welcome" });
};

const deepgramApi = async (req, res) => {
  const { name,key } = req.body;
  console.log(name);
  console.log(key)

  const url = "https://api.deepgram.com/v1/listen";
  const audioFilePath = `../backend/audios/${name}`;
  // // const audioFilePath = "../backend/audios/1721639965508-audio.wav";

  const audioData = fs.readFileSync(audioFilePath);

  const headers = {
    Authorization: `Token ${process.env.DEEPGRAM_KEY}`,
    "Content-Type": "audio/wav",
  };

  var text;
  await axios
    .post(url, audioData, { headers: headers })
    .then((response) => {
      text = response.data.results.channels[0].alternatives[0].transcript;
    })
    .catch((error) => {
      console.error(error);
    });

  console.log(text);

  var result;
  
  // var message=[
  //   {
  //     "role": "user",
  //     "content": [
  //       {
  //         "type": "text",
  //         "text": text
  //       }
  //     ]
  //   }
  // ]

  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: message,
  //   temperature: 1,
  //   max_tokens: 256,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  // });


  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
      temperature: 0.7,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    }
  ).catch((err)=>{
    console.log(err)
  })
  // result=response.data.choices[0].message.content

  /////////////////////////

  const tts_url = "https://api.deepgram.com/v1/speak?model=aura-asteria-en";
  var data;

  if(!response){
    data={
      text: text,
    };
  }else{
    data = {
      text: response.data.choices[0].message.content
    };
  }

  console.log(data)

  const config = {
    headers: {
      Authorization: `Token ${process.env.DEEPGRAM_KEY}`,
      "Content-Type": "application/json",
    },
    responseType: "stream",
  };

  await axios
    .post(tts_url, data, config)
    .then((response) => {
      if (response.status !== 200) {
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      const dest = fs.createWriteStream(`../backend/audios/output-${name}.mp3`);
      response.data.pipe(dest);
      dest.on("finish", () => {
        console.log("File saved successfully.");
      });

      res.json({ output: `/audio/output-${name}.mp3`, text: text });
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};

export { check, deepgramApi };
