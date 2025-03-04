import { useState } from 'react';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import './HomePage.scss';

const HomePage = () => {
    const [state, setState] = useState({
        display: 0,
        currentNum: '0',
        prevNum: 0,
        isDotPressed: false,
        isNumPressed: false,
        isDivPressed: false,
        isMulPressed: false,
        isAddPressed: false,
        isSubPressed: false,
        readyToConcat: false,
        recall: null as number | null,
        saved: null as number | null,
        myMem: 0,
        total: 0,
        waitingForOperand: false
    });

    const handleAcPress = () => {
        setState({
            ...state,
            display: 0,
            total: 0,
            prevNum: 0,
            currentNum: '0',
            isNumPressed: false,
            isDotPressed: false,
            isMulPressed: false,
            isAddPressed: false,
            isSubPressed: false,
            isDivPressed: false,
            readyToConcat: false,
            waitingForOperand: false
        });
    };

    const handleMemPress = () => {
        setState({
            ...state,
            myMem: state.display,
            saved: state.display
        });
    };

    const handleRecPress = () => {
        setState({
            ...state,
            recall: state.myMem,
            currentNum: state.myMem.toString(),
            display: state.myMem,
            isNumPressed: true,
            readyToConcat: false
        });
    };

    const handleSnackbarClose = () => {
        setState({
            ...state,
            recall: null,
            saved: null
        });
    };

    const handleDotPress = () => {
        if (!state.isDotPressed) {
            if (state.waitingForOperand) {
                setState({
                    ...state,
                    currentNum: '0.',
                    isDotPressed: true,
                    readyToConcat: true,
                    isNumPressed: true,
                    waitingForOperand: false,
                    display: 0
                });
            } else {
                setState({
                    ...state,
                    isDotPressed: true,
                    readyToConcat: true,
                    currentNum: state.currentNum + '.'
                });
            }
        }
    };

    const handleOperatorPress = (operator: string) => {
        const currentValue = parseFloat(state.currentNum);

        let newTotal = state.total;
        if (state.isNumPressed) {
            switch (true) {
                case state.isAddPressed:
                    newTotal = state.prevNum + currentValue;
                    break;
                case state.isSubPressed:
                    newTotal = state.prevNum - currentValue;
                    break;
                case state.isMulPressed:
                    newTotal = state.prevNum * currentValue;
                    break;
                case state.isDivPressed:
                    newTotal = state.prevNum / currentValue;
                    break;
                default:
                    newTotal = currentValue;
                    break;
            }
        }

        setState({
            ...state,
            prevNum: newTotal,
            total: newTotal,
            display: newTotal,
            isNumPressed: false,
            isDotPressed: false,
            readyToConcat: false,
            waitingForOperand: true,
            isDivPressed: operator === '/',
            isMulPressed: operator === '*',
            isAddPressed: operator === '+',
            isSubPressed: operator === '-',
        });
    };

    const handleNumberPress = (v: number) => {
        if (state.waitingForOperand) {
            setState({
                ...state,
                currentNum: v.toString(),
                display: v,
                isNumPressed: true,
                readyToConcat: true,
                waitingForOperand: false
            });
            return;
        }

        if (state.currentNum === '0' && !state.isDotPressed) {
            setState({
                ...state,
                currentNum: v.toString(),
                display: v,
                isNumPressed: true,
                readyToConcat: true
            });
            return;
        }

        const newValue = state.isDotPressed
            ? state.currentNum + v.toString()
            : state.currentNum + v.toString();

        setState({
            ...state,
            currentNum: newValue,
            display: parseFloat(newValue),
            isNumPressed: true,
            readyToConcat: true
        });
    };

    const handleEqualsPress = () => {
        if (!state.isNumPressed && !state.isDivPressed && !state.isMulPressed &&
            !state.isAddPressed && !state.isSubPressed) {
            return;
        }

        const currentNumber = parseFloat(state.currentNum);

        if (isNaN(currentNumber)) {
            setState({
                ...state,
                display: NaN,
                currentNum: 'NaN',
                isNumPressed: false,
                readyToConcat: false,
                isDotPressed: false,
                waitingForOperand: true
            });
            return;
        }

        let result = 0;

        switch (true) {
            case state.isDivPressed:
                result = state.prevNum / currentNumber;
                break;
            case state.isMulPressed:
                result = state.prevNum * currentNumber;
                break;
            case state.isAddPressed:
                result = state.prevNum + currentNumber;
                break;
            case state.isSubPressed:
                result = state.prevNum - currentNumber;
                break;
            default:
                result = currentNumber;
                break;
        }

        setState({
            ...state,
            total: result,
            prevNum: result,
            currentNum: result.toString(),
            display: result,
            isNumPressed: false,
            isDotPressed: false,
            readyToConcat: false,
            isDivPressed: false,
            isMulPressed: false,
            isAddPressed: false,
            isSubPressed: false,
            waitingForOperand: true
        });
    };

    return (
        <div className="calculator">
            <Snackbar open={!!state.recall} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
                    Your number: {state.recall}
                </MuiAlert>
            </Snackbar>

            <Snackbar open={!!state.saved} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" severity="info" onClose={handleSnackbarClose}>
                    Number saved: {state.saved}
                </MuiAlert>
            </Snackbar>

            <div className="calculator__display">{state.display}</div>

            <div className="calculator__buttons">
                <span className="calculator__button calculator__button--reset" onClick={handleAcPress}>AC</span>
                <span className="calculator__button calculator__button--operator" onClick={handleRecPress}>Mr</span>
                <span className="calculator__button calculator__button--operator" onClick={handleMemPress}>M</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleOperatorPress('/')}>/</span>

                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(7)}>7</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(8)}>8</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(9)}>9</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleOperatorPress('*')}>*</span>

                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(4)}>4</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(5)}>5</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(6)}>6</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleOperatorPress('-')}>-</span>

                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(1)}>1</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(2)}>2</span>
                <span className="calculator__button calculator__button--number" onClick={() => handleNumberPress(3)}>3</span>
                <span className="calculator__button calculator__button--operator" onClick={() => handleOperatorPress('+')}>+</span>

                <span className="calculator__button calculator__button--number calculator__button--zero" onClick={() => handleNumberPress(0)}>0</span>
                <span className="calculator__button calculator__button--number calculator__button--dot" onClick={handleDotPress}>.</span>
                <span className="calculator__button calculator__button--operator calculator__button--equals" onClick={handleEqualsPress}>=</span>
            </div>
        </div>
    );
};

export default HomePage;
