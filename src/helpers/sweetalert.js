import swal from 'sweetalert2';

class sweetAlert {
    connectionError() {
        swal({
            type: 'warning',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

export default new sweetAlert();