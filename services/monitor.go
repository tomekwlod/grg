package services

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/tomekwlod/grg/pb"

	"github.com/mackerelio/go-osstat/cpu"
	"github.com/mackerelio/go-osstat/memory"
)

// implements methods that are intercepted by AuthFunc - only authenticated access!
type MonitorService struct {
	pb.UnimplementedMonitorServiceServer
}

// UNAUTHENTICATED ACCESS FOR NOW!
// TURN ME OFF LATER!!
// TURN ME OFF LATER!!
// TURN ME OFF LATER!!
// TURN ME OFF LATER!!
// TURN ME OFF LATER!!
// TURN ME OFF LATER!!
func (m *MonitorService) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	return ctx, nil
}

func (m *MonitorService) Monitor(req *pb.MonitorRequest, stream pb.MonitorService_MonitorServer) error {

	ms := req.GetMiliseconds()
	if ms < 500 {
		ms = 500
	}

	// Start a ticker that executes each 2 seconds
	timer := time.NewTicker(time.Duration(ms) * time.Millisecond)

	for {
		select {
		// Exit on stream context done
		case <-stream.Context().Done():
			fmt.Println("Stream closed") // when client unsubscribes from the stream (or web reloads)
			return nil
		case <-timer.C:
			hwStats, err := m.GetStats()

			if err != nil {
				log.Println(err.Error())
			}

			err = stream.Send(hwStats)
			if err != nil {
				log.Println(err.Error())
			}
		}
	}
}

// GetStats will extract system stats and output a Hardware Object, or an error
// if extraction fails
func (m *MonitorService) GetStats() (*pb.MonitorResponse, error) {
	// Extarcyt Memory statas
	mem, err := memory.Get()
	if err != nil {
		return nil, err
	}
	// Extract CPU stats
	cpu, err := cpu.Get()
	if err != nil {
		return nil, err
	}
	// Create our response object
	hwStats := &pb.MonitorResponse{
		Cpu:        int32(cpu.Total),
		MemoryFree: int32(mem.Free / 1024 / 1024),
		MemoryUsed: int32(mem.Used / 1024 / 1024),
	}

	return hwStats, nil
}
