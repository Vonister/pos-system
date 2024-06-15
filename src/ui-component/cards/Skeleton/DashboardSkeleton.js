import { Grid, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import PopularCard from "./PopularCard";
import ItemCard from "./ItemCard";
import StatBox from "./StatBox";
import TotalGrowthBarChart from "./TotalGrowthBarChart";

const DashboardSkeleton = () => {
  const statCard = 8;
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <LinearProgress />
      <Skeleton
        variant="rectangular"
        height={80}
        sx={{ marginBlock: 3, borderRadius: 1.5, background: "#fff" }}
      />
      <Grid container spacing={3}>
        {[...Array(statCard)].map((_, index) => (
          <Grid key={index} item xl={3} lg={4} md={6} xs={12}>
            <StatBox />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} pt={3}>
        <Grid item lg={8} md={12}>
          <TotalGrowthBarChart />
        </Grid>
        <Grid item lg={4} md={12}>
          <PopularCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardSkeleton;
