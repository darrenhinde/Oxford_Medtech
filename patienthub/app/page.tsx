import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";
import HomeView from "./views/HomeView";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 background-gradient w-full">
      <Header />
      <div className="flex flex-wrap justify-center w-full">
        <div className="w-full md:w-1/2">
          <HomeView />
        </div>
        <div className="w-full md:w-1/2">
          <ChatSection />
        </div>
        <div className="w-full md:w-1/2">
          <a href="/discharge">
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Discharge
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
