import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const DataTableSkeleton = () => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <LinearProgress />

      <Skeleton
        variant="rectangular"
        height={45}
        sx={{ marginTop: 3, borderRadius: 1.5, background: "#fff" }}
      />

      <Skeleton
        variant="rectangular"
        height={400}
        sx={{ marginTop: 1, borderRadius: 1.5, background: "#fff" }}
      />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Skeleton
          variant="rectangular"
          height={15}
          width={300}
          sx={{
            marginTop: 1,
            marginBottom: 4,
            borderRadius: 1.5,
            background: "#fff",
          }}
        />
      </Box>
    </Box>
  );
};

export default DataTableSkeleton;
