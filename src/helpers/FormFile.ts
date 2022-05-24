export default function getFormFile(data: File) {
  const form = new FormData();
  form.append("file", data);
  return form;
}
