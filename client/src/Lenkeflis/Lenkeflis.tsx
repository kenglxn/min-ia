import {LinkPanel} from "@navikt/ds-react";
import styles from "./Lenkeflis.module.scss";
import React from "react";
import {sendNavigereEvent} from "../amplitude/events";
import {IaTjeneste, sendLevertInnloggetIaTjeneste,} from "../integrasjoner/ia-tjenestemetrikker-api";
import {useOrgnr} from "../hooks/useOrgnr";
import {navigerEtterCallbacks} from "../utils/navigasjon";

export interface LenkeflisProps {
    overskrift: string;
    ikon?: React.ReactElement;
    href?: string;
}

export const Lenkeflis = ({overskrift, ikon, href}: LenkeflisProps) => {
    const orgnr = useOrgnr();
    const destinasjon = href ?? "#";

    const metrikkutsendelse = () =>
        sendLevertInnloggetIaTjeneste(IaTjeneste.FOREBYGGE_FRAVÆR, orgnr);
    const eventutsendelse = () => sendNavigereEvent(destinasjon, overskrift);

    const lokalNavigerEtterCallbacks = () => {
        navigerEtterCallbacks(destinasjon, [metrikkutsendelse, eventutsendelse])
    }

    return (
        <LinkPanel
            href={destinasjon}
            className={styles.lenkeflis}
            onClickCapture={(e) => {
                e.preventDefault();
            }}
            onClick={lokalNavigerEtterCallbacks}
            onKeyDown={lokalNavigerEtterCallbacks}
        >
            <LinkPanel.Title>
                <div className={styles.ikonOgTekstWrapper}>
                    {ikon && <div className={styles.ikonWrapper}>{ikon}</div>}
                    {overskrift}
                </div>
            </LinkPanel.Title>
        </LinkPanel>
    );
};
