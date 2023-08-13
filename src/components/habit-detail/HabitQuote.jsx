import classes from "./HabitQuote.module.css";

import { useEffect, useState } from "react";

const QUOTE = {
  text: "In the long run, consistency beats intensity.",
  author: "Deepak Jain",
};
const HabitQuote = () => {
  const [quote, setQuote] = useState(QUOTE);

  useEffect(() => {
    // get quote from api
    const getQuoteFromAPi = async () => {
      try {
        const response = await fetch(
          "https://www.jcquotes.com/api/quotes/random"
        );
        const data = await response.json();
        // console.log(data);
        setQuote({ text: data.text, author: "James Clear" });
      } catch (e) {
        console.log("💣 👾 Error fetching quote from API");
        setQuote(QUOTE);
      }
    };

    getQuoteFromAPi();
  }, []);

  return (
    <div className={classes["quote-container"]}>
      <p>{quote.text}</p>
      <span className={classes.author}>{quote.author}</span>
    </div>
  );
};

export default HabitQuote;
