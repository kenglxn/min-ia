import { Button } from "@navikt/ds-react";
import ReactToPrint from "react-to-print";
// import { sendKnappEvent } from '../../amplitude/events';
// import { sendSykefraværsstatistikkIaMetrikk } from '../../metrikker/iatjenester';
import React from "react";
import { DownloadIcon } from "@navikt/aksel-icons";
import styles from "./LastNedKnapp.module.css";

export default function LastNedKnapp({
  innholdRef, //  orgnr,
}: {
  innholdRef: React.RefObject<HTMLDivElement>;
  orgnr: string;
}) {
  const lastNedKnappRef = React.useRef<HTMLButtonElement>(null);
  return (
    <ReactToPrint
      onBeforePrint={() => {
        //TODO: legg til events for metrikker
        //sendKnappEvent('skriv ut');
        //sendSykefraværsstatistikkIaMetrikk(orgnr);
      }}
      onAfterPrint={() => {
        if (lastNedKnappRef.current) {
          lastNedKnappRef.current.focus();
        }
      }}
      content={() => innholdRef.current}
      trigger={() => (
        <Button
          variant="secondary"
          lang="nb"
          aria-label="Last ned sykefraværsstatistikken"
          ref={lastNedKnappRef}
          className={styles["forside__last-ned-knapp"]}
        >
          <DownloadIcon title={"Nedlastingsikon"} fontSize="1.75rem" />
          Last ned
        </Button>
      )}
    />
  );
}
