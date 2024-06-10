import CloseIcon from '@mui/icons-material/Close';
import {
  Backdrop,
  Button,
  Fade,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

const ModalWrapper = ({
  children,
  open,
  handleClose,
  title = 'Modal Title',
  handleSubmit,
  isButton = true,
  size = 'modal-normal',
}) => {
  var widthModal;
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
          <form onSubmit={handleSubmit}>
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
            {isButton && (
              <Box
                sx={{
                  // border: '1px solid red',
                  borderTop: '1px solid lightgray',
                  p: 1,
                  pr: 0,
                  pt: 2,
                }}
                display="flex"
                justifyContent="end"
              >
                <Button
                  variant="contained"
                  sx={{
                    background: '#656769',
                    mx: 1,
                    '&:hover': {
                      background: '#454547',
                    },
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mx: 1 }}
                >
                  Submit
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalWrapper;
