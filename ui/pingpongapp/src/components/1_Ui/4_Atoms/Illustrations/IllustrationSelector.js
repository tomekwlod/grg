import React from "react";
import { IllustrationBloodcells } from "./IllustrationBloodcells";
import { IllustrationClipboard } from "./IllustrationClipboard";
import { IllustrationDoctor } from "./IllustrationDoctor";
import { IllustrationDropMagnify } from "./IllustrationDropMagnify";
import { IllustrationEye } from "./IllustrationEye";
import { IllustrationGraph } from "./IllustrationGraph";
import { IllustrationHelix } from "./IllustrationHelix";
import { IllustrationLightbulb } from "./IllustrationLightbulb";
import { IllustrationMedal } from "./IllustrationMedal";
import { IllustrationMedicalArrow } from "./IllustrationMedicalArrow";
import { IllustrationPeople } from "./IllustrationPeople";
import { IllustrationTarget } from "./IllustrationTarget";
import { IllustrationCovid19 } from "./IllustrationCovid19";

export const IllustrationSelector = ({ name, ...props }) => {
  const OPTIONS = {
    lightbulb: IllustrationLightbulb,
    people: IllustrationPeople,
    eye: IllustrationEye,
    dropmagnify: IllustrationDropMagnify,
    helix: IllustrationHelix,
    clipboard: IllustrationClipboard,
    bloodcells: IllustrationBloodcells,
    doctor: IllustrationDoctor,
    graph: IllustrationGraph,
    medal: IllustrationMedal,
    medicalarrow: IllustrationMedicalArrow,
    target: IllustrationTarget,
    covid19: IllustrationCovid19,
  };
  const Comp = OPTIONS[name] || OPTIONS.medal;
  return <Comp {...props} />;
};
