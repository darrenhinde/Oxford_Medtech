import Instructor from "@instructor-ai/instructor"
import OpenAI from "openai"
import { z } from "zod"

const textBlock = `
Jane Elizabeth Smith, a 37-year-old female with case number JS987654, was admitted to the hospital on April 8, 2024, at 10:30 AM due to severe headache and nausea, indicative of a migraine episode. Her discharge diagnosis confirmed the initial suspicion of migraine.

During her stay, Jane was under the care of Dr. Henry Adams, who monitored her condition closely. Her physical examination upon discharge on April 10, 2024, at 11:45 AM showed a blood pressure (BP) of 115/75, a heart rate (CR) of 80 beats per minute, a respiratory rate (RR) of 18 breaths per minute, and a body temperature of 98.4°F. These vitals indicate a stable condition upon discharge.

The discharge plan for Jane included prescribed medication to manage her migraine and instructions to rest adequately. It is essential for her to adhere to this plan to prevent the recurrence of severe symptoms. A follow-up appointment has been scheduled for one month post-discharge to assess her progress and adjust the treatment plan as necessary.

Her condition upon discharge was marked as improved, showing a positive response to the treatment administered during her hospital stay. Jane was advised to maintain a log of her headache occurrences, triggers, and severity to aid in her ongoing care and treatment optimization during the follow-up visit.
`

async function extractPatientData() {

  const patientInformationSchema = z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    sex: z.string().optional(),
    caseNumber: z.string().optional(),
    dateAdmitted: z.date().optional(),
    dateDischarged: z.date().optional(),
    attendingPhysician: z.string().optional(),
  });
  
  const diagnosisSchema = z.object({
    primaryDiagnosis: z.string().optional(),
    secondaryDiagnoses: z.array(z.string()).optional(),
  });
  
  const chiefComplaintSchema = z.object({
    reasonForAdmission: z.string().optional(),
  });
  
  const historyPresentIllnessSchema = z.object({
    medicalHistory: z.string().optional(),
  });
  
  const vitalSignsSchema = z.object({
    bloodPressure: z.string().optional(),
    heartRate: z.number().optional(),
    respiratoryRate: z.number().optional(),
    temperature: z.number().optional(),
  });
  
  const physicalExaminationSchema = z.object({
    vitalSigns: vitalSignsSchema,
    generalSurvey: z.string().optional(),
    examinationFindings: z.record(z.string(), z.string()).optional(),
  });
  
  const courseInWardSchema = z.object({
    summary: z.string().optional(),
  });
  
  const labAndDiagnosticFindingsSchema = z.object({
    results: z.array(z.object({
      testName: z.string().optional(),
      result: z.string().optional(),
      normalRange: z.string().optional(),
    })).optional(),
  });
  
  const dischargePlansSchema = z.object({
    recommendations: z.string().optional(),
    medications: z.array(z.string()).optional(),
    followUpAppointments: z.array(z.string()).optional(),
    lifestyleModifications: z.array(z.string()).optional(),
  });
  
  const dispositionOnDischargeSchema = z.object({
    outcome: z.enum(['improved', 'transferred', 'expired']).optional(),
  });
  
  const preparedBySchema = z.object({
    name: z.string().optional(),
    signature: z.string().optional(),
    dateCompleted: z.date().optional(),
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
  
  // To create a model you can use `dischargeSummarySchema.parse(...)`
  



  const oai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? undefined,
    organization: process.env.OPENAI_ORG_ID ?? undefined
  })

  const client = Instructor({
    client: oai,
    mode: "TOOLS"
  })

  const extractionStream = await client.chat.completions.create({
    messages: [{ role: "user", content: textBlock }],
    model: "gpt-3.5-turbo",
    response_model: {
      schema: patientInformationSchema,
      name: "Extraction"
    },
    max_retries: 3,
    stream: true
  })

  let extractedData = {}
  for await (const result of extractionStream) {
    extractedData = result
    console.log("Partial extraction:", result)
  }
  
  console.log("Final extraction:", extractedData)
}

extractPatientData()