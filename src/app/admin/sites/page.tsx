"use client";

import axios from "axios";
import { useEffect } from "react";

export default async function Sites() {
  /* const result = await fetch('sites', {}); */
  /*  const result = await fetch('https://swapi.dev/api/people/'); */
  // const result = await fetch('http://localhost:3000/api');
  // const data = await result.json();
  // console.log('🚀 ~ file: page.tsx:4 ~ Sites ~ data:', JSON.stringify(data));

  const getBasicData = async () => {
    const data = await axios({
      method: "get",
      url: "http://localhost:3000/api",
    })

    console.log('DATA: ', data)
  }

  useEffect(() => {
    getBasicData()
  }, [])

  return <div>SIIITEEEEEESSSSSS</div>;
}
