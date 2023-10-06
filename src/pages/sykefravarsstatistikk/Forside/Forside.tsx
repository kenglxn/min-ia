import { default as React, FunctionComponent, useRef } from "react";
//import { Sammenligningspaneler } from "./Sammenligningspaneler/Sammenligningspaneler";
//import "./Forside.css";
import { getBransjeEllerNæringKategori } from "./Sammenligningspaneler/GetBransjeEllerNæringKategori";
import { Alert, BodyShort, Heading, Skeleton } from "@navikt/ds-react";
import { SlikHarViKommetFramTilDittResultat } from "./SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat";
import { PeriodeForStatistikk } from "./PeriodeForStatistikk";
import { PubliseringsdatoOppdateringsinfo } from "./PubliseringsdatoOppdateringsinfo";
import LastNedKnapp from "./LastNedKnapp";
import { Statistikkategori } from "../domene/statistikkategori";
import { useOrgnr } from "../../../hooks/useOrgnr";
import { RestStatus } from "../../../integrasjoner/rest-status";
import TestVersjonBanner from "../../../komponenter/Banner/TestVersjonBanner";

import { SykefraværAppData } from "../hooks/useSykefraværAppData";
//import Historikk from "../Historikk/Historikk";
/* import Tabell, {
  hentTabellProps,
} from "../Historikk/GrafEllerTabell/Tabell/Tabell"; */

export const Forside: FunctionComponent<SykefraværAppData> = (appData) => {
  const orgnr = useOrgnr() || "";
  const harFeil = appData.aggregertStatistikk.restStatus === RestStatus.Feil;
  const { skalSendeMetrikkerAutomatisk = true } = appData; // Vi må kunne disable autoutsending for å teste utsending ved print-klikk (src/Metrikker.test.tsx)

  const innholdRef = useRef<HTMLDivElement>(null);

  const loading = React.useMemo(() => {
    return [
      appData.aggregertStatistikk.restStatus,
      appData.altinnOrganisasjoner.status,
      appData.altinnOrganisasjonerMedStatistikktilgang.status,
      appData.publiseringsdatoer.status,
      appData.sykefraværshistorikk.status,
    ].some((status) =>
      [RestStatus.LasterInn, RestStatus.IkkeLastet].includes(status)
    );
  }, [
    appData.aggregertStatistikk.restStatus,
    appData.altinnOrganisasjoner.status,
    appData.altinnOrganisasjonerMedStatistikktilgang.status,
    appData.publiseringsdatoer.status,
    appData.sykefraværshistorikk.status,
  ]);

  // TODO: Fiks dette her!
  const window = {
    location: {
      href: "https://www.nav.no",
    },
  };

  if (loading) {
    return (
      <div className="forside__wrapper">
        <div className="forside">
          {/* TODO: Props inn i TestVersjonBanner må være rett */}
          <TestVersjonBanner
            sidenavn="fraværskalkulatoren"
            prodUrl={"props.prodUrl"}
            kjørerMockApp={true}
          />
          <div className="forside__innhold">
            <div className="forside__innhold__header">
              <BodyShort className="forside__innhold__href">
                {window.location.href}
              </BodyShort>
              <Heading spacing size="medium" level="2" as="span">
                <Skeleton width="65%" />
              </Heading>
            </div>
            <Skeleton
              variant="rectangle"
              width={105}
              height={48}
              className="forside__innhold__knapp"
            />
            <BodyShort as="div">
              <strong>
                <Skeleton width="40%" />
              </strong>
            </BodyShort>
            <BodyShort spacing as="div">
              <strong>
                <Skeleton width="30%" />
              </strong>
            </BodyShort>
            <Skeleton width="60%" />
            <Skeleton width="30%" />
            <Skeleton width="45%" />
            <Skeleton width="50%" />
            {/* <Sammenligningspaneler
              aggregertStatistikk={{ restStatus: RestStatus.IkkeLastet }}
              orgnr={orgnr}
            /> */}
            {/* <Historikk
              restSykefraværsstatistikk={{ status: RestStatus.IkkeLastet }}
            /> */}
          </div>
        </div>
      </div>
    );
  }

  // TODO: handle manglende rettigheter fra Altinn
  /*
  if (!brukerHarIaRettighetTilValgtBedrift) {
    return (
      <ManglerRettigheterIAltinnSide
        restOrganisasjonerMedStatistikk={
          appData.altinnOrganisasjonerMedStatistikktilgang
        }
      />
    );
  }
  */

  const statistikKategori = getBransjeEllerNæringKategori(
    appData.aggregertStatistikk
  );
  const harBransje = statistikKategori === Statistikkategori.BRANSJE;

  const bransjeEllerNæring = appData.aggregertStatistikk.aggregertData?.get(
    harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING
  );
  const navnPåVirksomhet =
    appData.altinnOrganisasjoner.status === RestStatus.Suksess &&
    appData.altinnOrganisasjoner.data.find(
      (organisasjon) => organisasjon.OrganizationNumber === orgnr
    )?.Name;
  /* const tabellProps = hentTabellProps(appData.sykefraværshistorikk); */

  return (
    <div className="forside__wrapper">
      <div className="forside">
        {/* TODO: Props inn i TestVersjonBanner må være rett */}
        <TestVersjonBanner
          sidenavn="fraværskalkulatoren"
          prodUrl={"props.prodUrl"}
          kjørerMockApp={true}
        />
        <div className="forside__innhold" ref={innholdRef}>
          {harFeil && (
            <Alert
              variant={"error"}
              className="forside__innhold__info-eller-feilmelding"
            >
              Kan ikke vise sykefraværsstatistikken akkurat nå. Vennligst prøv
              igjen senere.
            </Alert>
          )}
          <div className="forside__innhold__header">
            <BodyShort className="forside__innhold__href">
              {window.location.href}
            </BodyShort>
            <Heading spacing size="medium" level="2">
              Sykefraværsstatistikk for {navnPåVirksomhet}
            </Heading>
          </div>
          <LastNedKnapp innholdRef={innholdRef} orgnr={orgnr} />
          <BodyShort>
            <strong>Organisasjonsnummer: {orgnr}</strong>
          </BodyShort>
          <BodyShort spacing>
            <strong>
              {harBransje ? "Bransje" : "Næring"}:{" "}
              {bransjeEllerNæring?.prosentSiste4KvartalerTotalt?.label}
            </strong>
          </BodyShort>
          <PeriodeForStatistikk
            restPubliseringsdatoer={appData.publiseringsdatoer}
          />
          <PubliseringsdatoOppdateringsinfo
            restPubliseringsdatoer={appData.publiseringsdatoer}
          />
          <SlikHarViKommetFramTilDittResultat />
          {/* <Sammenligningspaneler
            skalSendeMetrikkerAutomatisk={skalSendeMetrikkerAutomatisk}
            aggregertStatistikk={appData.aggregertStatistikk}
            orgnr={orgnr}
          /> */}
          {/* {!!tabellProps && (
            <div className="forside__innhold__kun-print">
              <Tabell {...tabellProps} />
            </div>
          )} */}
          {/* <Historikk restSykefraværsstatistikk={appData.sykefraværshistorikk} /> */}
        </div>
      </div>
    </div>
  );
};
