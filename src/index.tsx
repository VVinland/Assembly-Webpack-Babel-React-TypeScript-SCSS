import './main.scss';
// import Image from "./images/image.png"
// import logo from "./images/logo.svg"
import './font/font.scss'

function component(text:string) {
    const element = document.createElement('h1');
    element.textContent = text;
    return element;
}
console.log(1);
document.body.prepend(component('Проект собран на Webpack'));

import React from "react";
import ReactDOM from "react-dom/client";
import App from './components/App';

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
)

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)

// function createImg(){
//     const img = document.createElement("img");
//     img.src=Image;
//     document.body.append(img);
// }
// createImg();

// function createSvg(){
//     const img = document.createElement("img");
//     img.src=logo;
//     document.body.append(img);
// }
// createSvg();