import { Box, LinearProgress, Typography } from "@mui/material";

interface ILoadingBoxProps {
  message: string;
  isShowProgress?: boolean;
}
const LoadingBox = ({ message, isShowProgress = true }: ILoadingBoxProps) => {
  return (
    <>
      <Box margin={10} sx={{ width: "90%" }}>
        <Typography variant="h5" gutterBottom component="div">
          {message}
          {isShowProgress && <LinearProgress />}
        </Typography>
      </Box>
    </>
  );
};

export default LoadingBox;
