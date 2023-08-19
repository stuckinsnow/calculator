import './HomePage.scss';

const HomePage = () => {
    return (
        <div className="calculator">

            <div className="calculator__display">0</div>

            <div className="calculator__buttons">

                <span className="calculator__button calculator__reset">AC</span>
                <span className="calculator__button calculator__operator">+/-</span>
                <span className="calculator__button calculator__operator">%</span>
                <span className="calculator__button calculator__operator">/</span>

                <span className="calculator__button calculator__number">7</span>
                <span className="calculator__button calculator__number">8</span>
                <span className="calculator__button calculator__number">9</span>
                <span className="calculator__button calculator__operator">*</span>

                <span className="calculator__button calculator__number">4</span>
                <span className="calculator__button calculator__number">5</span>
                <span className="calculator__button calculator__number">6</span>
                <span className="calculator__button calculator__operator">-</span>

                <span className="calculator__button calculator__number">1</span>
                <span className="calculator__button calculator__number">2</span>
                <span className="calculator__button calculator__number">3</span>
                <span className="calculator__button calculator__operator">+</span>

                <span className="calculator__button calculator__number calculator__button--zero">0</span>
                <span className="calculator__button calculator__number calculator__button--dot">.</span>
                <span className="calculator__button calculator__operator calculator__button--equals">=</span>

            </div>
        </div>
    )
}

export default HomePage;
