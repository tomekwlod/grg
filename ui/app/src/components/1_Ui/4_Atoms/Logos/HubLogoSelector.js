import React from "react";
import { LogoPrimaryMpn } from "./LogoPrimaryMpn";
import { LogoPrimaryAml } from "./LogoPrimaryAml";
import { LogoPrimaryLh } from "./LogoPrimaryLh";
import { LogoPrimaryGvhd } from "./LogoPrimaryGvhd";
import { LogoPrimaryMm } from "./LogoPrimaryMm";
import { LogoPrimaryMds } from "./LogoPrimaryMds";
import { LogoPrimaryAll } from "./LogoPrimaryAll";
import { LogoPrimaryKnowAml } from "./LogoPrimaryKnowAml";

export const HubLogoSelector = ({ code = "all", ...props }) => {
  const OPTIONS = {
    lh: LogoPrimaryLh,
    mpn: LogoPrimaryMpn,
    aml: LogoPrimaryAml,
    gvhd: LogoPrimaryGvhd,
    mm: LogoPrimaryMm,
    mds: LogoPrimaryMds,
    all: LogoPrimaryAll,
    knowaml: LogoPrimaryKnowAml,
  };

  const Comp = OPTIONS[code] || OPTIONS.all;
  return <Comp {...props} />;
};
