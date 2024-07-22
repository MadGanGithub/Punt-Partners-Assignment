import axios from "axios";
import React, { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        async function func() {
          await axios
            .get("http://localhost:4000/", {
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
        testing
    </div>
  );
};

export default Home;
