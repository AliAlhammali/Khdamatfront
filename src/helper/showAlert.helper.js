import Swal from "sweetalert2";

export function showAlert({ title, text, icon, confirmButtonText }) {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText
  });
}

export function showConfirmationDialog(obj) {
  return Swal.fire({
    title: obj.title,
    text: obj.text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: obj.confirmButtonText || "Confirm",
    cancelButtonText: obj.cancelButtonText || "Cancel",
    confirmButtonColor: obj.confirmButtonColor || "#3085d6",
    cancelButtonColor: obj.cancelButtonColor || "#d33"
  });
}
