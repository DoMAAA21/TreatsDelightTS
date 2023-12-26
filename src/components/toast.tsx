import Swal from "sweetalert2";

export const successMsg = (message: string) =>
    Swal.fire({
        title: `Success`,
        text: `${message}`,
        icon: 'success',
        timer: 3500,
        timerProgressBar: true,
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
    });

export const errorMsg = (message: any) =>
    Swal.fire({
        title: `Error`,
        text: `${message}`,
        icon: 'error',
        iconColor: 'white',
        timer: 3500,
        timerProgressBar: true,
        toast: true,
        position: 'bottom-end',
        background: 'red',
        color: 'white',
        showConfirmButton: false,
    });