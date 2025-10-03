"use client";
import { ICounter } from "@/interfaces/services/counter.interface";
import React, { useState, useEffect } from "react";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import Select from "../atoms/Select";
import CurrentQueueDisplay from "../molecules/CurrentQueueDisplay";
import { useGetAllCounters } from "@/services/counter/wrapper.service";
import {
  useGetCurrentQueues,
  useNextQueue,
  useSkipQueue,
  useResetQueues,
} from "@/services/queue/wrapper.service";
import { ICurrentQueuesResponse } from "@/interfaces/services/queue.interface";

interface CounterOperatorProps {
  className?: string;
}

const CounterOperator: React.FC<CounterOperatorProps> = ({ className }) => {
  const [selectedCounterId, setSelectedCounterId] = useState<string>("");

  const { data: countersData, isLoading: isLoadingCounters } =
    useGetAllCounters();
  const { data: currentQueuesData, isLoading: isLoadingQueues } =
    useGetCurrentQueues();

  const nextQueueMutation = useNextQueue();
  const skipQueueMutation = useSkipQueue();
  const resetQueuesMutation = useResetQueues();

  const activeCounters: ICounter[] =
    countersData?.data?.filter((counter) => counter.isActive) || [];

  const selectedCounter: ICounter | null =
    activeCounters.find(
      (counter) => counter.id.toString() === selectedCounterId
    ) || null;

  const currentQueueInfo: ICurrentQueuesResponse | null =
    (currentQueuesData as ICurrentQueuesResponse[] | undefined)?.find(
      (queue) => queue.id.toString() === selectedCounterId
    ) || null;

  const hasActiveQueue = currentQueueInfo && currentQueueInfo.currentQueue > 0;

  useEffect(() => {
    if (activeCounters.length > 0 && !selectedCounterId) {
      setSelectedCounterId(activeCounters[0].id.toString());
    }
  }, [activeCounters, selectedCounterId]);

  const handleCounterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCounterId(e.target.value);
  };

  const handleNextQueue = () => {
    if (!selectedCounter) return;

    nextQueueMutation.mutate({
      counter_id: selectedCounter.id,
    });
  };

  const handleSkipQueue = () => {
    if (!selectedCounter || !currentQueueInfo) return;

    skipQueueMutation.mutate({
      counter_id: selectedCounter.id,
    });
  };

  if (isLoadingCounters) {
    return (
      <div className={className}>
        <Card className="text-center py-8">
          <div className="flex justify-center items-center gap-2">
            <span className="material-symbols-outlined animate-spin">
              refresh
            </span>
            <span className="text-gray-600">Memuat data counter...</span>
          </div>
        </Card>
      </div>
    );
  }

  if (activeCounters.length === 0) {
    return (
      <div className={className}>
        <Card className="text-center py-8">
          <span className="material-symbols-outlined text-5xl text-gray-400 mb-4">
            warning
          </span>
          <p className="text-gray-600 font-medium">
            Tidak ada counter yang aktif saat ini
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Silakan hubungi administrator untuk mengaktifkan counter
          </p>
        </Card>
      </div>
    );
  }

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
          value={selectedCounterId}
          onChange={handleCounterChange}
        />
      </Card>

      {selectedCounter ? (
        <div className="space-y-6">
          {/* Current Queue Display */}
          {currentQueueInfo && (
            <CurrentQueueDisplay
              counterName={selectedCounter.name}
              queueNumber={currentQueueInfo.currentQueue}
              status={currentQueueInfo.status}
            />
          )}

          {/* Queue Status Info */}
          {isLoadingQueues ? (
            <Card className="text-center py-4">
              <span className="text-gray-500 text-sm">
                Memuat data antrian...
              </span>
            </Card>
          ) : hasActiveQueue ? (
            <Card variant="outline" className="bg-green-50 border-green-200">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-600">
                  check_circle
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">
                        Antrian Aktif
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Nomor Antrian:{" "}
                        <strong>#{currentQueueInfo?.currentQueue}</strong>
                      </p>
                      <p className="text-sm text-green-700">
                        Status:{" "}
                        <strong className="uppercase">
                          {currentQueueInfo?.status}
                        </strong>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-green-600">Progres</p>
                      <p className="text-2xl font-bold text-green-700">
                        {currentQueueInfo?.currentQueue}/
                        {currentQueueInfo?.maxQueue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card variant="outline" className="bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-yellow-600">
                  hourglass_empty
                </span>
                <div>
                  <p className="font-medium text-yellow-800">
                    Tidak Ada Antrian Aktif
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Klik Panggil Antrian Berikutnya untuk melayani pengunjung
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              fullWidth
              leftIcon={
                <span className="material-symbols-outlined">arrow_forward</span>
              }
              onClick={handleNextQueue}
              isLoading={nextQueueMutation.isPending}
              disabled={
                nextQueueMutation.isPending || skipQueueMutation.isPending
              }
            >
              Panggil Antrian Berikutnya
            </Button>

            {hasActiveQueue && (
              <Button
                fullWidth
                variant="danger"
                leftIcon={
                  <span className="material-symbols-outlined">skip_next</span>
                }
                onClick={handleSkipQueue}
                isLoading={skipQueueMutation.isPending}
                disabled={
                  nextQueueMutation.isPending || skipQueueMutation.isPending
                }
              >
                Lewati Antrian
              </Button>
            )}
            {/* <Button
              fullWidth
              variant="danger"
              leftIcon={
                <span className="material-symbols-outlined">restart_alt</span>
              }
              onClick={() => {
                if (!selectedCounter) return;
                resetQueuesMutation.mutate({ counter_id: selectedCounter.id });
              }}
              isLoading={resetQueuesMutation.isPending}
              disabled={resetQueuesMutation.isPending}
            >
              Reset Antrian
            </Button> */}
          </div>
        </div>
      ) : (
        // No Counter Selected State
        <Card variant="outline" className="text-center py-12 text-gray-500">
          <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
            desk
          </span>
          <p className="text-lg font-medium text-gray-600 mb-2">
            Silakan pilih counter untuk mulai melayani antrian
          </p>
          <p className="text-sm text-gray-500">
            Pilih counter dari dropdown di atas
          </p>
        </Card>
      )}
    </div>
  );
};

export default CounterOperator;
