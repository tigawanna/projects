
import React, { useState } from 'react'
import { ProjectsForm } from './ProjectForm';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, orderBy,limit } from "firebase/firestore";
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { tyme } from './projectUtil';
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

const [open, setOpen]= useState(false);

const queryClient = useQueryClient() 
const dataQuery = useFirestoreQueryData(["projects"], ProjectsRef,{
    subscribe:true
});

if (dataQuery.isLoading) {
return <div className='h-full w-full flex justify-center items-center'>Loading...</div>;
}

const tings =dataQuery.data
const dummy_tings=[
    {
        "details": {
            "addedBy": "J8204JdDzwMWXs4WOSd4eOuKcKf5",
            "deadline": null,
            "type": "",
            "quotation": "",
            "addedon": {
                "seconds": 1657454040,
                "nanoseconds": 498000000
            },
            "frequency": "once",
            "status": "pending"
        },
        "id": "l5f9c9h0",
        "title": " What is Lorem Ipsum?",
        "desc": "\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "timestamp": {
            "seconds": 1657454040,
            "nanoseconds": 572000000
        }
    },
    {
        "details": {
            "addedBy": "J8204JdDzwMWXs4WOSd4eOuKcKf5",
            "deadline": {
                "seconds": 1657659600,
                "nanoseconds": 0
            },
            "type": "",
            "quotation": "",
            "addedon": {
                "seconds": 1657454019,
                "nanoseconds": 930000000
            },
            "frequency": "once",
            "status": "pending"
        },
        "id": "l5f9bqtv",
        "title": " What is Lorem Ipsum?",
        "desc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "timestamp": {
            "seconds": 1657454020,
            "nanoseconds": 334000000
        }
    },
    {
        "id": "l5f8p3mp",
        "title": "roro",
        "desc": "ss",
        "details": {
            "addedBy": "J8204JdDzwMWXs4WOSd4eOuKcKf5",
            "deadline": null,
            "type": "",
            "quotation": "",
            "addedon": {
                "seconds": 1657452959,
                "nanoseconds": 717000000
            },
            "frequency": "once",
            "approvedOn": {
                "seconds": 1657453127,
                "nanoseconds": 674000000
            },
            "fundedOn": {
                "seconds": 1657453158,
                "nanoseconds": 4000000
            },
            "status": "done",
            "doneOn": {
                "seconds": 1657453212,
                "nanoseconds": 631000000
            }
        },
        "timestamp": {
            "seconds": 1657453212,
            "nanoseconds": 631000000
        }
    },
    {
        "id": "l5f8915w",
        "title": "haha",
        "desc": "auauauuaua",
        "details": {
            "addedBy": "J8204JdDzwMWXs4WOSd4eOuKcKf5",
            "deadline": null,
            "type": "",
            "quotation": "",
            "addedon": {
                "seconds": 1657452210,
                "nanoseconds": 240000000
            },
            "frequency": "once",
            "status": "approved",
            "approvedOn": {
                "seconds": 1657452224,
                "nanoseconds": 770000000
            }
        },
        "timestamp": {
            "seconds": 1657452224,
            "nanoseconds": 770000000
        }
    },
    {
        "id": "l5f7tdzi",
        "title": "test",
        "desc": "hello world",
        "details": {
            "addedBy": "J8204JdDzwMWXs4WOSd4eOuKcKf5",
            "deadline": null,
            "type": "",
            "quotation": "",
            "addedon": {
                "seconds": 1657451481,
                "nanoseconds": 114000000
            },
            "frequency": "once",
            "approvedOn": {
                "seconds": 1657451996,
                "nanoseconds": 999000000
            },
            "fundedOn": {
                "seconds": 1657452071,
                "nanoseconds": 741000000
            },
            "status": "done",
            "doneOn": {
                "seconds": 1657452141,
                "nanoseconds": 422000000
            }
        },
        "timestamp": {
            "seconds": 1657452141,
            "nanoseconds": 422000000
        }
    }
]

if(dataQuery.error){
    insert_dummy_to_cache(dummy_tings,["projects"],queryClient)
}

// console.log("tings , == ",tings)

return (
<div className="h-full p-1 flex-col-center w-full " >
<div className="max-h-[90%] p-1 w-full overflow-y-scroll" >
  <button 
  className='fixed md:top-3 p-1 top-[8%] right-[5%] md:right-[50%] z-50 border-2 
  rounded hover:border-slate-50 border-slate-500 md:p-1 text-white 
  bg-slate-900 md:bg-slate-500'

  onClick={()=>setOpen(!open)}>{open?"close":"add Project"}</button>
  {open?<ProjectsForm open={open} setOpen={setOpen} user={user}/>:null}
  
   <div className="flex-col-center p-3 w-full">
  
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
