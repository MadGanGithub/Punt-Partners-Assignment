import axios from "axios";
import React, { useEffect } from "react";
import Audio from "../components/audio.js";

const Home = () => {
    useEffect(() => {
        async function func() {
          await axios
            .get("https://punt-backend.vercel.app/", {
              withCredentials: true,
            })
            .then((response) => {
              console.log(response)
            });
        }
        func();
      }, []);
      
  return (
    <div>
        <Audio/>
    </div>
  );
};

export default Home;
