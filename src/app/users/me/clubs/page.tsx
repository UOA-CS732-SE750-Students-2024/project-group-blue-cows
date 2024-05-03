export default function UserClubsPage() {
  return (
    <div className="bg-blue-200 h-[calc(100vh-4rem)] w-full">
      <div className="flex flex-col h-screen">
        <div className="flex flex-row h-1/2">
          <div className="w-1/2 bg-blue-200 flex justify-center items-center">
            <div className="w-3/4 h-3/4 bg-green-300 flex justify-center items-center">
              Section 1 - Icon here
            </div>
          </div>
          <div className="w-1/4 bg-red-200 flex justify-center items-center">
            <div className="w-3/4 h-3/4 bg-yellow-300 flex justify-center items-center">
              Section 2 - box 1
            </div>
          </div>
          <div className="w-1/4 bg-purple-200 flex justify-center items-center">
            <div className="w-3/4 h-3/4 bg-pink-300 flex justify-center items-center">
              Section 3 - box 2
            </div>
          </div>
        </div>
        <div className="flex flex-row h-1/2">
          <div className="w-1/2 bg-orange-200 flex justify-center items-center">
            <div className="w-3/4 h-3/4 bg-indigo-300 flex justify-center items-center">
              Section 4 - club members list
            </div>
          </div>
          <div className="w-1/2 bg-teal-200 flex justify-center items-center">
            <div className="w-3/4 h-3/4 bg-cyan-300 flex justify-center items-center">
              Section 5 - club execs list
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="bg-blue-200 h-full w-full">
    //   <p>fj</p>

    //   <h1>User Clubs</h1>
    //   <p>fj</p>
    //   <div
    //     className="bg-cover bg-center bg-red-700 h-8"
    //     style={{ backgroundImage: "url('/grass-background.svg')" }}
    //   >
    //     <h2> TEST ETEST</h2>
    //     <h3> why</h3>
    //   </div>
    // </div>
  );
}
