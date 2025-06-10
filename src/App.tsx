import Form from "./components/Form";
import "animate.css";

const App = () => {
  return (
    <div className="font-mono bg-grey-200 h-screen flex flex-col items-center justify-center relative">
      <img className="py-10 md:p-0 md:pb-18" src="logo.svg" alt="logo" />
      <Form className="animate__animated animate__jackInTheBox" />
      <div className="hidden md:block md:absolute md:bottom-6 text-sm animate__animated animate__flipInX animate__delay-1s">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          className="text-green-400"
          target="_blank"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="#" className="text-green-400">
          Hammam Yousef
        </a>
        .
      </div>
    </div>
  );
};

export default App;
