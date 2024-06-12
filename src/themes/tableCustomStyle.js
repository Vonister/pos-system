export const tableCustomStyle = (theme) => {
  return {
    header: {
      style: {
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
      },
    },
    tableWrapper: {
      style: {
        display: "table",
        borderRadius: "100px",
      },
    },
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#202124",
        fontSize: "13px",
        fontWeight: "600",
        paddingBlock: "1rem",
        backgroundColor: theme.palette.grey[100],
        "&:first-child": {
          borderTopLeftRadius: 2,
          borderBottomLeftRadius: 2,
        },
        "&:last-child": {
          borderTopRightRadius: 2,
          borderBottomRightRadius: 2,
        },
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: theme.palette.grey[100],
        borderBottomColor: "#FFFFFF",
        borderRadius: "10px",
        outline: "1px solid #FFFFFF",
      },
      style: {
        fontSize: "12px",
        fontWeight: 400,
        minHeight: "48px",
        borderRadius: "10px",
        "&:not(:last-of-type)": {
          border: "none",
        },
        "&:nth-of-type(even)": {
          backgroundColor: "#FAFAFA",
        },
      },
      denseStyle: {
        minHeight: "48px",
      },
    },
    responsiveWrapper: {
      style: {
        borderRadius: "0px",
        paddingInline: "0.5rem",
        backgroundColor: theme.palette.background.default,
        // Add custom styles for webkit scrollbar
        "&::-webkit-scrollbar": {
          width: "8px", // Adjust the width of the scrollbar
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1", // Color of the scrollbar track
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.palette.grey[500], // Color of the scrollbar thumb
          borderRadius: "10px", // Border radius of the scrollbar thumb
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: theme.palette.grey[700], // Color of the scrollbar thumb on hover
        },
      },
    },
    pagination: {
      style: {
        color: theme.palette.dark.main,
        fontSize: "13px",
        minHeight: "56px",
        backgroundColor: theme.palette.background.default,
        border: "none",
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
      },
      pageButtonsStyle: {
        borderRadius: "50%",
        height: "40px",
        width: "40px",
        padding: "8px",
        margin: "px",
        cursor: "pointer",
        transition: "0.4s",
        color: theme.palette.grey[100],
        backgroundColor: "transparent",
        "&:disabled": {
          cursor: "unset",
          color: theme.palette.grey[300],
          fill: theme.palette.grey[300],
        },
        "&:hover:not(:disabled)": {
          backgroundColor: theme.palette.primary.main,
        },
        "&:focus": {
          outline: "none",
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
    noData: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
      },
    },
    progress: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
      },
    },
  };
};
