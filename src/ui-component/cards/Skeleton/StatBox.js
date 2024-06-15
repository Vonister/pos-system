// material-ui
import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

// ==============================|| SKELETON - TOTAL INCOME DARK/LIGHT CARD ||============================== //

const StatBox = () => (
  <Card sx={{ p: 2 }}>
    <List sx={{ py: 0 }}>
      <ListItem alignItems="center" disableGutters sx={{ py: 1 }}>
        <ListItemText
          sx={{ py: 0, pr: 3 }}
          primary={<Skeleton variant="rectangular" height={20} />}
          secondary={<Skeleton variant="text" />}
        />
        <ListItemAvatar>
          <Skeleton variant="rectangular" width={44} height={44} />
        </ListItemAvatar>
      </ListItem>
    </List>
  </Card>
);

export default StatBox;
