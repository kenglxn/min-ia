import React from "react";
import Bedriftsmeny from "@navikt/bedriftsmeny";
import "@navikt/bedriftsmeny/lib/bedriftsmeny.css";
import {
  AltinnOrganisasjon,
  RestAltinnOrganisasjoner,
} from "../api/altinnorganisasjon-api";
import { RestStatus } from "../api/rest-status";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props {
  tittel: string;
  restOrganisasjoner: RestAltinnOrganisasjoner;
}

const Banner: React.FunctionComponent<Props & RouteComponentProps> = (
  props
) => {
  const { history, tittel, restOrganisasjoner } = props;
  const altinnOrganisasjoner: AltinnOrganisasjon[] =
    restOrganisasjoner.status === RestStatus.Suksess
      ? restOrganisasjoner.data
      : [];
  return (
    <Bedriftsmeny
      organisasjoner={altinnOrganisasjoner}
      sidetittel={tittel}
      history={history}
      onOrganisasjonChange={() => {
        // TODO: sett amplitude
        return;
      }}
    />
  );
};

export default withRouter(Banner);
