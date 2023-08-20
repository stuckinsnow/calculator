import { useEffect, useState } from 'react';
import './HomePage.scss';

const HomePage = () => {
    const [display, setDisplay]: any = useState(0);
    const [currentNum, setCurrentNum]: any = useState(0);
    const [prevNum, setPrevNum] = useState(0);
    const [isDotPressed, setIsDotPressed] = useState<boolean>(false);
    const [isNumPressed, setIsNumPressed] = useState<boolean>(false);
    const [isDivPressed, setIsDivPressed] = useState<boolean>(false);
    const [isMulPressed, setIsMulPressed] = useState<boolean>(false);
    const [isAddPressed, setIsAddPressed] = useState<boolean>(false);
    const [isSubPressed, setIsSubPressed] = useState<boolean>(false);
    const [readyToConcat, setReadyToConcat] = useState<boolean>(false);

    const [myMem, setMyMem] = useState(0);
    const [total, setTotal] = useState(0);

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
        setMyMem(total);
    }

    const handleRecPress = () => {
        setDisplay(myMem);
    }

    const handleDotPress = () => {
        if (!isDotPressed) {
            setIsDotPressed(true);
            setReadyToConcat(true);
            setCurrentNum(currentNum + '.');
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

    const handleNumberPress: any = (v: number) => {
        if (currentNum === v) {
            setDisplay(v);
        }

        if (isDotPressed) {
            setCurrentNum(currentNum + v);
            return;
        }

        if (readyToConcat) {
            const concatenatedValue = String(currentNum) + String(v);
            const numberedValue = parseFloat(concatenatedValue);
            setCurrentNum(numberedValue);
            return;
        }

        if (isDivPressed || isMulPressed || isAddPressed || isSubPressed) {
            setPrevNum(currentNum);
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

        if (isDotPressed) {
            setCurrentNum(Number(currentNum));
        }

        switch (true) {
            case isDivPressed:
                newTotal = total !== 0 ? total / currentNum : prevNum / currentNum;
                setIsDivPressed(false);
                break;
            case isMulPressed:
                newTotal = total !== 0 ? total * currentNum : prevNum * currentNum;
                setIsMulPressed(false);
                break;
            case isAddPressed:
                newTotal = total !== 0 ? total + currentNum : prevNum + currentNum;
                setIsAddPressed(false);
                break;
            case isSubPressed:
                newTotal = total !== 0 ? total - currentNum : prevNum - currentNum;
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

            <div className="calculator__display">{display}</div>

            <div className="calculator__buttons">

                <span className="calculator__button calculator__button--reset" onClick={handleAcPress} >AC</span>
                <span className="calculator__button calculator__button--operator" onClick={handleMemPress} >
                    {/* +/- */}
                    M</span>
                <span className="calculator__button calculator__button--operator" onClick={handleRecPress} >Mr</span>
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
