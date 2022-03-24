// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AltinnOrganisasjon } from "../../integrasjoner/altinnorganisasjon-api";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AltinnOrganisasjon[]>
) {
  res.status(200).json([
    {
      Name: "FLESK OG FISK AS",
      Type: "Enterprise",
      OrganizationNumber: "111111111",
      OrganizationForm: "AS",
      Status: "Active",
      ParentOrganizationNumber: "",
    },
    {
      Name: "FLESK OG FISK OSLO",
      Type: "Business",
      OrganizationNumber: "910969439",
      OrganizationForm: "BEDR",
      Status: "Active",
      ParentOrganizationNumber: "111111111",
    },
    {
      Name: "Trøndelag Tømmerere",
      Type: "Enterprise",
      OrganizationNumber: "211111111",
      OrganizationForm: "AS",
      Status: "Active",
      ParentOrganizationNumber: "",
    },
    {
      Name: "Trøndelag Tømmerere avd. OSLO",
      Type: "Business",
      OrganizationNumber: "810969439",
      OrganizationForm: "BEDR",
      Status: "Active",
      ParentOrganizationNumber: "211111111",
    },
  ]);
}
