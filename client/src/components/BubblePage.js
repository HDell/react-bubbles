import React, { useState, useEffect } from "react";

import {axiosWithAuth} from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
    useEffect(() => {
        axiosWithAuth().get('api/colors')
            .then((res) => {
                console.log(res);
                // set that data to the colorList state property
                setColorList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const clearStorage = () => {
        localStorage.clear();
        window.location.reload(false);
    };

  return (
    <>
      <button onClick={clearStorage}>Logout</button>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
