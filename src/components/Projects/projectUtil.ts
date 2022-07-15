import dayjs  from 'dayjs';



export interface tyme{
  nanoseconds: number,
  seconds:number
}


export const dynColor=(status:string)=>{

if(status==="pending"){
    return '#e30403'
}

if(status==="approved"){
    return '#93C5FD'
}
if(status==="funded"){
    return '#34D399'
}
if(status==="done"){
    return '#4C1D95'
}
}


export const toTyme =(time?:tyme)=>{
 //@ts-ignore
 if(!time){
    return dayjs(new Date()).format("DD/MM/YYYY")
  } 
  if((time as tyme)?.seconds){
    const ty= new Date(
        //@ts-ignore
      time.seconds * 1000 + time.nanoseconds / 1000000);
    // console.log("was a firebase timestamp",time)
    return dayjs(ty).format("DD/MM/YYYY")
 }  
//  console.log("regular date",time)
 //@ts-ignore
return dayjs(time).format("DD/MM/YYYY")

 
}

export const justTym =(time:tyme|null|undefined)=>{
    if(time){
      const ty= new Date(
          //@ts-ignore
        time.seconds * 1000 + time.nanoseconds / 1000000
      );
   return ty
   }  
   return null
   
  }


  export const dummy_tings=[
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
