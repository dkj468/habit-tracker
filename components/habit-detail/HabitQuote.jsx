import classes from './HabitQuote.module.css';

import { useEffect, useState } from "react"


const HabitQuote = () => {
    const [quote, setQuote] = useState ({"text":"In the long run, consistency beats intensity.", "author": "Deepak Jain"});

    useEffect(() => {
        // get quote from api
        const getQuoteFromAPi = async () => {
            const response = await fetch("https://www.jcquotes.com/api/quotes/random");
            const data = await response.json();
            console.log(data);
            setQuote({text:data.text, author:"James Clear"});
        }

        getQuoteFromAPi();
    }, []);


    return(
        <div className={classes['quote-container']}>
            <p>{quote.text}</p>
            <span className={classes.author}>{quote.author}</span>
        </div>
    )
}

export default HabitQuote;