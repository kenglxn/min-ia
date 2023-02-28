import { useWindowSize } from "../hooks/useWindowSize";
import { LinkPanel } from "@navikt/ds-react";
import React from "react";

export function PanelBrødtekstSkjultPåMobil(props: { tekst: string }) {
  const windowSize = useWindowSize();
  const SCREEN_MOBILE_MIN = 480;

  if (windowSize.width === undefined || windowSize.width < SCREEN_MOBILE_MIN) {
    return null;
  }

  return <LinkPanel.Description>{props.tekst}</LinkPanel.Description>;
}
