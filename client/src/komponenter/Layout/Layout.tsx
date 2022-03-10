import { DecoratorHeader } from "../decorator/DecoratorHeader";
import { DecoratorFooter } from "../decorator/DecoratorFooter";
import Head from "next/head";
import { DecoratorParts } from "../../utils/dekorator";
import { DecoratorEnv } from "../decorator/DecoratorEnv";
import React, { useRef } from "react";
import Banner from "../../Banner/Banner";
import { Route, Switch } from "react-router";
import { useAltinnOrganisasjoner } from "../../hooks/useAltinnOrganisasjoner";
import { Heading, Ingress } from "@navikt/ds-react";

export const Layout = (props: {
  title: string;
  isFrontPage: boolean;
  bannerIconUrl?: string;
  decoratorParts?: DecoratorParts;
  children: React.ReactChild;
}) => {
  const layoutContentRef = useRef<HTMLDivElement>(null);

  const headerLinks = (
    props.decoratorParts ? props.decoratorParts.linkTags : []
  ).map((attrs, index) => {
    return (
      <link
        key={attrs.key}
        href={attrs.href ? attrs.href : undefined}
        type={attrs.type ? attrs.type : undefined}
        rel={attrs.rel ? attrs.rel : undefined}
        sizes={attrs.sizes ? attrs.sizes : undefined}
      />
    );
  });

  const restAltinnOrganisasjoner = useAltinnOrganisasjoner();
  const tittelMedUndertittel = (
    <div>
      <Heading size="large" level="3">
        Forebygge fravær
      </Heading>
      <Ingress> Inkluderende arbeidsliv</Ingress>
    </div>
  );
  return (
    <div>
      <Head>{headerLinks}</Head>
      <div style={{ backgroundColor: "white" }}>
        <DecoratorHeader
          html={
            props.decoratorParts?.decoratorHeader === undefined
              ? ""
              : props.decoratorParts?.decoratorHeader
          }
        />
      </div>
      <div id="app" className="app">
        <Switch>
          {" "}
          <Route>
            <Banner
              tittelMedUnderTittel={tittelMedUndertittel}
              restOrganisasjoner={restAltinnOrganisasjoner}
            />
          </Route>
        </Switch>

        <div>
          <div ref={layoutContentRef}>{props.children}</div>
        </div>
      </div>
      <DecoratorFooter
        html={
          props.decoratorParts?.decoratorFooter === undefined
            ? ""
            : props.decoratorParts?.decoratorFooter
        }
      />
      <DecoratorEnv env={props.decoratorParts?.decoratorEnv} />
    </div>
  );
};
