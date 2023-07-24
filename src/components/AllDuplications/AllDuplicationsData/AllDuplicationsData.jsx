import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import moment from "moment";
// import { AccordionDetails, AccordionSummary } from "@mui/material";
// import arrowOpenedWhite from "assets/icons/arrowOpenedWhite.svg";
// import pointerLeft from "assets/icons/pointerLeft.svg";
// import AllDuplicationsDataSingleItem from "./AllDuplicationsSingleItem";
import AllDuplicationsDataSingleItem from "./AllDuplicationsSingleItem";
// import { StyledHistoryAccordion } from "./style";
import "./styles.scss";

const AllDuplicationsData = ({
  nextRequestUrl,
  allDuplications,
  handelGetAllDuplications,
  duplicationsToRender,
}) => {
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    let copyTimer;
    if (copied) {
      copyTimer = setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
    return () => {
      clearTimeout(copyTimer);
    };
  }, [copied]);

  console.log("copied", copied);

  return (
    <InfiniteScroll
      dataLength={allDuplications?.length}
      next={() => {
        nextRequestUrl && handelGetAllDuplications();
      }}
      hasMore={nextRequestUrl}
    >
      {duplicationsToRender?.map(
        ({ campaigns, created_at, created_by }, index) => (
          <AllDuplicationsDataSingleItem
            key={index}
            index={index}
            campaigns={campaigns}
            createdAt={created_at}
            createdBy={created_by}
          />
        )
      )}
    </InfiniteScroll>
  );
};

export default AllDuplicationsData;
