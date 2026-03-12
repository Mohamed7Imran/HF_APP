// import Sidebar from "../Sidebar/Sidebar";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <ol className="flex items-center whitespace-nowrap p-6">
        <li className="inline-flex items-center">
          <a className="flex items-center text-sm text-muted-foreground-1 hover:text-primary-focus focus:outline-hidden focus:text-primary-focus" href="/#/dashboard">
            <svg className="shrink-0 me-3 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Dashboard
          </a>
          <svg className="shrink-0 mx-2 size-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </li>
        
      </ol>
      {/* <Sidebar /> */}
      <div style={{ padding: "20px" }}>
        <h2>Welcome </h2>
      </div>
    </div>
  );
}

export default Dashboard;