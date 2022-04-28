export default abstract class FileAction {
  static open(url: string) {
    window.open(url, "_blank");
  }

  static download(url: string) {
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "download");
    link.click();
  }
}
