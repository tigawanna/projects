
import React, { useState,useEffect } from 'react'
import { ProjectsForm } from './ProjectForm';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, orderBy,limit } from "firebase/firestore";
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { tyme, dummy_tings } from './projectUtil';
import { Projectitems } from './ProjectListItems';
import { User } from 'firebase/auth';
import { insert_dummy_to_cache } from './../../utils/utils';
import { useQueryClient } from 'react-query';




export interface ListProjectItem{
    id:string,
    title:string,
    desc:string,
    details:{
        addedBy:string,
        addedon:tyme,
        deadline?:tyme|null,
        status:string,
        frequency?:string,
        editedBy?:string,
        editedOn?:tyme,
        approvedOn?:tyme,
        fundedOn?:tyme,
        doneOn?:tyme,
        type?:string,
        quotation?:string

    }
}

interface ProjectsProps {
user?:User|null
}


const ProjectsRef = query( collection(db, "projects"),orderBy("timestamp","desc"),
    limit(5),
    // where("state", "==", "active")
  
  );
  

export const Projects: React.FC<ProjectsProps> = ({user}) => {
const queryClient = useQueryClient() 
const [open, setOpen]= useState(false);

useEffect(() => {
//load dummy data on app load    
insert_dummy_to_cache(dummy_tings,["projects"],queryClient)

}, [])




const dataQuery = useFirestoreQueryData(["projects"], ProjectsRef,{
subscribe:true
});


if (dataQuery.isLoading) {
return <div className='h-full w-full flex justify-center items-center'>Loading...</div>;
}



const tings =dataQuery.data



console.log("render")
// console.log("tings , == ",tings)

return (
<div className="min-h-[100vh] h-full p-1 w-full" >
<div className=" p-1 w-full bg-purple-600 h-fit " >
  <button 
  className='fixed md:top-3 p-1 top-[8%] right-[5%] md:right-[50%] z-50 border-2 
  rounded hover:border-slate-50 border-slate-500 md:p-1 text-white 
  bg-slate-900 md:bg-slate-500'

  onClick={()=>setOpen(!open)}>{open?"close":"add Project"}</button>
  {open?<ProjectsForm open={open} setOpen={setOpen} user={user}/>:null}
  
   <div className="flex-col-center p-3 w-full h-[90%]">
  
  {
     tings?.map((item,index)=>{
     const tems=item as ListProjectItem
      return(
        <div 
        key={index}
        className='w-[100%] md:w-[70%] m-1 '>
       <Projectitems key={item.timestamp} Project={tems} id={item.id} user={user}/> 
       </div>

      )
     }) 
  }
   </div>
   </div>
        </div>
            );
}
