import { useCallback, useState, useEffect } from "react";
import ArchivedTable from "./ArchivedTable";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { EmblaCarouselType } from "embla-carousel";
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function Archive(props: { archiveData: any }) {
  const { archiveData } = props;
  const options: EmblaOptionsType = { startIndex: archiveData.length - 1 };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  const archivedTables = archiveData.map((archive: any) => {
    return <ArchivedTable key={archive._id} archive={archive} />;
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={onNextButtonClick} disabled={nextBtnDisabled}>
          <ArrowForward />
        </IconButton>
      </div>
      <div style={{ overflow: "hidden" }} ref={emblaRef}>
        <div style={{ display: "flex" }}>{archivedTables}</div>
      </div>
    </>
  );
}
