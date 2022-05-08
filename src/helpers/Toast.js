import Swal from "sweetalert2";

const Toast = (title, message, toastIcon, confirm) => {
  Swal.fire({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3500,
    icon: toastIcon || "info",
    title: title || "",
    text: message || "Something went wrong!",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

export default Toast;
