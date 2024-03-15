import Swal from "sweetalert2";

export const successMsg = (message: string) =>
    Swal.fire({
        text: `${message}`,
        icon: 'success',
        iconColor: 'white',
        timer: 3500,
        timerProgressBar: true,
        toast: true,
        position: 'bottom-end',
        background: '#09b063',
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

export const infoNotificationMsg = (message: string) =>
    Swal.fire({
        text: `${message}`,
        icon: 'info',
        iconColor: 'white',
        timer: 3500,
        timerProgressBar: true,
        toast: true,
        position: 'bottom-start',
        background: '#2196F3',
        color: 'white',
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
            container: 'p-2'
        }
    });

export const successNotificationMsg = (message: string) =>
    Swal.fire({
        text: `${message}`,
        icon: 'info',
        iconColor: 'white',
        timer: 3500,
        timerProgressBar: true,
        toast: true,
        position: 'bottom-start',
        background: '#4CAF50',
        color: 'white',
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
            container: 'p-2'
        }
    });

export const warningNotificationMsg = (message: string) =>
    Swal.fire({
        text: `${message}`,
        icon: 'warning',
        iconColor: 'white',
        timer: 3500,
        timerProgressBar: false,
        toast: true,
        position: 'bottom-start',
        background: '#D97706',
        color: 'white',
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
            container: 'p-2'
        }
    });

export const neutralNotificationMsg = (message: string) =>
    Swal.fire({
        text: `${message}`,
        iconColor: 'white',
        timer: 3500,
        timerProgressBar: false,
        toast: true,
        position: 'bottom-start',
        background: ' #000',
        color: 'white',
        showConfirmButton: false,
        showCloseButton: true,
        width: "20%",
        customClass: {
            container: 'p-2'
        }
    });

export const dangerNotificationMsg = (message: string) =>
    Swal.fire({
        text: `${message}`,
        timer: 3500,
        timerProgressBar: false,
        toast: true,
        position: 'bottom-start',
        background: '#DC2626',
        color: 'white',
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
            container: 'p-2'
        }
    });