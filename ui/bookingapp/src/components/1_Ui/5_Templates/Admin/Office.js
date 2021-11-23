import React, { useState, useContext } from "react";

import { CreateOffice, OfficeList } from "../../../../components";

export const Office = (props) => {
  return (
    <>
      <CreateOffice />
      <OfficeList />
    </>
  );
};
