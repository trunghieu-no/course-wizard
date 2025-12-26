import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import "./styles.css";

function App() {
  const [step, setStep] = useState(1);

  const [course, setCourse] = useState({
    title: "",
    description: "",
    duration: 0,
    category: "",
    modules: [] 
  });

  return (
    <div className="container">
      {step === 1 && (
        <Step1 course={course} setCourse={setCourse} next={() => setStep(2)} />
      )}

      {step === 2 && (
        <Step2
          course={course}
          setCourse={setCourse}
          back={() => setStep(1)}
          next={() => setStep(3)} 
        />
      )}

      {step === 3 && (
        <Step3
          course={course}
          setCourse={setCourse}
          back={() => setStep(2)}
          finish={() => alert("🎉 Hoàn thành! (Nơi bạn submit lên server)")}
        />
      )}
    </div>
  );
}

export default App;
