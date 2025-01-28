
const InputBox = ({type , placeholder , onChange} : {type : string , placeholder : string , onChange : any}) => {
  return (
    <input onChange={onChange} type={type} placeholder={placeholder} className="p-2 m-2 border border-green-500 outline-none rounded block" required/>
  )
}

export default InputBox