import DischargeSummaryForm from "@/app/discharge/DischargeForm";
import Header from "@/app/components/header";

export default function DischargePage() {
  return (  
    <>

   <Header />

    <div className="mt-20 flex min-h-screen w-full flex-col bg-muted/40 col items-center mx-auto max-w-screen-md">
  <DischargeSummaryForm />
  </div>
  </>


  )
}

