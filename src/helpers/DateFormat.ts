export default abstract class FormatedDate {
  public static getDateRu(date: string): string {
    if (date) {
      const currDate = new Date(date);
      return currDate.toLocaleString("ru", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "";
  }
}
