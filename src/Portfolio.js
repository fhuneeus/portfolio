import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";

export function Portfolio(){
 
  const [listStocks, setListStocks] = useState([]);
  const [winnings, setWinnings] = useState(0);
  const [warning, setWarning] = useState("");
  
  class Stock{
    
    constructor(){
      let prices = [];
      for(let i=0; i<367; i++){
        prices.push(getRandomArbitrary(800,900));
      }

      this.state = {
        stockValues : prices
      };

    }

    Price(date){
      return this.state.stockValues[date];
    }
    
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  
  }

  const generateStocks = () => {
    
    let portfolio = [];

    for(let i=0; i<10; i++){
      const stock = new Stock();
      portfolio.push(stock);
    }

    setListStocks(portfolio);

  }

  const getTodayDate = () =>{
    let today = new Date().toISOString().slice(0, 10)
    return String(today);
  }

  const calculateCorrespondingIndex = (date) => {

    let date1 = new Date(date);
    let date2 = new Date("2021-01-04");

    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return -Difference_In_Days;

  }

  const calculateWinnings = () =>{
    
    let date1=document.getElementById("firstdate").value;
    let date2=document.getElementById("seconddate").value;

    if(date1==date2){
      setWinnings(0);
      return winnings;
    }
    
    let indexone = calculateCorrespondingIndex(date1);
    let indextwo = calculateCorrespondingIndex(date2);

    if(indextwo>indexone){
    setWarning("");

    let winnings = 0;
    
    for(let i=0; i<listStocks.length; i++){
      
      let firstValue = listStocks[i].Price(indexone);
      let secondValue = listStocks[i].Price(indextwo);

      let differential = secondValue - firstValue;
      winnings+= differential;
    }

    setWinnings(winnings);
    return winnings;

    }

    else{setWarning("The start date must be less than the end date");}

  }
  
  
  return (
    <div>

    <p>1) Click on the generate stocks button to create the Portfolio</p>
    <button onClick = {generateStocks}>Generate stocks</button><br/>

    <p>2) Enter two dates to see the winnings of the period</p>

    <input type="date" min="2021-01-04" max={getTodayDate()} id="firstdate"></input>
    <input type="date" min="2021-01-04" max={getTodayDate()} id="seconddate"></input>

    <p>{warning}</p>

    <p>3) Click on calculate winnings.</p>

    <button onClick = {calculateWinnings}>Calculate winnings</button><br/>
    <h1>The winnings of the portfolio are ${winnings}</h1>
    </div>
  );

}

export default Portfolio;

