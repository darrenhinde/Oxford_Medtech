'use client'
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Textarea} from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import {Label} from "@/components/ui/label"
import Instructor from "@instructor-ai/instructor"
import OpenAI from "openai"


const summary = 'John Doe discharge summary'; 

const DischargeSummaryForm = () => {



const textBlock = `
Jane Elizabeth Smith, a 37-year-old female with case number JS987654, was admitted to the hospital on April 8, 2024, at 10:30 AM due to severe headache and nausea, indicative of a migraine episode. Her discharge diagnosis confirmed the initial suspicion of migraine.

During her stay, Jane was under the care of Dr. Henry Adams, who monitored her condition closely. Her physical examination upon discharge on April 10, 2024, at 11:45 AM showed a blood pressure (BP) of 115/75, a heart rate (CR) of 80 beats per minute, a respiratory rate (RR) of 18 breaths per minute, and a body temperature of 98.4°F. These vitals indicate a stable condition upon discharge.

The discharge plan for Jane included prescribed medication to manage her migraine and instructions to rest adequately. It is essential for her to adhere to this plan to prevent the recurrence of severe symptoms. A follow-up appointment has been scheduled for one month post-discharge to assess her progress and adjust the treatment plan as necessary.

Her condition upon discharge was marked as improved, showing a positive response to the treatment administered during her hospital stay. Jane was advised to maintain a log of her headache occurrences, triggers, and severity to aid in her ongoing care and treatment optimization during the follow-up visit.
`

const dischargeSummaryText: string = `
Discharge Summary for John DoeDischarge Summary for John Doe

Patient Information:
John Doe, a 45-year-old male, presented with respiratory difficulties and was admitted under the care of Dr. Smith on April 1, 2023. He was successfully treated and discharged on April 15, 2023.

Diagnosis:
The primary diagnosis was Acute Bronchitis, with a secondary condition of Asthma noted.

Chief Complaint:
John experienced significant breathing difficulties, which necessitated his admission to the hospital.

History of Present Illness:
John has been a chronic smoker, which has contributed to his history of respiratory illnesses.

Physical Examination:
Upon examination, John was alert and oriented, showing no signs of acute distress. His vital signs were stable with a blood pressure of 120/80 mmHg, heart rate of 72 bpm, respiratory rate of 20 breaths per minute, and a temperature of 98.6°F. Auscultation revealed rales in the lower right lung field.

Course in Ward:
John's hospital stay was marked by a positive response to the administered antibiotics and breathing treatments, indicating effective management of his condition.

Lab and Diagnostic Findings:
A Chest X-ray confirmed the diagnosis of right lower lobe pneumonia.

Discharge Plans:
John has been advised to follow up with his primary care physician in a week. He has been prescribed antibiotics and inhalers to manage his condition. He has been strongly advised to quit smoking and to adopt a healthy diet to improve his overall health.

Disposition on Discharge:
John showed significant improvement and was discharged from the hospital in a stable condition.

Prepared By:
This summary was prepared by Dr. Smith, who has overseen John's treatment during his hospital stay. Dr. Smith also provided his signature, confirming the completion of this summary on April 15, 2023.

`;

// You can then set this text to a text area's value or state


  const patientInformationSchema = z.object({
    name: z.string().optional(),
    age: z.string().optional(),
    sex: z.string().optional(),
    caseNumber: z.string().optional(),
    dateAdmitted: z.string().optional(),
    dateDischarged: z.string().optional(),
    attendingPhysician: z.string().optional(),
  });

  const diagnosisSchema = z.object({
    primaryDiagnosis: z.string().optional(),
    secondaryDiagnoses: z.string().optional(),
  });

  const chiefComplaintSchema = z.object({
    reasonForAdmission: z.string().optional(),
  });

  const historyPresentIllnessSchema = z.object({
    medicalHistory: z.string().optional(),
  });

  const vitalSignsSchema = z.object({
    bloodPressure: z.string().optional(),
    heartRate: z.string().optional(),
    respiratoryRate: z.string().optional(),
    temperature: z.string().optional(),
  });

  const physicalExaminationSchema = z.object({
    vitalSigns: vitalSignsSchema,
    generalSurvey: z.string().optional(),
    examinationFindings: z.string().optional(),
  });

  const courseInWardSchema = z.object({
    summary: z.string().optional(),
  });

  const labAndDiagnosticFindingsSchema = z.object({
    results: z.string().optional(),
  });

  const dischargePlansSchema = z.object({
    recommendations: z.string().optional(),
    medications: z.string().optional(),
    followUpAppointments: z.string().optional(),
    lifestyleModifications: z.string().optional(),
  });

  const dispositionOnDischargeSchema = z.object({
    outcome: z.string().optional(),
  });

  const preparedBySchema = z.object({
    name: z.string().optional(),
    signature: z.string().optional(),
    dateCompleted: z.string().optional(),
  });
  const dischargeSummarySchema = z.object({
    patientInformation: patientInformationSchema,
    diagnosis: diagnosisSchema,
    chiefComplaint: chiefComplaintSchema,
    historyPresentIllness: historyPresentIllnessSchema,
    physicalExamination: physicalExaminationSchema,
    courseInWard: courseInWardSchema,
    labAndDiagnosticFindings: labAndDiagnosticFindingsSchema,
    dischargePlans: dischargePlansSchema,
    dispositionOnDischarge: dispositionOnDischargeSchema,
    preparedBy: preparedBySchema,
  });

  const form = useForm<z.infer<typeof dischargeSummarySchema>>({
    resolver: zodResolver(dischargeSummarySchema)
  })
  // To create a model you can use `dischargeSummarySchema.parse(...)`
  

  const prepopulatedText = "This is the prepopulated text."
  

  // testing
  const summary = JSON.stringify({
    patientInformation: {
      name: "John Doe",
      age: "45",
      sex: "Male",
      caseNumber: "1001",
      dateAdmitted: "2023-04-01",
      dateDischarged: "2023-04-15",
      attendingPhysician: "Dr. Smith"
    },
    diagnosis: {
      primaryDiagnosis: "Acute Bronchitis",
      secondaryDiagnoses: "Asthma"
    },
    chiefComplaint: {
      reasonForAdmission: "Difficulty breathing"
    },
    historyPresentIllness: {
      medicalHistory: "Chronic smoker, history of respiratory illnesses"
    },
    physicalExamination: {
      vitalSigns: {
        bloodPressure: "120/80",
        heartRate: "72",
        respiratoryRate: "20",
        temperature: "98.6"
      },
      generalSurvey: "Patient is alert and oriented, no acute distress",
      examinationFindings: "Rales heard in the lower right lung field"
    },
    courseInWard: {
      summary: "Patient responded well to antibiotics and breathing treatments."
    },
    labAndDiagnosticFindings: {
      results: "Chest X-ray confirmed right lower lobe pneumonia."
    },
    dischargePlans: {
      recommendations: "Follow-up with primary care physician in one week.",
      medications: "Prescribed antibiotics and inhalers",
      followUpAppointments: "Primary care physician in 1 week",
      lifestyleModifications: "Quit smoking, follow a healthy diet"
    },
    dispositionOnDischarge: {
      outcome: "Improved and discharged"
    },
    preparedBy: {
      name: "Dr. Smith",
      signature: "Dr. Smith",
      dateCompleted: "2023-04-15"
    }
  });
    
   
  const fillUsingSummary = () => {
    // Replace with actual summary
    const summaryData = JSON.parse(summary); // Assuming the summary is in JSON format
    form.setValue('patientInformation', summaryData.patientInformation);
    form.setValue('diagnosis', summaryData.diagnosis);
    form.setValue('chiefComplaint', summaryData.chiefComplaint);
    form.setValue('historyPresentIllness', summaryData.historyPresentIllness);
    form.setValue('physicalExamination', summaryData.physicalExamination);
    form.setValue('courseInWard', summaryData.courseInWard);
    form.setValue('labAndDiagnosticFindings', summaryData.labAndDiagnosticFindings);
    form.setValue('dischargePlans', summaryData.dischargePlans);
    form.setValue('dispositionOnDischarge', summaryData.dispositionOnDischarge);
    form.setValue('preparedBy', summaryData.preparedBy);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <Textarea className="w-full pb-10 mb-10" defaultValue={dischargeSummaryText} style={{minHeight: '520px'}} />
      <Button type="submit" onClick={fillUsingSummary} className='bg-purple-600 mb-20'> Use Summary Data</Button>

      <Form  {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-sm items-start gap-4">
          {/* Patient Information Fields */}
          <div className="flex items-center gap-4">
    
            <h1 style={{fontSize: '2em', fontWeight: 'bold'}}>Discharge Summary</h1>
          </div>
       
    <div className="flex items-center gap-4 col-5">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Name" {...form.register('patientInformation.name')} />
  </div>
  <div className="flex items-center gap-4 col-5">
    <Label htmlFor="age">Age</Label>
    <Input id="age" type="number" placeholder="Age" {...form.register('patientInformation.age')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="sex">Sex</Label>
    <Input id="sex" placeholder="Sex" {...form.register('patientInformation.sex')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="caseNumber">Case Number</Label>
    <Input id="caseNumber" placeholder="Case Number" {...form.register('patientInformation.caseNumber')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="dateAdmitted">Date Admitted</Label>
    <Input id="dateAdmitted" type="date" placeholder="Date Admitted" {...form.register('patientInformation.dateAdmitted')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="dateDischarged">Date Discharged</Label>
    <Input id="dateDischarged" type="date" placeholder="Date Discharged" {...form.register('patientInformation.dateDischarged')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="attendingPhysician">Attending Physician</Label>
    <Input id="attendingPhysician" placeholder="Attending Physician" {...form.register('patientInformation.attendingPhysician')} />
  </div>

 
  {/* Diagnosis Schema */}
  <div className="flex items-center gap-4">
    <Label htmlFor="primaryDiagnosis">Primary Diagnosis</Label>
    <Input id="primaryDiagnosis" placeholder="Primary Diagnosis" {...form.register('diagnosis.primaryDiagnosis')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="secondaryDiagnoses">Secondary Diagnoses</Label>
    <Input id="secondaryDiagnoses" placeholder="Secondary Diagnoses" {...form.register('diagnosis.secondaryDiagnoses')} />
  </div>

  {/* Chief Complaint Schema */}
  <div className="flex items-center gap-4">
    <Label htmlFor="reasonForAdmission">Reason for Admission</Label>
    <Input id="reasonForAdmission" placeholder="Reason for Admission" {...form.register('chiefComplaint.reasonForAdmission')} />
  </div>

  {/* History Present Illness Schema */}
  <div className="flex items-center gap-4">
    <Label htmlFor="medicalHistory">Medical History</Label>
    <Input id="medicalHistory" placeholder="Medical History" {...form.register('historyPresentIllness.medicalHistory')} />
  </div>

  <div className="flex items-center gap-4">
    <Label htmlFor="bloodPressure">Blood Pressure</Label>
    <Input id="bloodPressure" placeholder="Blood Pressure" {...form.register('physicalExamination.vitalSigns.bloodPressure')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="heartRate">Heart Rate</Label>
    <Input id="heartRate" placeholder="Heart Rate" {...form.register('physicalExamination.vitalSigns.heartRate')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
    <Input id="respiratoryRate" placeholder="Respiratory Rate" {...form.register('physicalExamination.vitalSigns.respiratoryRate')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="temperature">Temperature</Label>
    <Input id="temperature" placeholder="Temperature" {...form.register('physicalExamination.vitalSigns.temperature')} />
  </div>

  {/* Physical Examination Schema */}
  <div className="flex items-center gap-4">
    <Label htmlFor="generalSurvey">General Survey</Label>
    <Input id="generalSurvey" placeholder="General Survey" {...form.register('physicalExamination.generalSurvey')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="examinationFindings">Examination Findings</Label>
    <Input id="examinationFindings" placeholder="Examination Findings" {...form.register('physicalExamination.examinationFindings')} />
  </div>

  {/* Course in Ward Schema */}
  <div className="flex items-center gap-4">
    <Label htmlFor="summary">Course in Ward</Label>
    <Input id="summary" placeholder="Summary" {...form.register('courseInWard.summary')} />
  </div>

  {/* Lab and Diagnostic Findings Schema */}
  <div className="flex items-center gap-4">
    <Label htmlFor="labResults">Lab and Diagnostic Findings</Label>
    <Input id="labResults" placeholder="Results" {...form.register('labAndDiagnosticFindings.results')} />
  </div>

  {/* Discharge Plans Schema */}
  <div className="flex items-center gap-4">
    <Label htmlFor="recommendations">Discharge Recommendations</Label>
    <Input id="recommendations" placeholder="Recommendations" {...form.register('dischargePlans.recommendations')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="medications">Medications</Label>
    <Input id="medications" placeholder="Medications" {...form.register('dischargePlans.medications')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="followUpAppointments">Follow-Up Appointments</Label>
    <Input id="followUpAppointments" placeholder="Follow-Up Appointments" {...form.register('dischargePlans.followUpAppointments')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="lifestyleModifications">Lifestyle Modifications</Label>
    <Input id="lifestyleModifications" placeholder="Lifestyle Modifications" {...form.register('dischargePlans.lifestyleModifications')} />
  </div>

  {/* Disposition on Discharge Schema */}
  <div className="flex items-center gap-4">
    <Label htmlFor="outcome">Disposition on Discharge</Label>
    <Input id="outcome" placeholder="Outcome" {...form.register('dispositionOnDischarge.outcome')} />
  </div>

  {/* Prepared By Schema */}
  <div className="flex items-center gap-4">
    <Label htmlFor="preparedByName">Prepared By Name</Label>
    <Input id="preparedByName" placeholder="Name" {...form.register('preparedBy.name')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="signature">Signature</Label>
    <Input id="signature" placeholder="Signature" {...form.register('preparedBy.signature')} />
  </div>
  <div className="flex items-center gap-4">
    <Label htmlFor="dateCompleted">Date Completed</Label>
    <Input id="dateCompleted" type="date" placeholder="Date Completed" {...form.register('preparedBy.dateCompleted')} />
  </div>



         

          {/* Add fields for other attributes in patientInformation and other sections */}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default DischargeSummaryForm;


