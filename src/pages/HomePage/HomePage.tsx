import { useEffect, useState } from 'react';
import './HomePage.scss';

const HomePage = () => {


    const [display, setDisplay]: any = useState(0);
    const [currentNum, setCurrentNum]: any = useState(0);
    const [prevNum, setPrevNum] = useState(0);
    const [isNumPressed, setIsNumPressed] = useState<boolean>(false);
    const [isDivPressed, setIsDivPressed] = useState<boolean>(false);
    const [isMulPressed, setIsMulPressed] = useState<boolean>(false);
    const [isAddPressed, setIsAddPressed] = useState<boolean>(false);
    const [isSubPressed, setIsSubPressed] = useState<boolean>(false);

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

    const handleNumberPress: any = (v: number) => {

        if (isNumPressed === true) {
            const concatenatedValue = String(currentNum) + String(v);
            const numberedValue = parseFloat(concatenatedValue);
            setCurrentNum(numberedValue);
            console.log('concatinating', numberedValue);
        }


        if (isMulPressed === false && isAddPressed === false && isSubPressed === false && currentNum === 0) {
            setCurrentNum(v);
            setIsNumPressed(true);
        }

        if (isDivPressed === true) {
            setIsNumPressed(true);
            setPrevNum(currentNum);
            setCurrentNum(v);
        }

        if (isMulPressed === true) {
            setIsNumPressed(true);
            setPrevNum(currentNum);
            setCurrentNum(v);
        }

        if (isAddPressed === true) {
            setIsNumPressed(true);
            setPrevNum(prevNum => prevNum + currentNum);
            setCurrentNum(v);
        }

        if (isSubPressed === true) {
            setIsNumPressed(true);
            setPrevNum(currentNum);
            setCurrentNum(v);
        }

    }

    const handleDivPress: any = () => {

        setIsDivPressed(true);
        setIsNumPressed(false);

        if (isMulPressed === true) {
            setIsMulPressed(false);
        }

        if (isAddPressed === true) {
            setIsAddPressed(false);
        }

        if (isSubPressed === true) {
            setIsSubPressed(false);
        }

        setDisplay('/');

    }

    const handleMulPress: any = () => {

        setIsMulPressed(true);
        setIsNumPressed(false);

        if (isDivPressed === true) {
            setIsDivPressed(false);
        }

        if (isAddPressed === true) {
            setIsAddPressed(false);
        }

        if (isSubPressed === true) {
            setIsSubPressed(false);
        }

        if (total != 0) {
            setPrevNum(total);
        }

        setDisplay('*');
    }

    const handleAddPress: any = () => {

        setIsAddPressed(true);
        setIsNumPressed(false);

        if (isDivPressed === true) {
            setIsDivPressed(false);
        }

        if (isMulPressed === true) {
            setIsMulPressed(false);
        }

        if (isSubPressed === true) {
            setIsSubPressed(false);
        }

        setDisplay('+');
    }

    const handleSubPress: any = () => {

        setIsSubPressed(true);
        setIsNumPressed(false);

        if (isDivPressed === true) {
            setIsDivPressed(false);
        }

        if (isMulPressed === true) {
            setIsMulPressed(false);
        }
        if (isAddPressed === true) {
            setIsAddPressed(false);
        }

        setDisplay('-');

    }


    const handleEqualsPress: any = () => {

        setIsNumPressed(false);

        if (isDivPressed === true) {
            const newTotal = total !== 0 ? total / currentNum : prevNum / currentNum;
            setTotal(newTotal);
            console.log('new total:', newTotal);
            setPrevNum(parseFloat(newTotal.toFixed(8)));
        }

        if (isMulPressed === true) {
            const newTotal = total !== 0 ? total * currentNum : prevNum * currentNum;
            setTotal(newTotal);
            console.log('new total:', newTotal);
            setPrevNum(newTotal);
        }

        if (isAddPressed === true) {
            const newTotal = total !== 0 ? total + currentNum : prevNum + currentNum;
            setTotal(newTotal);
            console.log(newTotal);
            setPrevNum(newTotal);
        }

        if (isSubPressed === true) {
            const newTotal = total !== 0 ? total - currentNum : prevNum - currentNum;
            setTotal(newTotal);
            console.log(newTotal);
            setPrevNum(newTotal);
        }

        setIsAddPressed(false);
        setIsSubPressed(false);
        setIsMulPressed(false);
        setCurrentNum(null);

    };

    useEffect(() => {
        console.log('isNumPressed', isNumPressed);
        console.log('state current num', currentNum);
        console.log('state prev num', prevNum);
        console.log('state total', total);
    }, [isNumPressed, currentNum, prevNum, total]);

    useEffect(() => {

        if (currentNum != null) {
            setDisplay(currentNum);
        }

        else {
            setDisplay(total);
        }
    }, [currentNum, total])

    return (
        <div className="calculator">

            <div className="calculator__display">{display}</div>

            <div className="calculator__buttons">

                <span className="calculator__button calculator__reset" onClick={handleAcPress} >AC</span>
                <span className="calculator__button calculator__operator">+/-</span>
                <span className="calculator__button calculator__operator">%</span>
                <span className="calculator__button calculator__operator" onClick={handleDivPress} >/</span>

                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(7)}>7</span>
                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(8)}>8</span>
                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(9)}>9</span>
                <span className="calculator__button calculator__operator" onClick={handleMulPress} >*</span>

                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(4)}>4</span>
                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(5)}>5</span>
                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(6)}>6</span>
                <span className="calculator__button calculator__operator" onClick={handleSubPress} >-</span>

                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(1)}>1</span>
                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(2)}>2</span>
                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(3)}>3</span>
                <span className="calculator__button calculator__operator" onClick={handleAddPress}>+</span>

                <span className="calculator__button calculator__number calculator__button--zero" onClick={() => handleNumberPress(0)}>0</span>
                <span className="calculator__button calculator__number calculator__button--dot">.</span>
                <span className="calculator__button calculator__operator calculator__button--equals" onClick={handleEqualsPress}>=</span>

            </div>
        </div >
    )
}

export default HomePage;
