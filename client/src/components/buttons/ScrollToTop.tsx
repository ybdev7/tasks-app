import { ExpandLess } from "@mui/icons-material";
import { Button, Fab } from "@mui/material";
import { SxProps } from "@mui/system";
import { useEffect, useState } from "react";

interface ScrollToTopProps {
  offset?: number;
}

const ScrollToTop = ({ offset = 200 }: ScrollToTopProps) => {
  const [shown, setShown] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener(`scroll`, handleScrolling);
    return () => window.removeEventListener(`scroll`, handleScrolling);
  });

  const handleScrolling = () => {
    setShown(window.scrollY > offset);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: `smooth` });
  };

  const fabStyle = {
    position: "fixed",
    bottom: 10,
    right: 10,
  };

  return (
    <>
      {shown && (
        <Fab sx={fabStyle as SxProps} onClick={handleClick}>
          <ExpandLess />
        </Fab>
      )}
    </>
  );
};

export default ScrollToTop;
