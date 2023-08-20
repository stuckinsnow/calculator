import { useEffect, useState } from 'react';
import './HomePage.scss';

const HomePage = () => {


    const [currentNum, setCurrentNum] = useState(0);
    const [prevNum, setPrevNum] = useState(0);
    const [isMulPressed, setIsMulPressed] = useState<boolean>(false);
    const [isAddPressed, setIsAddPressed] = useState<boolean>(false);
    const [isSubPressed, setIsSubPressed] = useState<boolean>(false);

    const [total, setTotal] = useState(0);

    const handleNumberPress: any = (v: number) => {

        if (isMulPressed === false && isAddPressed === false && isSubPressed === false && currentNum === 0) {
            setCurrentNum(v);
        }

        if (isAddPressed === true) {
            setPrevNum(prevNum => prevNum + currentNum);
            setCurrentNum(v);
        }

        if (isMulPressed === true) {
            setPrevNum(currentNum);
            setCurrentNum(v);
        }

    }

    const handleMulPress: any = () => {

        setIsMulPressed(true);

        if (total > 0) {
            setPrevNum(total);
        }
    }

    const handleAddPress: any = () => {

        if (isSubPressed === true) {
            setIsSubPressed(false);
        }

        setIsAddPressed(true);
    }

    const handleSubPress: any = () => {

        setIsSubPressed(true);

    }


    const handleEqualsPress: any = () => {

        if (isAddPressed === true) {
            setTotal(prevNum + currentNum);
            console.log(total);
        }

        if (isAddPressed === true && total > 0) {
            setTotal(total + currentNum);
            console.log('new total');
            setPrevNum(total);
        }

        if (isMulPressed === true) {
            setTotal(prevNum * currentNum);
            console.log(total);
            setPrevNum(total);
        }

        if (isMulPressed === true && total > 0) {
            setTotal(total * currentNum);
            console.log('new total');
            setPrevNum(total);
        }


        setIsAddPressed(false);
        setIsSubPressed(false);
        setIsMulPressed(false);

    };

    useEffect(() => {
        console.log('state current num', currentNum);
        console.log('state prev num', prevNum);
        console.log('state total', total);
    }, [currentNum, prevNum, total]);

    let totalDisplay: number = total;


    return (
        <div className="calculator">

            <div className="calculator__display">{totalDisplay}</div>

            <div className="calculator__buttons">

                <span className="calculator__button calculator__reset">AC</span>
                <span className="calculator__button calculator__operator">+/-</span>
                <span className="calculator__button calculator__operator">%</span>
                <span className="calculator__button calculator__operator">/</span>

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
