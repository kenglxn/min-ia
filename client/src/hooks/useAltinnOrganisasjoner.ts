import { useEffect, useState } from "react";
import {
  hentAltinnOrganisasjoner,
  RestAltinnOrganisasjoner,
} from "../integrasjoner/altinnorganisasjon-api";
import { RestStatus } from "../integrasjoner/rest-status";
import { BASE_PATH } from "../utils/konstanter";

export function useAltinnOrganisasjoner() {
  const [restAltinnOrganisasjoner, setRestAltinnOrganisasjoner] =
    useState<RestAltinnOrganisasjoner>({
      status: RestStatus.IkkeLastet,
    });

  useEffect(() => {
    hentAltinnOrganisasjoner(`${BASE_PATH}/api/organisasjoner`).then(
      setRestAltinnOrganisasjoner
    );
  }, []);
  return restAltinnOrganisasjoner;
}
