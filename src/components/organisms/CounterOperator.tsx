"use client";
import { ICounter } from "@/interfaces/services/counter.interface";
import { IQueue } from "@/interfaces/services/queue.interface";
import React, { useState, useEffect } from "react";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import Select from "../atoms/Select";
import CurrentQueueDisplay from "../molecules/CurrentQueueDisplay";
import {
  useGetCurrentQueues,
  useSkipQueue,
  useNextQueue,
} from "@/services/queue/wrapper.service";
import { useGetAllCounters } from "@/services/counter/wrapper.service";

interface CounterOperatorProps {
  className?: string;
}

const CounterOperator: React.FC<CounterOperatorProps> = ({ className }) => {
  // const selectedCounter: ICounter | null = null;
  // const currentQueue: IQueue | null = null;
  // const activeCounters: ICounter[] = [];

  const [selectedCounter, setSelectedCounter] = useState<ICounter | null>(null);
  const [currentQueue, setCurrentQueue] = useState<IQueue | null>(null);

  const { mutate: nextQueue, isPending: nextLoading } = useNextQueue();
  const { mutate: skipQueue, isPending: skipLoading } = useSkipQueue();

  // Ambil semua counter aktif
  const { data: countersRes } = useGetAllCounters();
  const activeCounters: ICounter[] = countersRes?.data || [];

  const { data: queuesRes, refetch } = useGetCurrentQueues();
  const queueList: IQueue[] = queuesRes || [];

  const handleCounterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const counterId = Number(e.target.value);
    const counter = activeCounters.find((c) => c.id === counterId) || null;
    setSelectedCounter(counter);
  };

  const handleNextQueue = () => {
    if (!selectedCounter) return;
    nextQueue(
      { counter_id: selectedCounter.id },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleSkipQueue = () => {
    if (!selectedCounter) return;
    skipQueue(
      { counter_id: selectedCounter.id },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <div className={className}>
      <Card className="mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          OPERATOR COUNTER
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Panel untuk operator counter melayani antrian pengunjung
        </p>

        <Select
          label="Pilih Counter"
          fullWidth
          options={[
            { value: "", label: "Pilih Counter", disabled: true },
            ...activeCounters.map((counter) => ({
              value: counter.id.toString(),
              label: counter.name,
              disabled: false,
            })),
          ]}
          value={selectedCounter?.id?.toString() || ""}
          onChange={handleCounterChange}
        />
      </Card>

      {selectedCounter ? (
        <div className="space-y-6">
          <CurrentQueueDisplay
            counterName={selectedCounter.name}
            queueNumber={selectedCounter.currentQueue}
            status={"CLAIMED"}
          />

          <div className="flex gap-4">
            <Button
              fullWidth
              leftIcon={
                <span className="material-symbols-outlined">arrow_forward</span>
              }
              onClick={handleNextQueue}
              isLoading={false}
              disabled={false}
            >
              Panggil Antrian Berikutnya
            </Button>

            {currentQueue && (
              <Button
                fullWidth
                variant="danger"
                leftIcon={
                  <span className="material-symbols-outlined">skip_next</span>
                }
                onClick={handleSkipQueue}
                isLoading={false}
                disabled={false}
              >
                Lewati Antrian
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Card variant="outline" className="text-center py-8 text-gray-500">
          Silahkan pilih counter untuk mulai melayani antrian
        </Card>
      )}
    </div>
  );
};

export default CounterOperator;
