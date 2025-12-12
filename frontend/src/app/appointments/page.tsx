"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Booking } from "@/types/Booking";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useMemo } from "react";
import { getBookings, deleteBooking } from "@/lib/api/bookings";

import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { ScissorsLineDashed, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const appointmentColumns = (
  openDeleteDialog: (id: string) => void,
  deletingId: string | null
): ColumnDef<Booking>[] => [
  {
    accessorKey: "barber",
    header: "Barber",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "start",
    header: "Start",
    cell: ({ row }) => new Date(row.original.start).toLocaleString(),
  },
  {
    accessorKey: "end",
    header: "End",
    cell: ({ row }) => new Date(row.original.end).toLocaleString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <Button
          variant="destructive"
          onClick={() => openDeleteDialog(booking.id)}
          disabled={deletingId === booking.id}
          className="h-8"
        >
          <Trash />
        </Button>
      );
    },
  },
];

export default function AppointmentsPage() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const openDeleteDialog = useCallback((id: string) => {
    setPendingDeleteId(id);
  }, []);

  const columns = useMemo(
    () => appointmentColumns(openDeleteDialog, deletingId),
    [openDeleteDialog, deletingId]
  );

  async function handleSearch() {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setHasSearched(true);
    setLoading(true);
    setError("");

    try {
      const data = await getBookings(email);
      setBookings(data);
    } catch (err) {
      setError("Failed to load appointments: " + err);
    }

    setLoading(false);
  }

  async function handleDeleteConfirmed() {
    if (!pendingDeleteId) return;

    setDeletingId(pendingDeleteId);
    setError("");

    try {
      const success = await deleteBooking(pendingDeleteId);
      if (!success) {
        setError("Could not delete booking.");
        setDeletingId(null);
        setPendingDeleteId(null);
        return;
      }

      setBookings((prev) =>
        prev.filter((booking) => booking.id !== pendingDeleteId)
      );
    } catch (err) {
      setError("Failed to delete booking: " + err);
    }

    setDeletingId(null);
    setPendingDeleteId(null);
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl font-[Snell_Roundhand,Segoe_Script,'Brush_Script_MT',cursive] mb-4">
            Cut to the right moment(s)
          </h1>
        </div>

        <div className="flex gap-2 mb-4 justify-center">
          <Input
            type="email"
            placeholder="Enter your email…"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-xs"
          />

          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching…" : "Search"}
            <ScissorsLineDashed />
          </Button>
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {loading && <p>Loading...</p>}
      </div>

      <div className="mt-6 w-full">
        {bookings.length > 0 && <DataTable columns={columns} data={bookings} />}

        {hasSearched && bookings.length === 0 && !loading && (
          <p className="text-center mt-4">No appointments found.</p>
        )}
      </div>

      <AlertDialog
        open={!!pendingDeleteId}
        onOpenChange={() => setPendingDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingDeleteId(null)}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction onClick={handleDeleteConfirmed}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
