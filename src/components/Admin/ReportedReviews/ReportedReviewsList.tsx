"use client";
import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Pagination from "@/components/Pagination/Pagination";
import { DummyReview } from "@/types/review";

// Mock Reported Reviews
const mockReportedReviews: DummyReview[] = [
  {
    id: "r1",
    gymId: "g1",
    gymName: "Iron Paradise",
    userName: "Alice Johnson",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    rating: 2,
    body: "This gym was overcrowded and the equipment was not maintained.",
    createdAt: "2024-07-12T12:00:00Z",
    images: ["https://images.unsplash.com/photo-1554284126-aa88f22d8b74"],
  },
  {
    id: "r2",
    gymId: "g2",
    gymName: "Beast Mode Fitness",
    userName: "Bob Smith",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    rating: 1,
    body: "Staff was rude and charged extra fees without notice.",
    createdAt: "2024-06-10T12:00:00Z",
  },
  {
    id: "r3",
    gymId: "g3",
    gymName: "Fit & Fine Hub",
    userName: "Charlie Khan",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    rating: 3,
    body: "Average experience, not too bad but also not great.",
    createdAt: "2024-05-22T12:00:00Z",
  },
];

const ReportedReviewsList = () => {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectData, setRejectData] = useState({ reviewId: "", reason: "" });

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow text-yellow" : "text-gray"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-black p-6 transition-colors">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Reported Reviews</h1>
        <Button className="bg-secondary text-white rounded-lg px-3 py-1 text-sm hover:bg-secondary/80">
          Sort <ChevronDown className="inline w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border border-gray rounded-lg">
          <thead className="bg-secondary text-white text-xs md:text-sm uppercase tracking-wider sticky top-0">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Gym</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Review</th>
              <th className="p-3 text-left">Images</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockReportedReviews.map((review) => (
              <tr
                key={review.id}
                className="border-b border-gray bg-accent hover:bg-primary hover:text-black transition"
              >
                {/* User Info */}
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-8 h-8 rounded-full object-cover border border-gray"
                  />
                  <span className="font-medium">{review.userName}</span>
                </td>

                {/* Gym */}
                <td className="p-3">{review.gymName || review.gymId}</td>

                {/* Rating */}
                <td className="p-3">{renderStars(review.rating)}</td>

                {/* Review Body */}
                <td className="p-3 text-sm max-w-xs truncate">
                  {review.body}
                </td>

                {/* Images */}
                <td className="p-3">
                  {review.images && review.images.length > 0 ? (
                    <div className="flex gap-2">
                      {review.images.slice(0, 2).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`review-img-${idx}`}
                          className="w-10 h-10 rounded-md object-cover border border-gray"
                        />
                      ))}
                      {review.images.length > 2 && (
                        <span className="text-xs text-gray">
                          +{review.images.length - 2} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray text-xs">No images</span>
                  )}
                </td>

                {/* Date */}
                <td className="p-3 text-sm">
                  {new Date(review.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                {/* Actions */}
                <td className="p-3">
                  <Dialog
                    open={rejectDialogOpen}
                    onOpenChange={setRejectDialogOpen}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-secondary text-white rounded-full text-xs md:text-sm px-2 py-1 hover:bg-secondary/50">
                          Actions <ChevronDown className="inline w-4 h-4 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white text-black">
                        <DropdownMenuItem className="text-green-600">
                          ✅ Approve
                        </DropdownMenuItem>
                        <DialogTrigger asChild>
                          <DropdownMenuItem className="text-red">
                            ❌ Reject
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Reject Dialog */}
                    <DialogContent className="bg-white p-6 rounded-2xl shadow-lg max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-black">
                          Reject Review by{" "}
                          <span className="font-bold text-red">
                            {review.userName}
                          </span>
                        </DialogTitle>
                        <p className="text-sm text-gray mt-1">
                          Please provide a reason for rejecting this review.
                        </p>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setRejectDialogOpen(false);
                          setRejectData({ reviewId: "", reason: "" });
                        }}
                      >
                        <div className="grid gap-3 pb-3">
                          <Label htmlFor="reason">Reason</Label>
                          <Textarea
                            id="reason"
                            name="reason"
                            value={rejectData.reason}
                            onChange={(e) =>
                              setRejectData({
                                ...rejectData,
                                reason: e.target.value,
                              })
                            }
                            placeholder="Enter rejection reason"
                            className="min-h-[100px] rounded-lg border-gray"
                          />
                        </div>
                        <DialogFooter className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            className="rounded-lg border border-gray text-black"
                            onClick={() => setRejectDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button className="bg-red hover:opacity-90 text-white rounded-lg">
                            Confirm
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Static Pagination */}
      <Pagination
        className="flex justify-center items-center gap-3 my-6"
        currentPage={1}
        totalPages={3}
        onPageChange={() => {}}
      />
    </div>
  );
};

export default ReportedReviewsList;
