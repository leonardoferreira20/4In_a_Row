import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer({ timeout, onTimer, currentPlayer, gameStarted, updateCurrentPlayer}) {
    const [seconds, setSeconds] = useState(timeout);
    const [idInterval, setIdInterval] = useState(null);
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        setIdInterval(interval);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        onTimer(seconds);
        if (seconds === 10) {
         clearInterval(idInterval);
         console.log(currentPlayer);
         updateCurrentPlayer(currentPlayer);
         setSeconds(0);
        }
    }, [seconds,onTimer,idInterval,currentPlayer]);
    return (
    <div className="timer">
    {seconds}
    </div>
    );
    }

/* function Timer({playertime, onPlayerTimer, currentPlayer}) {
    const [playerIdSeconds, setPlayerIdSeconds] = useState(playertime);
    const [playerIdInterval, setPlayerIdInterval] = useState(null);
    useEffect(()=> {
        if (currentPlayer)
        {
        const pinterval = setInterval(() => {
            setPlayerIdSeconds((PTimer) => {
                if (PTimer < 10) return PTimer + 1;
                return PTimer;
            });
        },1000);
            setIdInterval(pinterval);
        return() => clearInterval(pinterval);
        }else{
            if (playerIdInterval) clearInterval(playerIdInterval);
        }
    },[currentPlayer]);
    
    useEffect(() => {
        onPlayerTimer(playerseconds);
        if (playerseconds === 10) clearInterval(playerIdInterval);
    }, [playerseconds,onPlayerTimer,playerIdInterval]);
    
    useEffect(() => {
        if (currentPlayer) setPlayerIdSeconds(playertime);
    }, [currentPlayer, playertime]);
    
    useEffect(() => {

    })
    return (
<div className="Ptimer">
{playerseconds}
</div>
);
} */

export default Timer;