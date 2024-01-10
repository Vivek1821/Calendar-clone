// import EventTable from "./event-table";
import { MyCalendar } from "./event-table";
import Sidebar from "./sidebar/page";

export default function Home() {
  return (
    <section className="flex ">
      <div className="w-1/5 md:w-1/3 overflow-hidden  ">
        <Sidebar />
      </div>
      <div className="w-full">
        <MyCalendar />
      </div>
    </section>
  );
}
