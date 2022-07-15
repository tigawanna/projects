import { User} from 'firebase/auth';




interface HomeProps {
user?:User|null
}


export const Home: React.FC<HomeProps> = ({user}) => {


return (
 <div className='w-full min-h-[90vh]  bg-slate-400 flex-col-center  overflow-x-hidden'> 

 <div className="min-h-fit h-full  flex-col md:flex-row justify-center bg-slate-700 p-5 w-[95%] 
 overflow-y-hidden">
  
 <div className="w-full h-fit flex-col center-flex md:flex-center bg-slate-500">
 <div className='w-full flex-center text-slate-100 text-xl md:text-4xl font-bold'> 
 Welcome 
 {user?.displayName}</div>
    <div className='w-full flex-center '>
      {/* @ts-ignore */}
      {user?.photoURL?<img src={user?.photoURL} 
      alt="user"
     className='w-44 h-44 rounded-[50%] min-h-fit m-2'
     />:null}
    </div>
</div>


 <div className=" text-slate-200 flex flex-col items-center justify-betweem font-medium w-full p-5 m-2 md:h-[50%] overflow-y-scroll">
   <p className='h-full'> Welcome, This is the demo of the project app 
    made with create-react-app ,tailwindcss , react-query and firebase

   It's using mock data instead of a real firebase backend because misuse is a concern
   ,mileage may vary and not all the 
   components were assigned mock data , but most of them will let you create 
   new mutations which will be stored in cache.


   everything needed to make the live back end is in the repo and might take some setting
   up you can refer to the README
  click on the user propfile pic on the top corner to signout but it won't work as expected since a dummy user
   immediatly gets inected into cache. explore the routes on the toolbar and have fun
   </p>

 
   <div className='flex flex-col-center h-[40%] '>
   <div className='capitalize font-bold m-2 p-1 bg-slate-900 text-sm md:text-xl
    text-purple-200'>color highlight for project status</div>
   
   
   <div className='flex flex-wrap'>

   <div className='p-1  text-sm md:text-xl font-bold m-1 rounded-md shadow-white shadow-sm'
   style={{backgroundColor:'#e30403'}}>pending</div>
  
  <div className='p-1  text-sm md:text-xl font-bold m-1 rounded-md shadow-white shadow-sm' 
   style={{backgroundColor:'#99C5FD',color:'#000'}}>approved</div>

   <div className='p-1 text-sm md:text-xl font-bold m-1 rounded-md shadow-white shadow-sm' 
   style={{background:'#34D399' ,color:'#000'}}>funded</div>

    <div className='p-1  text-sm md:text-xl font-bold m-1 rounded-md shadow-white shadow-sm' 
    style={{backgroundColor:'#4C1D95'}}>done</div>

   </div>
   
   </div>
  </div>




 </div>
 </div>
);


}
