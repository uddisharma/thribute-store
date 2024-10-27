export function getDeliveryDate() {
  const currentDate = new Date();

  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 3);
  const futureDate1 = new Date(currentDate);
  futureDate1.setDate(currentDate.getDate() + 7);

  const futureDay = futureDate.getDate();
  const futureMonth = futureDate.toLocaleString("default", { month: "long" });
  const futureDay1 = futureDate1.getDate();
  const futureMonth1 = futureDate1.toLocaleString("default", { month: "long" });

  return `${futureDay} ${futureMonth} - ${futureDay1} ${futureMonth1}`;
}

export function formatDate(dateString: Date) {
  const date = new Date(dateString);
  const options: any = { year: "numeric", month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
}

export function formatDate1(dateString: any) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [day, month, year] = dateString.split("-");
  const monthName = months[parseInt(month, 10) - 1];

  return `${day} ${monthName} `;
}
