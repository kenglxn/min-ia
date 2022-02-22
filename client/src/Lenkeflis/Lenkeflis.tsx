import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import { PanelBrødtekstSkjultPåMobil } from "../PanelBrødtekstSkjultPåMobil/PanelBrødtekstSkjultPåMobil";

export const Lenkeflis: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
  href: string | undefined;
}> = ({ overskrift, brødtekst, ikon, href }) => {
  return (
    <LinkPanel href={href ? href : "#"} className={styles.lenkeflis}>
      <div className={styles.ikonOgTekstWrapper}>
        <div className={styles.ikonWrapper}>{ikon}</div>
        <div>
          <LinkPanel.Title>{overskrift}</LinkPanel.Title>
          <PanelBrødtekstSkjultPåMobil tekst={brødtekst} />
        </div>
      </div>
    </LinkPanel>
  );
};
