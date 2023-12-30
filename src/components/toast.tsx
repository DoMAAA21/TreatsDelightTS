import Swal from "sweetalert2";

export const successMsg = (message: string) =>
    Swal.fire({
        // title: `Success`,  //Uncomment this if you like
        text: `${message}`,
        icon: 'success',
        timer: 3500,
        timerProgressBar: true,
        toast: true,
        position: 'bottom-end',
        background: 'green',
        color: 'white',
        showConfirmButton: false,
        customClass: {
            container: 'p-2'
        }
    });

export const errorMsg = (message: any) =>
    Swal.fire({
        // title: `Error`,  //You can uncomment this if you like for title 
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

export const topErrorMsg = (message: any) =>
    Swal.fire({
        text: `${message}`,
        icon: 'error',
        iconColor: 'white',
        timer: 3500,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        background: 'red',
        color: 'white',
        showConfirmButton: false,
    });