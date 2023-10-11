import React from "react";
import {
  SerialiserbarAppData,
  getSykefraværAppData,
  transformSykefraværAppData,
} from "./hooks/useSykefraværAppData";

import Forside from "./Forside/Forside";

export function AppContent(props: SerialiserbarAppData) {
  return <Forside {...transformSykefraværAppData(props)} />;
}

export const getServerSideProps = () => {
  return { props: getSykefraværAppData() };
};

export default AppContent;
