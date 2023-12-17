import Toast from 'react-bootstrap/Toast';

function SnackBar({
  message, 
  children, 
  handleSuccessMessage, 
  handleErrorUpload,
  handleErrorSubmit,
  handleEditMessage,
  handleChangeError,
  handleDeleteMessage,
  handleUploadSuccess,
  handleUploadAlert,
  handleUploadError,

  }) {

  const handleOnClose = () => {
      if (typeof handleSuccessMessage === 'function') {
        handleSuccessMessage(false);
      }
      if (typeof handleErrorUpload === 'function') {
        handleErrorUpload(false);
      }

      if (typeof handleEditMessage === 'function') {
        handleEditMessage(false);
      }

      if (typeof handleChangeError === 'function') {
        handleChangeError(false);
      }

      if (typeof handleDeleteMessage === 'function') {
        handleDeleteMessage(false);
      }

      if (typeof handleUploadSuccess === 'function') {
        handleUploadSuccess(false);
      }

      if (typeof handleUploadAlert === 'function') {
        handleUploadAlert(false);
      }

      if (typeof handleUploadError === 'function') {
        handleUploadError(false);
      }

      if (typeof handleErrorSubmit === 'function') {
        handleErrorSubmit(false);
      }
    };

  

  return (
    <>
      <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '50px',
        zIndex: '1000',
      }}
      >
       
        <Toast
          className="d-inline-block m-1"
          bg={message.toLowerCase()}
          onClose={handleOnClose} 
          delay={3000}
           autohide >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body className={(message === 'dark' || message === 'primary') ? 'text-white' : (message === 'warning' ? 'text-black' : '') }>
            <strong>{children}</strong>
          </Toast.Body>
        </Toast>
        </div>
    </>
  );
}


export default SnackBar;