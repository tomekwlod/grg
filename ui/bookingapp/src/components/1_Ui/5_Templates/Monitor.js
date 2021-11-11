import React, { useState, useEffect } from "react";
import { Box, FormTextInput } from "../../../components";

import { MonitorServiceClient } from "../../../proto/monitor_grpc_web_pb";
import { MonitorRequest } from "../../../proto/monitor_pb";

var monitorClient = new MonitorServiceClient("https://localhost:8080");

export const Monitor = (props) => {
  const [refreshInterval, setRefreshInterval] = useState(500);

  const [CPU, setCPU] = useState(0);
  const [MemoryFree, setMemoryFree] = useState(0);
  const [MemoryUsed, setMemoryUsed] = useState(0);

  useEffect(() => {
    const closeIntervalFn = getStats(refreshInterval);

    return closeIntervalFn;
  }, [refreshInterval]);

  const getStats = (interval) => {
    console.log("stream on");

    var request = new MonitorRequest();
    request.setMiliseconds(interval);

    var stream = monitorClient.monitor(request, {});

    stream.on("data", function (response) {
      var stats = response.toObject();

      setCPU(stats.cpu);
      setMemoryFree(stats.memoryFree);
      setMemoryUsed(stats.memoryUsed);
    });

    return () => {
      console.log("stream close");
      stream.cancel();
    };
  };

  return (
    <Box>
      <form>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="space-around"
          flexDirection="column"
        >
          <FormTextInput
            label="Password"
            name="password"
            type="number"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(e.target.value)}
          />
        </Box>
      </form>

      <p>CPU: {CPU}</p>
      <p>MemoryFree: {MemoryFree}M</p>
      <p>MemoryUsed: {MemoryUsed}M</p>
    </Box>
  );
};
