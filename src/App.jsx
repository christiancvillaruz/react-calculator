import { useState, useEffect } from 'react';
import { FaHeart, FaGithub, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import NumberFormat from 'react-number-format';
import './index.css';

function App() {
  const [preState, setPreState] = useState('');
  const [curState, setCurState] = useState('');
  const [input, setInput] = useState(0);
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") {
      return;
    }

    if (total) {
      setPreState("");
    }

    curState ? setCurState((pre) => pre + e.target.innerText) : setCurState(e.target.innerText);
    setTotal(false);
  }

  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput(0);
  }, []);

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    }
    else {
      setPreState(curState);
      setCurState("");
    }
  }

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }

    let calculate;
    switch (operator) {
      case "/":
        calculate = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "x":
        calculate = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        calculate = String(parseFloat(preState) - parseFloat(curState));
        break;
      case "+":
        calculate = String(parseFloat(preState) + parseFloat(curState));
        break;
      default:
        return;
    }

    setInput('');
    setPreState(calculate);
    setCurState('');
  }

  const plusMinus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    }
    else {
      setCurState("-" + curState);
    }
  }

  const percent = () => {
    preState ? setCurState(String(parseFloat(curState) / 100 * preState)) : setCurState(String(parseFloat(curState) / 100));
  }

  const reset = () => {
    setPreState('');
    setCurState('');
    setInput('0');
  }

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Calculator React JS</title>
      </Helmet>
      <div className="text-center py-4">
        <h1 className="font-extrabold text-3xl">
          Calculator
        </h1>
      </div>
      <div className="flex justify-center py-2 px-4">
        <div className="max-w-[1000px] w-[25rem] bg-zinc-900 shadow-sm rounded-lg p-4">
          { /* Screen */ }
          <div className="pb-4 text-white">
            <div className="flex flex-row justify-end text-center mr-5">
              <p className="text-7xl">
                &emsp;
                { 
                  input !== "" || input === "0"
                  ? <NumberFormat value={ input } displayType={ 'text' } thousandSeparator={ true } />
                  : <NumberFormat value={ preState } displayType={ 'text' } thousandSeparator={ true } /> 
                }
              </p>
            </div>
          </div>
          { /* Buttons */ }
          <div className="flex flex-row justify-center items-center space-x-3 tex mb-2">
            <div className="ctrl" onClick={ reset }>AC</div>
            <div className="ctrl" onClick={ plusMinus }>+/-</div>
            <div className="ctrl" onClick={ percent }>%</div>
            <div className="operations" onClick={ operatorType }>/</div>
          </div>
          <div className="flex flex-row justify-center items-center space-x-3 mb-2">
            <div className="num" onClick={ inputNum }>7</div>
            <div className="num" onClick={ inputNum }>8</div>
            <div className="num" onClick={ inputNum }>9</div>
            <div className="operations" onClick={ operatorType }>x</div>
          </div>
          <div className="flex flex-row justify-center items-center space-x-3 mb-2">
            <div className="num" onClick={ inputNum }>4</div>
            <div className="num" onClick={ inputNum }>5</div>
            <div className="num" onClick={ inputNum }>6</div>
            <div className="operations" onClick={ operatorType }>-</div>
          </div>
          <div className="flex flex-row justify-center items-center space-x-3 mb-2">
            <div className="num" onClick={ inputNum }>1</div>
            <div className="num" onClick={ inputNum }>2</div>
            <div className="num" onClick={ inputNum }>3</div>
            <div className="operations" onClick={ operatorType }>+</div>
          </div>
          <div className="flex flex-row justify-center items-center space-x-3">
            <div className="num-zero" onClick={ inputNum }><span className="ml-8">0</span></div>
            <div className="num" onClick={ inputNum }>.</div>
            <div className="operations" onClick={ equals }>=</div>
          </div>
        </div>
      </div>
      <footer className="text-center text-zinc-700 py-12">
        <h1 className="flex flex-row justify-center items-center gap-1">Made with <FaHeart/> by Christian</h1>
        <ul className="flex flex-row justify-center items-center gap-3 p-4 text-2xl">
          <li><a href="https://github.com/christiancvillaruz" target="_blank" rel="noreferrer"><FaGithub/></a></li>
          <li><a href="https://twitter.com/robertssson13" target="_blank" rel="noreferrer"><FaTwitter/></a></li>
          <li><a href="https://facebook.com/kristyaaaan7" target="_blank" rel="noreferrer"><FaFacebook/></a></li>
          <li><a href="https://linkedin.com/in/christiancvillaruz" target="_blank" rel="noreferrer"><FaLinkedin/></a></li>
        </ul>
      </footer>

    </div>
  );
}

export default App;