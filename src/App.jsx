import {useEffect, useRef, useState} from 'react'

function App() {

  const [cardNumbers, setCarNumbers] = useState(Array(4).fill(''));
  const [printNums,setPrintNums] = useState(false)
  const inputRefs = useRef([]);
  //  console.log(inputRefs)
  useEffect(() => {
    inputRefs.current[0].focus();
    
  },[])


  function handleInputChange(value,idx){
    let cardNumbersCopy = [...cardNumbers];
    cardNumbersCopy[idx] = value;

    if(value.length === 4 && idx < 3){
      inputRefs.current[idx+1].focus();
    }
   
    setCarNumbers(cardNumbersCopy);
  }

  function handleKeyDown(value,idx,e){
    if(value.length === 4 && idx === 3 && e.key==='Enter'){
      setPrintNums(true)
      document.querySelectorAll('input').forEach((item) => {
        item.disabled = true
      })
    }
    if(value.length === 1 && idx <= 3 && idx >= 1 && e.key==='Backspace'){
      let cardNumbersCopy = [...cardNumbers];
    cardNumbersCopy[idx] = '';
    setCarNumbers(cardNumbersCopy)
      console.log('inside');
      inputRefs.current[idx-1].focus();
    }
  }
   
  //  function handlePaste(event){
  //   const clipboardData = event.clipboardData.getData('text') || '';

  //  }

  function handleDeletion(){
    setPrintNums(false)
    setCarNumbers(Array(4).fill(''))
    document.querySelectorAll('input').forEach((item) => {
      item.disabled = false;
    })
    inputRefs.current[0].focus();
  }

  return (<>
  <div className='p-4'>
    <span>Card Number : </span>
  {
  cardNumbers.map((value,idx) => {
    return <input key={idx} type='text' className='size-10 w-[10%] border-gray-500 border-2 mr-2 p-2' 
    ref={(ref) => inputRefs.current[idx] = ref}
    maxLength={'4'}
    value={value}
    onChange={(e) => handleInputChange(e.target.value,idx)}
    onKeyDown={(e) => handleKeyDown(e.target.value,idx,e)}
    onPaste={handlePaste}
    />
  })
  }
  {printNums && <ul className='p-4'>
    
    {cardNumbers.map((value,idx) => {
      return <li key={idx} className='list-disc'>{value}</li>
    })}
    <button onClick={handleDeletion} className='bg-red-600 p-2 text-white rounded'>Delete</button>
    </ul>}
  </div>
  </>)
}

export default App;
