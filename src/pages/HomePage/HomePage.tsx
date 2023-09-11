import { useEffect, useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import './HomePage.scss';

const HomePage = () => {
    const [display, setDisplay] = useState<number | string | null>(null);
    const [currentNum, setCurrentNum]: any = useState(0);
    const [prevNum, setPrevNum] = useState<number>(0);
    const [isDotPressed, setIsDotPressed] = useState<boolean>(false);
    const [isNumPressed, setIsNumPressed] = useState<boolean>(false);
    const [isDivPressed, setIsDivPressed] = useState<boolean>(false);
    const [isMulPressed, setIsMulPressed] = useState<boolean>(false);
    const [isAddPressed, setIsAddPressed] = useState<boolean>(false);
    const [isSubPressed, setIsSubPressed] = useState<boolean>(false);
    const [readyToConcat, setReadyToConcat] = useState<boolean>(false);


    // useState is unnecessary to build a calculator, and it creates more challenges as it's asynchronous, but I'm weird and this was fun 

    const [recall, setRecall] = useState<number | null>(null);
    const [saved, setSaved] = useState<number | null>(null);

    const [myMem, setMyMem] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);


    const handleAcPress = () => {
        setDisplay(0);
        setTotal(0);
        setPrevNum(0);
        setCurrentNum(0);
        setIsNumPressed(false);
        setIsMulPressed(false);
        setIsAddPressed(false);
        setIsSubPressed(false);
    }

    const handleMemPress = () => {
        if (typeof display === 'number' && typeof myMem === 'number') {
            setMyMem(display + myMem);
            setSaved(myMem + myMem);
        }
    };

    const handleRecPress = () => {
        setRecall(myMem);
    }

    const handleSnackbarClose = () => {
        setRecall(null);
        setSaved(null);
    };

    const handleDotPress = () => {
        if (!isDotPressed) {
            setIsDotPressed(true);
            setReadyToConcat(true);
            setCurrentNum(currentNum === null ? '0.' : currentNum + '.');
        }
    };

    const handleOperatorPress = (operator: string) => {
        setIsNumPressed(false);
        setReadyToConcat(false);
        setIsDotPressed(false);

        if (isDotPressed) {
            setIsDotPressed(false);
            setCurrentNum(Number(currentNum));
        }

        setIsDivPressed(false);
        setIsMulPressed(false);
        setIsAddPressed(false);
        setIsSubPressed(false);

        switch (operator) {
            case '/':
                setIsDivPressed(true);
                setDisplay('/');
                break;
            case '*':
                setIsMulPressed(true);
                setDisplay('*');
                if (total !== 0) {
                    setPrevNum(total);
                }
                break;
            case '+':
                setIsAddPressed(true);
                setDisplay('+');
                break;
            case '-':
                setIsSubPressed(true);
                setDisplay('-');
                break;
            default:
                break;
        }
    };

    const handleNumberPress = (v: number) => {
        if (isDivPressed || isMulPressed || isAddPressed || isSubPressed) {
            // Convert currentNum to a number if it's not
            const currentNumber = typeof currentNum === 'string' ? parseFloat(currentNum) : currentNum;
            setPrevNum(currentNumber);
            setCurrentNum(v);
            setReadyToConcat(true);
        } else if (isNumPressed) {
            const concatenatedValue = String(currentNum) + String(v);
            const numberedValue = parseFloat(concatenatedValue);
            setCurrentNum(numberedValue);
        } else {
            setCurrentNum(v);
            setIsNumPressed(true);
        }
    };


    const handleEqualsPress: any = () => {
        setIsNumPressed(false);
        setReadyToConcat(false);
        setIsDotPressed(false);
        let newTotal = 0;

        const currentNumber = typeof currentNum === 'string' ? parseFloat(currentNum) : currentNum;

        if (isNaN(currentNumber)) {
            setDisplay("Error");
            return;
        }

        switch (true) {
            case isDivPressed:
                newTotal = total !== 0 ? total / currentNumber : prevNum / currentNumber;
                setIsDivPressed(false);
                break;
            case isMulPressed:
                newTotal = total !== 0 ? total * currentNumber : prevNum * currentNumber;
                setIsMulPressed(false);
                break;
            case isAddPressed:
                newTotal = total !== 0 ? total + currentNumber : prevNum + currentNumber;
                setIsAddPressed(false);
                break;
            case isSubPressed:
                newTotal = total !== 0 ? total - currentNumber : prevNum - currentNumber;
                setIsSubPressed(false);
                break;
            default:
                newTotal = total;
                break;
        }

        setTotal(newTotal);
        setPrevNum(newTotal);
        setCurrentNum(null);
        setDisplay(newTotal);
    };

    useEffect(() => {

        if (currentNum != null) {
            setDisplay(currentNum);
        } else {
            setDisplay(total);
        }
    }, [currentNum, total])


    return (
        <div className="calculator">



            <Snackbar open={!!recall} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
                    Your number: {recall}
                </MuiAlert>
            </Snackbar>

            <Snackbar open={!!saved} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" severity="info" onClose={handleSnackbarClose}>
                    Number saved: {saved}
                </MuiAlert>
            </Snackbar>


            <div className="calculator__display">{display}</div>

            <div className="calculator__buttons">

                <span className="calculator__button calculator__button--reset" onClick={handleAcPress} >AC</span>
                <span className="calculator__button calculator__button--operator" onClick={handleRecPress} >Mr</span>
                <span className="calculator__button calculator__button--operator" onClick={handleMemPress} >M</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleOperatorPress('/')} >/</span>

                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(7)}>7</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(8)}>8</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(9)}>9</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleOperatorPress('*')} >*</span>

                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(4)}>4</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(5)}>5</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(6)}>6</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleOperatorPress('-')} >-</span>

                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(1)}>1</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(2)}>2</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(3)}>3</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleOperatorPress('+')}>+</span>

                <span className="calculator__button calculator__button--number calculator__button--zero" onClick={() => handleNumberPress(0)}>0</span>
                <span className="calculator__button calculator__button--number calculator__button--dot" onClick={handleDotPress} >.</span>
                <span className="calculator__button calculator__button--operator calculator__button--equals" onClick={handleEqualsPress}>=</span>

            </div>
        </div >
    )
}

export default HomePage;
