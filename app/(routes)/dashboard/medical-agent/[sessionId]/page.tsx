"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, Loader, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type SessionDetail={
  id:number,
  notes:string,
  sessionId:string,
  report:JSON,
  selectedDoctor:doctorAgent,
  createdOn:string,
  
}

type messages={
  role:string,
  text:string
}

function MedicalVoiceAgent() {
  const {sessionId} = useParams();
  const [sessionDetails,setSessionDetails] = useState<SessionDetail>();
  const[callStarted,setCallStarted] = useState(false);
  const [vapiInstance,setVapiInstance] = useState<any>();
 
  const [currentRole,setCurrentRole] = useState<string |null>();
  const[liveTranscript,setLiveTranscript] = useState<string>();
  const [messages,setMessages] = useState<messages[]>([])

  const [loading, setLoading] = useState(false);
  const [showEndCallDialog, setShowEndCallDialog] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    sessionId&&GetSessionDetails();
  },[sessionId])

  const GetSessionDetails=async() =>{
      const result = await axios.get('/api/session-chat?sessionId='+sessionId)
      console.log(result.data);
      setSessionDetails(result.data);
  }

  

  const StartCall = async () => {
    try {
      setLoading(true);
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
      setVapiInstance(vapi);

    const VapiAgentConfig={
      name:"AI Medical Doctor Voice Agent",
      firstMessage:"Hi there, I'm your AI Medical Doctor Voice Agent. How can I help you today?",
      transcriber:{
        provider:'assembly-ai',
        language:'en'
      },
      voice:{
        provider:'playht',
        voiceId:sessionDetails?.selectedDoctor?.voiceId
      },
      model:{
        provider:'openai',
        model:'gpt-4',
        messages:[
          {
            role:'system',
            content:sessionDetails?.selectedDoctor?.agentPrompt
          }
        ]
      }
    }


    vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!);
    vapi.on('call-start', () => {
      console.log('Call started');
      setCallStarted(true);
      setLoading(false); // Stop loading when call actually starts
    });
    vapi.on('call-end', () => {
      setCallStarted(false);
      console.log('Call ended')
    });
    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        const {role,transcriptType,transcript} = message;
        console.log(`${message.role}: ${message.transcript}`);
        if(transcriptType === 'partial') {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        }
        else if(transcriptType === 'final'){
          //final transcript
          setMessages((prev:any)=>[...prev,{role:role,text:transcript}]);
          setLiveTranscript('');
          setCurrentRole(null);
        }
      }
    });

    // Add these event listeners here instead
    vapi.on('speech-start', () => {
      console.log('Assistant started speaking');
      setCurrentRole('Assistant');
    });
    vapi.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRole('User');
    });
    } catch (error) {
      console.error('Error starting call:', error);
      toast.error('Failed to start call. Please try again.');
      setLoading(false);
    }
  }

  // Remove the event listeners from here
  // vapiInstance.on('speech-start'... and vapiInstance.on('speech-end'...


      const endCall = async() => {
        try {
          setLoading(true);
          
          // First stop the call
          if (vapiInstance) {
            vapiInstance.stop();
            vapiInstance.off('call-start');
            vapiInstance.off('call-end');
            vapiInstance.off('message');
            vapiInstance.off('speech-start');
            vapiInstance.off('speech-end');
          }

          // Generate report
          if (messages.length > 0) {
            const result = await GenerateReport();
            if (result) {
              toast.success('Your medical report has been generated');
              setShowEndCallDialog(true);
            }
          } else {
            toast.info('Call ended without any conversation');
            router.push('/dashboard');
          }
        } catch (error) {
          console.error('Error ending call:', error);
          toast.error('There was an error ending the call');
          router.push('/dashboard');
        } finally {
          // Reset states
          setCallStarted(false);
          setVapiInstance(null);
          setLoading(false);
        }
      };



     const GenerateReport= async()=>{
      setLoading(true);
      const result = await axios.post('/api/medical-report',{
      messages:messages,
      sessionDetails:sessionDetails,
      sessionId:sessionId
      })

      console.log(result.data);
      return result.data;
     }



  return (
    <div className='p-5 border rounded-3xl bg-secondary h-[80vh] relative overflow-hidden'>
        <div className='flex justify-between items-center'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center '><Circle className={`h-4 w-4 rounded-full ${callStarted?'bg-green-500':"br-red-500"}`}/> {callStarted?'Connected...':'Not Connected'}</h2>
        <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
        </div>
        {sessionDetails && 
        <div className='flex flex-col items-center h-[calc(80vh-80px)] relative'>
          <div className='flex flex-col items-center mt-4'>
            <Image src={sessionDetails?.selectedDoctor?.image} 
              alt={sessionDetails?.selectedDoctor?.specialist ?? ''}
              width={80}
              height={80}
              className='h-[80px] w-[80px] object-cover rounded-full'
            />
            <h2 className='mt-2 text-xl font-semibold'>{sessionDetails?.selectedDoctor?.specialist}</h2>
            <p className='text-xs text-gray-400'>AI Medical Voice Agent</p>
            <p className='text-xs text-gray-400 mt-1 max-w-md text-center line-clamp-1'>{sessionDetails?.selectedDoctor?.description}</p>

            <div className='mt-4 w-full max-w-3xl mx-auto flex-1 overflow-hidden'>
              <div className='bg-white/50 backdrop-blur-sm rounded-xl h-[calc(100vh-350px)] flex flex-col'>
                {/* Messages Container */}
                <div className='flex-1 overflow-y-auto p-4 space-y-4 mb-[100px]'>
                  {messages?.slice(-4).map((msg:messages,index)=>(
                    <div 
                      key={index} 
                      className={`flex ${msg.role === 'Assistant' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`p-3 rounded-xl shadow-sm ${
                        msg.role === 'Assistant' 
                          ? 'bg-blue-50 border border-blue-100 max-w-[80%]' 
                          : 'bg-white border max-w-[80%]'
                      }`}>
                        <div className='flex items-center gap-2 mb-1'>
                          <div className={`w-2 h-2 rounded-full ${
                            msg.role === 'Assistant' ? 'bg-blue-400' : 'bg-gray-400'
                          }`}/>
                          <p className='text-xs font-medium text-gray-500'>{msg.role}</p>
                        </div>
                        <p className='text-sm text-gray-700'>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  
                  {liveTranscript && liveTranscript?.length > 0 && (
                    <div className={`flex ${currentRole === 'Assistant' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3 rounded-xl shadow-sm ${
                        currentRole === 'Assistant' 
                          ? 'bg-blue-50/50 border border-blue-100 max-w-[80%]' 
                          : 'bg-white/50 border max-w-[80%]'
                      }`}>
                        <div className='flex items-center gap-2 mb-1'>
                          <div className={`w-2 h-2 rounded-full animate-pulse ${
                            currentRole === 'Assistant' ? 'bg-blue-400' : 'bg-gray-400'
                          }`}/>
                          <p className='text-xs font-medium text-gray-500'>{currentRole}</p>
                        </div>
                        <p className='text-sm text-gray-700'>{liveTranscript}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
        </div>

        <div className='fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t shadow-lg flex justify-center items-center'>
            <div className='flex items-center gap-4'>
              {!callStarted ? (
                <Button 
                  className='bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 flex items-center gap-2 shadow-lg transition-all' 
                  onClick={StartCall} 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className='animate-spin h-5 w-5'/>
                      <span>Initializing Call...</span>
                    </>
                  ) : (
                    <>
                      <PhoneCall className="h-5 w-5"/>
                      <span>Start Call</span>
                    </>
                  )}
                </Button>
              ) : (
                <div className='flex items-center gap-4'>
                  <div className='px-4 py-2 bg-green-50 rounded-full flex items-center gap-2'>
                    <div className='h-2 w-2 bg-green-500 rounded-full animate-pulse'></div>
                    <span className='text-sm text-green-700'>Call in progress</span>
                  </div>
                  <Button 
                    variant={'destructive'} 
                    onClick={endCall} 
                    disabled={loading}
                    className='rounded-full px-8 py-6 flex items-center gap-2 shadow-lg hover:bg-red-600 transition-all'
                  >
                    {loading ? (
                      <>
                        <Loader className='animate-spin h-5 w-5'/>
                        <span>Ending Call...</span>
                      </>
                    ) : (
                      <>
                        <PhoneOff className="h-5 w-5"/>
                        <span>End Call</span>
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
        </div>
    </div>}
      {/* End Call Dialog */}
      <Dialog open={showEndCallDialog} onOpenChange={setShowEndCallDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Call Ended Successfully</DialogTitle>
            <DialogDescription>
              Your medical report has been generated and is ready to view.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-4 sm:justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setShowEndCallDialog(false);
                router.push('/dashboard');
              }}
            >
              Back to Dashboard
            </Button>
            <Button
              onClick={() => {
                setShowEndCallDialog(false);
                router.push('/dashboard/');
              }}
            >
              View Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MedicalVoiceAgent

