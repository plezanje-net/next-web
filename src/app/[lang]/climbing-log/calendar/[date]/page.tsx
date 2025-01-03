import dayjs from "dayjs";
import ActionsRow from "./components/actions-row";

type TCalendarDayPageProps = {
  params: { date: string };
}

function CalendarDayPage({ params }: TCalendarDayPageProps) {


  return (
    <>
      <ActionsRow date={params.date} />
      <div className="x-auto mx-auto rotate-0 px-4 2xl:container xs:px-8">
        
      </div>
    </>
  );

}

export default CalendarDayPage;