import { useState , useCallback , useEffect , useRef} from 'react'
 
 

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const [password, setPassword] = useState("")

  //useRef hook

  const passwordRef = useRef(null) //ye isliye use kiye kyuki hame password ke sath reference banana the taaki ham use select kar paaye
                                  //aur password ka selected parts ham show bhi kar paaye UI pe hamne reference banaya 
                                  //button ke sath reference banya hai input field ke password ko then select kiya aur selected parts
                                  //show bhi kiya 

  const passwordGenerator = useCallback(() => { //usecallback used to memorize the maximum parts of the function for optimization purpose

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+= "!@#$%^&*[]{}=+"

    for(let i=1;i<length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,34);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{ //it is used to reRun the function initially while loafing page first time and agar dependency array me se kisi ke 
                  //sath bhi kuch ched denge tab again re run karna padega passwordGenerator() ko
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
       
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-center text-white my-3" >Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">

            <input type="text" value={password}  className="outline-none w-full py-1 px-3" placeholder="Password" readOnly ref={passwordRef}/>
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'  onClick={copyPasswordToClipBoard}>copy</button>

          </div>

          <div className='flex text-sm gap-x-2'> 
          <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
          <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>  
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{
              setNumberAllowed((prev) => !prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
             </div>

             <div className='flex items-center gap-x-1'>  
            <input type="checkbox" defaultChecked={charAllowed} id="characterInput" onChange={()=>{
              setCharAllowed((prev) => !prev);
            }} />
            <label htmlFor="characterInput">Characters</label>
             </div>
          </div>

      </div>
     
    </>
  )
}

export default App
