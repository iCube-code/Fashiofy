import { useRef, useState } from 'react'

export default function useTimer(initialMinutes = 0, initalSeconds = 0) {

    const [minutes, setMinutes] = useState(initialMinutes.toString().padStart(2, '0'))
    const [seconds, setSeconds] = useState(initalSeconds.toString().padStart(2, '0'))

    const timerInterval = useRef(null)
    const minutesInterval = useRef(initialMinutes)
    const secondsInterval = useRef(initalSeconds)

    function startTimer() {

        timerInterval.current = setInterval(() => {

            let min = minutesInterval.current
            let sec = secondsInterval.current

            // when both are zero then clear the timer
            if (min === 0 && sec === 0) {
                clearInterval(timerInterval)
                return false
            }

            // if the seconds are zero then decrement the minutes and set the seconds to 59
            if (sec === 0) {

                let newMint = min - 1
                minutesInterval.current = newMint
                setMinutes(newMint.toString().padStart(2, '0'))

                let newSec = 59
                secondsInterval.current = newSec
                setSeconds(newSec.toString().padStart(2, '0'))
                return false
            }

            // decrement the seconds if the above conditions doesn't match
            let newSec = sec - 1
            secondsInterval.current = newSec
            setSeconds(newSec.toString().padStart(2, '0'))

        }, 1000)

    }


    return {
        minutes,
        seconds,
        startTimer
    }


}