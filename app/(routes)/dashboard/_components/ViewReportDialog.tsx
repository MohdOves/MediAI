import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'

interface MedicalReport {
    agent: string;
    user: string;
    timestamp: string;
    chiefComplaint: string;
    summary: string;
    symptoms: string[];
    duration: string;
    severity: string;
    medicationsMentioned: string[];
    recommendations: string[];
}

type props = {
    record: SessionDetail
}

function ViewReportDialog({ record }: props) {
    const report = record.report as unknown as MedicalReport;

 

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={'link'} size={'sm'}>View Report</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogHeader className="mb-6">
                    <DialogTitle asChild>
                        <h2 className='text-center text-2xl'>🗣️ Medical AI Voice Agent Report</h2>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className='space-y-6'>
                            {/* Session Info */}
                            <div>
                                <h2 className='text-blue-500 text-lg'>Session Info</h2>
                                <div className='h-[2px] bg-blue-500 w-full'></div>
                                <div className='mt-3 grid grid-cols-2 gap-y-2'>
                                    <div>
                                        <span className='text-gray-600'>Doctor:</span> {record.selectedDoctor?.specialist}
                                    </div>
                                    <div>
                                        <span className='text-gray-600'>User:</span> {report?.user || 'Anonymous'}
                                    </div>
                                    <div>
                                        <span className='text-gray-600'>Consulted On:</span> {moment(new Date(record?.createdOn)).fromNow()}
                                    </div>
                                    <div>
                                        <span className='text-gray-600'>Agent:</span> {report?.agent }
                                    </div>
                                </div>
                            </div>

                            {/* Chief Complaint */}
                            {report?.chiefComplaint && (
                                <div>
                                    <h2 className='text-blue-500 text-lg'>Chief Complaint</h2>
                                    <div className='h-[2px] bg-blue-500 w-full'></div>
                                    <p className='mt-3 text-gray-600'>{report.chiefComplaint}</p>
                                </div>
                            )}

                            {/* Summary */}
                            {report?.summary && (
                                <div>
                                    <h2 className='text-blue-500 text-lg'>Summary</h2>
                                    <div className='h-[2px] bg-blue-500 w-full'></div>
                                    <p className='mt-3 text-gray-600'>{report.summary}</p>
                                </div>
                            )}

                            {/* Symptoms */}
                            {report?.symptoms?.length > 0 && (
                                <div>
                                    <h2 className='text-blue-500 text-lg'>Symptoms</h2>
                                    <div className='h-[2px] bg-blue-500 w-full'></div>
                                    <ul className='mt-3 list-disc pl-5 text-gray-600'>
                                        {report.symptoms.map((symptom: string, index: number) => (
                                            <li key={index}>{symptom}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Duration & Severity */}
                            {(report?.duration || report?.severity) && (
                                <div>
                                    <h2 className='text-blue-500 text-lg'>Duration & Severity</h2>
                                    <div className='h-[2px] bg-blue-500 w-full'></div>
                                    <div className='mt-3 grid grid-cols-2'>
                                        <div>
                                            <span className='text-gray-600'>Duration:</span> {report.duration }
                                        </div>
                                        <div>
                                            <span className='text-gray-600'>Severity:</span> {report.severity || 'Not specified'}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Medications Mentioned */}
                            {report?.medicationsMentioned?.length > 0 && (
                                <div>
                                    <h2 className='text-blue-500 text-lg'>Medications Mentioned</h2>
                                    <div className='h-[2px] bg-blue-500 w-full'></div>
                                    <ul className='mt-3 list-disc pl-5 text-gray-600'>
                                        {report.medicationsMentioned.map((medication: string, index: number) => (
                                            <li key={index}>{medication}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Recommendations */}
                            {report?.recommendations?.length > 0 && (
                                <div>
                                    <h2 className='text-blue-500 text-lg'>Recommendations</h2>
                                    <div className='h-[2px] bg-blue-500 w-full'></div>
                                    <ul className='mt-3 list-disc pl-5 text-gray-600'>
                                        {report.recommendations.map((recommendation: string, index: number) => (
                                            <li key={index}>{recommendation}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Footer */}
                            <div className='text-xs text-gray-500 italic mt-6 pt-4 border-t text-center'>
                                This report was generated by an AI Medical Assistant for informational purposes
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default ViewReportDialog