export default function TwitterTabs({ activeTab, setActiveTab }) {
  const tabs = ['Projects', 'Experience', 'Education', 'Skills'];

  return (
    <div className="flex border-b border-zinc-200 sticky top-[52px] bg-white/80 backdrop-blur-md z-10">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="flex-1 flex justify-center hover:bg-zinc-100 transition-colors pt-4 pb-0"
        >
          <div className="flex flex-col items-center">
            <span className={`text-[15px] font-bold px-2 ${activeTab === tab ? 'text-black' : 'text-zinc-500'}`}>
              {tab}
            </span>
            <div className={`h-1 rounded-full w-full mt-3 ${activeTab === tab ? 'bg-blue-500' : 'bg-transparent'}`} />
          </div>
        </button>
      ))}
    </div>
  );
}
