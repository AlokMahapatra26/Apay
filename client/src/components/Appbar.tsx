import { useNavigate } from "react-router"


export const Appbar = () => {


  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "G" ;

  // hidel  profile icon if there no data in local storage
  const hidden = localStorage.getItem("name")
  let con = false;
  if(hidden == null){
    con = true;
  }

    return <div className="p-4 flex justify-between  items-center ">


        <div className="flex flex-col justify-center h-full ml-4">
        <p className=" text-2xl font-bold text-green-500">
        α 
  <span> </span>
  <span className="bg-green-500 rounded-full text-white inline-flex items-center justify-center h-14 w-14 text-3xl ">
    pay
  </span>
</p>

        </div>
        <button
       hidden={con} 
      onClick={()=> navigate("/user-info")}
      className="text-black  w-12 h-12 rounded-full cursor-pointer bg-green-500 text-4xl  text-white"
    >
     {name[0]}
    </button>
        
            
           
                
            
        
    </div>
}