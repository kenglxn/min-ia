import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as hooks from "../../src/hooks/useOrgnr";
import * as iatjenestemetrikker from "../../src/integrasjoner/ia-tjenestemetrikker-api";

import { useSendIaTjenesteMetrikkOnEvent } from "./useSendIaTjenesteMetrikkOnEvent";
import { FunctionComponent } from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { METRIKKER_URL } from "../utils/konstanter";
import { MetrikkKilde } from "@navikt/ia-metrikker-client";

jest.mock("../../src/integrasjoner/ia-tjenestemetrikker-api", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../src/integrasjoner/ia-tjenestemetrikker-api"),
  };
});

jest.mock("../../src/hooks/useOrgnr", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../src/hooks/useOrgnr"),
  };
});

const handlerMetrikkerApiCall = [
  rest.post(METRIKKER_URL, (req, res, ctx) => {
    return res(ctx.json({ status: "created" }));
  }),
];

const server = setupServer(...handlerMetrikkerApiCall);

beforeAll(() => server.listen());
afterAll(() => server.close());

beforeEach(() => {
  server.resetHandlers();
  jest.spyOn(iatjenestemetrikker, "sendIaTjenesteMetrikk");
  jest.spyOn(hooks, "useOrgnr").mockImplementation(() => "999999999");
});

afterEach(() => {
  jest.resetAllMocks();
  jest.fn().mockClear();
});

it("sendLevertInnloggetIaTjeneste kalles når event blir trigget", async () => {
  userEvent.setup();
  render(<UseSendIaTjenesteMetrikkerOnEventExample />);

  const dummyButton = screen.getByTestId("dummy-button");

  expect(iatjenestemetrikker.sendIaTjenesteMetrikk).not.toHaveBeenCalled();

  await userEvent.click(dummyButton);

  expect(iatjenestemetrikker.sendIaTjenesteMetrikk).toHaveBeenCalled();
});

const UseSendIaTjenesteMetrikkerOnEventExample: FunctionComponent = () => {
  useSendIaTjenesteMetrikkOnEvent(MetrikkKilde.NETTKURS, "click");
  return <button data-testid="dummy-button">exampleButton</button>;
};
