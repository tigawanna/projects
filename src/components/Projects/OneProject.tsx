import React from "react";
import { useLocation } from "react-router-dom";
import { ListProjectItem } from "./Projects";
import { DetailsListItem } from "./ProjectListItemDetails";
import { FaRegEdit, FaSave, FaRegWindowClose } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useState } from "react";
import { dynColor, justTym, toTyme } from "./projectUtil";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { doc, serverTimestamp } from "firebase/firestore";
import { User } from 'firebase/auth';
import { appendtoCache } from "../../utils/utils";
import { useQueryClient } from 'react-query';

interface OneProjectProps {
user?:User|null
}
export interface item {
  title: string;
  desc: string;
  editedon: Date;
  deadline: Date | null;
  status: string;
  frequency: string | undefined;
  type?: string;
  quotation?: string;
}

export const OneProject: React.FC<OneProjectProps> = ({user}) => {
const { state } = useLocation();

  // console.log("arrived with state  == ",state)
  //@ts-ignore
  const Project = state.Project as ListProjectItem;
  //@ts-ignore
  const atheme = state.theme;
  const title = Project.title;
  const desc = Project.desc;
  const status = Project.details.status;
  const frequency = Project.details.frequency;
  const addedby = Project.details.addedBy;
  const addedon = Project.details.addedon;
  const deadline = justTym(Project.details.deadline);
  const type = Project.details.type;
  const quotation = Project.details.quotation;
  //@ts-ignore
  const id = state.id;

  //console.log("navigated with state =====",state)

  const [editing, setEditing] = useState<boolean>(false);
  //@ts-ignore
  const [selected, setSelected] = useState<Date | undefined>(deadline);
  const [calOpen, setCalOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<string|undefined>(atheme);
  const [input, setInput] = useState<item>({
    title: title,
    desc: desc,
    editedon: new Date(),
    deadline,
    status,
    frequency,
    type,
    quotation,
  });

  //@ts-ignore
  const handleChange = (e, vals, item) => {
    const { value } = e.target;
    setInput({ ...input, [e.target.id]: value });
  };
  const queryClient = useQueryClient() 
  const ref = doc(db, "projects", id);

  const mutation = useFirestoreDocumentMutation(ref, { merge: true },{
    onMutate:(data)=>{
      // console.log("data on mutate",data)
      appendtoCache(queryClient,data,["projects"],"edit")
    }
  });
  const updateProject = () => {
    const item = {
      id,
      title: input.title,
      desc: input.desc,
      timestamp: serverTimestamp(),
      details: {
        editedOn: new Date(),
        editedBy: user?.displayName,
        deadline: selected ? selected : input.deadline,
        status: input.status,
        frequency: input.frequency,
        quotation: input.quotation,
      },
    };
    mutation.mutate(item);

    console.log("data on mutate",item)
    setTheme(dynColor(input.status))
    setEditing(false);
  };

  return (
    <div
      style={{ borderColor: theme, borderWidth: "2px", borderRadius: "5px" }}
      className="w-full min-h-fit  flex flex-col items-center overflow-y-scroll "
    >
      <IconContext.Provider value={{ size: "30px" }}>
        <div className="fixed top-[11%] right-[3%] text-black md:right-[50%] md:top-3 z-30">
        <FaRegEdit onClick={() => setEditing(!editing)} />
        </div>

        <div className=" min-h-[85vh] h-[90vh] flex w-full flex-col items-center justify-between">

        <div className=" h-[90%]  w-[95%] lg:w-[70%]  bg-slate-200 m-5">
            <div className=" flex w-full justify-between">
              {addedby ? (
                <div className="flex mx-2 justify-center items-center">
                  <div className="font-bold text-lg">By : </div>
                  <div>{user?.displayName}</div>
                </div>
              ) : null}

              {addedon ? (
                <div className="flex mx-2 justify-center items-center">
                  <div className="font-bold text-lg">On : </div>
                  <div>{toTyme(addedon)}</div>
                </div>
              ) : null}
            </div>

            {editing ? (
              <input
                id={"title"}
                name={"title"}
                //@ts-ignore
                onChange={(e) => handleChange(e)}
                value={input.title}
                className="border-black border-2 m-2 p-2 w-[95%] "
              />
            ) : (
              <div className="text-3xl m-2 font-bold  md:p-2">
                {input.title}
              </div>
            )}

            {editing ? (
              <textarea
                id={"desc"}
                name={"description"}
                //@ts-ignore
                onChange={(e) => handleChange(e)}
                value={input.desc}
                className="border-black border-2 m-2  p-4 w-[95%] rounded-sm
                overflow-y-scroll min-h-[200px] md:min-h-[200px] h-[70%]"
              />
            ) : (
              <div className="text-base m-2 overflow-y-scroll md:py-4 p-2 font-bold h-[70%]">
                {input.desc}
              </div>
            )}

            {mutation.isError && <p>{mutation.error.message}</p>}
          </div>

   
          <div style={{ borderColor: theme, borderWidth: "3px",borderRadius: "5px",}}
          className="m-2   w-[95%] lg:w-[70%] flex flex-col bg-slate-300 ">
          <DetailsListItem
            from={"oneProject"}
            id={id}
            Project={Project}
            editing={editing}
            input={input}
            setInput={setInput}
            selected={selected}
            setSelected={setSelected}
            calOpen={calOpen}
            setCalOpen={setCalOpen}
            handleChange={handleChange}
            theme={theme}
            setTheme={setTheme}
          />
        </div>
        </div>
          {editing ? (
            <div className=" fixed bottom-[3%] right-[5%] text-black  z-30 bg-slate-600   p-1 rounded-sm">
              <FaSave onClick={() => updateProject()} className="mx-2" />
              <FaRegWindowClose
                onClick={() => setEditing(!editing)}
                className="mx-2"
              />
            </div>
          ) : null}

      </IconContext.Provider>
    </div>
  );
};
