import { useEffect } from "react";

export const Quotes = () => {
  const url = "https://type.fit/api/quotes";

  const getapi = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getapi(url);
  }, []);

  return <div>Quotes</div>;
};
