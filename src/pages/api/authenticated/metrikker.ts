import { NextApiRequest, NextApiResponse } from "next";
import proxyRequestWithTokenExchange from "../../../utils/api-proxy";
import { logger } from "../../../utils/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  logger.info(
    `Mottatt metrikk\n
    IA_TJENESTER_METRIKKER_AUDIENCE: ${process.env.IA_TJENESTER_METRIKKER_AUDIENCE}\n
    IA_TJENESTER_METRIKKER_HOSTNAME: ${process.env.IA_TJENESTER_METRIKKER_HOSTNAME}\n`
  );

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  return await proxyRequestWithTokenExchange(
    req,
    res,
    `${process.env.IA_TJENESTER_METRIKKER_HOSTNAME}`,
    "/ia-tjenester-metrikker/innlogget/mottatt-iatjeneste",
    process.env.IA_TJENESTER_METRIKKER_AUDIENCE,
    false
  );
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
