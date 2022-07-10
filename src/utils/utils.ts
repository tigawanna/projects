
import { QueryClient } from 'react-query';

export const insert_dummy_to_cache=(data:any,index:any[],queryClient:QueryClient)=>{
    queryClient.setQueryData(index,data);
}
  
  export const appendtoCache=async(queryClient:QueryClient,newobj:any,index:any[],flag:string)=>{
    
    // console.log("index for the query === ",index)
    // console.log("new data to append=== ",newobj)
  
    await queryClient.cancelQueries(index);
    // Snapshot the previous value
    const previous = queryClient.getQueryData(index) as any[]
  
    // Optimistically update to the new value
     if(previous){
      //since this is being called on create and update , if the dpaymentId
    //exists it's spliced out to avoid duplication in cache
  
      queryClient.setQueryData(index, (oldobj:any) => {
        // console.log("initial oldobj === ",oldobj)
        let final =  [...oldobj]
        if(flag === "edit"||"new"){
         for(let i = 0; i<oldobj.length; i++){
              if(oldobj[i].id === newobj.id){
            //    console.log("found match === ",oldobj[i])
               oldobj.splice(i,1,newobj)
               final = oldobj
            //    console.log("cache finally after splice=== ",final)  
               break
              }
            }
        }
        if(flag === "append"){
            for(let i = 0; i<oldobj.length; i++){
                 if(oldobj[i].id === newobj.id){
                    // console.log("found match === ",oldobj[i])
                  final = [...oldobj,newobj]
                //   console.log("cache finaly after append=== ",final)  
                  break
                 }
               }
           }

        
        return(final)
      });
     
    }
  }
