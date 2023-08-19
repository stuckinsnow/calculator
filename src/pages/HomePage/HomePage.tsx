import { useEffect, useState } from 'react';
import './HomePage.scss';

const HomePage = () => {


    const [isCurrentNumber, setIsCurrentNumber] = useState(0);
    const [isPrevNum, setIsPrevNum] = useState(0);
    const [isAddPressed, setIsAddPressed] = useState<boolean>(false);

    const [isTotal, setIsTotal] = useState(0);

    const handleNumberPress: any = (v: any) => {

        if (isAddPressed == true) {
            setIsPrevNum(isPrevNum + v);
            setIsCurrentNumber(v);

            console.log('add was pressed');

            setIsAddPressed(false);
        }

        else (setIsCurrentNumber(v));
    }

    const handleAddPress: any = () => {

        setIsAddPressed(true);
    }

    const handleEqualsPress: any = () => {

        setIsTotal(isPrevNum + isCurrentNumber);

        console.log('is add', isAddPressed);

    };

    useEffect(() => {
        console.log('state', isTotal);
    }, [isTotal]);

    let totalDisplay: any = isTotal;


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
                <span className="calculator__button calculator__operator">*</span>

                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(4)}>4</span>
                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(5)}>5</span>
                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(6)}>6</span>
                <span className="calculator__button calculator__operator">-</span>

                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(1)}>1</span>
                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(2)}>2</span>
                <span className="calculator__button calculator__number" onClick={() => handleNumberPress(3)}>3</span>
                <span className="calculator__button calculator__operator" onClick={handleAddPress}>+</span>

                <span className="calculator__button calculator__number calculator__button--zero" onClick={() => handleNumberPress(0)}>0</span>
                <span className="calculator__button calculator__number calculator__button--dot">.</span>
                <span className="calculator__button calculator__operator calculator__button--equals" onClick={() => handleEqualsPress(isTotal)} >=</span>

            </div>
        </div >
    )
}

export default HomePage;
