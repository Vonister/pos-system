import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Fade, IconButton, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';

const ModalNoForm = ({
  children,
  open,
  handleClose,
  title = 'Modal Title',
  size = 'modal-normal',
}) => {
  var widthModal;
  var height = 'auto';
  switch (size) {
    case 'modal-sm':
      widthModal = 300;
      break;
    case 'modal-normal':
      widthModal = 500;
      break;
    case 'modal-lg':
      widthModal = 800;
      break;
    case 'modal-xl':
      widthModal = 1140;
      break;
    case 'modal-fullscreen':
      widthModal = '100%';
      height = '100%';
      break;
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: widthModal,
    bgcolor: 'background.paper',
    boxShadow: 4,
    px: 2,
    pb: 3,
    borderRadius: 2,
    height,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      keepMounted
      disableEnforceFocus
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box
            sx={{
              borderBottom: '1px solid lightgray',
              p: 1,
              pb: 2,
              pr: 0,
            }}
            display="flex"
            justifyContent="space-between"
          >
            <Typography
              variant="h3"
              display="flex"
              alignItems="end"
              sx={{ fontWeight: 600 }}
            >
              {title}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ fontSize: '18px' }} />
            </IconButton>
          </Box>
          <Box sx={{ p: 2, py: 3, maxHeight: '90vh', overflowY: 'auto' }}>
            {children}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalNoForm;
