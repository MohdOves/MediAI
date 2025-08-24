"use client"
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import { Loader2 } from "lucide-react";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { SessionDetail } from "../medical-agent/[sessionId]/page";







function AddNewSessionDialog() {

  const [note, setNote] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>()
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>()
  const router = useRouter();
  const [historyList,setHistoryList] = useState<SessionDetail[]>([])


  const {has} = useAuth();
  //@ts-ignore  
  const paidUser=has && has({ plan : 'pro'})
  
  useEffect(()=>{
    GetHistoryList();
  },[])

  const GetHistoryList = async() =>{

    const result = await axios.get("/api/session-chat?sessionId=all");
    console.log(result.data);
    setHistoryList(result.data);
  }

  const OnClickNext = async () =>{

    setLoading(true);
    const result = await axios.post('/api/suggest-doctors',{
      notes:note
    });

    const doctors = Array.isArray(result.data) ? result.data : [];
    console.log('Suggested doctors:', doctors);
    setSuggestedDoctors(doctors);
    setLoading(false);
  }

  const onStartConsultation = async () =>{
    setLoading(true);
    //Save all info to database

    const result = await axios.post('/api/session-chat',{
      notes:note,
      selectedDoctor:selectedDoctor
    })
    console.log(result.data)
    if(result.data?.sessionId){
      console.log(result.data.sessionId)
      //route new conversation screen

      router.push('/dashboard/medical-agent/'+result.data.sessionId)
    }
    setLoading(false);

   
  }

  return (
    <Dialog>
      <DialogTrigger>
      <Button asChild className='mt-5' disabled={!paidUser && historyList.length >= 1}><span>+ Start a Consultation</span></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
           {!suggestedDoctors? <div>
            <h2>Add Sympton or Any Other Details</h2>
            <Textarea placeholder='Add Details here...' className='h-[200px] mt-1'
            onChange={(e) => setNote(e.target.value)}
            />
            </div> : 
            <div>
              <h2>Select the doctor</h2>
            <div className="grid grid-col-2 gap-5" >
              {/* //suggested Doctors */}
              {suggestedDoctors.map((doctor,index) =>(
                <SuggestedDoctorCard doctorAgent={doctor} key={index}
                  setSelectedDoctor={()=>setSelectedDoctor(doctor)}
                  //@ts-ignore
                  selectedDoctor={selectedDoctor}/>
                 
              ))}
              </div>
              </div>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <DialogClose>
            <Button asChild variant={'outline'}><span>Cancel</span></Button>
            </DialogClose>
            {!suggestedDoctors ? 
              <Button asChild disabled={!note || loading}>
                <span onClick={() => OnClickNext()}>
                  Next {loading ? <Loader2 className='animate-spin'/> : <ArrowRight/>}
                </span>
              </Button>
              : 
              <Button disabled={loading || !selectedDoctor} onClick={()=>onStartConsultation()}>
                Start Consultation {loading ? <Loader2 className='animate-spin'/> : <ArrowRight/>}
              </Button>
            }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
