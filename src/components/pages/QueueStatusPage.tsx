"use client";
import React, { useState } from "react";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import QueueCard from "../molecules/QueueCard";
import QueueForm from "../molecules/QueueForm";
import {
  useSearchQueue,
  useReleaseQueue,
} from "@/services/queue/wrapper.service";
import { IQueue } from "@/interfaces/services/queue.interface";
import toast from "react-hot-toast";

interface QueueStatusCheckerProps {
  className?: string;
}

const QueueStatusChecker: React.FC<QueueStatusCheckerProps> = ({
  className,
}) => {
  const [queueNumber, setQueueNumber] = useState("");

  const { data: queueDetails = [], isFetching } = useSearchQueue(queueNumber);
  const { mutate: releaseQueue, isPending: isReleasing } = useReleaseQueue();

  const handleSubmit = (data: { queueNumber: string }) => {
    setQueueNumber(data.queueNumber);
  };

  const handleReleaseQueue = (queue: IQueue) => {
    releaseQueue(
      {
        queue_number: Number(queue.queueNumber),
        counter_id: queue.counter.id,
      },
      {
        onSuccess: (res) => {
          toast("Success");
        },
      }
    );
  };

  return (
    <div className={className}>
      <Card className="mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Cek Status Antrian
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Masukkan nomor antrian Anda untuk memeriksa status
        </p>

        <QueueForm onSubmit={handleSubmit} isLoading={isFetching} />
      </Card>

      {queueDetails.length > 0 ? (
        <div className="space-y-4">
          {queueDetails
            .filter((queue) => queue.status !== "RELEASED") // ⬅️ filter di sini
            .map((queue) => (
              <div key={queue.id} className="space-y-2">
                <QueueCard queue={queue} />

                {queue.status === "CLAIMED" && (
                  <Button
                    variant="danger"
                    fullWidth
                    onClick={() => handleReleaseQueue(queue)}
                    leftIcon={
                      <span className="material-symbols-outlined">
                        exit_to_app
                      </span>
                    }
                  >
                    Lepaskan Nomor Antrian
                  </Button>
                )}
              </div>
            ))}
        </div>
      ) : (
        queueNumber &&
        !isFetching && (
          <Card variant="outline" className="text-center py-6 text-gray-500">
            Nomor antrian <strong>{queueNumber}</strong> tidak ditemukan.
          </Card>
        )
      )}
    </div>
  );
};

export default QueueStatusChecker;
