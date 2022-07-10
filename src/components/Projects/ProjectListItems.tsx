import React from "react";
import { dynColor } from './projectUtil';
import { useNavigate } from 'react-router-dom';
import { TinyProjectdDtails } from './TinyProjectDetails';
import { ListProjectItem } from './Projects';
import { User } from 'firebase/auth';

interface ProjectItemsProps {
  Project: ListProjectItem;
  id: string;
  user?:User|null
}

export const Projectitems: React.FC<ProjectItemsProps> = ({ Project, id ,user}) => {
const navigate = useNavigate();
const theme=dynColor(Project.details.status)
const goFullpage=()=>{
  navigate('/oneproject',{state: {Project,theme,id,from:"oneproject"}})
}
return (
    <div 
    onClick={()=>goFullpage()}
    className=" w-[100%]  h-fit flex justify-center items-center   
    border-2  hover:shadow-md hover:shadow-slate-400" >
      
      <div  style={{borderColor:theme,borderWidth:"2px",borderRadius:"5px"}}
      className="w-[100%] p-2 flex flex-col lg:flex-row bg-slate-100">

        <div className="h-[100%] flex w-[100%] flex-col lg:w-[70%] bg-slate-100">
          <div className="h-fit w-[100%] p-2  flex justify-start items-start text-2xl font-extrabold font-boldoverflow-x-clip"
          >
            {Project.title}
          </div>
          <p className="h-fill w-[100%] max-w-full p-1  flex justify-start items-start overflow-x-clip font-medium">
            {Project.desc}
          </p>
        </div>

    <div className="h-[100%] w-[100%] lg:w-[40%] bg-slate-300 flex md:justify-evenly items-center">
        
    <div className="h-[100%] w-[95%] md:w-[95%] bg-slate-300 flex flex-col md:justify-evenly border-2">
     {/*@ts-ignore */}
    <TinyProjectdDtails Project={Project} id={id} user={user}/>
      </div>
        <div style={{backgroundColor:theme}}
        className="h-[100%] w-[5%] p-2 md:w-[5%]"></div>
        </div>

      </div>
    </div>
  );
};
