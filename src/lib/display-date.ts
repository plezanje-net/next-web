import dayjs from "dayjs";

function displayDate(date: string) {
  return dayjs(date).format("D. M. YYYY");
}

export default displayDate;
